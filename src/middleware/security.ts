import {
  checkIPReputation,
  checkRateLimit,
  detectBot,
  detectSuspiciousInput,
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
  sanitizeInput,
  sanitizeStrictInput,
  validateEmail,
  validateFileUpload,
  validatePhone,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";

// Security middleware for API routes
export function withSecurity(
  handler: (request: NextRequest) => Promise<NextResponse>,
  endpoint: string
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();

    try {
      // 1. Enhanced security checks
      const clientIP = getClientIP(request);
      const userAgent = request.headers.get("user-agent") || "";

      // Bot detection
      const botDetection = detectBot(request);
      if (botDetection.isBot && botDetection.botType === "malicious") {
        logSecurityEvent(
          "MALICIOUS_BOT_BLOCKED",
          {
            endpoint,
            ip: clientIP,
            userAgent,
            botType: botDetection.botType,
            confidence: botDetection.confidence,
          },
          request
        );

        return NextResponse.json(
          {
            error: "Access denied. Automated requests are not permitted.",
            message:
              "Votre requête a été bloquée pour des raisons de sécurité.",
            type: "bot_detection",
          },
          {
            status: 403,
            headers: getSecurityHeaders(),
          }
        );
      }

      // IP reputation check
      const ipReputation = checkIPReputation(clientIP);
      if (ipReputation.shouldBlock) {
        logSecurityEvent(
          "MALICIOUS_IP_BLOCKED",
          {
            endpoint,
            ip: clientIP,
            reputation: ipReputation.reputation,
            reason: ipReputation.reason,
          },
          request
        );

        return NextResponse.json(
          {
            error: "Access denied from this location.",
            message:
              "Votre requête a été bloquée pour des raisons de sécurité.",
            type: "ip_blocked",
          },
          {
            status: 403,
            headers: getSecurityHeaders(),
          }
        );
      }

      // Enterprise rate limiting check
      const rateLimitResult = checkRateLimit(request, endpoint);
      if (!rateLimitResult.allowed) {
        logSecurityEvent(
          "RATE_LIMIT_EXCEEDED",
          {
            endpoint,
            ip: clientIP,
            userAgent,
            riskScore: rateLimitResult.riskScore,
            threatLevel: rateLimitResult.threatLevel,
          },
          request
        );

        return NextResponse.json(
          {
            error:
              "Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.",
            message:
              "Limite de tentatives atteinte. Veuillez attendre avant de soumettre à nouveau.",
            retryAfter: Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000
            ),
            type: "rate_limit",
          },
          {
            status: 429,
            headers: {
              ...getSecurityHeaders(),
              "Retry-After": Math.ceil(
                (rateLimitResult.resetTime - Date.now()) / 1000
              ).toString(),
              "X-RateLimit-Limit": "5",
              "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
              "X-RateLimit-Reset": new Date(
                rateLimitResult.resetTime
              ).toISOString(),
            },
          }
        );
      }

      // 2. Validate request method
      if (request.method !== "POST") {
        return NextResponse.json(
          {
            error: "Méthode non autorisée",
            message: "Type de requête non supporté. Veuillez réessayer.",
            type: "method_not_allowed",
          },
          {
            status: 405,
            headers: getSecurityHeaders(),
          }
        );
      }

      // 3. Check content type
      const contentType = request.headers.get("content-type");
      const allowedContentTypes = ["application/json", "multipart/form-data"];

      if (
        !contentType ||
        !allowedContentTypes.some((type) => contentType.includes(type))
      ) {
        return NextResponse.json(
          {
            error: "Type de contenu non supporté",
            message: "Format de données invalide. Veuillez réessayer.",
            type: "unsupported_content_type",
          },
          {
            status: 415,
            headers: getSecurityHeaders(),
          }
        );
      }

      // 4. Check request size
      const contentLength = request.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
        // 10MB limit
        logSecurityEvent(
          "REQUEST_TOO_LARGE",
          {
            endpoint,
            contentLength: parseInt(contentLength),
          },
          request
        );

        return NextResponse.json(
          {
            error: "Requête trop volumineuse",
            message:
              "Les données envoyées sont trop importantes. Veuillez réduire la taille et réessayer.",
            type: "request_too_large",
          },
          {
            status: 413,
            headers: getSecurityHeaders(),
          }
        );
      }

      // 5. Parse and validate request body
      let body: Record<string, unknown>;
      try {
        if (contentType.includes("multipart/form-data")) {
          // For file uploads, we'll handle validation in the specific endpoint
          // Just create a minimal body object for the security middleware
          body = { isFileUpload: true };
        } else {
          body = await request.json();
        }
      } catch (error) {
        logSecurityEvent(
          "INVALID_REQUEST_DATA",
          {
            endpoint,
            error: error instanceof Error ? error.message : "Unknown error",
          },
          request
        );

        return NextResponse.json(
          {
            error: "Format de données invalide",
            message: "Les données reçues sont corrompues. Veuillez réessayer.",
            type: "invalid_data_format",
          },
          {
            status: 400,
            headers: getSecurityHeaders(),
          }
        );
      }

      // 6. Handle file uploads differently from regular JSON requests
      let sanitizedRequest: NextRequest;

      if (contentType && contentType.includes("multipart/form-data")) {
        // For file uploads, pass the request through without body modification
        // The upload-file route will handle its own validation
        sanitizedRequest = request;
      } else {
        // Regular JSON request handling
        const sanitizedBody = await sanitizeRequestBody(body, endpoint);
        if (!sanitizedBody.isValid) {
          logSecurityEvent(
            "INVALID_INPUT",
            {
              endpoint,
              errors: sanitizedBody.errors,
            },
            request
          );

          return NextResponse.json(
            {
              error: sanitizedBody.errors.join(", "),
              message:
                "Données invalides détectées. Veuillez vérifier et réessayer.",
              type: "validation_error",
              details: sanitizedBody.errors,
            },
            {
              status: 400,
              headers: getSecurityHeaders(),
            }
          );
        }

        // 7. Create new request with sanitized body
        sanitizedRequest = new NextRequest(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(sanitizedBody.data),
        });
      }

      // 8. Call the original handler
      const response = await handler(sanitizedRequest);

      // 9. Add security headers to response
      const responseHeaders = new Headers(response.headers);
      Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      // 10. Add rate limit headers
      responseHeaders.set("X-RateLimit-Limit", "5");
      responseHeaders.set(
        "X-RateLimit-Remaining",
        rateLimitResult.remaining.toString()
      );
      responseHeaders.set(
        "X-RateLimit-Reset",
        new Date(rateLimitResult.resetTime).toISOString()
      );

      // 11. Log successful request
      const duration = Date.now() - startTime;
      logSecurityEvent(
        "API_REQUEST_SUCCESS",
        {
          endpoint,
          duration,
          status: response.status,
        },
        request
      );

      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      // 12. Log and handle errors
      logSecurityEvent(
        "API_REQUEST_ERROR",
        {
          endpoint,
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
        request
      );

      return NextResponse.json(
        {
          error: "Erreur interne du serveur",
          message:
            "Un problème technique s'est produit. Veuillez réessayer dans quelques instants.",
          type: "internal_error",
        },
        {
          status: 500,
          headers: getSecurityHeaders(),
        }
      );
    }
  };
}

// Sanitize request body based on endpoint
async function sanitizeRequestBody(
  body: Record<string, unknown>,
  endpoint: string
): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitizedData: Record<string, unknown> = {};

  try {
    // Common validations for all endpoints
    if (typeof body !== "object" || body === null) {
      errors.push("Données invalides");
      return { isValid: false, errors };
    }

    // Validate and sanitize based on endpoint
    switch (endpoint) {
      case "/api/send-career":
        return await sanitizeCareerForm(body);

      case "/api/send-contact":
        return await sanitizeContactForm(body);

      case "/api/send-devis":
        return await sanitizeDevisForm(body);

      case "/api/upload-file":
        // For file uploads, we skip body validation here since it's handled in the endpoint
        return { isValid: true, data: body, errors: [] };

      default:
        // Generic sanitization for unknown endpoints
        return await sanitizeGenericForm(body);
    }
  } catch (error) {
    errors.push("Erreur lors de la validation des données");
    return { isValid: false, errors };
  }
}

// Sanitize career form data
async function sanitizeCareerForm(body: Record<string, unknown>): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  // Required fields validation
  const requiredFields = [
    "prenom",
    "nom",
    "telephone",
    "email",
    "niveauEtudes",
    "anneesExperience",
    "fonctionProfil",
    "insuranceExperience",
    "acceptTerms",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      errors.push(`Le champ ${field} est requis`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize text fields with appropriate validation
  const nameFields = ["prenom", "nom"]; // Fields that need strict sanitization
  const textFields = [
    "niveauEtudes",
    "anneesExperience",
    "fonctionProfil",
    "insuranceExperience",
  ];

  // Handle name fields with strict sanitization
  for (const field of nameFields) {
    if (body[field] && typeof body[field] === "string") {
      const originalValue = body[field] as string;

      // Check for suspicious input BEFORE sanitization
      if (detectSuspiciousInput(originalValue)) {
        // Log suspicious input attempt
        logSecurityEvent(
          "SUSPICIOUS_INPUT_DETECTED",
          {
            endpoint: "/api/send-career",
            field: field,
            originalValue: originalValue.substring(0, 100), // Log first 100 chars for analysis
            suspiciousPattern: "Multiple patterns detected",
          },
          {} as NextRequest
        );

        errors.push(
          `Contenu suspect détecté dans le champ ${field}. Veuillez utiliser uniquement du texte normal.`
        );
        continue;
      }

      // Use strict sanitization for names
      const sanitizedValue = sanitizeStrictInput(originalValue);
      if (sanitizedValue.length === 0 && originalValue.length > 0) {
        errors.push(
          `Le champ ${field} contient des caractères non autorisés. Veuillez utiliser uniquement des lettres, espaces et tirets.`
        );
      } else {
        sanitized[field] = sanitizedValue;
      }
    }
  }

  // Handle other text fields with regular sanitization
  for (const field of textFields) {
    if (body[field] && typeof body[field] === "string") {
      const originalValue = body[field] as string;

      // Check for suspicious input BEFORE sanitization
      if (detectSuspiciousInput(originalValue)) {
        // Log suspicious input attempt
        logSecurityEvent(
          "SUSPICIOUS_INPUT_DETECTED",
          {
            endpoint: "/api/send-career",
            field: field,
            originalValue: originalValue.substring(0, 100), // Log first 100 chars for analysis
            suspiciousPattern: "Multiple patterns detected",
          },
          {} as NextRequest
        );

        errors.push(
          `Contenu suspect détecté dans le champ ${field}. Veuillez utiliser uniquement du texte normal.`
        );
        continue;
      }

      // Only sanitize if not suspicious
      const sanitizedValue = sanitizeInput(originalValue);
      sanitized[field] = sanitizedValue;
    }
  }

  // Validate email
  if (body.email && typeof body.email === "string") {
    const originalEmail = body.email;

    // Check for suspicious input first
    if (detectSuspiciousInput(originalEmail)) {
      errors.push("Contenu suspect détecté dans l'email");
    } else {
      const sanitizedEmail = sanitizeInput(originalEmail);
      if (!validateEmail(sanitizedEmail)) {
        errors.push("Format d'email invalide");
      } else {
        sanitized.email = sanitizedEmail.toLowerCase();
      }
    }
  }

  // Validate phone
  if (body.telephone && typeof body.telephone === "string") {
    const originalPhone = body.telephone;

    // Check for suspicious input first
    if (detectSuspiciousInput(originalPhone)) {
      errors.push(
        "Contenu suspect détecté dans le téléphone. Veuillez utiliser uniquement des chiffres."
      );
    } else {
      const sanitizedPhone = sanitizeInput(originalPhone);
      if (!validatePhone(sanitizedPhone)) {
        errors.push(
          "Format de téléphone invalide. Veuillez entrer 10 chiffres."
        );
      } else {
        sanitized.telephone = sanitizedPhone;
      }
    }
  }

  // Validate terms acceptance
  if (body.acceptTerms !== "yes") {
    errors.push("Vous devez accepter les conditions générales pour continuer.");
  } else {
    sanitized.acceptTerms = body.acceptTerms;
  }

  // Validate file upload
  if (body.file && typeof body.file === "object" && body.file !== null) {
    const file = body.file as Record<string, unknown>;
    if (
      file.name &&
      file.size &&
      file.type &&
      typeof file.name === "string" &&
      typeof file.size === "number" &&
      typeof file.type === "string"
    ) {
      const fileValidation = validateFileUpload({
        name: file.name,
        size: file.size,
        type: file.type,
      });
      if (!fileValidation.isValid) {
        errors.push(fileValidation.error || "Fichier invalide");
      } else {
        sanitized.file = body.file;
      }
    } else {
      errors.push("Format de fichier invalide");
    }
  }

  return {
    isValid: errors.length === 0,
    data: sanitized,
    errors,
  };
}

// Sanitize contact form data
async function sanitizeContactForm(body: Record<string, unknown>): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  // Required fields
  const requiredFields = ["prenom", "nom", "telephone", "email"];

  for (const field of requiredFields) {
    if (!body[field]) {
      errors.push(`Le champ ${field} est requis`);
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize text fields with strict validation for names
  const textFields = ["prenom", "nom"];

  for (const field of textFields) {
    if (body[field] && typeof body[field] === "string") {
      const originalValue = body[field] as string;

      // Check for suspicious input BEFORE sanitization
      if (detectSuspiciousInput(originalValue)) {
        // Log suspicious input attempt
        logSecurityEvent(
          "SUSPICIOUS_INPUT_DETECTED",
          {
            endpoint: "/api/send-career",
            field: field,
            originalValue: originalValue.substring(0, 100), // Log first 100 chars for analysis
            suspiciousPattern: "Multiple patterns detected",
          },
          {} as NextRequest
        );

        errors.push(
          `Contenu suspect détecté dans le champ ${field}. Veuillez utiliser uniquement du texte normal.`
        );
        continue;
      }

      // Use strict sanitization for names
      const sanitizedValue = sanitizeStrictInput(originalValue);
      if (sanitizedValue.length === 0 && originalValue.length > 0) {
        errors.push(
          `Le champ ${field} contient des caractères non autorisés. Veuillez utiliser uniquement des lettres, espaces et tirets.`
        );
      } else {
        sanitized[field] = sanitizedValue;
      }
    }
  }

  // Validate email
  if (body.email && typeof body.email === "string") {
    const sanitizedEmail = sanitizeInput(body.email);
    if (!validateEmail(sanitizedEmail)) {
      errors.push("Format d'email invalide");
    } else {
      sanitized.email = sanitizedEmail.toLowerCase();
    }
  }

  // Validate phone
  if (body.telephone && typeof body.telephone === "string") {
    const sanitizedPhone = sanitizeInput(body.telephone);
    if (!validatePhone(sanitizedPhone)) {
      errors.push("Format de téléphone invalide");
    } else {
      sanitized.telephone = sanitizedPhone;
    }
  }

  // Optional marketing consent
  if (body.marketingConsent !== undefined) {
    sanitized.marketingConsent =
      body.marketingConsent === true || body.marketingConsent === "yes";
  }

  return {
    isValid: errors.length === 0,
    data: sanitized,
    errors,
  };
}

// Sanitize devis form data
async function sanitizeDevisForm(body: Record<string, unknown>): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  // Validate top-level fields - make them optional for enterprise forms
  const possibleTopLevelFields = ["email", "firstName", "lastName"];
  let hasTopLevelFields = false;

  for (const field of possibleTopLevelFields) {
    if (body[field] && typeof body[field] === "string") {
      hasTopLevelFields = true;
      break;
    }
  }

  // If no top-level fields found, check if we have formData (enterprise forms)
  if (
    !hasTopLevelFields &&
    body.formData &&
    typeof body.formData === "object"
  ) {
    // This is likely an enterprise form with data in formData object
    // Check if formData contains the required contact information
    const formData = body.formData as Record<string, unknown>;

    // Look for email in formData
    if (!formData.email && !formData.prenom && !formData.nom) {
      errors.push(
        "Les informations de contact sont requises dans le formulaire"
      );
      return { isValid: false, errors };
    }
  } else if (!hasTopLevelFields) {
    // No valid structure found
    errors.push("Structure de données invalide");
    return { isValid: false, errors };
  }

  // Sanitize top-level fields (if present)
  if (body.email && typeof body.email === "string") {
    const originalEmail = body.email;
    if (detectSuspiciousInput(originalEmail)) {
      errors.push(
        "Contenu suspect détecté dans l'email. Veuillez utiliser une adresse email valide."
      );
    } else {
      const sanitizedEmail = sanitizeInput(originalEmail);
      if (!validateEmail(sanitizedEmail)) {
        errors.push(
          "Format d'email invalide. Veuillez entrer une adresse email valide."
        );
      } else {
        sanitized.email = sanitizedEmail.toLowerCase();
      }
    }
  }

  if (body.firstName && typeof body.firstName === "string") {
    const originalFirstName = body.firstName;
    if (detectSuspiciousInput(originalFirstName)) {
      errors.push("Contenu suspect détecté dans le prénom");
    } else {
      sanitized.firstName = sanitizeStrictInput(originalFirstName);
    }
  }

  if (body.lastName && typeof body.lastName === "string") {
    const originalLastName = body.lastName;
    if (detectSuspiciousInput(originalLastName)) {
      errors.push("Contenu suspect détecté dans le nom");
    } else {
      sanitized.lastName = sanitizeStrictInput(originalLastName);
    }
  }

  // CRITICAL: Check for suspicious input in the ENTIRE request body first
  const entireBodyString = JSON.stringify(body);
  if (detectSuspiciousInput(entireBodyString)) {
    // Log major security incident - someone trying to inject malicious code
    logSecurityEvent(
      "MAJOR_INJECTION_ATTEMPT",
      {
        endpoint: "/api/send-devis",
        requestBody: entireBodyString.substring(0, 1000), // Log first 1000 chars for analysis
        severity: "CRITICAL",
        attackType: "Multiple injection patterns detected in request body",
      },
      {} as NextRequest
    );

    errors.push(
      "Contenu suspect détecté dans la requête. Veuillez utiliser uniquement du texte normal."
    );
    return { isValid: false, errors };
  }

  // Validate and sanitize formData if present
  if (
    body.formData &&
    typeof body.formData === "object" &&
    body.formData !== null
  ) {
    const formData = body.formData as Record<string, unknown>;

    // Check for suspicious input in the entire formData object
    const formDataString = JSON.stringify(formData);
    if (detectSuspiciousInput(formDataString)) {
      errors.push(
        "Contenu suspect détecté dans les données du formulaire. Veuillez utiliser uniquement du texte normal."
      );
    } else {
      // Sanitize all string values in formData with strict validation for critical fields
      const sanitizedFormData: Record<string, unknown> = {};

      // Critical fields that need strict sanitization (like company names, user names, etc.)
      const criticalFields = [
        "nomStructure", // Company name
        "nomEntreprise", // Company name
        "raisonSociale", // Business name
        "nomSociete", // Company name
        "nom", // Last name
        "prenom", // First name
        "nomProprietaire", // Owner name
        "nomDirecteur", // Director name
        "nomGerant", // Manager name
        "nomRepresentant", // Representative name
        "firstName", // First name (English)
        "lastName", // Last name (English)
        "companyName", // Company name (English)
        "businessName", // Business name (English)
      ];

      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === "string") {
          // Use strict sanitization for critical fields
          if (
            criticalFields.some((field) =>
              key.toLowerCase().includes(field.toLowerCase())
            )
          ) {
            const strictlySanitized = sanitizeStrictInput(value);
            // Additional validation for company names and similar critical fields
            if (strictlySanitized.length === 0 && value.length > 0) {
              // Log critical field injection attempt
              logSecurityEvent(
                "CRITICAL_FIELD_INJECTION_ATTEMPT",
                {
                  endpoint: "/api/send-devis",
                  field: key,
                  originalValue: value,
                  sanitizedValue: strictlySanitized,
                  severity: "HIGH",
                },
                {} as NextRequest
              );

              errors.push(
                `Le champ ${key} contient des caractères non autorisés. Veuillez utiliser uniquement des lettres, chiffres, espaces et tirets.`
              );
            } else {
              sanitizedFormData[key] = strictlySanitized;
            }
          } else {
            sanitizedFormData[key] = sanitizeInput(value);
          }
        } else {
          sanitizedFormData[key] = value;
        }
      }
      sanitized.formData = sanitizedFormData;
    }
  }

  // CRITICAL: Validate ALL other fields in the request body
  const allowedFields = [
    "email",
    "firstName",
    "lastName",
    "formData",
    "formType",
    "submitToStrapi",
    // Allow fields that might be at top level for different form types
    "prenom",
    "nom",
    "telephone",
    "message",
    "subject",
  ];
  for (const [key, value] of Object.entries(body)) {
    if (!allowedFields.includes(key)) {
      errors.push(
        `Champ non autorisé détecté: ${key}. Veuillez utiliser uniquement les champs autorisés.`
      );
    } else if (typeof value === "string") {
      // Double-check each field individually
      if (detectSuspiciousInput(value)) {
        errors.push(
          `Contenu suspect détecté dans le champ ${key}. Veuillez utiliser uniquement du texte normal.`
        );
      }
    }
  }

  // Validate other optional fields
  if (body.formType && typeof body.formType === "string") {
    const originalFormType = body.formType;
    if (detectSuspiciousInput(originalFormType)) {
      errors.push("Contenu suspect détecté dans le type de formulaire");
    } else {
      // Validate formType against allowed values
      const allowedFormTypes = [
        "auto",
        "moto",
        "habitation",
        "sante",
        "assistance-voyage",
        "plaisance-jetski",
        "assurance-professionnelle",
        "assurance-entreprise",
        "carte-verte",
        "carte-verte-voyage",
        "individuelle-accidents",
      ];

      const cleanFormType = originalFormType
        .replace(/[^a-zA-Z\-]/g, "")
        .toLowerCase();
      if (allowedFormTypes.includes(cleanFormType)) {
        sanitized.formType = cleanFormType;
      } else {
        sanitized.formType = "auto"; // Default fallback
      }
    }
  }

  if (body.submitToStrapi !== undefined) {
    sanitized.submitToStrapi = body.submitToStrapi;
  }

  return {
    isValid: errors.length === 0,
    data: sanitized,
    errors,
  };
}

// Sanitize file upload data
async function sanitizeFileUpload(body: Record<string, unknown>): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  if (!body.file) {
    errors.push("Aucun fichier fourni");
    return { isValid: false, errors };
  }

  if (typeof body.file === "object" && body.file !== null) {
    const file = body.file as Record<string, unknown>;
    if (
      file.name &&
      file.size &&
      file.type &&
      typeof file.name === "string" &&
      typeof file.size === "number" &&
      typeof file.type === "string"
    ) {
      const fileValidation = validateFileUpload({
        name: file.name,
        size: file.size,
        type: file.type,
      });
      if (!fileValidation.isValid) {
        errors.push(fileValidation.error || "Fichier invalide");
        return { isValid: false, errors };
      }
    } else {
      errors.push("Format de fichier invalide");
      return { isValid: false, errors };
    }
  } else {
    errors.push("Format de fichier invalide");
    return { isValid: false, errors };
  }

  sanitized.file = body.file;

  return {
    isValid: errors.length === 0,
    data: sanitized,
    errors,
  };
}

// Generic form sanitization
async function sanitizeGenericForm(body: Record<string, unknown>): Promise<{
  isValid: boolean;
  data?: Record<string, unknown>;
  errors: string[];
}> {
  const errors: string[] = [];
  const sanitized: Record<string, unknown> = {};

  // Basic validation - check for suspicious patterns
  const bodyString = JSON.stringify(body);
  if (detectSuspiciousInput(bodyString)) {
    errors.push("Contenu suspect détecté");
    return { isValid: false, errors };
  }

  // Sanitize all string values
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }

  return {
    isValid: errors.length === 0,
    data: sanitized,
    errors,
  };
}

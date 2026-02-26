import { NextRequest } from "next/server";

// Enterprise-level rate limiting configuration for high-traffic websites
const RATE_LIMITS = {
  // Critical form endpoints - Very strict limits
  "/api/send-career": { maxRequests: 2, windowMs: 15 * 60 * 1000 }, // 2 requests per 15 minutes
  "/api/send-contact": { maxRequests: 3, windowMs: 15 * 60 * 1000 }, // 3 requests per 15 minutes
  "/api/send-devis": { maxRequests: 3, windowMs: 15 * 60 * 1000 }, // 3 requests per 15 minutes
  "/api/upload-file": { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes

  // Content endpoints - No rate limiting for public content
  // "/api/blogs": { maxRequests: 120, windowMs: 10 * 60 * 1000 }, // Disabled - public content
  // "/api/blog-categories": { maxRequests: 60, windowMs: 10 * 60 * 1000 }, // Disabled - public content

  // Global rate limiting per IP - Increased for better UX
  global: { maxRequests: 200, windowMs: 5 * 60 * 1000 }, // 200 requests per 5 minutes per IP

  // Burst protection - More reasonable for normal browsing
  burst: { maxRequests: 25, windowMs: 60 * 1000 }, // 25 requests per minute (burst protection)
};

// Enterprise-level in-memory store for rate limiting (in production, use Redis with clustering)
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number; attempts: number[] }
>();

// Advanced threat detection store
const threatDetectionStore = new Map<
  string,
  {
    suspiciousAttempts: number;
    lastAttempt: number;
    blockedUntil: number;
    patterns: string[];
    riskScore: number;
  }
>();

// Function to clear rate limits (useful for development and immediate fixes)
export function clearRateLimits(): void {
  rateLimitStore.clear();
  threatDetectionStore.clear();
}

// Clear rate limits for blog endpoints specifically
export function clearBlogRateLimits(): void {
  // Clear all rate limit entries that contain blog-related endpoints
  for (const [key] of rateLimitStore) {
    if (key.includes("/api/blogs") || key.includes("/api/blog-categories")) {
      rateLimitStore.delete(key);
    }
  }

  // Clear threat detection for internal IPs
  for (const [ip] of threatDetectionStore) {
    if (
      ip === "10.0.1.1" ||
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip === "localhost"
    ) {
      threatDetectionStore.delete(ip);
    }
  }
}

// IP reputation store (in production, integrate with threat intelligence APIs)
// Note: Currently using basic pattern matching, but ready for integration with threat intelligence APIs
// const ipReputationStore = new Map<string, {
//   reputation: 'clean' | 'suspicious' | 'malicious' | 'bot';
//   lastCheck: number;
//   country?: string;
//   isp?: string;
// }>();

// File upload security configuration
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
  ],
  ALLOWED_EXTENSIONS: [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"],
  DANGEROUS_PATTERNS: [
    /\.exe$/i,
    /\.bat$/i,
    /\.cmd$/i,
    /\.com$/i,
    /\.pif$/i,
    /\.scr$/i,
    /\.vbs$/i,
    /\.js$/i,
    /\.jar$/i,
    /\.app$/i,
    /\.deb$/i,
    /\.pkg$/i,
    /\.rpm$/i,
    /\.dmg$/i,
    /\.iso$/i,
  ],
};

// Enhanced input sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  return (
    input
      .trim()
      // XSS Protection
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .replace(/javascript:/gi, "") // Remove javascript: protocol
      .replace(/on\w+=/gi, "") // Remove event handlers
      .replace(/data:/gi, "") // Remove data URLs
      .replace(/vbscript:/gi, "") // Remove vbscript
      .replace(/eval\s*\(/gi, "") // Remove eval calls
      .replace(/expression\s*\(/gi, "") // Remove CSS expressions

      // SQL Injection Protection (comprehensive patterns)
      .replace(/['"`;\\]/g, "") // Remove SQL injection characters
      .replace(/--/g, "") // Remove SQL comments
      .replace(/\/\*/g, "") // Remove SQL block comment start
      .replace(/\*\//g, "") // Remove SQL block comment end
      .replace(
        /\b(select|from|union|insert|update|delete|drop|create|alter|exec|execute|script|xp_cmdshell|sp_executesql|load_file|into\s+outfile)\b/gi,
        ""
      ) // Remove SQL keywords
      .replace(/\b(or|and)\s*(1\s*=\s*1|true|false)\b/gi, "") // Remove SQL boolean injections
      .replace(/\|\||&&/g, "") // Remove logical operators that could be used in injections

      // NoSQL Injection Protection
      .replace(/\$\w+/g, "") // Remove MongoDB operators
      .replace(/\{|\}/g, "") // Remove JSON-like structures

      // Directory Traversal Protection
      .replace(/\.\./g, "") // Remove directory traversal
      .replace(/[\\\/]/g, "") // Remove path separators
      .replace(/%2e%2e/gi, "") // Remove URL-encoded traversal

      // Command Injection Protection
      .replace(/[|&;$`]/g, "") // Remove command injection characters
      .replace(/\$\(/g, "") // Remove command substitution
      .replace(/\b(wget|curl|nc|netcat|powershell|bash|sh|cmd)\b/gi, "") // Remove command keywords

      // Template Injection Protection
      .replace(/\{\{.*?\}\}/g, "") // Remove template expressions
      .replace(/\$\{.*?\}/g, "") // Remove template expressions
      .replace(/<\%.*?\%>/g, "") // Remove template expressions

      // Additional security measures
      .replace(/\s+/g, " ") // Normalize multiple spaces to single space
      .substring(0, 1000)
  ); // Limit length
}

// Strict sanitization for critical fields like company names, user names, etc.
export function sanitizeStrictInput(input: string): string {
  if (typeof input !== "string") return "";

  // First decode any encoded characters to catch obfuscated attacks
  let decodedInput = input;

  // Decode multiple rounds to catch nested encoding
  for (let i = 0; i < 3; i++) {
    try {
      // HTML entity decoding
      decodedInput = decodedInput
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        )
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      // URL decoding
      decodedInput = decodeURIComponent(decodedInput.replace(/\+/g, " "));

      // Custom encoding patterns (like 3C for <, 3E for >)
      decodedInput = decodedInput
        .replace(/3C/gi, "<")
        .replace(/3E/gi, ">")
        .replace(/2F/gi, "/")
        .replace(/22/gi, '"')
        .replace(/27/gi, "'")
        .replace(/28/gi, "(")
        .replace(/29/gi, ")")
        .replace(/3A/gi, ":")
        .replace(/3B/gi, ";");
    } catch {
      // If decoding fails, use the input as-is
      break;
    }
  }

  // Check if decoded input contains suspicious patterns
  if (detectSuspiciousInput(decodedInput)) {
    return ""; // Return empty string for any suspicious content
  }

  return (
    input
      .trim()
      // Remove any hex-like patterns that could be encoding attempts (but not words)
      .replace(/\b[0-9A-Fa-f]{4,}\b/g, "")
      // Remove encoded characters
      .replace(/&#\d+;/g, "")
      .replace(/&#x[0-9a-fA-F]+;/g, "")
      .replace(/&[a-zA-Z]+;/g, "")
      .replace(/%[0-9a-fA-F]{2}/g, "")
      // Only allow letters, numbers, spaces, hyphens, underscores, dots, and common punctuation
      .replace(/[^\w\s\-_.(),]/g, "")
      // Remove any remaining suspicious patterns
      .replace(
        /\b(select|from|union|insert|update|delete|drop|create|alter|exec|execute|script)\b/gi,
        ""
      )
      .replace(/['"`;\\]/g, "")
      .replace(/--/g, "")
      .replace(/\/\*/g, "")
      .replace(/\*\//g, "")
      .replace(/\s+/g, " ")
      .substring(0, 100)
  ); // Shorter limit for names and critical fields
}

// Validate file upload
export function validateFileUpload(file: {
  name: string;
  size: number;
  type: string;
}): { isValid: boolean; error?: string } {
  // Check file size
  if (file.size > FILE_UPLOAD_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `Fichier trop volumineux. Taille maximum: ${FILE_UPLOAD_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file type
  if (!FILE_UPLOAD_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error:
        "Type de fichier non autorisé. Formats acceptés: PDF, DOC, DOCX, PNG, JPG, JPEG",
    };
  }

  // Check file extension
  const extension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf("."));
  if (!FILE_UPLOAD_CONFIG.ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error:
        "Extension de fichier non autorisée. Formats acceptés: PDF, DOC, DOCX, PNG, JPG, JPEG",
    };
  }

  // Check for dangerous patterns
  for (const pattern of FILE_UPLOAD_CONFIG.DANGEROUS_PATTERNS) {
    if (pattern.test(file.name)) {
      return {
        isValid: false,
        error: "Nom de fichier non autorisé pour des raisons de sécurité",
      };
    }
  }

  // Check for suspicious content in filename
  const suspiciousPatterns = [
    /\.\./, // Path traversal
    /\//, // Directory separator
    /\\/, // Windows directory separator
    /%2e/i, // URL encoded dot
    /%2f/i, // URL encoded slash
    /%5c/i, // URL encoded backslash
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(file.name)) {
      return {
        isValid: false,
        error: "Nom de fichier contenant des caractères non autorisés",
      };
    }
  }

  return { isValid: true };
}

// Generate CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// Validate CSRF token
export function validateCSRFToken(
  token: string,
  sessionToken: string
): boolean {
  if (!token || !sessionToken || token.length !== sessionToken.length)
    return false;

  // Simple constant-time comparison
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i);
  }
  return result === 0;
}

// Enterprise-level rate limiting with advanced threat detection
export function checkRateLimit(
  request: NextRequest,
  endpoint: string
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  riskScore: number;
  threatLevel: "low" | "medium" | "high" | "critical";
} {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "";
  const now = Date.now();

  // Whitelist internal IPs and build servers from rate limiting
  const whitelistedIPs = [
    "10.0.1.1", // Internal build server
    "127.0.0.1", // Localhost
    "::1", // IPv6 localhost
    "localhost", // Localhost hostname
  ];

  if (whitelistedIPs.includes(clientIP)) {
    return {
      allowed: true,
      remaining: 999999,
      resetTime: now + 24 * 60 * 60 * 1000, // 24 hours
      riskScore: 0,
      threatLevel: "low",
    };
  }

  // Check if IP is blocked due to previous threats
  const threatInfo = threatDetectionStore.get(clientIP);
  if (threatInfo && now < threatInfo.blockedUntil) {
    logSecurityEvent(
      "BLOCKED_IP_ATTEMPT",
      {
        ip: clientIP,
        endpoint,
        blockExpiry: new Date(threatInfo.blockedUntil).toISOString(),
        riskScore: threatInfo.riskScore,
      },
      request
    );

    return {
      allowed: false,
      remaining: 0,
      resetTime: threatInfo.blockedUntil,
      riskScore: threatInfo.riskScore,
      threatLevel: "critical",
    };
  }

  // Skip rate limiting for blog endpoints (public content)
  if (
    endpoint === "/api/blogs" ||
    endpoint === "/api/blog-categories" ||
    endpoint.startsWith("/api/blogs/")
  ) {
    return {
      allowed: true,
      remaining: 999999,
      resetTime: now + 24 * 60 * 60 * 1000, // 24 hours
      riskScore: 0,
      threatLevel: "low",
    };
  }

  // Multi-layer rate limiting checks
  const checks = [
    {
      key: `${clientIP}:${endpoint}`,
      config: RATE_LIMITS[endpoint as keyof typeof RATE_LIMITS],
    },
    { key: `${clientIP}:global`, config: RATE_LIMITS.global },
    { key: `${clientIP}:burst`, config: RATE_LIMITS.burst },
  ];

  let highestRiskScore = 0;
  let threatLevel: "low" | "medium" | "high" | "critical" = "low";

  for (const check of checks) {
    if (!check.config) continue;

    const current = rateLimitStore.get(check.key);

    if (!current || now > current.resetTime) {
      // Reset or create new entry
      const newEntry = {
        count: 1,
        resetTime: now + check.config.windowMs,
        attempts: [now],
      };
      rateLimitStore.set(check.key, newEntry);
    } else {
      // Check if limit exceeded
      if (current.count >= check.config.maxRequests) {
        // Calculate risk score based on violation frequency
        const riskScore = Math.min(
          100,
          (current.count / check.config.maxRequests) * 50
        );
        highestRiskScore = Math.max(highestRiskScore, riskScore);

        // Update threat detection
        updateThreatDetection(clientIP, userAgent, endpoint, riskScore);

        // Determine threat level
        if (riskScore > 80) threatLevel = "critical";
        else if (riskScore > 60) threatLevel = "high";
        else if (riskScore > 40) threatLevel = "medium";

        logSecurityEvent(
          "RATE_LIMIT_VIOLATION",
          {
            ip: clientIP,
            endpoint,
            userAgent,
            riskScore,
            threatLevel,
            attempts: current.count,
            maxAllowed: check.config.maxRequests,
          },
          request
        );

        return {
          allowed: false,
          remaining: 0,
          resetTime: current.resetTime,
          riskScore,
          threatLevel,
        };
      }

      // Increment counter
      current.count++;
      current.attempts.push(now);
      rateLimitStore.set(check.key, current);
    }
  }

  const config =
    RATE_LIMITS[endpoint as keyof typeof RATE_LIMITS] || RATE_LIMITS.global;
  const current = rateLimitStore.get(`${clientIP}:${endpoint}`);

  return {
    allowed: true,
    remaining: config.maxRequests - (current?.count || 1),
    resetTime: current?.resetTime || now + config.windowMs,
    riskScore: highestRiskScore,
    threatLevel,
  };
}

// Advanced threat detection and IP blocking
function updateThreatDetection(
  ip: string,
  userAgent: string,
  endpoint: string,
  riskScore: number
): void {
  const now = Date.now();
  const existing = threatDetectionStore.get(ip) || {
    suspiciousAttempts: 0,
    lastAttempt: 0,
    blockedUntil: 0,
    patterns: [],
    riskScore: 0,
  };

  existing.suspiciousAttempts++;
  existing.lastAttempt = now;
  existing.riskScore = Math.max(existing.riskScore, riskScore);
  existing.patterns.push(`${endpoint}:${userAgent.substring(0, 50)}`);

  // Progressive blocking based on threat level
  if (existing.suspiciousAttempts >= 10 || existing.riskScore > 90) {
    // Block for 24 hours for critical threats
    existing.blockedUntil = now + 24 * 60 * 60 * 1000;
  } else if (existing.suspiciousAttempts >= 5 || existing.riskScore > 70) {
    // Block for 1 hour for high threats
    existing.blockedUntil = now + 60 * 60 * 1000;
  } else if (existing.suspiciousAttempts >= 3 || existing.riskScore > 50) {
    // Block for 15 minutes for medium threats
    existing.blockedUntil = now + 15 * 60 * 1000;
  }

  threatDetectionStore.set(ip, existing);
}

// Get client IP address
export function getClientIP(request: NextRequest): string {
  // Check various headers for real client IP
  const headers = [
    "cf-connecting-ip", // Cloudflare
    "x-real-ip", // Nginx
    "x-forwarded-for", // Standard proxy header
    "x-client-ip", // Apache
    "x-forwarded", // General
    "x-cluster-client-ip", // Cluster
    "forwarded-for", // Alternative
    "forwarded", // RFC 7239
    "true-client-ip", // Akamai
    "x-azure-clientip", // Azure
    "x-azure-socketip", // Azure
    "x-original-forwarded-for", // Some load balancers
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // Handle comma-separated IPs (take the first one)
      const ip = value.split(",")[0].trim();
      if (ip && ip !== "unknown" && ip !== "::1" && ip !== "127.0.0.1") {
        return ip;
      }
    }
  }

  // Fallback for development - use a more descriptive identifier
  if (process.env.NODE_ENV === "development") {
    return "dev-localhost";
  }

  // If we can't determine the real IP, return unknown
  return "unknown";
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone number
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

// Sanitize filename for safe storage
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace special chars with underscore
    .replace(/_{2,}/g, "_") // Replace multiple underscores with single
    .substring(0, 100) // Limit length
    .toLowerCase();
}

// Check for suspicious patterns in input
export function detectSuspiciousInput(input: string): boolean {
  // First, decode the input to catch encoded attacks
  let decodedInput = input;

  // Decode multiple rounds to catch nested encoding
  for (let i = 0; i < 3; i++) {
    try {
      // HTML entity decoding
      decodedInput = decodedInput
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        )
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      // URL decoding
      decodedInput = decodeURIComponent(decodedInput.replace(/\+/g, " "));

      // Custom encoding patterns (like 3C for <, 3E for >)
      decodedInput = decodedInput
        .replace(/3C/gi, "<")
        .replace(/3E/gi, ">")
        .replace(/2F/gi, "/")
        .replace(/22/gi, '"')
        .replace(/27/gi, "'")
        .replace(/28/gi, "(")
        .replace(/29/gi, ")")
        .replace(/3A/gi, ":")
        .replace(/3B/gi, ";");
    } catch {
      // If decoding fails, use the input as-is
      break;
    }
  }

  const suspiciousPatterns = [
    // XSS patterns (check both original and decoded)
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /vbscript:/i,
    /data:/i,
    /blob:/i,

    // Encoded XSS patterns
    /3Cscript/i, // <script in hex without %
    /3C.*script.*3E/i, // <script> pattern in hex
    /alert\s*\(/i, // alert function calls
    /confirm\s*\(/i, // confirm function calls
    /prompt\s*\(/i, // prompt function calls

    // Path traversal patterns
    /\.\.\//,
    /\.\.\\/,
    /%2e%2e/i,
    /\.\.%2f/i,
    /\.\.%5c/i,

    // SQL injection patterns (enhanced with more variations)
    /union\s+select/i,
    /union\s*\(/i,
    /select\s+.*\s+from/i,
    /select\s*\*/i,
    /select.*from.*users/i,
    /select.*from.*information_schema/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /insert\s+into/i,
    /update\s+set/i,
    /alter\s+table/i,
    /truncate\s+table/i,
    /create\s+table/i,
    /or\s+1\s*=\s*1/i,
    /and\s+1\s*=\s*1/i,
    /or\s+true/i,
    /and\s+true/i,
    /or\s+false/i,
    /and\s+false/i,
    /\'\s*or\s*/i,
    /\"\s*or\s*/i,
    /\'\s*and\s*/i,
    /\"\s*and\s*/i,
    /\'\s*union\s*/i,
    /\"\s*union\s*/i,
    /;.*--/i,
    /;.*\/\*/i,
    /xp_cmdshell/i,
    /sp_executesql/i,
    /benchmark\s*\(/i,
    /pg_sleep\s*\(/i,
    /sleep\s*\(/i,
    /waitfor\s+delay/i,
    /load_file\s*\(/i,
    /into\s+outfile/i,

    // NoSQL injection patterns
    /\$where/i,
    /\$ne/i,
    /\$in/i,
    /\$nin/i,
    /\$or/i,
    /\$and/i,
    /\$regex/i,

    // Command injection patterns
    /exec\s*\(/i,
    /system\s*\(/i,
    /shell_exec/i,
    /passthru/i,
    /file_get_contents/i,
    /fopen/i,
    /fwrite/i,
    /proc_open/i,
    /popen/i,
    /exec\s+/i,
    /system\s+/i,
    /cmd\s*\/c/i,
    /powershell/i,
    /bash\s+-c/i,
    /sh\s+-c/i,
    /\|\s*nc\s+/i,
    /\|\s*netcat/i,
    /wget\s+/i,
    /curl\s+/i,

    // Template injection patterns
    /\{\{.*\}\}/,
    /\$\{.*\}/,
    /<\%.*\%>/,

    // LDAP injection patterns
    /\*\)\(/,
    /\)\(\|/,
    /\(\&\(/,

    // Additional encoding detection patterns
    /[0-9a-fA-F]{2,}script[0-9a-fA-F]{2,}/i, // hex-encoded script tags
    /&#\d+;script/i, // HTML entity encoded script
    /%3C.*script.*%3E/i, // URL encoded script tags
  ];

  // Test both original input and decoded input
  return suspiciousPatterns.some(
    (pattern) => pattern.test(input) || pattern.test(decodedInput)
  );
}

// Enterprise-level security headers for maximum protection
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Core security headers
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

    // Enhanced Content Security Policy for enterprise
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),

    // Privacy and tracking protection
    "Permissions-Policy": [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "browsing-topics=()",
      "payment=()",
      "usb=()",
      "serial=()",
      "bluetooth=()",
    ].join(", "),

    // Additional enterprise security headers
    "X-Permitted-Cross-Domain-Policies": "none",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",

    // Custom headers for monitoring
    "X-Security-Level": "enterprise",
    "X-Rate-Limited": "true",
    "X-Bot-Protection": "enabled",

    // Cache control for sensitive endpoints
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
  };
}

// Log security events
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>,
  request?: NextRequest
) {
  const timestamp = new Date().toISOString();
  const ip = request ? getClientIP(request) : "unknown";
  const userAgent = request?.headers.get("user-agent") || "unknown";

  console.warn(`[SECURITY] ${timestamp} - ${event}`, {
    ip,
    userAgent,
    details,
  });

  // In production, send to security monitoring service
  // await sendToSecurityMonitoring({ event, details, ip, userAgent, timestamp });
}

// Clean up rate limit store periodically
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000
); // Clean up every 5 minutes

// Advanced bot detection based on user agent patterns and behavior
export function detectBot(request: NextRequest): {
  isBot: boolean;
  botType: "search" | "social" | "malicious" | "scraper" | "unknown";
  confidence: number;
} {
  const userAgent = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";
  const acceptLanguage = request.headers.get("accept-language") || "";
  const acceptEncoding = request.headers.get("accept-encoding") || "";

  let confidence = 0;
  let botType: "search" | "social" | "malicious" | "scraper" | "unknown" =
    "unknown";
  let isBot = false;

  // Legitimate search engine bots (allow these)
  const searchBots = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i, // Yahoo
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
  ];

  // Malicious/scraping bots (block these)
  const maliciousBots = [
    /scrapy/i,
    /selenium/i,
    /phantomjs/i,
    /headlesschrome/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /bot.*scan/i,
    /python/i,
    /curl/i,
    /wget/i,
    /httpie/i,
    /postman/i,
    /insomnia/i,
    /axios/i,
    /node-fetch/i,
    /okhttp/i,
  ];

  // Check for search engine bots
  if (searchBots.some((pattern) => pattern.test(userAgent))) {
    isBot = true;
    botType = "search";
    confidence = 90;
  }

  // Check for malicious bots
  else if (maliciousBots.some((pattern) => pattern.test(userAgent))) {
    isBot = true;
    botType = "malicious";
    confidence = 95;
  }

  // Behavioral analysis for sophisticated bots
  else {
    // Missing common browser headers
    if (!acceptLanguage) confidence += 20;
    if (!acceptEncoding) confidence += 20;
    if (!acceptHeader.includes("text/html")) confidence += 15;

    // Suspicious user agent patterns
    if (userAgent.length < 10) confidence += 30;
    if (!userAgent.includes("Mozilla")) confidence += 25;
    if (userAgent.includes("bot") || userAgent.includes("Bot"))
      confidence += 40;

    // Check for headless browser signatures
    if (
      userAgent.includes("HeadlessChrome") ||
      userAgent.includes("headless") ||
      userAgent.includes("PhantomJS")
    ) {
      confidence = 100;
      botType = "scraper";
    }

    // Suspicious request patterns
    const referer = request.headers.get("referer");
    if (!referer && !userAgent.includes("Mobile")) confidence += 10;

    if (confidence > 60) {
      isBot = true;
      botType = confidence > 80 ? "malicious" : "scraper";
    }
  }

  return { isBot, botType, confidence };
}

// IP geolocation and reputation check (basic implementation)
export function checkIPReputation(ip: string): {
  reputation: "clean" | "suspicious" | "malicious";
  country?: string;
  shouldBlock: boolean;
  reason?: string;
} {
  // Basic IP validation
  if (!ip || ip === "127.0.0.1" || ip === "localhost") {
    return { reputation: "clean", shouldBlock: false };
  }

  // Check against known malicious IP patterns
  const suspiciousPatterns = [
    /^10\./, // Private networks being used suspiciously
    /^192\.168\./, // Local networks
    /^172\.(1[6-9]|2\d|3[01])\./, // Private networks
  ];

  // Check for suspicious IP ranges (simplified)
  if (suspiciousPatterns.some((pattern) => pattern.test(ip))) {
    return {
      reputation: "suspicious",
      shouldBlock: false,
      reason: "Private IP range",
    };
  }

  // In production, integrate with threat intelligence APIs:
  // - AbuseIPDB: https://www.abuseipdb.com/api
  // - VirusTotal: https://virustotal.com/api
  // - MaxMind GeoIP: https://maxmind.com
  // - Cloudflare Threat Intelligence

  return { reputation: "clean", shouldBlock: false };
}

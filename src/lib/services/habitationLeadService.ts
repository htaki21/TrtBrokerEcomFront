export interface HabitationLeadData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeLogement: "appartement" | "maison" | "villa";
  valeurHabitation: number;
  valeurBiens: number | string;
  valeurObjets?: number | string;
  garantiesSupplementaires?: string[];
  conditionsAcceptees: boolean;
  optinMarketing?: boolean;
  source?: string;
  creneauHoraire?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface HabitationLeadResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
  field?: string;
}

export interface SubmitResult {
  success: boolean;
  message?: string;
  error?: string;
  type?: string;
  data?: Record<string, unknown>;
  strapiResult?: {
    success: boolean;
    message: string;
  };
}

// Helper function to clean and validate form data
export function cleanFormData(
  data: Record<string, unknown>
): HabitationLeadData {
  return {
    prenom: String(data.prenom || "").trim(),
    nom: String(data.nom || "").trim(),
    email: String(data.email || "")
      .trim()
      .toLowerCase(),
    telephone: String(data.telephone || "").trim(),
    typeLogement:
      (data.typeLogement as "appartement" | "maison" | "villa") ||
      "appartement",
    valeurHabitation: parseFloat(String(data.valeurHabitation)) || 0,
    valeurBiens: parseFloat(String(data.valeurBiens)) || 0,
    valeurObjets: data.valeurObjets
      ? parseFloat(String(data.valeurObjets))
      : undefined,
    garantiesSupplementaires: (data.garantiesSupplementaires as string[]) || [],
    conditionsAcceptees: Boolean(data.conditionsAcceptees),
    optinMarketing: Boolean(data.optinMarketing),
    source: String(data.source || "website"),
    creneauHoraire: data.creneauHoraire
      ? String(data.creneauHoraire)
      : undefined,
    notes: data.notes ? String(data.notes) : undefined,
  };
}

// Helper function to validate habitation lead data
export function validateHabitationLeadData(data: HabitationLeadData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required field validations
  if (!data.prenom || data.prenom.length < 2 || data.prenom.length > 100) {
    errors.push("Le prénom doit contenir entre 2 et 100 caractères");
  }

  if (!data.nom || data.nom.length < 2 || data.nom.length > 100) {
    errors.push("Le nom doit contenir entre 2 et 100 caractères");
  }

  // Email is optional - only validate format if provided
  if (
    data.email &&
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.push("L'adresse email est invalide");
  }

  if (
    !data.telephone ||
    data.telephone.length < 10 ||
    data.telephone.length > 20
  ) {
    errors.push(
      "Le numéro de téléphone doit contenir entre 10 et 20 caractères"
    );
  }

  if (
    !data.typeLogement ||
    !["appartement", "maison", "villa"].includes(data.typeLogement)
  ) {
    errors.push("Le type de logement est invalide");
  }

  if (!data.valeurHabitation || data.valeurHabitation < 0) {
    errors.push("La valeur de l'habitation doit être positive");
  }

  if (
    typeof data.valeurBiens === "string" &&
    data.valeurBiens !== "" &&
    parseFloat(data.valeurBiens) < 0
  ) {
    errors.push("La valeur des biens doit être positive");
  } else if (typeof data.valeurBiens === "number" && data.valeurBiens < 0) {
    errors.push("La valeur des biens doit être positive");
  }

  if (data.valeurObjets !== undefined) {
    if (
      typeof data.valeurObjets === "string" &&
      data.valeurObjets !== "" &&
      parseFloat(data.valeurObjets) < 0
    ) {
      errors.push("La valeur des objets doit être positive");
    } else if (typeof data.valeurObjets === "number" && data.valeurObjets < 0) {
      errors.push("La valeur des objets doit être positive");
    }
  }

  if (!data.conditionsAcceptees) {
    errors.push("Les conditions générales doivent être acceptées");
  }

  // Optional field validations
  if (data.creneauHoraire && data.creneauHoraire.length > 100) {
    errors.push("Le créneau horaire ne peut pas dépasser 100 caractères");
  }

  if (data.notes && data.notes.length > 500) {
    errors.push("Les notes ne peuvent pas dépasser 500 caractères");
  }

  // Validate garantiesSupplementaires
  if (
    data.garantiesSupplementaires &&
    Array.isArray(data.garantiesSupplementaires)
  ) {
    const validGuarantees = [
      "piscine",
      "bain_maure_sauna",
      "chauffeur",
      "jardinier_gardien",
    ];
    const invalidGuarantees = data.garantiesSupplementaires.filter(
      (guarantee) => !validGuarantees.includes(guarantee)
    );
    if (invalidGuarantees.length > 0) {
      errors.push("Garanties supplémentaires invalides");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Helper function to convert form data to habitation lead format
export function convertFormDataToHabitationLead(
  formData: Record<string, unknown>
): HabitationLeadData {
  return {
    prenom: String(formData.prenom || ""),
    nom: String(formData.nom || ""),
    email: String(formData.email || ""),
    telephone: String(formData.telephone || ""),
    typeLogement:
      (formData.typeLogement as "appartement" | "maison" | "villa") ||
      "appartement",
    valeurHabitation: parseFloat(String(formData.valeurHabitation)) || 0,
    valeurBiens:
      formData.valeurBiens && String(formData.valeurBiens).trim() !== ""
        ? parseFloat(String(formData.valeurBiens))
        : "",
    valeurObjets:
      formData.valeurObjets && String(formData.valeurObjets).trim() !== ""
        ? parseFloat(String(formData.valeurObjets))
        : "",
    garantiesSupplementaires:
      (formData.garantiesSupplementaires as string[]) || [],
    conditionsAcceptees: Boolean(formData.conditionsAcceptees),
    optinMarketing: Boolean(formData.optinMarketing),
    source: String(formData.source || "website"),
    datePreference: String(formData.datePreference || ""),
    creneauHoraire: String(formData.creneauHoraire || ""),
    notes: String(formData.notes || ""),
  };
}

// Main function to submit habitation lead to Strapi
export async function submitHabitationLead(
  formData: HabitationLeadData
): Promise<SubmitResult> {
  try {
    // Clean the data
    const cleanData = cleanFormData(formData);

    // Use the internal API route instead of direct Strapi call
    const response = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cleanData.email,
        firstName: cleanData.prenom,
        lastName: cleanData.nom,
        formData: cleanData,
        formType: "habitation",
        submitToStrapi: true, // Flag to indicate we want Strapi submission
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message:
          result.message ||
          "Votre demande d'assurance habitation a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais.",
        data: result.data,
        strapiResult: result.strapiResult, // Include Strapi result
      };
    } else {
      // Handle rate limiting specifically
      if (result.type === "rate_limit") {
        const retryAfter = result.retryAfter || 60;
        const minutes = Math.ceil(retryAfter / 60);
        return {
          success: false,
          message: `Vous avez dépassé la limite de tentatives. Veuillez patienter ${minutes} minute(s) avant de réessayer.`,
          error: result.message || "Limite de tentatives atteinte",
          type: "rate_limit",
        };
      }
      // Handle security errors properly - return error result instead of throwing
      if (result.type === "validation_error" && result.message) {
        return {
          success: false,
          message: result.message,
          error: result.message,
        };
      } else if (result.error) {
        return {
          success: false,
          message: result.error,
          error: result.error,
        };
      }
      return {
        success: false,
        message:
          "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
        error: result.error || `Erreur HTTP ${response.status}`,
      };
    }
  } catch (error) {
    // ALWAYS return error result - NEVER throw
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error ? error.message : "Erreur technique inconnue",
    };
  }
}

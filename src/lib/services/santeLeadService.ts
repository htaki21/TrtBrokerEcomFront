export interface SanteLeadData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeAssurance: "sante_maroc" | "sante_maroc_plus_international";
  typeCouverture: string[]; // Array for multiple selections
  dateNaissance?: string;
  dateNaissanceConjoint?: string;
  dateNaissanceEnfant1?: string;
  dateNaissanceEnfant2?: string;
  dateNaissanceEnfant3?: string;
  datePreference?: string;
  creneauHoraire?: string;
  conditionsAcceptees: boolean;
  optinMarketing?: boolean;
  source?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface SanteLeadResponse {
  success: boolean;
  message?: string;
  error?: string;
  type?: string;
  data?: {
    id: number;
    documentId: string;
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    typeAssurance: string;
    typeCouverture: string[];
    dateNaissance?: string;
    dateNaissanceConjoint?: string;
    dateNaissanceEnfant1?: string;
    dateNaissanceEnfant2?: string;
    dateNaissanceEnfant3?: string;
    datePreference?: string;
    creneauHoraire?: string;
    conditionsAcceptees: boolean;
    optinMarketing?: boolean;
    source?: string;
    notes?: string;
    status: string;
    ipAddress: string;
    userAgent: string;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function cleanFormData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

export function validateSanteLeadData(data: SanteLeadData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields validation
  if (!data.prenom || data.prenom.trim().length < 2) {
    errors.push("Le prénom est requis et doit contenir au moins 2 caractères");
  }

  if (!data.nom || data.nom.trim().length < 2) {
    errors.push("Le nom est requis et doit contenir au moins 2 caractères");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("L'email est requis et doit être valide");
  }

  if (!data.telephone || data.telephone.trim().length < 10) {
    errors.push(
      "Le téléphone est requis et doit contenir au moins 10 caractères"
    );
  }

  if (
    !data.typeAssurance ||
    !["sante_maroc", "sante_maroc_plus_international"].includes(
      data.typeAssurance
    )
  ) {
    errors.push("Le type d'assurance est requis et doit être valide");
  }

  if (
    !data.typeCouverture ||
    !Array.isArray(data.typeCouverture) ||
    data.typeCouverture.length === 0
  ) {
    errors.push("Au moins un type de couverture doit être sélectionné");
  } else {
    const validCoverageTypes = ["moi", "mon_conjoint", "mes_enfants"];
    const invalidTypes = data.typeCouverture.filter(
      (type) => !validCoverageTypes.includes(type)
    );
    if (invalidTypes.length > 0) {
      errors.push("Type de couverture invalide");
    }
  }

  // Dynamic date validation based on coverage selection
  if (data.typeCouverture && Array.isArray(data.typeCouverture)) {
    if (data.typeCouverture.includes("moi") && !data.dateNaissance) {
      errors.push("La date de naissance est requise");
    }

    if (
      data.typeCouverture.includes("mon_conjoint") &&
      !data.dateNaissanceConjoint
    ) {
      errors.push("La date de naissance du conjoint est requise");
    }

    if (data.typeCouverture.includes("mes_enfants")) {
      if (!data.dateNaissanceEnfant1) {
        errors.push(
          "Au moins la date de naissance du premier enfant est requise"
        );
      }
    }
  }

  if (data.conditionsAcceptees !== true) {
    errors.push("Les conditions générales doivent être acceptées");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

export function convertFormDataToSanteLead(
  formData: Record<string, unknown>
): SanteLeadData {
  return {
    prenom: String(formData.prenom || ""),
    nom: String(formData.nom || ""),
    email: String(formData.email || ""),
    telephone: String(formData.telephone || ""),
    typeAssurance:
      (formData.typeAssurance as
        | "sante_maroc"
        | "sante_maroc_plus_international") || "sante_maroc",
    typeCouverture: (formData.typeCouverture as string[]) || [],
    dateNaissance: formData.dateNaissance
      ? String(formData.dateNaissance)
      : undefined,
    dateNaissanceConjoint: formData.dateNaissanceConjoint
      ? String(formData.dateNaissanceConjoint)
      : undefined,
    dateNaissanceEnfant1: formData.dateNaissanceEnfant1
      ? String(formData.dateNaissanceEnfant1)
      : undefined,
    dateNaissanceEnfant2: formData.dateNaissanceEnfant2
      ? String(formData.dateNaissanceEnfant2)
      : undefined,
    dateNaissanceEnfant3: formData.dateNaissanceEnfant3
      ? String(formData.dateNaissanceEnfant3)
      : undefined,
    datePreference: formData.datePreference
      ? String(formData.datePreference)
      : undefined,
    creneauHoraire: formData.creneauHoraire
      ? String(formData.creneauHoraire)
      : undefined,
    conditionsAcceptees: Boolean(formData.conditionsAcceptees),
    optinMarketing: Boolean(formData.optinMarketing),
    source: String(formData.source || "website"),
    notes: formData.notes ? String(formData.notes) : undefined,
  };
}

export async function submitSanteLead(
  formData: SanteLeadData
): Promise<SanteLeadResponse> {
  try {
    const response = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        firstName: formData.prenom,
        lastName: formData.nom,
        formData: formData,
        formType: "sante",
        submitToStrapi: true,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
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
        error: `Erreur HTTP ${response.status}`,
      };
    }
    return result;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
    };
  }
}

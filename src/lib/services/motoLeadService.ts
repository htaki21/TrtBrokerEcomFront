export interface MotoLeadData {
  typeAchat: "nouvel_achat" | "occasion";
  typeMoto:
    | "moins_49cc_60kmh"
    | "moins_49cc_plus_60kmh"
    | "entre_50cc_et_125cc"
    | "plus_125cc";
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  conditionsAcceptees: boolean;
  ageMoto?: "moins_5_ans" | "plus_de_5_ans"; // Required only for "occasion"
  datePreference?: string; // YYYY-MM-DD format
  creneauHoraire?: string;
  optinMarketing?: boolean;
  source?: string;
}

export interface MotoLeadResponse {
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

// Helper function to convert date from DD-MM-YYYY to YYYY-MM-DD
function convertDateFormat(dateString: string): string | null {
  if (!dateString || dateString.trim() === "") {
    return null;
  }

  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // If in DD-MM-YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
  }

  // If in DD/MM/YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
  }

  return null;
}

// Helper function to map moto type from form to API format
function mapMotoType(
  formType: string
):
  | "moins_49cc_60kmh"
  | "moins_49cc_plus_60kmh"
  | "entre_50cc_et_125cc"
  | "plus_125cc" {
  switch (formType) {
    case "Moins de 49cc et < 60 km/h":
      return "moins_49cc_60kmh";
    case "Moins de 49cc et > 60 km/h":
      return "moins_49cc_plus_60kmh";
    case "Entre 50cc et 125cc":
      return "entre_50cc_et_125cc";
    case "125cc ou plus":
      return "plus_125cc";
    default:
      return "entre_50cc_et_125cc";
  }
}

// Clean and validate form data according to API specification
function cleanFormData(formData: MotoLeadData): MotoLeadData {
  const cleanData: MotoLeadData = {
    typeAchat: formData.typeAchat,
    typeMoto: formData.typeMoto,
    prenom: formData.prenom?.trim() || "",
    nom: formData.nom?.trim() || "",
    telephone: formData.telephone?.trim() || "",
    email: formData.email?.trim() || "",
    conditionsAcceptees: formData.conditionsAcceptees,
    optinMarketing: formData.optinMarketing ?? true,
    source: formData.source || "website",
  };

  // Optional fields - only include if they have values
  if (formData.ageMoto) {
    cleanData.ageMoto = formData.ageMoto;
  }
  // REMOVED - Date/Time fields hidden
  // if (formData.datePreference) {
  //   cleanData.datePreference = formData.datePreference;
  // }
  // if (formData.creneauHoraire) {
  //   cleanData.creneauHoraire = formData.creneauHoraire;
  // }

  return cleanData;
}

// Main function to submit moto lead to API - NO VALIDATION
export async function submitMotoLead(
  formData: MotoLeadData
): Promise<SubmitResult> {
  // ULTIMATE ERROR PREVENTION - WRAP EVERYTHING
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
        formType: "moto",
        submitToStrapi: true, // Flag to indicate we want Strapi submission
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message:
          result.message ||
          "Votre demande d'assurance moto a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais.",
        data: result.data,
        strapiResult: result.strapiResult,
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

// Helper function to convert form data to API format
export function convertFormDataToMotoLead(formData: {
  Typedachat: "Nouvel Achat" | "Occasion";
  ageDeMoto: "Moins de 5 ans" | "Plus de 5 ans";
  Typedemoto: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  Date: string;
  Créneauhoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}): MotoLeadData {
  // Convert date format
  const convertedDate = formData.Date
    ? convertDateFormat(formData.Date)
    : undefined;

  const mappedTypeMoto = mapMotoType(formData.Typedemoto);

  const result: MotoLeadData = {
    typeAchat:
      formData.Typedachat === "Nouvel Achat" ? "nouvel_achat" : "occasion",
    typeMoto: mappedTypeMoto,
    prenom: formData.prenom,
    nom: formData.nom,
    telephone: formData.phone,
    email: formData.email,
    conditionsAcceptees: formData.termsAccepted,
    ageMoto:
      formData.Typedachat === "Occasion"
        ? formData.ageDeMoto === "Moins de 5 ans"
          ? "moins_5_ans"
          : "plus_de_5_ans"
        : undefined,
    datePreference: convertedDate || undefined,
    creneauHoraire: formData.Créneauhoraire,
    optinMarketing: formData.marketingConsent,
    source: "website",
  };

  return result;
}

// Type options for form dropdowns (matching API specification)
export const typeMotoOptions = [
  { value: "moins_49cc_60kmh", label: "Moins de 49cc (60 km/h max)" },
  { value: "moins_49cc_plus_60kmh", label: "Moins de 49cc (plus de 60 km/h)" },
  { value: "entre_50cc_et_125cc", label: "Entre 50cc et 125cc" },
  { value: "plus_125cc", label: "Plus de 125cc" },
];

export const ageMotoOptions = [
  { value: "moins_5_ans", label: "Moins de 5 ans" },
  { value: "plus_de_5_ans", label: "Plus de 5 ans" },
];

export const typeAchatOptions = [
  { value: "nouvel_achat", label: "Nouvel achat" },
  { value: "occasion", label: "Occasion" },
];

export const creneauHoraireOptions = [
  { value: "Matin (9h-12h)", label: "Matin (9h-12h)" },
  { value: "Après-midi (14h-17h)", label: "Après-midi (14h-17h)" },
  { value: "Soir (17h-20h)", label: "Soir (17h-20h)" },
];

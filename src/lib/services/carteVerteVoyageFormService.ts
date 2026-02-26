export interface CarteVerteVoyageFormData {
  immatriculationNum1: string;
  immatriculationLettre: string;
  immatriculationNum2: string;
  dateReceptionSouhaitee: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string; // Made optional
  datePreference?: string;
  creneauHoraire?: string;
  optinMarketing: boolean;
  conditionsAcceptees: boolean;
}

// Mapping for Arabic letters to API values
// Only these letters are allowed by Strapi backend: أ, ب, ج, د, ر, ز, س, ط, ع, ف, ق, ك, ل, م, ن, ه, و, ي
const arabicLetterMapping: Record<string, string> = {
  // Direct mappings for allowed letters
  أ: "أ",
  ب: "ب",
  ج: "ج",
  د: "د",
  ر: "ر",
  ز: "ز",
  س: "س",
  ط: "ط",
  ع: "ع",
  ف: "ف",
  ق: "ق",
  ك: "ك",
  ل: "ل",
  م: "م",
  ن: "ن",
  ه: "ه",
  و: "و",
  ي: "ي",
  // Map non-allowed letters to closest allowed ones
  ت: "ط", // ta to ta2
  ث: "س", // tha to sin (similar sound)
  ح: "ه", // ha to ha2
  خ: "ه", // kha to ha2
  ذ: "د", // thal to dal
  ش: "س", // shin to sin
  ص: "س", // sad to sin
  ض: "د", // dad to dal
  ظ: "ط", // za2 to ta2
  غ: "ع", // ghain to ain
};

export const submitCarteVerteVoyageForm = async (
  formData: CarteVerteVoyageFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
  type?: string;
}> => {
  try {
    // Map frontend data to API format
    const mappedData = {
      immatriculationNum1: formData.immatriculationNum1,
      immatriculationLettre:
        arabicLetterMapping[formData.immatriculationLettre] ||
        formData.immatriculationLettre,
      immatriculationNum2: formData.immatriculationNum2,
      dateReceptionSouhaitee: formData.dateReceptionSouhaitee,
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.telephone,
      email: formData.email,
      // datePreference: formData.datePreference || new Date().toISOString().split("T")[0], // REMOVED - Date/Time fields hidden
      // creneauHoraire: formData.creneauHoraire || "10:00 – 10:30", // REMOVED - Date/Time fields hidden
      optinMarketing: formData.optinMarketing,
      conditionsAcceptees: formData.conditionsAcceptees,
      source: "website",
    };

    const response = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "carte-verte-voyage",
        formData: mappedData,
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

    if (result.success) {
      return {
        success: true,
        message:
          "Votre demande de carte verte voyage a été envoyée avec succès !",
      };
    } else {
      return {
        success: false,
        message:
          result.message || "Une erreur s'est produite. Veuillez réessayer.",
        error: result.error,
      };
    }
  } catch (error) {
    console.error("Carte verte voyage form submission error:", error);
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error ? error.message : "Erreur technique inconnue",
    };
  }
};

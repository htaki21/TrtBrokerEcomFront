// Mapping between frontend labels and API values
const natureActiviteMapping: Record<string, string> = {
  Artisan: "artisan",
  Commerçant: "commercant",
  "Café / Restaurant": "cafe_restaurant",
  Hôtel: "hotel",
  Transporteur: "transporteur",
  "Profession Libérale": "profession_liberale",
  "Pro de Santé": "pro_sante",
  Garagiste: "garagiste",
  "Pro du Sport": "pro_sport",
  Scolaire: "scolaire",
  Association: "association",
  Syndic: "syndic",
};

const categoriesAssuranceMapping: Record<string, string> = {
  "Maladie de Base": "maladie_base",
  "Assistance Médicale": "assistance_medicale",
  "Retraite Complémentaire": "retraite_complementaire",
  "Accident de travail": "accident_travail",
  "Flotte automobile": "flotte_automobile",
  "Multirisques Locaux": "multirisques_locaux",
  "RC Dirigeants/Mandataires": "rc_dirigeants_mandataires",
  "Transport Marchandises": "transport_marchandises",
  "RC Exploitation": "rc_exploitation",
};

// No mapping needed - send the actual time slot values as they are
// const creneauHoraireMapping: Record<string, string> = {};

// Form data interface
export interface AssuranceProfessionnelleFormData {
  selectedSecteur: string;
  activeCategories: string[];
  nomStructure: string;
  ville: string;
  prenom: string;
  nom: string;
  telephone: string;
  email?: string; // Made optional
  selectedTimeSlot?: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

// Submit form to Strapi API
export const submitAssuranceProfessionnelleForm = async (
  formData: AssuranceProfessionnelleFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
  type?: string;
}> => {
  try {
    // Prepare form data for our API
    const dataPayload = {
      natureActivite:
        natureActiviteMapping[formData.selectedSecteur] ||
        formData.selectedSecteur,
      categoriesAssurance: formData.activeCategories.map(
        (category) => categoriesAssuranceMapping[category] || category
      ),
      nomStructure: formData.nomStructure,
      ville: formData.ville,
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.telephone,
      email: formData.email,
      // datePreference: new Date().toISOString().split("T")[0], // REMOVED - Date/Time fields hidden
      // creneauHoraire: formData.selectedTimeSlot || undefined, // REMOVED - Date/Time fields hidden
      conditions: formData.termsAccepted,
      optMarketing: formData.marketingConsent,
      source: "website",
    };

    // Send to our API for email and Strapi submission
    const emailResponse = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "assurance-professionnelle",
        formData: dataPayload,
        submitToStrapi: true, // Let our API handle Strapi submission
        email: formData.email,
        firstName: formData.prenom,
        lastName: formData.nom,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
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
        error:
          "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
      };
    }

    return {
      success: true,
      message:
        "Votre demande d'assurance professionnelle a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande d'assurance professionnelle. Veuillez réessayer ou contacter notre service client.",
    };
  }
};

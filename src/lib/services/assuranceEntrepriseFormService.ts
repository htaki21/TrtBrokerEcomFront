export interface AssuranceEntrepriseFormData {
  selectedSecteur: string;
  activeCategories: string[];
  nomStructure: string;
  ville: string;
  prenom: string;
  nom: string;
  telephone: string;
  email?: string; // Made optional
  selectedTimeSlot?: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
}

// Mapping from frontend labels to API values
const secteurActiviteMapping: Record<string, string> = {
  BTP: "btp",
  Commerce: "commerce",
  "Services / Conseil": "services_conseil",
  Hôtellerie: "hotellerie",
  Industrie: "industrie",
  Energie: "energie",
  Transport: "transport",
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

export const submitAssuranceEntrepriseForm = async (
  formData: AssuranceEntrepriseFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
  type?: string;
}> => {
  try {
    // Map frontend data to API format
    const mappedData = {
      secteurActivite:
        secteurActiviteMapping[formData.selectedSecteur] ||
        formData.selectedSecteur,
      categoriesAssurance: formData.activeCategories.map(
        (category) => categoriesAssuranceMapping[category] || category
      ),
      nomStructure: formData.nomStructure,
      ville: formData.ville,
      prenom: formData.prenom,
      nom: formData.nom,
      telephone: formData.telephone,
      email: formData.email,
      // datePreference: new Date().toISOString().split("T")[0], // REMOVED - Date/Time fields hidden
      // creneauHoraire: formData.selectedTimeSlot || "10:00 – 10:30", // REMOVED - Date/Time fields hidden
      conditions: formData.termsAccepted,
      optMarketing: formData.marketingConsent,
      source: "website",
    };

    const response = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "assurance-entreprise",
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
          "Votre demande de devis entreprise a été envoyée avec succès !",
      };
    } else {
      return {
        success: false,
        message:
          "Une erreur s'est produite lors de l'envoi de votre demande entreprise.",
        error: result.message,
      };
    }
  } catch (error) {
    console.error("Error submitting assurance entreprise form:", error);
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error ? error.message : "Erreur technique inconnue",
    };
  }
};

interface AssistanceVoyageFormData {
  dureeVisa: "6 mois" | "Plus de 6 mois" | "";
  assistanceVoyage: "Schengen" | "Monde" | "Étudiant" | "Expatrié" | "";
  dureedelacouverture: "6 mois" | "1 an" | "";
  primedelassistance: number;
  situationfamiliale: "Individuel" | "Couple" | "Famille" | "";
  transport: "Oui" | "Non" | "";
  prenom: string;
  nom: string;
  email?: string; // Made optional
  phone: string;
  date: string;
  creneauHoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

const mapFormDataToApi = (formData: AssistanceVoyageFormData) => {
  // Map visa duration
  const dureeVisaMapping: Record<string, string> = {
    "6 mois": "six_mois",
    "Plus de 6 mois": "plus_six_mois",
  };

  // Map assistance type
  const typeAssistanceMapping: Record<string, string> = {
    Schengen: "schengen",
    Monde: "monde",
    Étudiant: "etudiant",
    Expatrié: "expatrie",
  };

  // Map coverage type
  const typeCouvertureMapping: Record<string, string> = {
    Individuel: "individuel",
    Couple: "couple",
    Famille: "famille",
  };

  // Map transport option
  const vehiculePersonnelMapping: Record<string, boolean> = {
    Oui: true,
    Non: false,
  };

  // Map coverage duration
  const dureeCouvertureMapping: Record<string, string> = {
    "6 mois": "six_mois",
    "1 an": "un_an",
  };

  // Client-side validation
  if (!formData.prenom || formData.prenom.length < 2) {
    throw new Error("Le prénom doit contenir au moins 2 caractères");
  }
  if (!formData.nom || formData.nom.length < 2) {
    throw new Error("Le nom doit contenir au moins 2 caractères");
  }
  if (!formData.phone || formData.phone.length < 10) {
    throw new Error(
      "Le numéro de téléphone doit contenir au moins 10 caractères"
    );
  }
  // Email is optional - only validate format if provided
  if (
    formData.email &&
    formData.email.trim() &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    throw new Error("L'adresse email n'est pas valide");
  }
  if (!formData.termsAccepted) {
    throw new Error("Vous devez accepter les conditions générales");
  }
  if (!formData.assistanceVoyage) {
    throw new Error("Vous devez sélectionner un type d'assistance voyage");
  }

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toISOString().split("T")[0];
    } catch {
      return null;
    }
  };

  // Build API data object
  const apiData: Record<string, unknown> = {
    typeAssistance:
      typeAssistanceMapping[formData.assistanceVoyage] ||
      formData.assistanceVoyage,
    prenom: formData.prenom.trim(),
    nom: formData.nom.trim(),
    telephone: formData.phone.trim(),
    email: formData.email?.trim().toLowerCase() || "",
    optinMarketing: formData.marketingConsent,
    conditionsAcceptees: formData.termsAccepted,
    ipAddress: "127.0.0.1",
    userAgent: navigator.userAgent,
    source: "website",
    primeAssistance: formData.primedelassistance,
  };

  // Add global visa duration for all assistance types (collected in step 1)
  if (formData.dureeVisa) {
    apiData.dureeVisa =
      dureeVisaMapping[formData.dureeVisa] || formData.dureeVisa;
  }

  // Add Schengen-specific duration (collected in step 2 for Schengen)
  // For Schengen, dureeSchengen should use the same values as dureeVisa (six_mois, plus_six_mois)
  if (
    formData.assistanceVoyage === "Schengen" &&
    formData.dureedelacouverture
  ) {
    // Map dureedelacouverture to dureeVisa values for Schengen
    const schengenMapping: Record<string, string> = {
      "6 mois": "six_mois",
      "1 an": "plus_six_mois", // 1 an maps to plus_six_mois for Schengen
    };
    apiData.dureeSchengen =
      schengenMapping[formData.dureedelacouverture] ||
      formData.dureedelacouverture;
  }

  // Add Monde-specific duration (collected in step 2 for Monde)
  if (formData.assistanceVoyage === "Monde" && formData.dureedelacouverture) {
    apiData.dureeMonde =
      dureeCouvertureMapping[formData.dureedelacouverture] ||
      formData.dureedelacouverture;
  }

  // Add personal vehicle for Schengen
  if (formData.assistanceVoyage === "Schengen" && formData.transport) {
    apiData.vehiculePersonnel = vehiculePersonnelMapping[formData.transport];
  }

  // Add coverage type for Expatrié
  if (formData.assistanceVoyage === "Expatrié" && formData.situationfamiliale) {
    apiData.typeCouverture =
      typeCouvertureMapping[formData.situationfamiliale] ||
      formData.situationfamiliale;
  }

  // REMOVED - Date/Time fields hidden
  // const datePreference = formatDate(formData.date);
  // if (datePreference) {
  //   apiData.datePreference = datePreference;
  // }

  // const creneauHoraire = formData.creneauHoraire?.trim();
  // if (creneauHoraire) {
  //   apiData.creneauHoraire = creneauHoraire;
  // }

  // Add notes with form details
  const notes = [];
  if (formData.assistanceVoyage) {
    notes.push(`Type d'assistance: ${formData.assistanceVoyage}`);
  }
  if (formData.dureeVisa) {
    notes.push(`Durée visa: ${formData.dureeVisa}`);
  }
  if (formData.dureedelacouverture) {
    notes.push(`Durée couverture: ${formData.dureedelacouverture}`);
  }
  if (formData.transport) {
    notes.push(`Véhicule personnel: ${formData.transport}`);
  }
  if (formData.situationfamiliale) {
    notes.push(`Situation familiale: ${formData.situationfamiliale}`);
  }
  notes.push(`Prime: ${formData.primedelassistance} DH`);

  apiData.notes = notes.join(" | ");

  return apiData;
};

export const submitAssistanceVoyageForm = async (
  formData: AssistanceVoyageFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
  type?: string;
}> => {
  try {
    const apiData = mapFormDataToApi(formData);

    const response = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "assistance-voyage",
        formData: apiData,
        submitToStrapi: true,
        email: apiData.email,
        firstName: apiData.prenom,
        lastName: apiData.nom,
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
          result.message ||
          "Votre demande d'assistance voyage a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
      };
    }

    return {
      success: false,
      message:
        result.error ||
        "Une erreur technique s'est produite lors du traitement de votre demande d'assistance voyage. Veuillez réessayer ou contacter notre service client.",
    };
  } catch (error) {
    let errorMessage =
      "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

interface IndividuelleAccidentsFormData {
  formuleAccidents: string;
  dateReceptionSouhaitee: string;
  prenom: string;
  nom: string;
  email?: string; // Made optional
  phone: string;
  date: string;
  creneauHoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

// Map form data to API format
const mapFormDataToApi = (formData: IndividuelleAccidentsFormData) => {
  // Map formule names to API values
  const formuleMapping: Record<string, string> = {
    "Formule Basique": "formule_basique_312_50",
    "Formule Confort": "formule_confort_427_50",
    "Formule Premium": "formule_premium_738_00",
  };

  // Format dates properly
  const formatDate = (dateString: string) => {
    if (!dateString) return null; // Return null instead of empty string for optional dates
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null; // Invalid date
      return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    } catch {
      return null;
    }
  };

  // Validate required fields
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
  if (!formData.formuleAccidents) {
    throw new Error("Vous devez sélectionner une formule d'assurance");
  }

  const apiData: Record<string, unknown> = {
    formuleAssurance:
      formuleMapping[formData.formuleAccidents] || formData.formuleAccidents,
    prenom: formData.prenom.trim(),
    nom: formData.nom.trim(),
    telephone: formData.phone.trim(),
    email: formData.email?.trim().toLowerCase() || "",
    optinMarketing: formData.marketingConsent,
    conditionsAcceptees: formData.termsAccepted,
    ipAddress: "127.0.0.1", // Default IP for localhost
    userAgent: navigator.userAgent,
    source: "website",
    notes: `Date de réception souhaitée: ${formData.dateReceptionSouhaitee}`,
  };

  // REMOVED - Date/Time fields hidden
  // const datePreference = formatDate(formData.date);
  // if (datePreference) {
  //   apiData.datePreference = datePreference;
  // }

  // const creneauHoraire = formData.creneauHoraire?.trim();
  // if (creneauHoraire) {
  //   apiData.creneauHoraire = creneauHoraire;
  // }

  const dateReception = formatDate(formData.dateReceptionSouhaitee);
  if (dateReception) {
    apiData.dateReception = dateReception;
  }

  return apiData;
};

export const submitIndividuelleAccidentsForm = async (
  formData: IndividuelleAccidentsFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
  type?: string;
}> => {
  try {
    const apiData = mapFormDataToApi(formData);

    // Send to our API for email and Strapi submission
    const emailResponse = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "individuelle-accidents",
        formData: apiData,
        submitToStrapi: true,
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
        message: "Erreur lors de l'envoi de votre demande. Veuillez réessayer.",
        error: "Erreur lors de l'envoi de votre demande. Veuillez réessayer.",
      };
    }

    return {
      success: true,
      message:
        "Votre demande d'assurance individuelle accidents a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
    };
  } catch (error) {
    // Ensure we always return a string message
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

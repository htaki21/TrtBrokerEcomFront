export interface MotoFormData {
  Typedachat: "Nouvel Achat" | "Occasion";
  ageDeMoto: "Moins de 5 ans" | "Plus de 5 ans";
  Typedemoto:
    | "Moins de 49cc et < 60 km/h"
    | "Moins de 49cc et > 60 km/h"
    | "Entre 50cc et 125cc"
    | "125cc ou plus";
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  Date: string;
  Créneauhoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

export interface MotoSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  strapiSuccess?: boolean;
  emailSuccess?: boolean;
}

// Main submission function
export async function submitMotoForm(
  formData: MotoFormData
): Promise<MotoSubmissionResult> {
  try {
    // Import the moto lead service
    const { submitMotoLead, convertFormDataToMotoLead } = await import(
      "./motoLeadService"
    );

    // Convert form data to API format
    const motoLeadData = convertFormDataToMotoLead(formData);

    // Submit to Strapi and send email via internal API
    const apiResult = await submitMotoLead(motoLeadData);

    // Check if validation failed
    if (!apiResult.success && apiResult.error) {
      return {
        success: false,
        error: apiResult.error,
        strapiSuccess: false,
        emailSuccess: false,
      };
    }

    // Extract results from the combined API call
    const strapiResult = {
      success: apiResult.strapiResult?.success || false,
      message: apiResult.strapiResult?.message || "Strapi submission failed",
    };
    const emailResult = {
      success: apiResult.success || false,
      message: apiResult.message || "Email failed",
    };

    // Determine overall success
    const overallSuccess = strapiResult.success || emailResult.success;

    if (overallSuccess) {
      let message =
        "Votre demande d'assurance moto a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.";
      if (strapiResult.success && !emailResult.success) {
        message =
          "Votre demande a été enregistrée mais l'email de confirmation n'a pas pu être envoyé. Notre équipe vous contactera directement dans les plus brefs délais.";
      }

      return {
        success: true,
        message,
        strapiSuccess: strapiResult.success,
        emailSuccess: emailResult.success,
      };
    } else {
      return {
        success: false,
        error: `Une erreur technique s'est produite lors du traitement de votre demande d'assurance moto. Veuillez réessayer ou contacter notre service client.`,
        strapiSuccess: false,
        emailSuccess: false,
      };
    }
  } catch {
    // ALWAYS return error result - NEVER throw
    return {
      success: false,
      error:
        "Une erreur technique s'est produite lors du traitement de votre demande d'assurance moto. Veuillez réessayer ou contacter notre service client.",
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande d'assurance moto. Veuillez réessayer ou contacter notre service client.",
      strapiSuccess: false,
      emailSuccess: false,
    };
  }
}

export interface HabitationFormData {
  prenom: string;
  nom: string;
  email?: string; // Made optional
  telephone: string;
  typeLogement: string;
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

export interface HabitationSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  strapiSuccess: boolean;
  emailSuccess: boolean;
}

// Main function to submit habitation form
export async function submitHabitationForm(
  formData: HabitationFormData
): Promise<HabitationSubmissionResult> {
  try {
    // Import the habitation lead service
    const { submitHabitationLead, convertFormDataToHabitationLead } =
      await import("./habitationLeadService");

    // Convert form data to API format
    const habitationLeadData = convertFormDataToHabitationLead(formData);

    // Submit to Strapi and send email via internal API
    const apiResult = await submitHabitationLead(habitationLeadData);

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
        "Votre demande d'assurance habitation a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.";
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
        error: `Une erreur technique s'est produite lors du traitement de votre demande d'assurance habitation. Veuillez réessayer ou contacter notre service client.`,
        strapiSuccess: false,
        emailSuccess: false,
      };
    }
  } catch {
    // ALWAYS return error result - NEVER throw
    return {
      success: false,
      error:
        "Une erreur technique s'est produite lors du traitement de votre demande d'assurance habitation. Veuillez réessayer ou contacter notre service client.",
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande d'assurance habitation. Veuillez réessayer ou contacter notre service client.",
      strapiSuccess: false,
      emailSuccess: false,
    };
  }
}

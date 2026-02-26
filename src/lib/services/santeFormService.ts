import {
  convertFormDataToSanteLead,
  submitSanteLead,
} from "./santeLeadService";

export interface SanteFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeAssurance: "sante_maroc" | "sante_maroc_plus_international";
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
  [key: string]: unknown;
}

export async function submitSanteForm(formData: SanteFormData): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    // Convert form data to lead data format
    const leadData = convertFormDataToSanteLead(formData);

    // Submit to API
    const apiResult = await submitSanteLead(leadData);

    if (apiResult.success) {
      return {
        success: true,
        message:
          apiResult.message ||
          "Votre demande d'assurance santé a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
      };
    } else {
      return {
        success: false,
        error:
          apiResult.error ||
          "Une erreur technique s'est produite lors du traitement de votre demande d'assurance santé. Veuillez réessayer ou contacter notre service client.",
        message:
          apiResult.error ||
          "Une erreur technique s'est produite lors du traitement de votre demande d'assurance santé. Veuillez réessayer ou contacter notre service client.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      message:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
    };
  }
}

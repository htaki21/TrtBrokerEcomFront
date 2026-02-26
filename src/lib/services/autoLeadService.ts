export interface AutoLeadData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  typeAchat: "nouvel_achat" | "occasion";
  typeCarburant: "essence" | "diesel" | "hybride" | "electrique";
  ageVoiture?: "moins_5_ans" | "plus_de_5_ans"; // Made optional since it's conditional
  puissanceFiscale: number;
  datePreference?: string;
  creneauHoraire?: string;
  optinMarketing: boolean;
  conditionsAcceptees: boolean;
  dateMiseCirculation?: string;
  valeurVehicule?: number;
}

export interface AutoLeadResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
  error?: string;
}

export interface SubmitResult {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
  error?: string;
}

const ENDPOINTS = [
  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/assurance-auto-leads`,
  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/assurance-auto-leads/submit`,
  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/assurance-auto-leads/create`,
  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/assurance-auto-leads/`,
];

function cleanFormData(
  formData: AutoLeadData
): Record<string, string | number | boolean> {
  const cleanData: Record<string, string | number | boolean> = {};

  // Required fields
  cleanData.prenom = formData.prenom;
  cleanData.nom = formData.nom;
  cleanData.email = formData.email;
  cleanData.telephone = formData.telephone;
  cleanData.typeAchat = formData.typeAchat;
  cleanData.typeCarburant = formData.typeCarburant;
  cleanData.puissanceFiscale = formData.puissanceFiscale;
  cleanData.optinMarketing = formData.optinMarketing;
  cleanData.conditionsAcceptees = formData.conditionsAcceptees;

  // Required fields that were missing
  cleanData.dateMiseCirculation =
    formData.dateMiseCirculation || new Date().toISOString().split("T")[0];
  cleanData.valeurVehicule = formData.valeurVehicule || 0;

  // Optional fields - only include if they have values
  if (formData.ageVoiture) {
    cleanData.ageVoiture = formData.ageVoiture;
  }
  if (formData.datePreference) {
    cleanData.datePreference = formData.datePreference;
  }
  if (formData.creneauHoraire) {
    cleanData.creneauHoraire = formData.creneauHoraire;
  }

  return cleanData;
}

export async function submitAutoLead(
  formData: AutoLeadData
): Promise<SubmitResult> {
  try {
    // First, send email using our unified endpoint
    const emailResponse = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "auto",
        formData: formData,
        submitToStrapi: true, // Enable Strapi submission
        email: formData.email,
        firstName: formData.prenom,
        lastName: formData.nom,
      }),
    });

    if (!emailResponse.ok) {
      const emailResult = await emailResponse.json();
      // Handle rate limiting specifically
      if (emailResult.type === "rate_limit") {
        const retryAfter = emailResult.retryAfter || 60;
        const minutes = Math.ceil(retryAfter / 60);
        return {
          success: false,
          message: `Vous avez dépassé la limite de tentatives. Veuillez patienter ${minutes} minute(s) avant de réessayer.`,
          error: emailResult.message || "Limite de tentatives atteinte",
        };
      }
      // Handle security errors properly
      if (emailResult.type === "validation_error" && emailResult.message) {
        return {
          success: false,
          message: emailResult.message,
          error: emailResult.message,
        };
      }
    }

    // Then, submit to Strapi using original working approach
    const cleanData = cleanFormData(formData);
    let strapiSuccess = false;

    for (const endpoint of ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({ data: cleanData }),
        });

        if (response.ok) {
          strapiSuccess = true;
          break;
        }
      } catch {
        continue;
      }
    }

    return {
      success: true,
      message:
        "Votre demande d'assurance automobile a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande d'assurance automobile. Veuillez réessayer ou contacter notre service client.",
    };
  }
}

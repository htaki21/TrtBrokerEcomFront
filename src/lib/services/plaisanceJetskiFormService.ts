// Plaisance/Jet-ski Form Service
// Handles form submission to Strapi API

export interface PlaisanceJetskiFormData {
  typeDeBateau: "De Plaisance" | "À Moteur" | "À Voile" | "Jet-Ski";
  garantiesDeBaseIncluses: ("Responsabilité Civile" | "Défense et Recours")[];
  garantiesOptionnelles: (
    | "Perte Totale & Délaissement"
    | "Vol Total"
    | "Tous Risques"
    | "Individuelle Personnes Transportées"
  )[];
  ficheTechniqueOptionnelle?: File | string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  date: string;
  creneauHoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

// Mapping from frontend values to API values
const typeBateauMapping: Record<string, string> = {
  "De Plaisance": "de_plaisance",
  "À Moteur": "a_moteur",
  "À Voile": "a_voile",
  "Jet-Ski": "jet_ski",
};

const garantiesDeBaseMapping: Record<string, string> = {
  "Responsabilité Civile": "responsabilite_civile",
  "Défense et Recours": "defense_et_recours",
};

const garantiesOptionnellesMapping: Record<string, string> = {
  "Perte Totale & Délaissement": "perte_totale_delaissement",
  "Vol Total": "vol_total",
  "Tous Risques": "tous_risques",
  "Individuelle Personnes Transportées": "individuelle_personne_transportees",
};

// Format date for API
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  } catch {
    return "";
  }
};

// Submit form to Strapi API
export const submitPlaisanceJetskiForm = async (
  formData: PlaisanceJetskiFormData
): Promise<{ success: boolean; message: string; error?: string; type?: string }> => {
  try {
    let ficheTechniqueId: number | null = null;

    // Upload file first if provided
    if (formData.ficheTechniqueOptionnelle) {
      if (formData.ficheTechniqueOptionnelle instanceof File) {
        // Verify file integrity before upload
        if (formData.ficheTechniqueOptionnelle.size === 0) {
          throw new Error("File is empty");
        }

        const fileFormData = new FormData();
        fileFormData.append("file", formData.ficheTechniqueOptionnelle);

        const fileUploadResponse = await fetch("/api/upload-file", {
          method: "POST",
          body: fileFormData,
        });

        if (fileUploadResponse.ok) {
          const fileResult = await fileUploadResponse.json();
          if (fileResult.success && fileResult.data) {
            ficheTechniqueId = fileResult.data.id;
          } else {
            throw new Error(
              "Erreur lors du téléversement du fichier. Veuillez réessayer."
            );
          }
        } else {
          throw new Error(
            "Erreur lors du téléversement du fichier. Veuillez réessayer."
          );
        }
      }
    }

    // Prepare form data for our API
    const dataPayload: {
      typeBateau: string;
      garantiesDeBase: string;
      garantiesOptionnelles: string;
      prenom: string;
      nom: string;
      telephone: string;
      email: string;
      datePreference: string;
      creneauHoraire: string;
      optinMarketing: boolean;
      conditionsAcceptees: boolean;
      source: string;
      ficheTechnique?: number;
    } = {
      typeBateau:
        typeBateauMapping[formData.typeDeBateau] || formData.typeDeBateau,
      garantiesDeBase: formData.garantiesDeBaseIncluses
        .map((garantie) => garantiesDeBaseMapping[garantie] || garantie)
        .join(","),
      garantiesOptionnelles: formData.garantiesOptionnelles
        .map((garantie) => garantiesOptionnellesMapping[garantie] || garantie)
        .join(","),
      prenom: formData.prenom,
      nom: formData.nom,
      telephone: formData.phone,
      email: formData.email,
      datePreference: formatDate(formData.date),
      creneauHoraire: formData.creneauHoraire,
      optinMarketing: formData.marketingConsent,
      conditionsAcceptees: formData.termsAccepted,
      source: "website",
    };

    // Add ficheTechnique ID if file was uploaded
    if (ficheTechniqueId) {
      dataPayload.ficheTechnique = ficheTechniqueId;
    }

    // Send to our API for email and Strapi submission
    const emailResponse = await fetch("/api/send-devis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "plaisance-jetski",
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
        "Votre demande d'assurance plaisance/jet-ski a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      error:
        error instanceof Error
          ? error.message
          : "Une erreur technique s'est produite lors du traitement de votre demande d'assurance plaisance/jet-ski. Veuillez réessayer ou contacter notre service client.",
    };
  }
};

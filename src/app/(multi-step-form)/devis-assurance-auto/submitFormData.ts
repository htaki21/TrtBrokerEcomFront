import { AutoLeadData, submitAutoLead } from "@/lib/services/autoLeadService";

// Helper function to convert date from DD-MM-YYYY to YYYY-MM-DD
function convertDateFormat(dateString: string): string | null {
  if (!dateString || dateString.trim() === "") {
    return null;
  }

  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  // If in DD-MM-YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
  }

  // If in DD/MM/YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
  }

  return null;
}

export async function submitFormData(formData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  typeDeVoiture?: string;
  carburant?: string;
  ageDeVoiture?: string;
  chevaux?: number;
  selectedDate?: string;
  selectedTime?: string;
  marketingConsent?: boolean;
  termsAccepted?: boolean;
}) {
  try {
    // Convert date format if needed
    let convertedDate: string | undefined = undefined;
    if (formData.selectedDate) {
      const converted = convertDateFormat(formData.selectedDate);
      if (converted) {
        convertedDate = converted;
      }
    }

    // Transform formData to match AutoLeadData interface
    const autoLeadData: AutoLeadData = {
      prenom: formData.firstName || "",
      nom: formData.lastName || "",
      email: formData.email || "",
      telephone: formData.phone || "",
      typeAchat:
        formData.typeDeVoiture === "Nouvel Achat" ? "nouvel_achat" : "occasion",
      typeCarburant:
        formData.carburant === "Essence"
          ? "essence"
          : formData.carburant === "Diesel"
            ? "diesel"
            : formData.carburant === "Hybride"
              ? "hybride"
              : "electrique",
      ageVoiture:
        formData.ageDeVoiture === "Moins de 5 ans"
          ? "moins_5_ans"
          : "plus_de_5_ans",
      puissanceFiscale: formData.chevaux || 0,
      datePreference: convertedDate,
      creneauHoraire: formData.selectedTime || "",
      optinMarketing: formData.marketingConsent || false,
      conditionsAcceptees: formData.termsAccepted || false,
    };

    // Submit to auto lead service
    const result = await submitAutoLead(autoLeadData);

    if (result.success) {
      return { success: true, message: "Form submitted successfully" };
    } else {
      return { success: false, message: result.message || "Submission failed" };
    }
  } catch {
    return { success: false, message: "Error submitting form data" };
  }
}

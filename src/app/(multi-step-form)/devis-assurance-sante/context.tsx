"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  planSante: "Santé Maroc" | "Santé Maroc + International";
  beneficiairesACouvrir: Array<"Moi" | "Mon conjoint" | "Mes enfants">;
  selectedDateMoi: string;
  selectedDateConjoint: string;
  selectedDateEnfant1: string;
  selectedDateEnfant2: string;
  selectedDateEnfant3: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  date: string;
  creneauHoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
  // Additional fields for API compatibility
  typeAssurance: "sante_maroc" | "sante_maroc_plus_international";
  typeCouverture: string[];
  dateNaissance?: string;
  dateNaissanceConjoint?: string;
  dateNaissanceEnfant1?: string;
  dateNaissanceEnfant2?: string;
  dateNaissanceEnfant3?: string;
  datePreference?: string;
  conditionsAcceptees: boolean;
  optinMarketing?: boolean;
  source?: string;
  notes?: string;
};

type FieldErrors = Record<string, string>;

type FormContextType = {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  isStepValid: (stepIndex: string | number) => boolean;
  isFormValid: () => boolean;
  fieldErrors: FieldErrors;
  setFieldError: (field: string, message: string) => void;
  clearFieldError: (field: string) => void;
  submitForm: () => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
  submissionResult: { success: boolean; error?: string } | null;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>({
    planSante: "Santé Maroc",
    beneficiairesACouvrir: [],
    selectedDateMoi: "",
    selectedDateConjoint: "",
    selectedDateEnfant1: "",
    selectedDateEnfant2: "",
    selectedDateEnfant3: "",
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    date: "",
    creneauHoraire: "",
    marketingConsent: false,
    termsAccepted: false,
    // Additional fields for API compatibility
    typeAssurance: "sante_maroc",
    typeCouverture: [],
    dateNaissance: "",
    dateNaissanceConjoint: "",
    dateNaissanceEnfant1: "",
    dateNaissanceEnfant2: "",
    dateNaissanceEnfant3: "",
    datePreference: "",
    conditionsAcceptees: false,
    optinMarketing: false,
    source: "website",
    notes: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const setFieldError = (field: string, message: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };
  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);

  // Validate birthday date - must be in the past
  const validateBirthday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const stepValidationMap = useMemo<Record<number, () => boolean>>(
    () => ({
      0: () => Boolean(data.planSante),
      1: () => {
        const { beneficiairesACouvrir } = data;

        // Require at least one beneficiary selected
        if (beneficiairesACouvrir.length === 0) return false;

        // Require a valid birthday date for every selected beneficiary
        for (const b of beneficiairesACouvrir) {
          if (b === "Moi") {
            if (
              !data.selectedDateMoi ||
              !validateBirthday(data.selectedDateMoi)
            )
              return false;
          }
          if (b === "Mon conjoint") {
            if (
              !data.selectedDateConjoint ||
              !validateBirthday(data.selectedDateConjoint)
            )
              return false;
          }
          if (b === "Mes enfants") {
            // At least one child date must be provided and valid
            const hasValidChildDate =
              (data.selectedDateEnfant1 &&
                validateBirthday(data.selectedDateEnfant1)) ||
              (data.selectedDateEnfant2 &&
                validateBirthday(data.selectedDateEnfant2)) ||
              (data.selectedDateEnfant3 &&
                validateBirthday(data.selectedDateEnfant3));
            if (!hasValidChildDate) return false;
          }
        }

        return true;
      },
      2: () => {
        const isEmailValid = data.email
          ? validateEmail(data.email) && !fieldErrors.email
          : true; // Email is optional, so empty email is valid

        return (
          Boolean(data.prenom) &&
          Boolean(data.nom) &&
          isEmailValid &&
          Boolean(data.phone) &&
          Boolean(data.termsAccepted)
        );
      },
    }),
    [data, fieldErrors]
  );

  const isStepValid = (stepIndex: string | number) => {
    const index =
      typeof stepIndex === "string" ? parseInt(stepIndex, 10) : stepIndex;
    return stepValidationMap[index]?.() ?? false;
  };

  const isFormValid = () =>
    Object.keys(stepValidationMap).every((key) =>
      stepValidationMap[Number(key)]()
    );

  const submitForm = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!isFormValid()) {
      return {
        success: false,
        error:
          "Veuillez compléter tous les champs obligatoires avant de procéder à la soumission de votre demande.",
      };
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Transform form data to match API requirements
      const formDataForService = {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.phone,
        typeAssurance: (data.planSante === "Santé Maroc"
          ? "sante_maroc"
          : "sante_maroc_plus_international") as
          | "sante_maroc"
          | "sante_maroc_plus_international",
        typeCouverture: data.beneficiairesACouvrir.map((b) => {
          switch (b) {
            case "Moi":
              return "moi";
            case "Mon conjoint":
              return "mon_conjoint";
            case "Mes enfants":
              return "mes_enfants";
            default:
              return b;
          }
        }),
        dateNaissance: data.selectedDateMoi || undefined,
        dateNaissanceConjoint: data.selectedDateConjoint || undefined,
        dateNaissanceEnfant1: data.selectedDateEnfant1 || undefined,
        dateNaissanceEnfant2: data.selectedDateEnfant2 || undefined,
        dateNaissanceEnfant3: data.selectedDateEnfant3 || undefined,
        datePreference: data.date || undefined,
        creneauHoraire: data.creneauHoraire || undefined,
        conditionsAcceptees: data.termsAccepted,
        optinMarketing: data.marketingConsent,
        source: "website",
        notes: undefined,
      };

      // Import and use the service
      const { submitSanteForm } = await import(
        "@/lib/services/santeFormService"
      );
      const result = await submitSanteForm(formDataForService);

      setSubmissionResult(result);
      return result;
    } catch (error) {
      const errorResult = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
      };
      setSubmissionResult(errorResult);
      return errorResult;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        data,
        setData,
        isStepValid,
        isFormValid,
        fieldErrors,
        setFieldError,
        clearFieldError,
        submitForm,
        isSubmitting,
        submissionResult,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  typeHabitation: "Appartement" | "Maison" | "Villa";
  valeurHabitation: string;
  valeurContenu: string;
  objetsValeur?: string; // ✅ only optional
  garantiesOptionnelles: {
    piscine: boolean;
    bain_maure_sauna: boolean;
    chauffeur: boolean;
    jardinier_gardien: boolean;
  };
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  date: string;
  creneauHoraire: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
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
    typeHabitation: "Appartement", // default
    valeurHabitation: "",
    valeurContenu: "",
    garantiesOptionnelles: {
      piscine: false,
      bain_maure_sauna: false,
      chauffeur: false,
      jardinier_gardien: false,
    },
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    date: "",
    creneauHoraire: "",
    marketingConsent: false,
    termsAccepted: false,
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

  const stepValidationMap = useMemo<Record<number, () => boolean>>(
    () => ({
      0: () => Boolean(data.typeHabitation),
      1: () => Boolean(data.valeurHabitation),
      2: () => Boolean(data.valeurContenu),
      3: () => true,
      4: () => true,
      5: () => {
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
    message?: string;
  }> => {
    if (!isFormValid()) {
      return {
        success: false,
        error: "Veuillez remplir tous les champs requis",
      };
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Import and use the habitation form service
      const { submitHabitationForm } = await import(
        "@/lib/services/habitationFormService"
      );

      // Transform form data to match the service interface
      const formDataForService = {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.phone,
        typeLogement: data.typeHabitation.toLowerCase() as
          | "appartement"
          | "maison"
          | "villa",
        valeurHabitation: parseFloat(data.valeurHabitation) || 0,
        valeurBiens:
          data.valeurContenu && data.valeurContenu.trim() !== ""
            ? parseFloat(data.valeurContenu)
            : "",
        valeurObjets:
          data.objetsValeur && data.objetsValeur.trim() !== ""
            ? parseFloat(data.objetsValeur)
            : "",
        garantiesSupplementaires: Object.entries(data.garantiesOptionnelles)
          .filter(([, isSelected]) => isSelected)
          .map(([key]) => key),
        datePreference: data.date || "",
        creneauHoraire: data.creneauHoraire || "",
        notes: "",
        conditionsAcceptees: data.termsAccepted,
        optinMarketing: data.marketingConsent,
        source: "website",
      };

      const result = await submitHabitationForm(
        formDataForService as Parameters<typeof submitHabitationForm>[0]
      );

      if (result.success) {
        const successResult = {
          success: true,
          message:
            result.message ||
            "Votre demande d'assurance habitation a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
        };
        setSubmissionResult(successResult);
        return successResult;
      } else {
        const errorResult = {
          success: false,
          error: result.error || "Erreur lors de la soumission du formulaire",
          message:
            result.message || "Erreur lors de la soumission du formulaire",
        };
        setSubmissionResult(errorResult);
        return errorResult;
      }
    } catch {
      // ALWAYS return error result - NEVER throw
      const errorResult = {
        success: false,
        error: "Erreur lors du traitement de votre demande.",
        message: "Erreur lors du traitement de votre demande.",
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

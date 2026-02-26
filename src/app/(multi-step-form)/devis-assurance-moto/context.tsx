"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  Typedachat: "Nouvel Achat" | "Occasion" | "";
  ageDeMoto: "Moins de 5 ans" | "Plus de 5 ans" | "";
  Typedemoto:
    | "Moins de 49cc et < 60 km/h"
    | "Moins de 49cc et > 60 km/h"
    | "Entre 50cc et 125cc"
    | "125cc ou plus"
    | "";
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  Date: string;
  Créneauhoraire: string;
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
    Typedachat: "", // User must select
    ageDeMoto: "", // User must select
    Typedemoto: "", // User must select
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    Date: "",
    Créneauhoraire: "",
    marketingConsent: false,
    termsAccepted: false,
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  // Note: Age is handled by form logic, not auto-set

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

  const validatePhone = (value: string) => {
    if (!value?.trim()) {
      return false;
    }
    // Check length and pattern as per API spec (10-20 chars)
    const isValid =
      value.length >= 10 && value.length <= 20 && /^[0-9+\s()\-]+$/.test(value);
    return isValid;
  };

  const stepValidationMap = useMemo<Record<number, () => boolean>>(
    () => ({
      0: () => Boolean(data.Typedachat),
      1: () => Boolean(data.Typedemoto),
      2: () => {
        // For "Nouvel Achat", age is not required
        if (data.Typedachat === "Nouvel Achat") {
          return true;
        }
        // For "Occasion", age is required
        return Boolean(data.ageDeMoto);
      },
      3: () => {
        const isEmailValid = data.email
          ? validateEmail(data.email) && !fieldErrors.email
          : true; // Email is optional, so empty email is valid

        const isPhoneValid = Boolean(data.phone) && validatePhone(data.phone);

        return (
          Boolean(data.prenom) &&
          Boolean(data.nom) &&
          isEmailValid &&
          isPhoneValid &&
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

  const isFormValid = () => {
    if (data.Typedachat === "Nouvel Achat") {
      return (
        stepValidationMap[0]() &&
        stepValidationMap[1]() &&
        stepValidationMap[3]()
      );
    } else {
      return Object.keys(stepValidationMap).every((key) =>
        stepValidationMap[Number(key)]()
      );
    }
  };

  const submitForm = async (): Promise<{
    success: boolean;
    error?: string;
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
      // Import and use the moto form service
      const { submitMotoForm } = await import("@/lib/services/motoFormService");

      // Convert FormData to MotoFormData with proper types
      const motoFormData = {
        ...data,
        Typedachat: data.Typedachat as "Nouvel Achat" | "Occasion",
        ageDeMoto: data.ageDeMoto as "Moins de 5 ans" | "Plus de 5 ans",
        Typedemoto: data.Typedemoto as
          | "Moins de 49cc et < 60 km/h"
          | "Moins de 49cc et > 60 km/h"
          | "Entre 50cc et 125cc"
          | "125cc ou plus",
      };

      const result = await submitMotoForm(motoFormData);

      if (result.success) {
        const successResult = {
          success: true,
          message:
            result.message ||
            "Votre demande d'assurance moto a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
        };
        setSubmissionResult(successResult);
        return successResult;
      } else {
        const errorResult = {
          success: false,
          error: result.error || "Erreur lors de la soumission du formulaire",
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

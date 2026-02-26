"use client";

import { submitIndividuelleAccidentsForm } from "@/lib/services/individuelleAccidentsFormService";
import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  formuleAccidents:
    | "Formule Basique"
    | "Formule Confort"
    | "Formule Premium"
    | "";
  dateReceptionSouhaitee: string;
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
    formuleAccidents: "",
    dateReceptionSouhaitee: "",
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
    // Ensure message is always a string
    const safeMessage =
      typeof message === "string" ? message : "Erreur de validation";
    setFieldErrors((prev) => ({ ...prev, [field]: safeMessage }));
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
      0: () => true,
      1: () => {
        const isEmailValid =
          data.email && data.email.trim()
            ? validateEmail(data.email) && !fieldErrors.email
            : true; // Email is optional, so empty email is valid

        return (
          Boolean(data.prenom) &&
          Boolean(data.nom) &&
          isEmailValid &&
          Boolean(data.phone) &&
          Boolean(data.dateReceptionSouhaitee) &&
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
      const result = await submitIndividuelleAccidentsForm(data);
      // Ensure result has safe string messages
      const safeResult = {
        success: result.success,
        message:
          typeof result.message === "string"
            ? result.message
            : "Opération terminée",
        error: typeof result.error === "string" ? result.error : undefined,
      };
      setSubmissionResult(safeResult);
      return safeResult;
    } catch (error) {
      // Ensure error message is always a string
      let errorMessage =
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      const errorResult = {
        success: false,
        error: errorMessage,
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

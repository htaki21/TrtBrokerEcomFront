"use client";

import { submitPlaisanceJetskiForm } from "@/lib/services/plaisanceJetskiFormService";
import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  typeDeBateau: "De Plaisance" | "À Moteur" | "À Voile" | "Jet-Ski";
  garantiesDeBaseIncluses: ("Responsabilité Civile" | "Défense et Recours")[];
  garantiesOptionnelles: (
    | "Perte Totale & Délaissement"
    | "Vol Total"
    | "Tous Risques"
    | "Individuelle Personnes Transportées"
  )[];
  ficheTechniqueOptionnelle?: File;
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
    typeDeBateau: "De Plaisance", // default
    garantiesDeBaseIncluses: ["Responsabilité Civile"],
    garantiesOptionnelles: ["Perte Totale & Délaissement"],
    ficheTechniqueOptionnelle: undefined,
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
      0: () => Boolean(data.typeDeBateau),
      1: () => data.garantiesDeBaseIncluses.length > 0,
      2: () => data.garantiesOptionnelles.length > 0,
      3: () => true,
      4: () => {
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
      const result = await submitPlaisanceJetskiForm(data);

      if (result.success) {
        setSubmissionResult({ success: true });
        return { success: true };
      } else {
        const errorResult = {
          success: false,
          error:
            result.error ||
            "Une erreur technique s'est produite lors du traitement de votre demande d'assurance plaisance/jet-ski. Veuillez réessayer ou contacter notre service client.",
        };
        setSubmissionResult(errorResult);
        return errorResult;
      }
    } catch (error) {
      const errorResult = {
        success: false,
        error:
          "Une erreur technique s'est produite lors du traitement de votre demande d'assurance plaisance/jet-ski. Veuillez réessayer ou contacter notre service client.",
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

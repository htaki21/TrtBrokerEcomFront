"use client";

import { submitAssistanceVoyageForm } from "@/lib/services/assistanceVoyageFormService";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type FormData = {
  dureeVisa: "6 mois" | "Plus de 6 mois" | "";
  assistanceVoyage: "Schengen" | "Monde" | "Étudiant" | "Expatrié" | "";
  dureedelacouverture: "6 mois" | "1 an" | "";
  primedelassistance: number; // store the price directly
  situationfamiliale: "Individuel" | "Couple" | "Famille" | "";
  transport: "Oui" | "Non" | "";
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
  isFormValid: (currentStepId?: string) => boolean;
  fieldErrors: FieldErrors;
  setFieldError: (field: string, message: string) => void;
  clearFieldError: (field: string) => void;
  submitForm: (
    currentStepId?: string
  ) => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
  submissionResult: { success: boolean; error?: string } | null;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>({
    dureeVisa: "", // default
    assistanceVoyage: "", // default
    dureedelacouverture: "", // default
    primedelassistance: 0, // default
    situationfamiliale: "",
    transport: "",
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

  const validateFinal = useCallback(() => {
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
  }, [data, fieldErrors]);

  const stepValidationMap = useMemo<Record<string, () => boolean>>(
    () => ({
      step1: () => Boolean(data.dureeVisa),
      step2: () => Boolean(data.assistanceVoyage),

      // 🔹 Branch A
      a1: () => Boolean(data.dureedelacouverture),
      a2: () => Boolean(data.transport),
      a3: () => true,

      // 🔹 Branch B
      b1: () => Boolean(data.dureedelacouverture),
      b2: () => true,

      // 🔹 Branch C
      c1: () => true,

      // 🔹 Branch D
      d1: () => Boolean(data.situationfamiliale),
      d2: () => true,

      // 🔹 Final step (common fields)
      a4: () => validateFinal(),
      b3: () => validateFinal(),
      c2: () => validateFinal(),
      d3: () => validateFinal(),
    }),
    [data, validateFinal]
  );

  const isStepValid = (stepKey: string | number) => {
    // if it's a number, use numeric keys (like step1 = 0, step2 = 1, etc.)
    if (typeof stepKey === "number") {
      const numericKeys = Object.keys(stepValidationMap).filter((k) =>
        k.startsWith("step")
      );
      const key = numericKeys[stepKey]; // e.g., stepIndex 0 -> "step1"
      return key ? (stepValidationMap[key]?.() ?? false) : false;
    }

    // if it's a string, use it directly
    return stepValidationMap[stepKey]?.() ?? false;
  };

  const isFormValid = (currentStepId?: string) => {
    // If we have a currentStepId, only validate that step
    if (currentStepId) {
      return stepValidationMap[currentStepId]?.() ?? false;
    }

    // Fallback: validate all steps (for backward compatibility)
    return Object.keys(stepValidationMap).every(
      (key) => stepValidationMap[key]?.() ?? false
    );
  };

  const submitForm = async (
    currentStepId?: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!isFormValid(currentStepId)) {
      return {
        success: false,
        error:
          "Veuillez compléter tous les champs obligatoires avant de procéder à la soumission de votre demande.",
      };
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await submitAssistanceVoyageForm(data);

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

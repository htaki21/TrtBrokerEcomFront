// context.tsx
"use client";

import { AutoLeadResponse } from "@/lib/services/autoLeadService";
import React, { createContext, useContext, useMemo, useState } from "react";

export type FormData = {
  typeDeVoiture: "Nouvel Achat" | "Occasion" | "";
  carburant: "Essence" | "Diesel" | "Hybride" | "Électrique" | "";
  ageDeVoiture: "Moins de 5 ans" | "Plus de 5 ans" | "neuve" | "";
  chevaux: number;
  valeurEstimee: string;
  dateMiseEnCirculation: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
  // Additional fields for Strapi compatibility
  datePreference?: string;
  creneauHoraire?: string;
  optinMarketing?: boolean;
  conditionsAcceptees?: boolean;
  source?: string;
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
  submitForm: () => Promise<AutoLeadResponse>;
  isSubmitting: boolean;
  submissionResult: AutoLeadResponse | null;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>({
    typeDeVoiture: "", // User must select
    carburant: "", // User must select
    ageDeVoiture: "", // User must select
    chevaux: 0, // User must input
    valeurEstimee: "",
    dateMiseEnCirculation: "",
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    selectedDate: "",
    selectedTime: "",
    marketingConsent: false,
    termsAccepted: false,
    // Additional fields for Strapi compatibility
    datePreference: "",
    creneauHoraire: "",
    optinMarketing: false,
    conditionsAcceptees: false,
    source: "website",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<AutoLeadResponse | null>(null);

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
    if (!value?.trim()) return false;
    // Check length and pattern (10-20 chars)
    return (
      value.length >= 10 && value.length <= 20 && /^[0-9+\s()\-]+$/.test(value)
    );
  };

  const stepValidationMap = useMemo<Record<number, () => boolean>>(
    () => ({
      0: () => {
        return Boolean(data.typeDeVoiture);
      },
      1: () => {
        return Boolean(data.dateMiseEnCirculation);
      },
      2: () => {
        return Boolean(data.carburant);
      },
      3: () => {
        return data.chevaux > 0;
      },
      4: () => {
        return Boolean(data.valeurEstimee);
      },
      5: () => {
        return Boolean(data.ageDeVoiture);
      },
      6: () => {
        // Step 6 is the contact form - email is now optional
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
    // Get the steps that should be validated based on car type
    const allStepKeys = Object.keys(stepValidationMap).map(Number);

    // If "Nouvel Achat", skip Step 5 (age validation)
    const stepsToValidate =
      data.typeDeVoiture === "Nouvel Achat"
        ? allStepKeys.filter((key) => key !== 5)
        : allStepKeys;

    return stepsToValidate.every((key) => stepValidationMap[key]());
  };

  const submitForm = async (): Promise<AutoLeadResponse> => {
    if (!isFormValid()) {
      return {
        success: false,
        error: "Veuillez remplir tous les champs requis",
      };
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Send professional email with original form data format
      const emailResponse = await fetch("/api/send-devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "auto",
          submitToStrapi: true, // Enable Strapi submission
          email: data.email,
          firstName: data.prenom,
          lastName: data.nom,
          formData: {
            // Send original form fields for email template
            firstName: data.prenom,
            lastName: data.nom,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            phone: data.phone,
            telephone: data.phone,
            typeDeVoiture: data.typeDeVoiture,
            carburant: data.carburant,
            ageDeVoiture: data.ageDeVoiture,
            chevaux: data.chevaux,
            valeurEstimee: data.valeurEstimee,
            dateMiseEnCirculation: data.dateMiseEnCirculation,
            selectedDate: data.selectedDate,
            selectedTime: data.selectedTime,
            marketingConsent: data.marketingConsent,
            termsAccepted: data.termsAccepted,
            // Add Strapi compatible fields for backend submission
            typeAchat:
              data.typeDeVoiture === "Nouvel Achat"
                ? "nouvel_achat"
                : "occasion",
            typeCarburant:
              data.carburant === "Essence"
                ? "essence"
                : data.carburant === "Diesel"
                  ? "diesel"
                  : data.carburant === "Hybride"
                    ? "hybride"
                    : "electrique",
            puissanceFiscale: data.chevaux || 9,
            valeurVehicule: parseInt(data.valeurEstimee) || 0,
            conditionsAcceptees: data.termsAccepted || false,
            ageVoiture:
              data.typeDeVoiture === "Occasion"
                ? data.ageDeVoiture === "Moins de 5 ans"
                  ? "moins_5_ans"
                  : data.ageDeVoiture === "Plus de 5 ans"
                    ? "plus_5_ans"
                    : undefined
                : undefined,
            datePreference: data.selectedDate
              ? new Date(data.selectedDate).toISOString().split("T")[0]
              : null,
            creneauHoraire: data.selectedTime || null,
            optinMarketing: data.marketingConsent || false,
            source: "website",
          },
        }),
      });

      if (!emailResponse.ok) {
        const emailResult = await emailResponse.json();
        // Handle rate limiting and security errors
        if (emailResult.type === "rate_limit") {
          const retryAfter = emailResult.retryAfter || 60;
          const minutes = Math.ceil(retryAfter / 60);
          throw new Error(
            `Vous avez dépassé la limite de tentatives. Veuillez patienter ${minutes} minute(s) avant de réessayer.`
          );
        }
        if (emailResult.type === "validation_error" && emailResult.message) {
          throw new Error(emailResult.message);
        }
        throw new Error(`Email API error: ${emailResponse.status}`);
      }

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        const result: AutoLeadResponse = {
          success: true,
          message:
            "Votre demande d'assurance automobile a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
          data: {
            emailSent: true,
            devisNumber: emailResult.devisNumber,
            strapiSubmitted: true,
          },
        };
        setSubmissionResult(result);
        return result;
      } else {
        throw new Error(
          emailResult.error || "Erreur lors de l'envoi de l'email"
        );
      }
    } catch (error) {
      const errorResult: AutoLeadResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la soumission du formulaire",
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

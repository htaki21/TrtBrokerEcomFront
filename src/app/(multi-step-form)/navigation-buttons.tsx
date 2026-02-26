"use client";

import { ArrowIcon } from "@/app/components/icons/ArrowIcon";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface NavigationButtonsProps<T> {
  history?: string[];
  currentStepIndex?: number; // optional for branching
  currentStepId?: string; // optional for branching
  stepsCount: number;
  onNext: () => void;
  onPrev: () => void;
  useFormContextHook: () => T;
}

export default function NavigationButtons<
  T extends {
    isStepValid: (i: string | number) => boolean; // accept string or number
    isFormValid: () => boolean;
    data: Record<string, unknown>;
    submitForm?: () => Promise<{
      success: boolean;
      message?: string;
      error?: string;
    }>;
    isSubmitting?: boolean;
  },
>({
  currentStepIndex = 0,
  currentStepId,
  history,
  stepsCount,
  onNext,
  onPrev,
  useFormContextHook,
}: NavigationButtonsProps<T>) {
  const {
    isStepValid,
    isFormValid,
    submitForm,
    isSubmitting: contextIsSubmitting,
  } = useFormContextHook();
  const [localIsSubmitting, setLocalIsSubmitting] = useState(false);
  const router = useRouter();
  // Simple toast functions
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 5000,
      position: "top-right",
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: "top-right",
    });
  };

  // Use context isSubmitting if available, otherwise use local state
  const isSubmitting = contextIsSubmitting ?? localIsSubmitting;

  // Get the success page path based on current form
  const getSuccessPagePath = useCallback(() => {
    return "/success"; // Use the new unified success page
  }, []);

  const stepKey = currentStepId || currentStepIndex;

  const nextStep = useCallback(() => {
    if (isStepValid(stepKey)) {
      onNext();
    } else {
    }
  }, [stepKey, isStepValid, onNext]);

  const prevStep = useCallback(() => {
    // Only call onPrev if we actually have something to go back to
    if ((currentStepIndex ?? 0) > 0 || (history && history.length > 1)) {
      onPrev();
    }
  }, [currentStepIndex, history, onPrev]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid()) {
      toast.error(
        "Veuillez compléter tous les champs obligatoires avant de procéder à la soumission."
      );
      return;
    }

    try {
      if (submitForm) {
        // Use context submit function if available (professional implementation)
        try {
          const result = await submitForm();

          if (result.success) {
            showSuccess(
              result.message ||
                "Votre demande a été transmise avec succès. Notre équipe vous contactera dans les plus brefs délais."
            );
            // Redirect to success page after successful submission
            setTimeout(() => {
              router.push(getSuccessPagePath());
            }, 3000); // Longer delay to show the success message
          } else {
            // RED TOAST for errors
            showError(
              result.error ||
                result.message ||
                "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client."
            );
          }
        } catch {
          // RED TOAST for errors
          showError(
            "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client."
          );
          return; // Exit early to prevent success toast
        }
      } else {
        // Fallback for forms without submitForm
        setLocalIsSubmitting(true);
        showSuccess(
          "Votre demande a été transmise avec succès. Notre équipe vous contactera dans les plus brefs délais."
        );
        // Redirect to success page for fallback forms too
        setTimeout(() => {
          router.push(getSuccessPagePath());
        }, 3000);
      }
    } catch {
      // RED TOAST for errors
      showError(
        "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client."
      );
      return; // Exit early to prevent success toast
    } finally {
      if (!submitForm) {
        setLocalIsSubmitting(false);
      }
    }
  }, [isFormValid, submitForm, router, getSuccessPagePath]);

  // Helper function to check if we're on a final step
  const isFinalStep = (stepId: string | undefined): boolean => {
    if (!stepId) return false;

    // For assistance voyage form, these are the final steps for each branch:
    // - a4: Schengen (4 steps total)
    // - b3: Monde (3 steps total)
    // - c2: Étudiant (2 steps total)
    // - d3: Expatrié (3 steps total)
    const finalSteps = ["a4", "b3", "c2", "d3"];
    return finalSteps.includes(stepId);
  };

  // Check if we're on a final step (for branching forms) or last step (for regular forms)
  const isOnFinalStep =
    isFinalStep(currentStepId) ||
    (currentStepIndex !== undefined && currentStepIndex === stepsCount - 1);

  const showSubmitButton = isOnFinalStep;
  const showNextButton = !isOnFinalStep;

  // Previous button should always be shown if we can go back (not on first step)
  const showPrevButton =
    (currentStepIndex ?? 0) !== 0 || (history && history.length > 1);

  return (
    <div
      className={`flex items-center ${
        !showPrevButton ? "justify-end" : "justify-between"
      }`}
    >
      {showPrevButton && (
        <button
          type="button"
          onClick={prevStep}
          className="bg-Sage-Gray-Lower hover:bg-BG-BG-3 cursor-pointer rounded-full max-tablet:p-4 px-5 py-3 text-black transition-colors"
        >
          <ArrowIcon direction="left" className="w-6 h-6" />
        </button>
      )}

      <div className="flex gap-2 max-tablet:gap-3">
        {showNextButton && (
          <>
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(stepKey)}
              className={`max-tablet:hidden bg-Primary-500 hover:bg-Brand-600 cursor-pointer rounded-full px-5 py-3 text-white transition-all duration-200 ${
                !isStepValid(stepKey)
                  ? "pointer-events-none opacity-50"
                  : "hover:scale-105"
              }`}
            >
              <ArrowIcon />
            </button>

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(stepKey)}
              className={`hidden max-tablet:flex items-center justify-center gap-1
                 max-w-[240px] w-[240px] p-4 bg-Primary-500 hover:bg-Brand-600 cursor-pointer
                 rounded-full text-white transition-all duration-200 ${
                   !isStepValid(stepKey)
                     ? "pointer-events-none opacity-50"
                     : "hover:scale-105"
                 }`}
            >
              <span className="text-white text-base/[24px] font-medium">
                Suivant
              </span>
              <ArrowIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {showSubmitButton && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`bg-Primary-500 hover:bg-Brand-600 flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-white transition-all duration-200 ${
              !isFormValid() || isSubmitting
                ? "pointer-events-none opacity-50"
                : "hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Envoyer ma demande
                <ArrowIcon />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

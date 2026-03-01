"use client";

import { ArrowIcon } from "@/app/components/icons/ArrowIcon";
import { JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavigationButtons from "../navigation-buttons";
import { useFormContext } from "./context";

// ✅ Import steps & data
import DureeDeLaCouverture from "./branches/duree-de-la-couverture";
import PrimeDeLAssistance from "./branches/prime-de-lassistance";
import SituationFamiliale from "./branches/situation-familiale";
import Transport from "./branches/transport";
import Step1 from "./step1/step1";
import step1Data from "./step1/stepInfo";
import Step2 from "./step2/step2";
import step2Data from "./step2/stepInfo";
import Step3 from "./step3/step3";
import step3Data from "./step3/stepInfo";
import { useDraft } from "../../(with-header)/(pages)/drafts/DraftContext";

// Submit button component for final steps
function FinalStepSubmitButton({
  currentStepId,
  onPrev,
}: {
  currentStepId: string;
  onPrev: () => void;
}) {
  const { submitForm, isFormValid, isSubmitting } = useFormContext();
  const { completeDraft } = useDraft();
  const handleSubmit = async () => {
    if (!isFormValid(currentStepId)) {
      toast.error(
        "Veuillez compléter tous les champs obligatoires avant de procéder à la soumission de votre demande.",
      );
      return;
    }

    if (submitForm) {
      try {
        const result = await submitForm(currentStepId);

        if (result.success) {
          // 🔹 Mark draft as VALIDE
          completeDraft();

          toast.success(
            "Votre demande d'assistance voyage a été transmise avec succès. Notre équipe d'experts vous contactera dans les plus brefs délais pour personnaliser votre couverture.",
          );
          // Handle success - redirect to success page
          setTimeout(() => {
            window.location.href = "/success";
          }, 1000);
        } else {
          toast.error(
            result.error ||
              "Une erreur technique s'est produite lors du traitement de votre demande d'assistance voyage. Veuillez réessayer ou contacter notre service client.",
          );
        }
      } catch {
        toast.error(
          "Une erreur technique s'est produite lors du traitement de votre demande. Veuillez réessayer ou contacter notre service client.",
        );
      }
    }
  };

  const formValid = isFormValid(currentStepId);

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        className="bg-Sage-Gray-Lower hover:bg-BG-BG-3 cursor-pointer rounded-full max-tablet:p-4 px-5 py-3 text-black transition-colors"
      >
        <ArrowIcon direction="left" className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!formValid || isSubmitting}
        className={`bg-Primary-500 hover:bg-Brand-600 flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-white transition-all duration-200 ${
          !formValid || isSubmitting
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
    </div>
  );
}

// -------------------------------------------
// STEP CONFIG (branching logic)
// -------------------------------------------
type Step = {
  component: JSX.Element;
  next?: (data?: Record<string, unknown>) => string | null;
  title?: string;
  header?: string;
  description?: string;
};

export default function FormSteps() {
  const { data, setData } = useFormContext();

  const stepConfig: Record<string, Step> = {
    // Common steps
    step1: {
      ...step1Data,
      component: <Step1 />,
      next: () => "step2",
    },
    step2: {
      ...step2Data,
      component: <Step2 />,
      next: (data?: Record<string, unknown>) => {
        if (!data) return null;
        switch (data.assistanceVoyage) {
          case "Schengen":
            return "a1";
          case "Monde":
            return "b1";
          case "Étudiant":
            return "c1";
          case "Expatrié":
            return "d1";
          default:
            return null;
        }
      },
    },

    // 🔹 Branch A
    a1: {
      title: "Durée de la couverture",
      header: "Confirmez la durée de votre couverture",
      description:
        "Indiquez la période pendant laquelle vous souhaitez être protégé.e",
      component: <DureeDeLaCouverture />,
      next: () => "a2",
    },
    a2: {
      title: "Transport",
      header: "Voyagez-vous avec votre véhicule personnel ?",
      description:
        "Indiquez la période pendant laquelle vous souhaitez être protégé.",
      component: <Transport />,
      next: () => "a3",
    },
    a3: {
      title: "Prime de l'assistance",
      component: <PrimeDeLAssistance price={350} />,
      next: () => "a4",
    },
    a4: { ...step3Data, component: <Step3 /> },

    // 🔹 Branch B
    b1: {
      title: "Durée de la couverture",
      header: "Confirmez la durée de votre couverture",
      description:
        "Indiquez la période pendant laquelle vous souhaitez être protégé.e",
      component: <DureeDeLaCouverture />,
      next: () => "b2",
    },
    b2: {
      title: "Prime de l'assistance",
      component: <PrimeDeLAssistance price={350} />,
      next: () => "b3",
    },
    b3: { ...step3Data, component: <Step3 /> },

    // 🔹 Branch C
    c1: {
      title: "Prime de l'assistance",
      component: <PrimeDeLAssistance price={500} />,
      next: () => "c2",
    },
    c2: { ...step3Data, component: <Step3 /> },

    // 🔹 Branch D
    d1: {
      title: "Situation familiale",
      header: "Votre situation familiale ?",
      description:
        "Indiquez la période pendant laquelle vous souhaitez être protégé.",
      component: <SituationFamiliale />,
      next: () => "d2",
    },
    d2: {
      title: "Prime de l'assistance",
      component: <PrimeDeLAssistance price={350} />,
      next: () => "d3",
    },
    d3: { ...step3Data, component: <Step3 /> },
  };

  const [currentStepId, setCurrentStepId] =
    useState<keyof typeof stepConfig>("step1");
  const [history, setHistory] = useState<string[]>(["step1"]);

  const currentStep = stepConfig[currentStepId];

  // Define final steps for each assistance type
  const finalSteps = ["a4", "b3", "c2", "d3"];

  // Check if we're on a final step
  const isFinalStep = finalSteps.includes(currentStepId);

  // Only count steps inside a branch
  const isBranchStep =
    currentStepId.startsWith("a") ||
    currentStepId.startsWith("b") ||
    currentStepId.startsWith("c") ||
    currentStepId.startsWith("d");

  // Count branch-only progress
  const branchStepsVisited = history.filter(
    (id) =>
      id.startsWith("a") ||
      id.startsWith("b") ||
      id.startsWith("c") ||
      id.startsWith("d"),
  );

  const totalBranchSteps = Object.keys(stepConfig).filter(
    (id) => id.startsWith(currentStepId[0]), // A, B, C, or D branch
  ).length;

  const progressPercent = isBranchStep
    ? Math.round((branchStepsVisited.length / totalBranchSteps) * 100)
    : 0;

  const clearBranchData = () => {
    setData((prev) => ({
      ...prev,
      dureedelacouverture: "", // reset string fields
      transport: "", // reset string fields
      situationfamiliale: "", // reset string fields
      primedelassistance: 0, // reset numeric fields
    }));
  };

  const handleNext = () => {
    const nextId = currentStep.next?.(data);
    // If we are leaving step2 and switching branch, clear branch-specific fields
    if (currentStepId === "step2") {
      clearBranchData();
    }
    if (nextId) {
      setCurrentStepId(nextId);
      setHistory((h) => [...h, nextId]);
    }
  };

  const handlePrev = () => {
    if (history.length > 1) {
      const newHist = [...history];
      newHist.pop();
      const prevId = newHist[newHist.length - 1];
      setHistory(newHist);
      setCurrentStepId(prevId as keyof typeof stepConfig);
    }
  };

  const { registerDraftData } = useDraft();

  useEffect(() => {
    registerDraftData({
      product: "devis-assurance-assistance-voyage",
      productName: "Assistance Voyage",
      formData: data,
      currentStep: branchStepsVisited.length,
      totalSteps: totalBranchSteps,
      title: isBranchStep ? (currentStep?.title ?? "") : "",
    });
  }, [currentStepId, history.length]);

  return (
    <div className="flex w-full flex-col max-tablet:min-h-svh max-tablet:pb-[200px] items-center bg-white px-4">
      <div className="w-full max-w-[1180px]">
        {/* ✅ Show progress ONLY inside branches */}
        {isBranchStep && (
          <>
            {/* Desktop progress */}
            <div className="flex max-tablet:hidden bg-Sage-Gray-Lowest my-5 w-full flex-col gap-2 rounded-2xl p-5">
              <div className="flex flex-col gap-2">
                <div className="text-BG-BG-5 button-s flex justify-between">
                  <h4>
                    Étape {branchStepsVisited.length} sur {totalBranchSteps}
                  </h4>
                  <h4>{progressPercent}%</h4>
                </div>
                <span className="relative">
                  <span
                    className="bg-Neutral-Dark absolute inset-0 block rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <span className="bg-Sage-Gray-Low flex h-1 w-full rounded-full"></span>
                </span>
              </div>
              {currentStep?.title && (
                <h3 className="text-Neutral-Dark button-s">
                  {currentStep.title}
                </h3>
              )}
            </div>

            {/* Mobile progress */}
            <div className="hidden max-tablet:flex w-full flex-col items-center gap-1 py-3">
              {currentStep?.title && (
                <h3 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
                  {currentStep.title}
                </h3>
              )}
              <div className="flex w-full items-center gap-1">
                <h4 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
                  {branchStepsVisited.length} / {totalBranchSteps}
                </h4>
                <span className="relative flex-1">
                  <span
                    className="bg-Neutral-Dark absolute inset-0 block rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <span className="bg-Sage-Gray-Low flex h-1 w-full rounded-full"></span>
                </span>
                <h4 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
                  {progressPercent}%
                </h4>
              </div>
            </div>
          </>
        )}

        {/* Step content */}
        <div className="flex w-full flex-col gap-8 pt-8 pb-[100px] max-tablet:gap-8 max-tablet:pt-2 max-tablet:pb-0">
          <div className="f-col gap-8 max-tablet:gap-5">
            <div className="flex flex-col gap-2 text-balance">
              {currentStep?.header && (
                <h2 className="text-Neutral-Dark text-[32px]/[40px] -tracking-[1px] max-tablet:text-[22px]/[28px] font-medium">
                  {currentStep.header}
                </h2>
              )}
              {currentStep?.description && (
                <p className="text-Text-Body text-[16px]/[24px] max-tablet:text-[14px]/[20px] font-normal">
                  {currentStep.description}
                </p>
              )}
            </div>

            {/* Render current step */}
            {currentStep?.component}
          </div>

          {/* Navigation */}
          {!isFinalStep ? (
            <NavigationButtons
              currentStepId={currentStepId} // string ID like "a1"
              currentStepIndex={undefined} // Not used for branching forms
              history={history}
              stepsCount={Object.keys(stepConfig).length}
              onNext={handleNext}
              onPrev={handlePrev}
              useFormContextHook={useFormContext}
            />
          ) : (
            // Show submit button for final steps
            <FinalStepSubmitButton
              currentStepId={currentStepId}
              onPrev={handlePrev}
            />
          )}
        </div>
      </div>
    </div>
  );
}

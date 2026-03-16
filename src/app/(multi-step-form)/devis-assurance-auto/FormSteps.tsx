"use client";

import { useEffect, useState } from "react";
import NavigationButtons from "../navigation-buttons";
import { useFormContext } from "./context";
import Step1 from "./step1/step1";
import step1Data from "./step1/stepInfo";
import Step2 from "./step2/step2";
import step2Data from "./step2/stepInfo";
import Step3 from "./step3/step3";
import step3Data from "./step3/stepInfo";
import Step4 from "./step4/step4";
import step4Data from "./step4/stepInfo";
import Step5 from "./step5/step5";
import step5Data from "./step5/stepInfo";
import Step6 from "./step6/step6";
import step6Data from "./step6/stepInfo";
import Step7 from "./step7/step7";
import step7Data from "./step7/stepInfo";
import { useDraft } from "../../(with-header)/(pages)/drafts/DraftContext";
import { useSearchParams } from "next/navigation";

export default function FormSteps() {
  const { data, setData, clearFieldError } = useFormContext(); // your form state hook
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stepDataList = [
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    step6Data,
    step7Data,
  ];

  // Define step indices
  const allStepIndices = stepDataList.map((_, i) => i);

  // Conditional skip: if "Nouvel Achat", skip Step6 (index 5)
  const filteredStepIndices =
    data?.typeDeVoiture === "Nouvel Achat"
      ? allStepIndices.filter((i) => i !== 5)
      : allStepIndices;

  const stepsCount = filteredStepIndices.length;
  const currentStepIndexFiltered = filteredStepIndices[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex + 1 < stepsCount) {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  const steps = [
    <Step1 key="step1" goToNextStep={handleNext} />,
    <Step2 key="step2" />,
    <Step3 key="step3" goToNextStep={handleNext} />,
    <Step4 key="step4" />,
    <Step5 key="step5" />,
    <Step6 key="step6" goToNextStep={handleNext} />,
    <Step7 key="step7" />,
  ];

  const currentStep = stepDataList[currentStepIndexFiltered];
  const currentStepComponent = steps[currentStepIndexFiltered];

  // Get the original context
  const originalContext = useFormContext();

  // Create a custom validation function that maps UI step to actual step
  const customUseFormContext = () => {
    return {
      ...originalContext,
      isStepValid: (stepIndex: string | number) => {
        const uiStepIndex =
          typeof stepIndex === "string" ? parseInt(stepIndex, 10) : stepIndex;
        const actualStepIndex = filteredStepIndices[uiStepIndex];
        return originalContext.isStepValid(actualStepIndex);
      },
    };
  };

  const progressPercent = ((currentStepIndex + 1) / stepsCount) * 100;

  const { drafts, loadDraft, registerDraftData, setDraftId } = useDraft();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");

  // 1️⃣ Restore draft if URL contains draftId
  useEffect(() => {
    if (draftId && drafts.length) {
      const draft = drafts.find((d) => d.id === draftId);
      if (draft) {
        setDraftId(draft.id); // restore draftId in context
        loadDraft(draft); // restore registeredData
        setCurrentStepIndex(draft.currentStep - 1); // -1 because index starts at 0
        setData(draft.formData); // restore form inputs
        // Clear any stale field errors so validation re-evaluates cleanly
        clearFieldError("email");
        clearFieldError("phone");
      }
    }
  }, [draftId, drafts]);
  // 🔥 REGISTER DRAFT DATA HERE
  useEffect(() => {
    const timeout = setTimeout(() => {
      registerDraftData({
        product: "devis-assurance-auto",
        productName: "Assurance Auto",
        formData: data,
        currentStep: currentStepIndex + 1,
        totalSteps: stepsCount,
        title: currentStep?.title ?? "",
      });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [currentStepIndex, data, stepsCount, registerDraftData]);

  return (
    <div className="flex w-full flex-col max-tablet:min-h-svh max-tablet:pb-[200px] items-center bg-white px-4">
      <div className="w-full max-w-[1180px]">
        {/* Desktop progress */}
        <div className="flex max-tablet:hidden bg-Sage-Gray-Lowest my-5 w-full flex-col gap-2 rounded-2xl p-5">
          <div className="flex flex-col gap-2">
            <div className="text-BG-BG-5 button-s flex justify-between">
              <h4>
                Étape {currentStepIndex + 1} sur {stepsCount}
              </h4>
              <h4>{Math.round(progressPercent)}%</h4>
            </div>
            <span className="relative">
              <span
                className="bg-Neutral-Dark absolute inset-0 block rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
              <span className="bg-Sage-Gray-Low flex h-1 w-full rounded-full"></span>
            </span>
          </div>
          <h3 className="text-Neutral-Dark button-s">
            {currentStep?.title || ""}
          </h3>
        </div>

        {/* Mobile progress */}
        <div className="hidden max-tablet:flex w-full flex-col items-center gap-1 py-3">
          <h3 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
            {currentStep?.title || ""}
          </h3>
          <div className="flex w-full items-center gap-1">
            <h4 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
              {currentStepIndex + 1} / {stepsCount}
            </h4>
            <span className="relative flex-1">
              <span
                className="bg-Neutral-Dark absolute inset-0 block rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
              <span className="bg-Sage-Gray-Low flex h-1 w-full rounded-full"></span>
            </span>
            <h4 className="text-Sage-Gray-Higher text-[12px]/[20px] font-medium">
              {Math.round(progressPercent)}%
            </h4>
          </div>
        </div>

        {/* Step content */}
        <div className="flex w-full flex-col gap-8 pt-8 pb-[100px] max-tablet:gap-8 max-tablet:pt-2 max-tablet:pb-0">
          <div className="f-col gap-8 max-tablet:gap-5">
            <div className="flex flex-col gap-2 text-balance">
              <h2 className="text-Neutral-Dark text-[32px]/[40px] -tracking-[1px] max-tablet:text-[22px]/[28px] font-medium">
                {currentStep?.header}
              </h2>
              <p className="text-Text-Body text-[16px]/[24px] max-tablet:text-[14px]/[20px] font-normal">
                {currentStep?.description}
              </p>
            </div>

            {/* Render the actual step */}
            {currentStepComponent}
          </div>

          {/* Navigation */}
          <NavigationButtons
            currentStepIndex={currentStepIndex}
            stepsCount={stepsCount}
            onNext={handleNext}
            onPrev={handlePrev}
            useFormContextHook={customUseFormContext}
          />
        </div>
      </div>
    </div>
  );
}

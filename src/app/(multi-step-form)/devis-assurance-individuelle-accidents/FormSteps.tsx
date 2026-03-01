"use client";

import { useEffect, useState } from "react";
import NavigationButtons from "../navigation-buttons";
import { useFormContext } from "./context";
import Step1 from "./step1/step1";
import step1Data from "./step1/stepInfo";
import Step2 from "./step2/step2";
import step2Data from "./step2/stepInfo";
import { useDraft } from "../../(with-header)/(pages)/drafts/DraftContext";

export default function FormSteps() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stepDataList = [step1Data, step2Data];
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
  ];

  const stepsCount = steps.length;
  const currentStep = stepDataList[currentStepIndex];
  const currentStepComponent = steps[currentStepIndex];

  // const progressPercent = ((currentStepIndex + 1) / stepsCount) * 100;

  const { data } = useFormContext();
  const { registerDraftData } = useDraft();
  // 🔥 REGISTER DRAFT DATA HERE
  useEffect(() => {
    registerDraftData({
      product: "devis-assurance-individuelle-accidents", // change per multistep
      productName: "Individuelle Accidents", // change per multistep
      formData: data,
      currentStep: currentStepIndex + 1, // +1 because index starts at 0
      totalSteps: stepsCount,
      title: "",
    });
  }, []); // only once on mount

  return (
    <div className="flex w-full flex-col max-tablet:min-h-svh max-tablet:pb-[200px] items-center bg-white px-4">
      <div className="w-full max-w-[1180px]">
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
          {currentStepIndex > 0 && (
            <NavigationButtons
              currentStepIndex={currentStepIndex}
              stepsCount={stepsCount}
              onNext={handleNext}
              onPrev={handlePrev}
              useFormContextHook={useFormContext}
            />
          )}
        </div>
      </div>
    </div>
  );
}

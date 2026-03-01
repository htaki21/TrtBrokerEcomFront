"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import {
  DraftProduct,
  Draft,
  saveOrUpdateDraft,
  validateDraft,
} from "../(with-header)/(pages)/drafts/draftManager";

type RegisteredDraftData = {
  product: DraftProduct;
  productName: string;
  formData: any;
  currentStep: number;
  totalSteps: number;
};

type DraftContextType = {
  registerDraftData: (data: RegisteredDraftData) => void;
  saveAndExit: () => void;
  completeDraft: () => void;
};

const DraftContext = createContext<DraftContextType | null>(null);

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [draftId, setDraftId] = useState<string | null>(null);
  const [registeredData, setRegisteredData] =
    useState<RegisteredDraftData | null>(null);

  const registerDraftData = (data: RegisteredDraftData) => {
    setRegisteredData(data);
  };

  const saveAndExit = () => {
    if (!registeredData) return;

    const id = draftId ?? crypto.randomUUID();

    const draft: Draft = {
      id,
      reference: "TRT-" + Math.floor(Math.random() * 99999),
      status: "EN_COURS",
      updatedAt: new Date().toISOString(),
      ...registeredData,
    };

    saveOrUpdateDraft(draft);
    setDraftId(id);
    router.push("/drafts");
  };

  const completeDraft = () => {
    let id = draftId;

    // If no draftId yet, create a draft first
    if (!id && registeredData) {
      id = crypto.randomUUID();
      const draft: Draft = {
        id,
        reference: "TRT-" + Math.floor(Math.random() * 99999),
        status: "EN_COURS",
        updatedAt: new Date().toISOString(),
        ...registeredData,
      };
      saveOrUpdateDraft(draft);
      setDraftId(id);
    }

    if (id) {
      validateDraft(id); // marks as VALIDE
    }
  };

  return (
    <DraftContext.Provider
      value={{ registerDraftData, saveAndExit, completeDraft }}
    >
      {children}
    </DraftContext.Provider>
  );
}

export const useDraft = () => {
  const context = useContext(DraftContext);
  if (!context) throw new Error("useDraft must be used inside DraftProvider");
  return context;
};

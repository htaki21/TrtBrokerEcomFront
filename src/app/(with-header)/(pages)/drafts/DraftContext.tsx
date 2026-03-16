"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Draft,
  DraftProduct,
  saveOrUpdateDraft,
  getDrafts,
} from "./draftManager";

type RegisteredDraftData = {
  product: DraftProduct;
  productName: string;
  formData: any;
  currentStep: number;
  totalSteps: number;
  title: string;
  currentStepId?: string;
  history?: string[];
};

type DraftContextType = {
  drafts: Draft[];
  draftId: string | null;
  registeredData: RegisteredDraftData | null;
  setDraftId: (id: string | null) => void;
  loadDraft: (draft: Draft) => void; // restore draft
  registerDraftData: (data: RegisteredDraftData) => void;
  saveAndExit: () => void;
  completeDraft: () => void;
  deleteDraft: (id: string) => void;
};

const DraftContext = createContext<DraftContextType | null>(null);

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [draftId, setDraftId] = useState<string | null>(null);
  const [registeredData, setRegisteredData] =
    useState<RegisteredDraftData | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => setDrafts(getDrafts()), []);
  useEffect(() => {
    const handleStorage = () => setDrafts(getDrafts());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loadDraft = (draft: Draft) => {
    setDraftId(draft.id);
    setRegisteredData({
      product: draft.product,
      productName: draft.productName,
      formData: draft.formData,
      currentStep: draft.currentStep,
      totalSteps: draft.totalSteps,
      title: draft.title,
      currentStepId: draft.currentStepId,
      history: draft.history,
    });
  };

  const registerDraftData = (data: RegisteredDraftData) => {
    setRegisteredData(data);
  };

  const saveAndExit = () => {
    if (!registeredData) return;
    const id = draftId ?? crypto.randomUUID();
    const existing = drafts.find((d) => d.id === id);
    const draft: Draft = {
      id,
      reference: existing?.reference || "TRT-" + Math.floor(Math.random() * 99999),
      status: "EN_COURS",
      updatedAt: new Date().toISOString(),
      ...registeredData,
    };
    saveOrUpdateDraft(draft);
    setDraftId(null);
    setRegisteredData(null);
    setDrafts(getDrafts());
    router.push("/drafts");
  };

  const completeDraft = () => {
    // When form is submitted, remove the draft — the lead is now in "Mes contrats"
    if (draftId) {
      const updated = drafts.filter((d) => d.id !== draftId);
      try {
        localStorage.setItem("drafts", JSON.stringify(updated));
      } catch {}
      setDrafts(updated);
    }
    setDraftId(null);
    setRegisteredData(null);
  };

  const deleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    localStorage.setItem("drafts", JSON.stringify(updated));
    setDrafts(updated);
  };

  return (
    <DraftContext.Provider
      value={{
        drafts,
        draftId,
        registeredData,
        setDraftId,
        loadDraft,
        registerDraftData,
        saveAndExit,
        completeDraft,
        deleteDraft,
      }}
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

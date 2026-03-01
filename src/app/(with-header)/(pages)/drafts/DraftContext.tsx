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
};

type DraftContextType = {
  drafts: Draft[];
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

  // Load drafts from localStorage on mount
  useEffect(() => {
    setDrafts(getDrafts());
  }, []);

  useEffect(() => {
    const handleStorage = () => setDrafts(getDrafts());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const registerDraftData = (data: RegisteredDraftData) => {
    setRegisteredData(data);
  };

  const refreshDrafts = () => setDrafts(getDrafts());

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

    saveOrUpdateDraft(draft); // write to localStorage
    setDraftId(null); // reset so next draft is new
    setRegisteredData(null); // clear current form data
    refreshDrafts(); // updates context state immediately
    router.push("/drafts");
  };

  const completeDraft = () => {
    if (!registeredData) return;

    const id = draftId ?? crypto.randomUUID();

    const draft: Draft = {
      id,
      reference: "TRT-" + Math.floor(Math.random() * 99999),
      status: "VALIDE", // mark as validated directly
      updatedAt: new Date().toISOString(),
      ...registeredData,
    };

    saveOrUpdateDraft(draft);
    setDraftId(null); // reset for next draft
    setRegisteredData(null);
    refreshDrafts(); // reactive update
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

// lib/draftManager.ts

export type DraftStatus = "EN_COURS" | "VALIDE";

export type DraftProduct =
  | "devis-assurance-assistance-voyage"
  | "devis-assurance-auto"
  | "devis-assurance-habitation"
  | "devis-assurance-individuelle-accidents"
  | "devis-assurance-moto"
  | "devis-assurance-plaisance-jet-ski"
  | "devis-assurance-sante";

export interface Draft {
  id: string;
  product: DraftProduct;
  reference: string;
  productName: string;
  currentStep: number;
  totalSteps: number;
  status: DraftStatus;
  updatedAt: string;
  formData: any;
  title: string;
}

const KEY = "drafts";

export const getDrafts = (): Draft[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const saveOrUpdateDraft = (draft: Draft) => {
  const drafts = getDrafts();
  const exists = drafts.find((d) => d.id === draft.id);

  const updated = exists
    ? drafts.map((d) => (d.id === draft.id ? draft : d))
    : [...drafts, draft];

  localStorage.setItem(KEY, JSON.stringify(updated));
};

export const validateDraft = (id: string) => {
  const drafts = getDrafts().map((d) =>
    d.id === id
      ? { ...d, status: "VALIDE", updatedAt: new Date().toISOString() }
      : d,
  );

  localStorage.setItem(KEY, JSON.stringify(drafts));
};

export const deleteDraft = (id: string) => {
  const drafts = getDrafts().filter((d) => d.id !== id);
  localStorage.setItem(KEY, JSON.stringify(drafts));
};

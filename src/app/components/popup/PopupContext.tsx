"use client";
import { createContext, useContext, useState } from "react";

type PopupType = "Search" | "Enregistrer" | "Supprimer le devis" | null;

interface PopupContextType {
  activePopup: PopupType;
  payload?: any; // optional data for the popup (e.g., draftId)
  open: (popup: PopupType, payload?: any) => void;
  close: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [payload, setPayload] = useState<any>(null);

  const open = (popup: PopupType, payload?: any) => {
    setActivePopup(popup);
    setPayload(payload ?? null);
  };

  const close = () => {
    setActivePopup(null);
    setPayload(null);
  };

  return (
    <PopupContext.Provider value={{ activePopup, payload, open, close }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
}

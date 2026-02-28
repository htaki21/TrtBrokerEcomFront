"use client";
import { createContext, useContext, useState } from "react";

type PopupType = "search" | "Enregistrer" | "Supprimer le devis" | null;

interface PopupContextType {
  activePopup: PopupType;
  open: (popup: PopupType) => void;
  close: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const open = (popup: PopupType) => setActivePopup(popup);
  const close = () => setActivePopup(null);

  return (
    <PopupContext.Provider value={{ activePopup, open, close }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
}

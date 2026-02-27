"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <PopupContext.Provider value={{ open, close, isOpen }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used inside PopupProvider");
  }
  return context;
}

"use client";

import { useEffect } from "react";
import { usePopup } from "./PopupContext";
import { IconX } from "./PopupSupprimerledevis";
import { IconDownload } from "@/app/(with-header)/(pages)/compte/page";

export default function PopupCompteAssurance() {
  const { activePopup, payload, close } = usePopup();
  const isOpen = activePopup === "PopupCompteAssurance";

  // Close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, close]);

  if (!isOpen || !payload) return null;

  const lead = payload;
  const createdDate = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString("fr-FR")
    : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="relative p-8 f-col items-end gap-9 z-10 w-full max-w-[664px]
      rounded-4xl border border-Sage-Gray-Lower bg-white shadow-lg"
      >
        <div className="f-col gap-6 w-full">
          <div className="f-col gap-2">
            <h4 className="Headings-H4">{lead.type}</h4>
            <span className="Text-S text-Sage-Gray-Higher">TRT-{lead.id}</span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <span className="Text-S text-Sage-Gray-Higher">Nom</span>
            <span className="button-s">{lead.prenom} {lead.nom}</span>
            <span className="Text-S text-Sage-Gray-Higher">Date de demande</span>
            <span className="button-s">{createdDate}</span>
            <span className="Text-S text-Sage-Gray-Higher">Statut</span>
            <span className={`button-s w-fit py-1 px-3 rounded-full text-[12px] font-medium ${
              lead.status === "Validé" || lead.status === "VALIDE"
                ? "bg-green-100 text-green-700"
                : lead.status === "Refusé"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {lead.status}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="flex-center gap-1 flex-1 py-3 px-5 rounded-full transition
           bg-Brand-500 text-white hover:bg-Brand-600 cursor-pointer"
        >
          <IconDownload className=" shrink-0" />
          <span>Télécharger le contrat</span>
        </button>
        <button
          onClick={close}
          type="button"
          className=" absolute top-3 right-3 p-2 bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium cursor-pointer rounded-full transition"
        >
          <IconX className="size-5 shrink-0" />
        </button>
      </div>
    </div>
  );
}

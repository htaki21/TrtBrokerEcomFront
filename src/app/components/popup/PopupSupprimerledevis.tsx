"use client";

import { useEffect } from "react";
import { usePopup } from "./PopupContext";
import { SVGProps } from "react";
import { deleteDraft } from "@/app/(with-header)/(pages)/drafts/draftManager";
import { useDraft } from "@/app/(with-header)/(pages)/drafts/DraftContext";

export function IconDelete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0391 2.66663C19.5988 2.66657 20.1448 2.84323 20.599 3.17053C21.0529 3.49789 21.3922 3.95984 21.569 4.49084L22.293 6.66663H26.6667C27.0203 6.66663 27.3593 6.8072 27.6094 7.05725C27.8594 7.3073 28 7.64634 28 7.99996C28 8.35358 27.8594 8.69262 27.6094 8.94267C27.3593 9.19272 27.0203 9.33329 26.6667 9.33329H25.3333V25.3333C25.3333 26.3942 24.9116 27.4113 24.1615 28.1614C23.4113 28.9116 22.3942 29.3333 21.3333 29.3333H10.6667C9.6058 29.3333 8.58869 28.9116 7.83854 28.1614C7.0884 27.4113 6.66667 26.3942 6.66667 25.3333V9.33329H5.33333C4.97971 9.33329 4.64067 9.19272 4.39062 8.94267C4.14058 8.69262 4 8.35358 4 7.99996C4 7.64634 4.14058 7.3073 4.39062 7.05725C4.64067 6.8072 4.97971 6.66663 5.33333 6.66663H9.70703L10.431 4.49084C10.6078 3.95984 10.9471 3.49789 11.401 3.17053C11.8552 2.84323 12.4012 2.66657 12.9609 2.66663H19.0391ZM12.9609 5.33329L12.5156 6.66663H19.4844L19.0391 5.33329H12.9609Z"
        fill="white"
      />
    </svg>
  );
}
export function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.6825 5.43294C13.9266 5.18886 14.3231 5.18886 14.5671 5.43294C14.811 5.67689 14.8108 6.07264 14.5671 6.31673L10.8839 9.99999L14.5671 13.6824C14.8112 13.9265 14.8112 14.323 14.5671 14.567C14.3231 14.8111 13.9266 14.8111 13.6825 14.567L10.0001 10.8838L6.31681 14.567L6.26961 14.6102C6.02415 14.8101 5.66174 14.7957 5.43302 14.567C5.20431 14.3383 5.18998 13.9759 5.38989 13.7305L5.43302 13.6824L9.11629 9.99999L5.43302 6.31673C5.18926 6.07262 5.18905 5.67691 5.43302 5.43294C5.67699 5.18897 6.07271 5.18918 6.31681 5.43294L10.0001 9.1162L13.6825 5.43294Z"
        fill="#0F110C"
      />
    </svg>
  );
}

export default function PopupSupprimerledevis() {
  const { activePopup, payload, close } = usePopup();
  const { deleteDraft } = useDraft(); // use context directly
  const isOpen = activePopup === "Supprimer le devis";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative p-8 f-col gap-7 z-10 w-full max-w-[664px] rounded-[20px] border border-Sage-Gray-Lower bg-white shadow-lg overflow-y-auto hide-scrollbar">
        <div className="flex items-start justify-between">
          <div className="f-col items-start gap-3">
            <span className="p-3 bg-Secondary-Red-Medium rounded-[12px]">
              <IconDelete className=" shrink-0" />
            </span>
            <div className="f-col gap-2">
              <h4 className="Headings-H4">Supprimer ce devis ?</h4>
              <p className="text-Sage-Gray-Higher Text-M">
                Cette action est définitive. <br /> Si vous supprimez ce devis,
                vous ne pourrez plus le reprendre.
              </p>
            </div>
          </div>
          <button
            onClick={close}
            type="button"
            className="p-2 bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium cursor-pointer rounded-full transition"
          >
            <IconX className=" shrink-0" />
          </button>
        </div>
        <div className="flex gap-2 button-s">
          <button
            onClick={close}
            type="button"
            className="py-2 px-4 flex-center flex-1 rounded-full bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (payload?.draftId) deleteDraft(payload.draftId); // directly updates context
              close();
            }}
            type="button"
            className="py-2 px-4 flex-center flex-1 rounded-full bg-Secondary-Red-Medium hover:bg-Secondary-Red-Higher transition cursor-pointer text-white"
          >
            Supprimer le devis
          </button>
        </div>
      </div>
    </div>
  );
}

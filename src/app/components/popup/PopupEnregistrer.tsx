"use client";

import { useEffect } from "react";
import { usePopup } from "./PopupContext";
import { SVGProps } from "react";
import { IconX } from "./PopupSupprimerledevis";
import { useDraft } from "@/app/(multi-step-form)/DraftContext";


export function IconAlert(props: SVGProps<SVGSVGElement>) {
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
        d="M14.2682 4.19788C15.0376 2.86454 16.9611 2.86454 17.7318 4.19788L29.2448 24.1354C29.4202 24.4393 29.5116 24.7845 29.5117 25.1354C29.5117 25.4862 29.4201 25.8315 29.2448 26.1354C29.0693 26.4394 28.8158 26.6929 28.5117 26.8685C28.2078 27.0438 27.8626 27.1354 27.5117 27.1354H4.48828C4.13731 27.1354 3.79225 27.0439 3.48828 26.8685C3.18425 26.6929 2.93204 26.4394 2.75651 26.1354C2.58107 25.8314 2.48828 25.4864 2.48828 25.1354C2.48837 24.7845 2.58106 24.4393 2.75651 24.1354L14.2682 4.19788ZM16 20C15.6465 20 15.3073 20.1406 15.0573 20.3906C14.8073 20.6406 14.6667 20.9797 14.6667 21.3333C14.6667 21.6869 14.8073 22.026 15.0573 22.276C15.3073 22.526 15.6465 22.6666 16 22.6666C16.3536 22.6666 16.6927 22.526 16.9427 22.276C17.1927 22.026 17.3333 21.6869 17.3333 21.3333C17.3333 20.9797 17.1928 20.6406 16.9427 20.3906C16.6927 20.1406 16.3536 20 16 20ZM16 10.6666C15.6735 10.6667 15.3586 10.7869 15.1146 11.0039C14.8706 11.2208 14.714 11.5195 14.6758 11.8437L14.6667 12V17.3333C14.6671 17.6731 14.798 18.0003 15.0312 18.2474C15.2645 18.4942 15.5829 18.6428 15.9219 18.6627C16.261 18.6826 16.5949 18.5721 16.8555 18.3541C17.116 18.1361 17.284 17.8269 17.3242 17.4895L17.3333 17.3333V12C17.3333 11.6463 17.1928 11.3073 16.9427 11.0573C16.6927 10.8073 16.3536 10.6666 16 10.6666Z"
        fill="white"
      />
    </svg>
  );
}

export default function PopupEnregistrer() {
  const { saveAndExit } = useDraft();
  const { activePopup, close } = usePopup();
  const isOpen = activePopup === "Enregistrer";

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
              <IconAlert className=" shrink-0" />
            </span>
            <div className="f-col gap-2">
              <h4 className="Headings-H4">Quitter sans enregistrer ?</h4>
              <p className="text-Sage-Gray-Higher Text-M">
                Votre devis n’a pas encore été enregistré. <br /> Souhaitez-vous
                le sauvegarder pour le reprendre plus tard ?
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
        <div className="f-col gap-3">
          <div className="flex gap-2 button-s">
            <button
              onClick={() => {
                saveAndExit();
                close(); // close popup
              }}
              type="button"
              className="py-2 px-4 flex-center flex-1 rounded-full bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition cursor-pointer"
            >
              Enregistrer et quitter
            </button>
            <button
              type="button"
              className="py-2 px-4 flex-center flex-1 rounded-full bg-Secondary-Red-Medium hover:bg-Secondary-Red-Higher transition cursor-pointer text-white"
            >
              Quitter sans enregistrer
            </button>
          </div>
          <p className="Text-S text-Sage-Gray-Higher">
            Vous pourrez le retrouver à tout moment dans Mes devis.
          </p>
        </div>
      </div>
    </div>
  );
}

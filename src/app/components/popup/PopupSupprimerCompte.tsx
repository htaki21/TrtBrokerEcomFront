"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePopup } from "./PopupContext";
import { useAuth } from "@/app/components/auth/AuthContext";
import { IconX } from "./PopupSupprimerledevis";
import { IconTrashEmpty } from "@/app/(with-header)/(pages)/compte/page";

export default function PopupSupprimerCompte() {
  const { activePopup, close } = usePopup();
  const { removeAccount } = useAuth();
  const router = useRouter();
  const isOpen = activePopup === "SupprimerCompte";
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && !isDeleting) close();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, isDeleting, close]);

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setIsDeleting(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await removeAccount();
      close();
      router.push("/compte/connexion");
    } catch {
      setError("Erreur lors de la suppression du compte. Veuillez réessayer.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={() => !isDeleting && close()}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative p-8 f-col gap-7 z-10 w-full max-w-[664px] rounded-[20px] border border-Sage-Gray-Lower bg-white shadow-lg overflow-y-auto hide-scrollbar mx-4">
        <div className="flex items-start justify-between">
          <div className="f-col items-start gap-3">
            <span className="p-3 bg-Secondary-Red-Medium rounded-[12px]">
              <IconTrashEmpty className="shrink-0 size-8" />
            </span>
            <div className="f-col gap-2">
              <h4 className="Headings-H4">Supprimer votre compte ?</h4>
              <p className="text-Sage-Gray-Higher Text-M">
                Cette action est définitive et irréversible.
                <br />
                Toutes vos données personnelles, contrats et documents seront
                supprimés de façon permanente.
              </p>
            </div>
          </div>
          <button
            onClick={() => !isDeleting && close()}
            type="button"
            disabled={isDeleting}
            className="p-2 bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium cursor-pointer rounded-full transition disabled:opacity-50"
          >
            <IconX className="shrink-0" />
          </button>
        </div>

        {error && <p className="text-Secondary-Red-High button2-s">{error}</p>}

        <div className="flex gap-2 button-s">
          <button
            onClick={close}
            type="button"
            disabled={isDeleting}
            className="py-2 px-4 flex-center flex-1 rounded-full bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition cursor-pointer disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            type="button"
            disabled={isDeleting}
            className="py-2 px-4 flex-center flex-1 rounded-full bg-Secondary-Red-Medium hover:bg-Secondary-Red-Higher transition cursor-pointer text-white disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Suppression...
              </span>
            ) : (
              "Supprimer mon compte"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

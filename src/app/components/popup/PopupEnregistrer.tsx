"use client";

import { useEffect } from "react";
import { usePopup } from "./PopupContext";
import { SVGProps } from "react";

export function IconSearchClear(props: SVGProps<SVGSVGElement>) {
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
        d="M13.6825 5.43306C13.9266 5.18898 14.3231 5.18898 14.5671 5.43306C14.811 5.67701 14.8108 6.07276 14.5671 6.31685L10.8839 10.0001L14.5671 13.6826C14.8112 13.9266 14.8112 14.3231 14.5671 14.5672C14.3231 14.8112 13.9266 14.8112 13.6825 14.5672L10.0001 10.8839L6.31681 14.5672L6.26961 14.6103C6.02415 14.8102 5.66174 14.7958 5.43302 14.5672C5.20431 14.3385 5.18998 13.9761 5.38989 13.7306L5.43302 13.6826L9.11629 10.0001L5.43302 6.31685C5.18926 6.07274 5.18905 5.67703 5.43302 5.43306C5.67699 5.1891 6.07271 5.1893 6.31681 5.43306L10.0001 9.11633L13.6825 5.43306Z"
        fill="#0F110C"
      />
    </svg>
  );
}

export default function PopupEnregistrer() {
  const { activePopup, close } = usePopup();
  const isOpen = activePopup === "search";

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
      <div className="relative f-col z-10 w-full max-w-[848px] h-[688px] rounded-[20px] border border-Sage-Gray-Lower bg-white shadow-lg overflow-y-auto hide-scrollbar">

      </div>
    </div>
  );
}



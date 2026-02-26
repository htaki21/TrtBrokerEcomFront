"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BtnArrow from "../../../components/buttons/btn-arrow";

export default function SuccessPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[url('/overlay.png'),linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)] bg-[position:bottom,center] bg-[length:contain,cover] bg-no-repeat flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-6">
        {/* Success Icon with Animation */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative mx-auto w-40 h-40">
            {/* Background circle with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br bg-Brand-600  rounded-full shadow-2xl "></div>

            {/* Success checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-white drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  className="animate-draw"
                />
              </svg>
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Success Message with Staggered Animation */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r text-Brand-600 bg-clip-text ">
            Félicitations !
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Demande Envoyée avec Succès
          </h2>
          <p className="text-black/70 text-lg leading-relaxed max-w-lg mx-auto">
            Votre demande d&apos;assurance auto a été soumise et sera traitée
            par notre équipe d&apos;experts. Vous recevrez une confirmation par
            email dans les prochaines minutes.
          </p>
        </div>

        {/* Action Buttons with Hover Effects */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link href="/">
            <BtnArrow
              variant="next"
              direction="left"
              label="Retour à l'accueil"
              iconSize={20}
              className="!bg-Primary-500 hover:!bg-Primary-600 !py-3 !px-8 !min-w-[200px] !justify-center"
            />
          </Link>

          <Link href="/devis-assurance-auto">
            <BtnArrow
              variant="Black"
              direction="right"
              label="Nouvelle demande"
              iconSize={20}
              className="!py-3 !px-8 !min-w-[200px] !justify-center"
            />
          </Link>
        </div>

        {/* Additional Info with Animation */}
        <div
          className={`mt-16 transition-all duration-1000 ease-out delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-black mb-3">
              Prochaines étapes :
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-black/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Confirmation par email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Étude par nos experts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Contact sous 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div
          className={`mt-8 transition-all duration-1000 ease-out delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-black/50 text-sm">
            Questions ?{" "}
            <Link
              href="/contact"
              className="text-black font-medium hover:underline transition-colors"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

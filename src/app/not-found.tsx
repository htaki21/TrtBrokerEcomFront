"use client";

import Link from "next/link";
import BtnArrow from "./components/buttons/btn-arrow";
import Wrapper1180 from "./components/wrapper/wrapper-1180";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[url('/overlay.png'),linear-gradient(180deg,var(--color-Dark-Olive-2-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)] bg-[position:bottom,center] bg-[length:contain,cover] bg-no-repeat flex items-center justify-center">
      <Wrapper1180 className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          {/* 404 Number */}
          <div className="mb-12">
            <h1 className="text-[120px] md:text-[160px] font-black text-black/20 select-none leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-[40px] font-bold text-black mb-6">
              Page non trouvée
            </h2>
            <p className="text-black/80 text-lg leading-relaxed max-w-lg mx-auto">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été
              déplacée.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <BtnArrow
                variant="next"
                direction="left"
                label="Retour à l'accueil"
                iconSize={20}
              />
            </Link>

            <Link href="/assurance-entreprise">
              <BtnArrow
                variant="Black"
                direction="right"
                label="Nos solutions"
                iconSize={20}
              />
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-black/60 text-sm mt-12">
            Besoin d&apos;aide ?{" "}
            <Link
              href="/contact"
              className="text-black font-medium hover:underline"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </Wrapper1180>
    </div>
  );
}

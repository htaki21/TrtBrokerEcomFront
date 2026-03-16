"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { resendConfirmationEmail } from "@/lib/services/authService";
import { contacts } from "../connexion/page";

function VerificationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email || resending) return;
    setResending(true);
    setError(null);
    try {
      await resendConfirmationEmail(email);
      setResent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="relative max-w-[1180px] mx-auto f-col items-center pt-[66px] pb[132px] gap-[164px] px-4">
      <div className="f-col gap-9 w-full max-w-[480px]">
        <div className="f-col items-center gap-6 text-center">
          {/* Email icon */}
          <div className="flex-center w-20 h-20 rounded-full bg-Brand-50">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-Brand-500">
              <rect width={20} height={16} x={2} y={4} rx={2} />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          <div className="f-col gap-3">
            <h2 className="Headings-H2">Vérifiez votre email</h2>
            <p className="text-Text-Body Text-M">
              Un email de confirmation a été envoyé à{" "}
              {email && <strong className="text-Neutral-Dark">{email}</strong>}.
              Cliquez sur le lien dans l&apos;email pour activer votre compte.
            </p>
          </div>

          <div className="f-col gap-3 w-full">
            <div className="f-col gap-2 p-5 rounded-2xl bg-Sage-Gray-Lowest">
              <p className="text-Text-Body text-[14px]/[20px]">
                Vous n&apos;avez pas reçu l&apos;email ? Vérifiez votre dossier spam ou cliquez ci-dessous pour renvoyer.
              </p>
            </div>

            {error && <p className="text-red-500 text-[14px]">{error}</p>}
            {resent && !error && (
              <p className="text-green-600 text-[14px]">
                Email de confirmation renvoyé avec succès.
              </p>
            )}

            <button
              type="button"
              onClick={handleResend}
              disabled={resending || !email}
              className="flex-center gap-1 py-3 px-4 rounded-full bg-Brand-500 text-white transition
                hover:bg-Brand-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer button2-s"
            >
              {resending ? "Envoi en cours..." : "Renvoyer l'email de confirmation"}
            </button>

            <Link
              href="/compte/connexion"
              className="flex-center py-3 px-4 rounded-full bg-Sage-Gray-Lower text-Neutral-Dark transition
                hover:bg-Sage-Gray-Medium cursor-pointer button2-s"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
      <div className="f-col items-center gap-4 text-center">
        <h6 className="Headings-H6">Besoin d&apos;aide ?</h6>
        <ul className="flex gap-2 button2-s">
          {contacts.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-1 py-2 px-4 bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition-colors rounded-full"
            >
              {item.icon}
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default function VerificationEnAttentePage() {
  return (
    <Suspense fallback={<div className="flex-center min-h-[50vh]">Chargement...</div>}>
      <VerificationContent />
    </Suspense>
  );
}

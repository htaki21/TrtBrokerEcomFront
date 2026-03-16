"use client";

import { Suspense } from "react";
import Link from "next/link";
import { contacts } from "../connexion/page";

function ConfirmationContent() {
  return (
    <main className="relative max-w-[1180px] mx-auto f-col items-center pt-[66px] pb[132px] gap-[164px] px-4">
      <div className="f-col gap-9 w-full max-w-[480px]">
        <div className="f-col items-center gap-6 text-center">
          {/* Success checkmark */}
          <div className="flex-center w-20 h-20 rounded-full bg-green-50">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>

          <div className="f-col gap-3">
            <h2 className="Headings-H2">Email confirmé</h2>
            <p className="text-Text-Body Text-M">
              Votre adresse email a été confirmée avec succès. Vous pouvez
              maintenant vous connecter à votre espace client.
            </p>
          </div>

          <Link
            href="/compte/connexion"
            className="flex-center gap-1 py-3 px-4 rounded-full bg-Brand-500 text-white transition
              hover:bg-Brand-600 cursor-pointer button2-s w-full"
          >
            Se connecter
          </Link>
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

export default function ConfirmationEmailPage() {
  return (
    <Suspense fallback={<div className="flex-center min-h-[50vh]">Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

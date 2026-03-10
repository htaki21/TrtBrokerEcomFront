"use client";

import { Suspense } from "react";
import { contacts } from "../connexion/page";
import InscriptionForm from "../form/inscription";
import GuestGuard from "@/app/components/auth/GuestGuard";


export default function InscriptionPage() {
  return (
    <GuestGuard>
    <main className="relative max-w-[1180px] mx-auto f-col items-center pt-[38px] pb[132px] gap-[108px] px-4">
      <div className="f-col gap-9 w-full max-w-[580px]">
        <div className="f-col items-center gap-3 text-center">
          <h2 className="Headings-H2">Créer un compte</h2>
          <p className="max-w-[344px] text-Text-Body Text-M">
            Accédez à vos devis, contrats et documents dans votre espace client
            sécurisé.
          </p>
        </div>
        <Suspense fallback={<div className="">Chargement…</div>}>
          <InscriptionForm />
        </Suspense>
      </div>
      <div className="f-col items-center gap-4 text-center">
        <h6 className="Headings-H6">Besoin d'aide ?</h6>
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
    </GuestGuard>
  );
}

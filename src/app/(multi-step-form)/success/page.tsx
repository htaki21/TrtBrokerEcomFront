"use client";

import ButtonLink from "@/app/components/buttons/ButtonLink";
import { generateRecapPdf } from "@/lib/utils/generateRecapPdf";
import { generateVoyagePdf } from "@/lib/utils/generateVoyagePdf";
import { useRouter } from "next/navigation";
import { SVGProps, useEffect, useState } from "react";
import ResendEmailButton from "./ResendEmailButton";

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.8631 12.7779C54.5661 13.4811 54.9611 14.4348 54.9611 15.4292C54.9611 16.4235 54.5661 17.3772 53.8631 18.0804L25.7556 46.1879C25.3842 46.5594 24.9432 46.8542 24.4578 47.0552C23.9724 47.2563 23.4522 47.3598 22.9269 47.3598C22.4015 47.3598 21.8813 47.2563 21.3959 47.0552C20.9106 46.8542 20.4696 46.5594 20.0981 46.1879L6.13311 32.2254C5.77495 31.8795 5.48927 31.4657 5.29273 31.0082C5.0962 30.5507 4.99275 30.0586 4.98842 29.5607C4.9841 29.0627 5.07898 28.5689 5.26753 28.1081C5.45608 27.6472 5.73453 27.2285 6.08663 26.8764C6.43873 26.5243 6.85742 26.2459 7.31828 26.0573C7.77915 25.8688 8.27294 25.7739 8.77087 25.7782C9.26879 25.7825 9.76086 25.886 10.2184 26.0825C10.6759 26.2791 11.0897 26.5647 11.4356 26.9229L22.9256 38.4129L48.5581 12.7779C48.9064 12.4294 49.3199 12.153 49.775 11.9644C50.2301 11.7758 50.718 11.6787 51.2106 11.6787C51.7033 11.6787 52.1911 11.7758 52.6462 11.9644C53.1014 12.153 53.5149 12.4294 53.8631 12.7779Z"
        fill="white"
      />
    </svg>
  );
}
export function IconDownload(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M21 23.625C21.4832 23.625 21.875 24.0168 21.875 24.5C21.875 24.9832 21.4832 25.375 21 25.375H7C6.51675 25.375 6.125 24.9832 6.125 24.5C6.125 24.0168 6.51675 23.625 7 23.625H21Z"
        fill="#0F110C"
      />
      <path
        d="M14 2.625C14.4832 2.625 14.875 3.01675 14.875 3.5V17.721L19.2147 13.3813C19.5564 13.0396 20.1103 13.0396 20.452 13.3813C20.7937 13.7231 20.7937 14.2769 20.452 14.6187L14.6187 20.452C14.2769 20.7937 13.7231 20.7937 13.3813 20.452L7.54801 14.6187C7.20631 14.2769 7.20631 13.7231 7.54801 13.3813C7.88972 13.0396 8.44361 13.0396 8.78532 13.3813L13.125 17.721V3.5C13.125 3.01675 13.5168 2.625 14 2.625Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function IconInfo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 6.83333C8.27614 6.83333 8.5 7.05719 8.5 7.33333V10.6667C8.5 10.9428 8.27614 11.1667 8 11.1667C7.72386 11.1667 7.5 10.9428 7.5 10.6667V7.33333C7.5 7.05719 7.72386 6.83333 8 6.83333Z"
        fill="#4C5242"
      />
      <path
        d="M8.0332 4.83333C8.30935 4.83333 8.5332 5.05719 8.5332 5.33333V5.39974C8.5332 5.67539 8.31012 5.89903 8.03451 5.89974L7.9681 5.90039C7.83532 5.90065 7.70726 5.8477 7.61328 5.75391C7.5195 5.66019 7.46687 5.53297 7.4668 5.40039V5.33333C7.4668 5.05719 7.69065 4.83333 7.9668 4.83333H8.0332Z"
        fill="#4C5242"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5ZM8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5Z"
        fill="#4C5242"
      />
    </svg>
  );
}

interface SuccessFormData {
  productName: string;
  prenom: string;
  nom: string;
  email: string;
  reference?: string;
  phone?: string;
  modePaiement?: string;
  // Voyage-specific fields
  assistanceVoyage?: string;
  primedelassistance?: number;
  dureedelacouverture?: string;
  transport?: string;
  situationfamiliale?: string;
  dureeVisa?: string;
  // Individuelle Accidents fields
  formuleAccidents?: string;
  dateReceptionSouhaitee?: string;
  creneauHoraire?: string;
}

function generateReference(): string {
  const now = new Date();
  const num =
    String(now.getFullYear()).slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(Math.floor(Math.random() * 9000) + 1000);
  return `TRT-${num}`;
}

export default function SuccessPage() {
  const [formData, setFormData] = useState<SuccessFormData | null>(null);
  const [reference, setReference] = useState("");
  const [isVoyage, setIsVoyage] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const router = useRouter();

  const PAYMENT_PRODUCTS = ["Assistance Voyage", "Individuelle Accidents"];

  useEffect(() => {
    try {
      // Try generic form data first (all forms)
      const genericStored = sessionStorage.getItem("formSuccessData");
      if (genericStored) {
        const parsed = JSON.parse(genericStored);
        setFormData(parsed);
        setReference(parsed.reference || generateReference());
        if (parsed.productName === "Assistance Voyage") setIsVoyage(true);
        if (PAYMENT_PRODUCTS.includes(parsed.productName)) setHasPayment(true);
        sessionStorage.removeItem("formSuccessData");
        return;
      }

      // Fallback: try voyage-specific data (backward compat)
      const voyageStored = sessionStorage.getItem("voyageFormData");
      if (voyageStored) {
        const parsed = JSON.parse(voyageStored);
        setFormData({ ...parsed, productName: "Assistance Voyage" });
        setReference(parsed.reference || generateReference());
        setIsVoyage(true);
        setHasPayment(true);
        sessionStorage.removeItem("voyageFormData");
        return;
      }

      // No form data found — user accessed /success directly, redirect home
      router.replace("/");
    } catch {
      router.replace("/");
    }
  }, []);

  return (
    <section className="relative pt-[200px] pb-11 px-4 w-full flex-center flex-col gap-6">
      <div
        className="absolute inset-0 w-full h-[200px] bg-green-100 -z-[1]
        bg-[url('/success-overlay.png'),linear-gradient(180deg,var(--color-Primary-300)_0%,var(--color-white)_100%)]
        bg-top bg-no-repeat max-tablet:bg-cover flex items-end justify-center"
      >
        <div className="flex p-5 rounded-full bg-Brand-500">
          <IconCheck className="shrink-0" />
        </div>
      </div>
      <div className="mt-6 text-center items-center f-col gap-2">
        <h3 className="Headings-H3">Demande validée avec succès</h3>
        <p className="text-Text-Body Text-M">
          {formData
            ? `Merci ${formData.prenom}, votre demande a bien été prise en compte.`
            : "Merci, votre demande a bien été prise en compte."}
        </p>
      </div>
      <div className="f-col gap-2 w-full max-w-[1180px]">
        {/* Order summary card */}
        <div className="p-2 bg-Sage-Gray-Lowest rounded-3xl">
          <div className="p-5 rounded-2xl bg-white f-col items-end shadow-md">
            <div className="f-col gap-5 w-full">
              <h5 className="Headings-H5">Votre demande</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                <span className="Text-M text-Sage-Gray-Higher">Référence</span>
                <span className="button-s">{reference}</span>

                <span className="Text-M text-Sage-Gray-Higher">Produit</span>
                <span className="button-s">
                  {formData?.productName || "Assurance"}
                </span>

                {formData?.nom && (
                  <>
                    <span className="Text-M text-Sage-Gray-Higher">Nom</span>
                    <span className="button-s">
                      {formData.prenom} {formData.nom}
                    </span>
                  </>
                )}

                {isVoyage && formData?.dureedelacouverture && (
                  <>
                    <span className="Text-M text-Sage-Gray-Higher">Durée</span>
                    <span className="button-s">
                      {formData.dureedelacouverture}
                    </span>
                  </>
                )}

                {isVoyage && formData?.transport && (
                  <>
                    <span className="Text-M text-Sage-Gray-Higher">
                      Option véhicule
                    </span>
                    <span className="button-s">{formData.transport}</span>
                  </>
                )}

                {isVoyage && formData?.situationfamiliale && (
                  <>
                    <span className="Text-M text-Sage-Gray-Higher">
                      Situation familiale
                    </span>
                    <span className="button-s">
                      {formData.situationfamiliale}
                    </span>
                  </>
                )}

                {hasPayment && (
                  <>
                    <span className="Text-M text-Sage-Gray-Higher">
                      Mode de paiement
                    </span>
                    <span className="button-s">
                      {formData?.modePaiement || "Paiement en agence"}
                    </span>
                  </>
                )}
              </ul>
            </div>
            {formData?.primedelassistance && (
              <div className="f-col">
                <span className="Text-M text-Sage-Gray-High">Montant</span>
                <div className="flex gap-2 items-baseline">
                  <span className="Headings-H2">
                    {formData.primedelassistance} DH
                  </span>
                  <span className="Text-M text-Sage-Gray-High">TTC</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Paiement en agence section — only if user chose agence */}
        {hasPayment && (!formData?.modePaiement || formData.modePaiement === "Paiement en agence") && (
          <div className="p-2 bg-Sage-Gray-Low rounded-3xl">
            <div className="p-5 rounded-2xl bg-white f-col gap-5 shadow-md">
              <div className="flex items-start justify-between gap-3 max-mobile:flex-col">
                <ul className="f-col gap-1">
                  <li className="f-col gap-3">
                    <span className="Headings-H5">Prochaine étape : Présentez-vous en agence</span>
                    <span className="Text-M text-Text-Body">
                      Rendez-vous dans notre agence avec votre référence :
                    </span>
                  </li>
                  <li className="f-col gap-3">
                    <span className="Headings-H4 text-Brand-500">{reference}</span>
                    <span className="Text-M text-Text-Body">
                      Un conseiller finalisera votre contrat sur place.
                    </span>
                  </li>
                </ul>
                <div className="flex items-center gap-1 rounded-full p-1 bg-Sage-Gray-Lower shrink-0">
                  <IconInfo className="shrink-0" />
                  <span className="button-s text-Sage-Gray-Higher">
                    Du lundi au vendredi, 9h - 18h
                  </span>
                </div>
              </div>
              <div className="f-col gap-3">
                <div className="f-col gap-1">
                  <span className="button-s text-Sage-Gray-Higher">Adresse</span>
                  <a
                    href="https://maps.app.goo.gl/YaKiKsp3CHjjtaDT9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="Text-M text-Brand-500 underline"
                  >
                    N°33 IMM SEMIRAMI, ANGLE RUES FAKER MOHAMED ET KAMAL MOHAMED, Casablanca 23000
                  </a>
                </div>
                <div className="w-full h-[200px] rounded-xl overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=TRT+BROKER+ASSURANCE,Casablanca&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TRT Broker - Agence Casablanca"
                  />
                </div>
                <a
                  href="https://maps.app.goo.gl/YaKiKsp3CHjjtaDT9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 px-4 rounded-full bg-Brand-500 text-white button-s transition hover:bg-Brand-600 w-fit"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Virement bancaire section — only if user chose virement */}
        {hasPayment && formData?.modePaiement === "Virement bancaire" && (
          <div className="p-2 bg-Sage-Gray-Low rounded-3xl">
            <div className="p-5 rounded-2xl bg-white f-col gap-5 shadow-md">
              <div className="flex items-start justify-between gap-3 max-mobile:flex-col">
                <div className="f-col gap-3">
                  <span className="Headings-H5">Prochaine étape : Effectuez votre virement bancaire</span>
                  <div className="f-col gap-4">
                    <span className="Text-M text-Text-Body">
                      Effectuez votre virement vers le compte suivant :
                    </span>
                    <div className="f-col gap-2 p-4 bg-Sage-Gray-Lowest rounded-xl">
                      <div className="flex gap-2">
                        <span className="button-s text-Sage-Gray-Higher w-[120px] shrink-0">Banque</span>
                        <span className="Text-M">Attijariwafa Bank</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="button-s text-Sage-Gray-Higher w-[120px] shrink-0">Bénéficiaire</span>
                        <span className="Text-M">TRT BROKER</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="button-s text-Sage-Gray-Higher w-[120px] shrink-0">RIB</span>
                        <span className="Text-M font-mono">007 780 0001265000004617 63</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="button-s text-Sage-Gray-Higher w-[120px] shrink-0">SWIFT</span>
                        <span className="Text-M font-mono">BCMAMAMC</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-[#FFF8E1] rounded-xl">
                      <span className="text-lg shrink-0">⚠️</span>
                      <div className="f-col gap-1">
                        <span className="button-s">
                          Indiquez obligatoirement la référence suivante dans le motif du virement :
                        </span>
                        <span className="Headings-H4 text-Brand-500">{reference}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 max-mobile:flex-col max-mobile:items-start">
                <div className="flex items-center gap-1 rounded-full p-1 bg-Sage-Gray-Lower">
                  <IconInfo className="shrink-0" />
                  <span className="button-s text-Sage-Gray-Higher">
                    Vérifiez votre boîte de réception (et les spams)
                  </span>
                </div>
                <ResendEmailButton />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex max-mobile:flex-col gap-3">
        <ButtonLink
          href="/"
          label="Retour à l'accueil"
          size="large"
          iconClassName="w-7 h-7"
          color="white"
          ghost
          reverse
          direction="left"
        />
        {hasPayment && formData && reference && (
          <button
            type="button"
            onClick={() => {
              if (isVoyage) {
                generateVoyagePdf({ ...formData, reference } as Parameters<
                  typeof generateVoyagePdf
                >[0]);
              } else {
                generateRecapPdf({
                  reference,
                  productName: formData.productName,
                  prenom: formData.prenom,
                  nom: formData.nom,
                  phone: formData.phone,
                  email: formData.email,
                  modePaiement: formData.modePaiement,
                  formuleAccidents: formData.formuleAccidents,
                  dateReceptionSouhaitee: formData.dateReceptionSouhaitee,
                  creneauHoraire: formData.creneauHoraire,
                });
              }
            }}
            className="flex items-center gap-2 py-3 px-5 rounded-full bg-Sage-Gray-Lower
            transition hover:bg-Sage-Gray-Low cursor-pointer Button-M"
          >
            <IconDownload className="shrink-0" />
            <span>Télécharger le récapitulatif (PDF)</span>
          </button>
        )}
      </div>
    </section>
  );
}

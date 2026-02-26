"use client";

import { FormProvider } from "@/app/(multi-step-form)/devis-assurance-auto/context";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import { BTPIcon } from "../../assurance-professionnelle/icons/secteur/BTP";
import { CommerceIcon } from "../../assurance-professionnelle/icons/secteur/Commerce";
import { EnergieIcon } from "../../assurance-professionnelle/icons/secteur/Energie";
import { HôtellerieIcon } from "../../assurance-professionnelle/icons/secteur/Hôtellerie";
import { IndustrieIcon } from "../../assurance-professionnelle/icons/secteur/Industrie";
import { ServicesConseilIcon } from "../../assurance-professionnelle/icons/secteur/ServicesConseil";
import { TransportIcon } from "../../assurance-professionnelle/icons/secteur/Transport";
import CategorySelectionForm from "../../assurance-professionnelle/sections/form/form";

export default function Section2() {
  return (
    <section
      id="une-assurance-pensee-pour-votre-organisation"
      className="w-full px-4 max-mobile:px-3
     bg-[url('/blue-overlay-entrepise.png'),linear-gradient(180deg,#FFF_0%,var(--color-Secondary-Blue-Lowest)_100%)]
       bg-[length:contain,cover] bg-[position:bottom,center] bg-no-repeat"
    >
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center pb-[132px]">
        <SectionHeader
          badgeText="Commencez en quelques secondes"
          heading="Une assurance pensée pour votre organisation"
          headingClassName="max-w-[490px] w-full"
        />
        <div className="f-col p-12 max-mobile:py-6 max-mobile:px-3 items-center gap-16 rounded-3xl bg-white w-full shadow-xl">
          <div className="f-col items-center w-full gap-10">
            <FormProvider>
              <CategorySelectionForm
                colorVariant="blue"
                stepContents={bluestepContent}
                secteurs={blueSecteurs}
                gridSize="large"
                formType="entreprise"
              />
            </FormProvider>
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
}
const blueSecteurs = [
  { label: "BTP", Icon: BTPIcon },
  { label: "Commerce", Icon: CommerceIcon },
  { label: "Services / Conseil", Icon: ServicesConseilIcon },
  { label: "Hôtellerie", Icon: HôtellerieIcon },
  { label: "Industrie", Icon: IndustrieIcon },
  { label: "Energie", Icon: EnergieIcon },
  { label: "Transport", Icon: TransportIcon },
];

const bluestepContent = [
  {
    title: "Quel est le secteur d’activité de votre entreprise ?",
    description:
      "Sélectionnez le secteur dans lequel vous évoluez afin de personnaliser votre parcours d’assurance",
  },
  {
    title: "Que souhaitez-vous assurer en priorité ?",
    description:
      "Choisissez parmi plusieurs catégories de couverture qui répondent le mieux à vos besoins actuels.",
  },
  {
    title: "Vos informations pour recevoir votre devis",
    description: "Nous vous enverrons votre devis personnalisé gratuitement.",
  },
];

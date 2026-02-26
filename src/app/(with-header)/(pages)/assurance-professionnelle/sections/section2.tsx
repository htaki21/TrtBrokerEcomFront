"use client";

import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import CategorySelectionForm from "./form/form";
import { FormProvider } from "@/app/(multi-step-form)/devis-assurance-auto/context";
import { ArtisanIcon } from "../icons/secteur/Artisan";
import { AssociationIcon } from "../icons/secteur/Association";
import { CafeRestaurantIcon } from "../icons/secteur/Cafe-Restaurant";
import { CommerçantIcon } from "../icons/secteur/Commerçant";
import { GaragisteIcon } from "../icons/secteur/Garagiste";
import { HôtelIcon } from "../icons/secteur/Hôtel";
import { ProSantéIcon } from "../icons/secteur/Pro-Santé";
import { ProSportIcon } from "../icons/secteur/Pro-Sport";
import { ProfessionLibéraleIcon } from "../icons/secteur/Profession-Libérale";
import { ScolaireIcon } from "../icons/secteur/Scolaire";
import { SyndicIcon } from "../icons/secteur/Syndic";
import { TransporteurIcon } from "../icons/secteur/Transporteur";

export default function Section2() {
  return (
    <section
      id="une-assurance-qui-comprend-votre-metier"
      className="w-full -z-10 px-4 max-mobile:px-3
     bg-[url('/red-overlay.png'),linear-gradient(180deg,#FFF_0%,var(--color-Secondary-Red-Lowest)_100%)]
       bg-[length:contain,cover] bg-[position:bottom,center] bg-no-repeat"
    >
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center py-[132px]">
        <SectionHeader
          badgeText="Commencez en quelques secondes"
          heading="Une assurance qui comprend votre métier"
          headingClassName="max-w-[490px] w-full"
        />
        <div className="f-col p-12 max-mobile:py-6 max-mobile:px-3 items-center gap-16 rounded-3xl bg-white w-full shadow-xl">
          <div className="f-col items-center w-full gap-10">
            <FormProvider>
              <CategorySelectionForm
                colorVariant="red"
                stepContents={redstepContent}
                secteurs={redSecteurs}
                gridSize="small"
              />
            </FormProvider>
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
}
const redSecteurs = [
  { label: "Artisan", Icon: ArtisanIcon },
  { label: "Commerçant", Icon: CommerçantIcon },
  { label: "Café / Restaurant", Icon: CafeRestaurantIcon },
  { label: "Hôtel", Icon: HôtelIcon },
  { label: "Transporteur", Icon: TransporteurIcon },
  { label: "Profession Libérale", Icon: ProfessionLibéraleIcon },
  { label: "Pro de Santé", Icon: ProSantéIcon },
  { label: "Garagiste", Icon: GaragisteIcon },
  { label: "Pro du Sport", Icon: ProSportIcon },
  { label: "Scolaire", Icon: ScolaireIcon },
  { label: "Association", Icon: AssociationIcon },
  { label: "Syndic", Icon: SyndicIcon },
];

const redstepContent = [
  {
    title: "Quelle est la nature de votre activité ?",
    description:
      "Sélectionnez le secteur dans lequel vous exercez afin de personnaliser votre parcours d’assurance.",
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

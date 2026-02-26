"use client";

import SliderSectionNosspécialités from "@/app/(with-header)/(pages)/qui-sommes-nous/components/slider-section-nos-spécialités";
import { AidKitIcon } from "@/app/components/icons/Aid-kit";
import { BoxIcon } from "@/app/components/icons/Box";
import { CarIcon } from "@/app/components/icons/car";
import { HouseIcon } from "@/app/components/icons/House";
import { ShieldIcon } from "@/app/components/icons/Shield";
import { VoyageIcon } from "@/app/components/icons/voyage";


export default function Section6() {
  return (
    <SliderSectionNosspécialités
      tagLabel="Nos spécialités"
      title="Préparer l’avenir en toute confiance"
      buttonLabel="Obtenir mon devis"
      sliders={sliders}
    />
  );
}

const sliders = [
  {
    bgImg: "/Nos-spécialités-1.webp",
    Icon: CarIcon,
    href: "/devis-assurance-auto",
    title: "Assurance Auto",
    description:
      "Assurance tiers, intermédiaire ou tous risques avec assistance rapide.",
  },
  {
    bgImg: "/Nos-spécialités-2.webp",
    Icon: AidKitIcon,
    href: "/devis-assurance-sante",
    title: "Assurance Santé & Internationale",
    description:
      "Couverture santé individuelle ou familiale, locale et internationale, incluant la maternité.",
  },
  {
    bgImg: "/Nos-spécialités-3.webp",
    Icon: HouseIcon,
    href: "/devis-assurance-habitation",
    title: "Assurance Habitation",
    description:
      "Protection complète pour votre maison, appartement ou villa, y compris vos biens.",
  },
  {
    bgImg: "/Nos-spécialités-4.webp",
    Icon: ShieldIcon,
    href: "/assurance-professionnelle",
    title: "Responsabilité Civile Professionnelle",
    description:
      "Protection sur mesure pour les professions libérales et freelances.",
  },
  {
    bgImg: "/Nos-spécialités-5.webp",
    Icon: BoxIcon,
    href: "/assurance-entreprise",
    title: "Assurance Entreprise & Flotte :",
    description:
      "Assurances multirisques pour entreprises, pertes d’exploitation et flotte.",
  },
  {
    bgImg: "/Nos-spécialités-6.webp",
    Icon: VoyageIcon,
    href: "/devis-assurance-assistance-voyage",
    title: "Solutions sur-mesure",
    description:
      "TRT Broker assure votre sécurité pour que vous puissiez vous concentrer sur l'essentiel.",
  },
];

"use client";

import MobileMenu from "@/app/main-sections/MobileMenu";
import { AccidentIcon } from "../../icons/accident";
import { AidKitIcon } from "../../icons/Aid-kit";
import { CarIcon } from "../../icons/car";
import { HouseIcon } from "../../icons/House";
import { JetskiIcon } from "../../icons/jet-ski";
import { MotocycleIcon } from "../../icons/motocycle";
import { SanteIcon } from "../../icons/sante";
import { VoyageIcon } from "../../icons/voyage";

interface HeaderMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderMobile = ({ isOpen, onClose }: HeaderMobileProps) => {
  return (
    <MobileMenu
      isOpen={isOpen}
      onClose={onClose}
      categories={[
        {
          title: "Auto & Moto",
          items: [
            { label: "Auto", icon: <CarIcon />, href: "/assurance-automobile" },
            { label: "Moto", icon: <MotocycleIcon />, href: "/assurance-moto" },
          ],
        },
        {
          title: "Habitation",
          items: [
            {
              label: "Habitation",
              icon: <HouseIcon />,
              href: "/assurance-habitation",
            },
          ],
        },
        {
          title: "Santé",
          items: [
            { label: "Santé", icon: <SanteIcon />, href: "/assurance-sante" },
            {
              label: "Individuelle Accidents",
              icon: <AccidentIcon />,
              href: "/assurance-individuelle-accidents",
            },
            {
              label: "Assurance maladie complémentaire",
              icon: <AidKitIcon className="h-[24px] w-[24px]" />,
              href: "/assurance-individuelle-accidents",
            },
          ],
        },
        {
          title: "Assistance Voyage",
          items: [
            {
              label: "Assistance Voyage",
              icon: <VoyageIcon />,
              href: "/assurance-voyage",
            },
            {
              label: "Plaisance / Jet-ski",
              icon: <JetskiIcon />,
              href: "/assurance-plaisance-jet-ski",
            },
          ],
        },
      ]}
    />
  );
};

export default HeaderMobile;

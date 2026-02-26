import SouscrireSection from "@/app/main-sections/Souscrire-section";
import { SlideType } from "@/app/components/mini-sections/EmblaCarousel";
import { InputIcon } from "@/app/components/icons/input";
import { CursorIcon } from "@/app/components/icons/Cursor";
import { LockIcon } from "@/app/components/icons/Lock";
import { EmblaOptionsType } from "embla-carousel";
import { PaperIcon } from "@/app/components/icons/Paper";
import { FlashIcon } from "@/app/components/icons/flash";





export default function Section4() {
    return (
            <SouscrireSection
                heading="Souscrire votre Assurance en ligne est très simple !"
                description="En 5 étapes simples, vous êtes protégé. Zéro stress."
                buttonLabel="Obtenir mon devis"
                buttonHref="/devis-assurance-moto"
                slides={MY_SLIDES}
                options={OPTIONS}
            />
    )
}

const MY_SLIDES: SlideType[] = [
  {
    id: 1,
    step: "01.",
    text: "Partagez les détails de votre véhicule pour que nous puissions vous aider.",
    Icon: <InputIcon />,
  },
  {
    id: 2,
    step: "02.",
    text: "Choisissez le service adapté à vos besoins.",
    Icon: <CursorIcon />,
  },
  {
    id: 3,
    step: "03.",
    text: "Recevez une estimation et planifiez un rendez-vous.",
    Icon: <LockIcon />,
  },
  {
    id: 4,
    step: "04.",
    text: "Obtenez votre devis gratuit maintenant et découvrez nos offres.",
    Icon: <PaperIcon />,
  },
  {
    id: 5,
    step: "05.",
    text: "Finalisez votre contrat et payez à votre guise.",
    Icon: <FlashIcon />,
  },
];

const OPTIONS: EmblaOptionsType = {};
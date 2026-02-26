import SouscrireSection from "@/app/main-sections/Souscrire-section";
import { SlideType } from "@/app/components/mini-sections/EmblaCarousel";
import { InputIcon } from "@/app/components/icons/input";
import { CursorIcon } from "@/app/components/icons/Cursor";
import { LockIcon } from "@/app/components/icons/Lock";
import { EmblaOptionsType } from "embla-carousel";



export default function Section6() {
  return (
            <SouscrireSection
                heading="Souscrire en ligne, c’est rapide et sans paperasse"
                description="En 5 étapes simples, vous êtes protégé. Zéro stress."
                buttonLabel="Je commence maintenant"
                buttonHref="/devis-assurance-individuelle-accidents"
                slides={MY_SLIDES}
                options={OPTIONS}
            />
  )
}


const MY_SLIDES: SlideType[] = [
    {
        id: 1,
        step: "01.",
        text: "Remplissez votre profil en 2 min",
        Icon: <InputIcon />,
    },
    {
        id: 2,
        step: "02.",
        text: "Choisissez votre formule",
        Icon: <CursorIcon />,
    },
    {
        id: 3,
        step: "03.",
        text: "Payez en toute sécurité",
        Icon: <LockIcon />,
    },
];

const OPTIONS: EmblaOptionsType = {};
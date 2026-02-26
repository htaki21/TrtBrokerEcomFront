import SouscrireSection from "@/app/main-sections/Souscrire-section";
import { SlideType } from "@/app/components/mini-sections/EmblaCarousel";
import { InputIcon } from "@/app/components/icons/input";
import { CursorIcon } from "@/app/components/icons/Cursor";
import { LockIcon } from "@/app/components/icons/Lock";
import { EmblaOptionsType } from "embla-carousel";
import { CardIcon } from "@/app/components/icons/Cardicon";
import { PaperIcon } from "@/app/components/icons/Paper";



export default function Section5() {
  return (
            <SouscrireSection
                heading="5 étapes pour activer votre assistance voyage"
                description="En 5 étapes simples, vous êtes protégé. Zéro stress."
                buttonLabel="Je commence maintenant"
                buttonHref="/devis-assurance-assistance-voyage"
                slides={MY_SLIDES}
                options={OPTIONS}
            />
  )
}


const MY_SLIDES: SlideType[] = [
    {
        id: 1,
        step: "01.",
        text: "Sélectionnez le contrat adapté à votre profil.",
        Icon: <InputIcon />,
    },
    {
        id: 2,
        step: "02.",
        text: "Sélectionnez la durée souhaitée",
        Icon: <CursorIcon />,
    },
    {
        id: 3,
        step: "03.",
        text: "Entrez vos informations",
        Icon: <LockIcon />,
    },
    {
        id: 4,
        step: "04.",
        text: "Obtenez votre devis en ligne",
        Icon: <PaperIcon />,
    },
    {
        id: 5,
        step: "05.",
        text: "Souscrivez et payez",
        Icon: <CardIcon />,
    },
];

const OPTIONS: EmblaOptionsType = {};
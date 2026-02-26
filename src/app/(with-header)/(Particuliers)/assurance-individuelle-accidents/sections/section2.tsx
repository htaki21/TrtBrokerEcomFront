import SliderSection from "@/app/main-sections/slider-section";

const sliders = [
    {
        bgImg: "/Accidents-domestiques.webp",
        title: "Accidents domestiques",
        description: "Chute, brûlure, bricolage… la vie est pleine de risques.",
    },
    {
        bgImg: "/Accidents-circulation.webp",
        title: "Accidents de circulation",
        description: "À pied, en vélo ou en voiture, soyez couvert partout.",
    },
    {
        bgImg: "/Loisirs-sport.webp",
        title: "Loisirs & sport",
        description: "Pour les fans de sensations fortes",
    },
    {
        bgImg: "/Protection-familiale.webp",
        title: "Protection familiale.",
        description: "Étendez votre couverture à vos proches.",
    },
];
 
export default function Section2() {
    return (
        <SliderSection
            tagLabel="Pourquoi & Quand souscrire ?"
            title="Protégez-vous là où l’imprévisible peut frapper."
            buttonLabel="Obtenir mon devis"
            buttonHref="/devis-assurance-individuelle-accidents"
            sliders={sliders}
        />
    )
}
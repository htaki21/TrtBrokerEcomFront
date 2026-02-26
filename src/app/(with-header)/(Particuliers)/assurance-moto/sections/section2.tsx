import SliderSection from "@/app/main-sections/slider-section";





export default function Section2() {
    return (
        <SliderSection
            tagLabel="Modèles de motos"
            title="Une assurance pensée pour tous les deux-roues"
            buttonLabel="Obtenir mon devis"
            buttonHref="/devis-assurance-moto"
            sliders={sliders}
        />
    )
}

const sliders = [
    {
        bgImg: "/Scooter.webp",
        title: "Scooter",
        description: "Idéal pour vos trajets urbains",
    },
    {
        bgImg: "/Moto-Classique.webp",
        title: "Moto Classique",
        description: "Parfaite pour la route au quotidien",
    },
    {
        bgImg: "/Sportive.webp",
        title: "Sportive",
        description: "Pour les fans de sensations fortes",
    },
    {
        bgImg: "/Trail-Adventure.webp",
        title: "Trail / Adventure",
        description: "Pour rouler partout, sans limite",
    },
];
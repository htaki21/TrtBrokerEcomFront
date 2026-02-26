import SliderSection from "@/app/main-sections/slider-section";

const sliders = [
  {
    bgImg: "/Bateau-plaisance-bg.webp",
    title: "Bateau de plaisance",
    description: "Pour vos sorties détente en mer..",
  },
  {
    bgImg: "/Jet-skis-bg.webp",
    title: "Jet-skis",
    description: "Agiles, fun, mais à haut risque.",
  },
  {
    bgImg: "/Bateau-bg.webp",
    title: "Bateau à Voile",
    description: "Pour les fans de sensations fortes",
  },
  {
    bgImg: "/Bateaux-Moteur-bg.webp",
    title: "Bateaux à Moteur",
    description: "Puissants et rapides, mais exposés.",
  },
];

export default function Section2() {
  return (
    <SliderSection
      className="bg-[url('/Plaisance-Jet-ski-section2-overlay.png')] bg-no-repeat"
      tagLabel="Types de bateaux couverts"
      title="Une protection adaptée à chaque embarcation."
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-plaisance-jet-ski"
      sliders={sliders}
    />
  );
}

import SliderSection from "@/app/main-sections/slider-section";

export default function Section2() {
  return (
    <SliderSection
      tagLabel="Choisissez votre type de logement"
      title="Une assurance conçue pour tous les logements"
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-habitation"
      sliders={sliders}
    />
  );
}

const sliders = [
  {
    bgImg: "/Appartement.webp",
    title: "Appartement",
    description: "Votre sécurité est primordiale. Protégez votre patrimoine.",
  },
  {
    bgImg: "/Maison.webp",
    title: "Maison",
    description: "Restez protégé des imprévus, de l'intérieur à la terrasse.",
  },
  {
    bgImg: "/Villa.webp",
    title: "Sportive",
    description:
      "Un contrat flexible pour vos maisons de vacances, sans frais annuels.",
  },
  {
    bgImg: "/Secondaire.webp",
    title: "Secondaire",
    description:
      "Protégez vos meubles et votre sérénité, que vous soyez propriétaire ou locataire.",
  },
];

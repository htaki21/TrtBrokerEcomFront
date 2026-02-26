import CoveredSection from "@/app/components/mini-sections/ImageTextSection";

export default function Section3() {
  return (
    <CoveredSection
      h2="Vous êtes couvert, quoi qu’il arrive."
      p="En cas d'accident, que ce soit à moto ou dans la vie quotidienne, cette couverture vous indemnise pour invalidité, décès et frais médicaux, réduisant ainsi les impacts financiers."
      h2className="text-Secondary-Blue-High"
      pclassName="text-Secondary-Blue-Lower"
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-moto"
      buttonColor="blueHigh"
      imageSrc="/couvert-bg.webp"
      imageAlt="Recevez votre carte verte rapidement, où que vous soyez."
    />
  );
}

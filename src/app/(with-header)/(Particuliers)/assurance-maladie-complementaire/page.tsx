import InsuranceHero from "@/app/main-sections/InsuranceHero";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";

export default function AssurancemaladiecomplementairePage() {
  const heroData = {
    bgOverlayUrl: "/Assurance-maladie-complementaire-overlay.webp",
    bgDesktopUrl: "/Assurance-maladie-complementaire-bg.webp",
    bgMobileUrl: "/Assurance-maladie-complementaire-mobile.webp",
    tag: "Assurance Maladie Complémentaire",
    title: "Votre santé bien protégée, sans prise de tête",
    mobileTitle: "Protégez votre logement, sans prise de tête",
    description:
      "Formule santé complète ou complémentaire, adaptée à votre situation, avec service client réactif.",
    features: [
      "Formules flexibles",
      "Remboursements élevés",
      "Délais de traitement rapides",
    ],
    price: "190,00",
    priceUnit: "HT / mois",
    ctaLabel: "Obtenir mon devis",
    ctaLink: "/devis-assurance-sante",
  };

  return (
    <>
      <InsuranceHero {...heroData} />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}

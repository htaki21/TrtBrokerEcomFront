import InsuranceHero from "@/app/main-sections/InsuranceHero";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  SEO_PAGES,
} from "@/lib/seo";
import { Metadata } from "next";
import Script from "next/script";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.ASSURANCE_SANTE,
  canonical: "/assurance-sante",
});

export default function AssuranceSantePage() {
  const heroData = {
    bgOverlayUrl: "/Assurance-Sante-overlay.webp",
    bgDesktopUrl: "/Assurance-Sante-bg.webp",
    bgMobileUrl: "/Assurance-Sante-bg-mobile.webp",
    tag: "Assurance Santé",
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

  // Generate structured data for assurance santé page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      { name: "Assurance Santé", url: "https://trtbroker.com/assurance-sante" },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Assurance Santé",
    description:
      "Assurance santé et mutuelle complémentaire au Maroc avec devis gratuit.",
    serviceType: "Insurance",
    offerDescription:
      "Comparez les offres et trouvez la meilleure couverture santé",
  });

  return (
    <>
      {/* Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData),
        }}
      />

      <InsuranceHero {...heroData} />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}

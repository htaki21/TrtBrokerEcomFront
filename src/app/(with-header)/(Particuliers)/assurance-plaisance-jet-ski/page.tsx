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

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.ASSURANCE_PLAISANCE,
  canonical: "/assurance-plaisance-jet-ski",
});

export default function IndividuelleAccidentsPage() {
  const heroData = {
    bgOverlayUrl: "",
    bgDesktopUrl: "/Plaisance-Jet-ski-bg.jpg",
    bgMobileUrl: "/Plaisance-Jet-ski-bg-mobile.webp",
    tag: "Plaisance / Jet-ski",
    titleMaxWidth: "max-w-[600px]",
    title: "Assurez votre jet-ski ou bateau avec flexibilité",
    mobileTitle: "Assurez votre jet-ski ou bateau avec flexibilité",
    description:
      "Formule complète pour les activités nautiques : bateau, scooter de mer, voilier ou jet-ski. Adaptez votre contrat à votre usage et budget.",
    features: [
      "Couverture instantanée, sans délai.",
      "Couverture pour hospitalisation, invalidité ou décès.",
      "Délais de traitement rapides",
    ],
    price: "10 DH",
    priceUnit: "HT / jour",
    ctaLabel: "Obtenir mon devis",
    ctaLink: "/devis-assurance-plaisance-jet-ski",
  };

  // Generate structured data for assurance plaisance page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      {
        name: "Assurance Plaisance Jet-Ski",
        url: "https://trtbroker.com/assurance-plaisance-jet-ski",
      },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Assurance Plaisance Jet-Ski",
    description: "Assurance plaisance et jet-ski au Maroc avec devis gratuit.",
    serviceType: "Insurance",
    offerDescription:
      "Protégez votre bateau, voilier ou jet-ski avec des garanties adaptées",
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
    </>
  );
}

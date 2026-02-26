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
import Section5 from "./sections/section5";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.ASSURANCE_VIAGE,
  canonical: "/assurance-voyage",
});

export default function AssistanceVoyagePage() {
  const heroData = {
    bgOverlayUrl: "/Individuelle-Accidents-bg-overlay.webp",
    bgDesktopUrl: "/Assistance-Voyage-bg.jpg",
    bgMobileUrl: "/Individuelle-Accidents-bg-mobile.jpg",
    tag: "Assistance Voyage",
    title: "Voyagez l’esprit léger, on veille sur vous",
    titleMaxWidth: "max-w-[560px]",
    mobileTitle: "Une couverture qui suit votre quotidien",
    description:
      "Une urgence médicale, un vol de bagages ou un vol retardé ? Bénéficiez d’une assistance 24h/24, partout dans le monde.",
    features: [
      "Couverture mondiale 24/7",
      "Urgence médicale et rapatriement",
      "Aide en cas de perte de bagages ou documents",
    ],
    price: "49,00",
    priceUnit: "HT / jour",
    ctaLabel: "Obtenir mon devis",
    ctaLink: "/devis-assurance-assistance-voyage",
  };

  // Generate structured data for assurance voyage page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      {
        name: "Assurance Voyage",
        url: "https://trtbroker.com/assurance-voyage",
      },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Assurance Voyage",
    description:
      "Assurance voyage et assistance depuis le Maroc avec devis gratuit.",
    serviceType: "Insurance",
    offerDescription:
      "Protégez-vous lors de vos déplacements au Maroc et à l'étranger",
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
      <Section5 />
    </>
  );
}

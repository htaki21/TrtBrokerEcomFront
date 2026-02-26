import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  SEO_PAGES,
} from "@/lib/seo";
import { Metadata } from "next";
import Script from "next/script";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.ASSURANCE_HABITATION,
  canonical: "/assurance-habitation",
});

export default function HabitationPage() {
  // Generate structured data for assurance habitation page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      {
        name: "Assurance Habitation",
        url: "https://trtbroker.com/assurance-habitation",
      },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Assurance Habitation",
    description:
      "Assurance habitation complète au Maroc avec devis gratuit et personnalisé.",
    serviceType: "Insurance",
    offerDescription:
      "Protégez votre logement au Maroc avec une assurance habitation adaptée",
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

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}

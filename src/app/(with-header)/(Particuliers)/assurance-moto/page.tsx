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
  ...SEO_PAGES.ASSURANCE_MOTO,
  canonical: "/assurance-moto",
});

export default function AssuranceMotoPage() {
  // Generate structured data for assurance moto page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      { name: "Assurance Moto", url: "https://trtbroker.com/assurance-moto" },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Assurance Moto",
    description:
      "Assurance moto et scooter au Maroc au meilleur prix avec devis gratuit.",
    serviceType: "Insurance",
    offerDescription: "Assurance moto et scooter au Maroc au meilleur prix",
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

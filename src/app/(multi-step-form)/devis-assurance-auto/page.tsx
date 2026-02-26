import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
} from "@/lib/seo";
import { Metadata } from "next";
import Script from "next/script";
import { FormProvider } from "./context";
import FormSteps from "./FormSteps";

export const metadata: Metadata = generateSEOMetadata({
  title: "Devis Assurance Auto Maroc - Gratuit et Personnalisé",
  description:
    "Obtenez votre devis assurance auto au Maroc en quelques minutes. Comparaison gratuite des meilleures offres du marché.",
  keywords: [
    "devis assurance auto Maroc",
    "devis auto gratuit Maroc",
    "comparateur assurance auto Maroc",
    "tarif assurance auto Maroc",
  ],
  canonical: "/devis-assurance-auto",
});

export default function DevisAssuranceAuto() {
  // Generate structured data for devis assurance auto page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      {
        name: "Assurance Automobile",
        url: "https://trtbroker.com/assurance-automobile",
      },
      {
        name: "Devis Assurance Auto",
        url: "https://trtbroker.com/devis-assurance-auto",
      },
    ],
  });

  const serviceData = generateStructuredData("Service", {
    name: "Devis Assurance Auto",
    description:
      "Obtenez votre devis assurance auto au Maroc en quelques minutes.",
    serviceType: "Insurance Quote",
    offerDescription: "Comparaison gratuite des meilleures offres du marché",
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

      <FormProvider>
        <FormSteps />
      </FormProvider>
    </>
  );
}

import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import { generateMetadata as generateSEOMetadata, generateStructuredData, SEO_PAGES } from "@/lib/seo";
import { Metadata } from 'next';
import Script from "next/script";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.ASSURANCE_AUTO,
  canonical: '/assurance-automobile',
});

export default function AssuranceautoPage() {
  // Generate structured data for assurance auto page
  const breadcrumbData = generateStructuredData('BreadcrumbList', {
    items: [
      { name: 'Accueil', url: 'https://trtbroker.com' },
      { name: 'Assurance Automobile', url: 'https://trtbroker.com/assurance-automobile' },
    ],
  });

  const serviceData = generateStructuredData('Service', {
    name: 'Assurance Automobile',
    description: 'Assurance automobile complète au Maroc avec devis gratuit et personnalisé.',
    serviceType: 'Insurance',
    offerDescription: 'Comparez les meilleures offres d\'assurance auto au Maroc',
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

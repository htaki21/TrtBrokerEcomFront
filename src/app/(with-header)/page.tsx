import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import { generateMetadata as generateSEOMetadata, generateStructuredData, SEO_PAGES } from "@/lib/seo";
import { Metadata } from 'next';
import Script from "next/script";

// Enable ISR - revalidate every 30 minutes for home page
export const revalidate = 1800;

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.HOME,
  canonical: '/',
});

export default function Home() {
  // Generate structured data for homepage
  const breadcrumbData = generateStructuredData('BreadcrumbList', {
    items: [
      { name: 'Accueil', url: 'https://trtbroker.com' },
    ],
  });

  return (
    <>
      {/* Structured Data for Homepage */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}

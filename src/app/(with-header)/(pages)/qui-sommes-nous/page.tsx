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
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.QUI_SOMMES_NOUS,
  canonical: "/qui-sommes-nous",
});

export default function QuisommesnousPage() {
  // Generate structured data for qui sommes nous page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      { name: "Qui sommes-nous", url: "https://trtbroker.com/qui-sommes-nous" },
    ],
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

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
    </>
  );
}

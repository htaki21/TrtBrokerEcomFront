import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import FormSection from "./form";
import { generateMetadata as generateSEOMetadata, generateStructuredData, SEO_PAGES } from "@/lib/seo";
import { Metadata } from 'next';
import Script from "next/script";

export const metadata: Metadata = generateSEOMetadata({
  ...SEO_PAGES.CARRIERE,
  canonical: '/carriere',
});

export default function CarrieresPage() {
  // Generate structured data for career page
  const breadcrumbData = generateStructuredData('BreadcrumbList', {
    items: [
      { name: 'Accueil', url: 'https://trtbroker.com' },
      { name: 'Carrières', url: 'https://trtbroker.com/carriere' },
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
      
      <section className="bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,#FFF_100%)]">
        <Wrapper1180 className="pt-[132px] gap-12 max-laptop:px-4 max-mobile:gap-9 max-mobile:py-16 max-mobile:px-2">
          <SectionHeader
            badgeText="Rejoignez-nous"
            heading="Faites carrière dans le courtage du futur"
            headingClassName="max-w-[460px]"
          />
          <FormSection />
        </Wrapper1180>
      </section>
    </>
  );
}

import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import FaqSection from "./section";

// Enable ISR - revalidate every 4 hours for FAQ page
export const revalidate = 14400;

export default function FaqPage() {
  return (
    <Wrapper1180
      as="main"
      className="max-mobile:py-16 max-laptop:px-4 max-mobile:gap-12 items-center py-[132px]"
    >
      <SectionHeader
        badgeText="FAQ"
        heading="Vos questions. Nos réponses."
        headingSizeClass="Headings-H1"
        description="Tout ce que vous devez savoir sur nos services, nos offres et votre parcours client chez TRT BROKER."
        descriptionClassName="max-w-[388px] w-full"
      />
      <FaqSection />
    </Wrapper1180>
  );
}

import ButtonLink from "@/app/components/buttons/ButtonLink";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Image from "next/image";

export default function Section1() {
  return (
    <section className="w-full px-4 bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]">
      <Wrapper1180 className="max-tablet:py-16 max-mobile:px-2 max-mobile:gap-9 items-center py-[132px]">
        <div className="f-col gap-6 items-center">
          <div className="f-col gap-6 max-mobile:gap-4 items-center">
            <Tag label="Qui sommes-nous" />
            <h2 className="text-Neutral-Dark Headings-H1 max-w-[600px] w-full text-center">
              Notre expertise protège vos ambitions
            </h2>
          </div>
          <ButtonLink
            href="/contact"
            label="Rejoignez notre équipe"
            className="max-mobile:px-6"
            size="ultraLarge"
            iconClassName="w-6 h-6"
            color="black"
          />
        </div>
        <Image
          src="/qui-sommes-nous-hero-bg.jpg"
          alt="Team working together in the office – Qui sommes-nous section background"
          width={1276}
          height={695}
          className="rounded-2xl max-mobile:h-[287px] object-cover"
          priority
        />
      </Wrapper1180>
    </section>
  );
}

import ButtonLink from "@/app/components/buttons/ButtonLink";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Image from "next/image";

export default function Section1() {
  return (
    <section
      className="
    relative overflow-visible
    p-5 max-mobile:pt-9 max-mobile:pb-6 max-mobile:px-4
    bg-[linear-gradient(180deg,var(--color-Secondary-Red-Lowest)_0%,_#FFF_100%)]
    before:absolute
    before:left-0  before:-bottom-[250px]
    before:bg-[url('/Professionnels-overlay.png')]
    before:bg-no-repeat
    before:bg-cover
    before:bg-center
    before:h-full
    before:min-w-full
    before:max-tablet:hidden
  "
    >
      <Wrapper1180 className="flex-row gap-5 max-mobile:gap-6 items-center max-mobile:flex-col">
        <div className="f-col gap-14 max-mobile:gap-7 flex-1 z-[0]">
          <div className="f-col gap-3">
            <h1 className="text-Neutral-Dark Headings-H1">Professionnels</h1>
            <p className="text-Text-Body Text-M max-w-[550px] w-full">
              Traitez votre activité en toute sérénité grâce à nos services
              dédiés à la protection de vos équipes, équipements et
              responsabilités.
            </p>
          </div>
          <ButtonLink
            href="#une-assurance-qui-comprend-votre-metier"
            direction="bottom"
            className="p-3"
            color="red"
            iconClassName="w-6 h-6"
          />
        </div>
        <div className="flex-1 z-[0]">
          <Image
            src="/assurance-professionnelle-bg.png"
            alt="Arrière-plan de l'assurance professionnelle"
            width={580}
            height={570}
            priority
            className=""
          />
        </div>
      </Wrapper1180>
    </section>
  );
}

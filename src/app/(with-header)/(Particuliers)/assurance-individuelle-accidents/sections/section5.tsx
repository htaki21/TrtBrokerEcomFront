import ButtonLink from "@/app/components/buttons/ButtonLink";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Image from "next/image";

export default function Section5() {
    return (
      <section className="px-4">
        <Wrapper1180
          className="max-mobile:py-16 max-mobile:gap-12 items-center py-[132px]
        max-mobile:bg-[linear-gradient(180deg,#FFF_0%,var(--color-Secondary-Red-Lowest)_100%)]"
        >
          <div className="relative z-10 p-3 rounded-3xl h-[700px] max-mobile:h-[610px] w-full overflow-hidden">
            <Image
              src="/Offre-spéciale-Stagiaires.png"
              alt="Bannière de l'offre spéciale pour les stagiaires"
              fill
              className="object-cover -z-10 block max-mobile:hidden"
            />
            <Image
              src="/Offre-spéciale-Stagiaires-mobile.png"
              alt="Bannière de l'offre spéciale pour les stagiaires"
              fill
              className="object-cover -z-10 hidden max-mobile:block"
            />
            <div className="f-col max-w-[568px] w-full py-11 px-9 max-mobile:p-6 max-mobile:gap-11 gap-20 rounded-2xl bg-white">
              <div className="f-col gap-6 max-mobile:gap-4">
                <div className="flex-center w-fit py-2 px-4 gap-2 rounded-full bg-Secondary-Red-Lowest">
                  <span aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="6"
                        fill="#994937"
                        stroke="#D0ABA3"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                  <span className="text-Secondary-Red-Medium text-base/snug max-mobile:text-sm font-medium">
                    Offre spéciale Stagiaires
                  </span>
                </div>
                <h2 className="text-Neutral-Dark Headings-H2 max-w-[380px] w-full">
                  Pensée pour les jeunes actifs
                </h2>
              </div>
              <div className="f-col gap-4">
                <div className="">
                  <span className="text-Text-Body Text-S">A partir de</span>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-Neutral-Dark Headings-H2">
                      149,00 DH
                    </span>
                    <span className="text-Text-Body Text-S">HT / mois</span>
                  </div>
                </div>
                <ButtonLink
                  href="/devis-assurance-individuelle-accidents"
                  label="Je profite de l’offre"
                  color="black"
                  iconClassName="w-6 h-6"
                  className="w-full max-mobile:w-fit max-mobile:py-3 max-mobile:px-6"
                />
              </div>
            </div>
          </div>
        </Wrapper1180>
      </section>
    );
}
import ButtonLink from "@/app/components/buttons/ButtonLink";
import { AidKitIcon } from "@/app/components/icons/Aid-kit";
import { HealthIcon } from "@/app/components/icons/Health";
import { WarningIcon } from "@/app/components/icons/Warning";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Link from "next/link";

export default function Section4() {
  return (
    <section
      className="px-4 max-mobile:bg-[url('/overlay2-mobile.png'),linear-gradient(180deg,#FFF_0%,var(--Secondary-Blue-Lowest,_#EDF0F5)_100%)]
     w-full bg-[url('/overlay2.png'),linear-gradient(180deg,#FFF_0%,var(--Secondary-Blue-Lowest,_#EDF0F5)_100%)]
      bg-[length:contain,cover] bg-[position:bottom,center] bg-no-repeat"
    >
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-16 max-tablet:max-w-[460px] items-center py-[132px]">
        <div className="f-col items-center gap-6">
          <Tag label="Nos Solutions" />
          <div className="f-col items-center gap-2 text-center">
            <h2 className="text-Neutral-Dark Headings-H2">
              Préparer l&apos;avenir en toute confiance
            </h2>
            <p className="text-Text-Body Text-M max-mobile:w-[330px] w-[388px]">
              Des solutions d&apos;épargne et de prévoyance pensées pour vous et
              vos proches.
            </p>
          </div>
        </div>
        <div className="max-tablet:flex-col flex w-full gap-4">
          {NosSolutionsCards.map((card, i) => (
            <div
              key={i}
              className="f-col relative group overflow-hidden max-mobile:gap-16 bg-Neutral-Dark basis-1/3 gap-[172px] rounded-[20px] bg-cover bg-center"
            >
              <Link
                href={card.buttonHref}
                className={`bg-cover bg-center bg-no-repeat absolute inset-0 transition-transform
                   ease-out duration-2000 group-hover:scale-120 ${card.backgroundImage}`}
                aria-label={`En savoir plus sur ${card.title}`}
              />
              {/* top-right arrow */}
              <div className="max-mobile:p-3 flex z-[1] justify-end p-4">
                <ButtonLink
                  href={card.buttonHref}
                  color="white"
                  iconClassName="w-6 h-6"
                  ariaLabel={`En savoir plus sur ${card.title}`}
                />
              </div>

              {/* content */}
              <div className="f-col max-mobile:p-4 max-mobile:gap-3 gap-5 p-6 z-[2] pointer-events-none">
                <span className="flex w-fit rounded-xl bg-[rgba(201,201,201,0.12)] p-2 text-white backdrop-blur-[35.8px]">
                  {card.icon}
                </span>
                <div className="f-col gap-1">
                  <h3 className="Headings-H7 text-white">{card.title}</h3>
                  <p className="Text-S text-white/70">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper1180>
    </section>
  );
}

const NosSolutionsCards = [
  {
    buttonHref: "/assurance-sante",
    title: "Assurance Vie",
    description:
      "Construisez un capital pour financer l'avenir de vos proches en toute sérénité.",
    icon: <AidKitIcon />,
    backgroundImage:
      "bg-[url('/Assurance-Vie.png')] max-mobile:bg-[url('/Assurance-Vie-mobile.png')]",
  },
  {
    buttonHref: "/assurance-maladie-complementaire",
    title: "Complémentaire Santé",
    description:
      "Un renfort santé pour mieux couvrir vos soins et limiter vos dépenses.",
    icon: <HealthIcon />,
    backgroundImage:
      "bg-[url('/Complémentaire-Santé.png')] max-mobile:bg-[url('/Complémentaire-Santé-mobile.png')]",
  },
  {
    buttonHref: "/assurance-individuelle-accidents",
    title: "Accidents de la Vie",
    description:
      "En cas d'accident de la vie, soyez soutenu financièrement et humainement.",
    icon: <WarningIcon />,
    backgroundImage:
      "bg-[url('/Accidents-de-la-Vie.png')]  max-mobile:bg-[url('/Accidents-de-la-Vie-mobile.png')]",
  },
];

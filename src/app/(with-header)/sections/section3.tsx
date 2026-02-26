import ButtonLink from "@/app/components/buttons/ButtonLink";
import { CarIcon } from "@/app/components/icons/car";
import { TripIcon } from "@/app/components/icons/Trip";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

export default function Section3() {
  return (
    <section className="bg-custom-gradient w-full px-4">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px] items-center py-[132px]">
        <div className="f-col items-center gap-6">
          <Tag label="Nos Offres" />
          <h2 className="text-Neutral-Dark Headings-H2 max-mobile:text-balance text-center">
            Une assurance à votre image,
            <br />
            sans compromis
          </h2>
        </div>
        <div className="max-tablet:flex-col flex w-full gap-5">
          {cardsData.map((card, idx) => (
            <CardAssurance key={idx} {...card} />
          ))}
        </div>
      </Wrapper1180>
    </section>
  );
}

const cardsData = [
  {
    icon: <CarIcon className="h-[104px] w-[104px] text-[#375299]" />,
    bgImage: "/LooperGroup.png",
    title: "Protégez votre véhicule, sans compromis",
    description:
      "Roulez l'esprit tranquille avec une assurance auto complète et adaptée à vos besoins.",
    price: "199,00 DH",
    unit: "HT / mois",
    buttonHref1: "/devis-assurance-auto",
    buttonHref2: "/assurance-automobile",
    features: [
      "4 formules flexibles pour tous les budgets",
      "Garanties personnalisables pour plus de sécurité",
      "Assistance 24/7 en cas de panne ou d'accident",
    ],
  },
  {
    icon: <TripIcon className="h-[104px] w-[104px]" />,
    bgImage: "/LooperGroup-2.png",
    title: "Voyagez sereinement, où que vous alliez",
    description:
      "Profitez pleinement de vos séjours avec une couverture santé et assistance internationale.",
    price: "49,00 DH",
    unit: "HT / mois",
    buttonHref1: "/devis-assurance-assistance-voyage",
    buttonHref2: "/assurance-voyage",
    features: [
      "Prise en charge des frais médicaux et pharmaceutiques",
      "Capital versé en cas de décès ou d'invalidité",
      "Couverture ajustable selon la durée de votre voyage",
    ],
  },
];

const CardAssurance = ({
  icon,
  bgImage,
  title,
  description,
  price,
  unit,
  buttonHref1,
  buttonHref2,
  features,
}: (typeof cardsData)[0]) => (
  <div className="f-col bg-Neutral-BG-1 flex-1 rounded-3xl p-2">
    {/* main content */}
    <div
      className="f-col max-mobile:gap-8 gap-16 rounded-2xl bg-white bg-contain bg-top-right bg-no-repeat p-5 shadow-[0_4px_6px_-4px_rgba(140,140,140,0.10),0_10px_15px_-3px_rgba(140,140,140,0.10)]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="f-col max-mobile:gap-4 gap-7">
        {icon}
        <div className="f-col gap-2">
          <h3 className="text-BG-Dark Headings-H6">{title}</h3>
          <p className="text-Text-Body Text-S max-mobile:w-full w-[326px] text-balance">
            {description}
          </p>
        </div>
      </div>

      <div className="f-col gap-4">
        <div className="f-col">
          <span className="text-Text-Body Text-S">A partir de</span>
          <div className="flex items-baseline gap-2">
            <span className="text-BG-Dark Headings-H2">{price}</span>
            <span className="text-Text-Body Text-S">{unit}</span>
          </div>
        </div>
        <ButtonLink
          href={buttonHref1}
          label="Obtenir mon devis"
          color="black"
          iconClassName="w-6 h-6"
          className="w-full"
        />
      </div>
    </div>

    {/* features */}
    <div className="f-col max-mobile:py-5 max-mobile:px-2 gap-6 px-5 py-6">
      <ul className="f-col gap-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="flex-center bg-Neutral-BG-3 rounded-full p-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M11.3574 4.27414C11.5282 4.10328 11.8052 4.10328 11.976 4.27414C12.1469 4.44499 12.1469 4.72195 11.976 4.89279L6.14271 10.7261C5.97186 10.897 5.69491 10.8969 5.52406 10.7261L2.60739 7.80946C2.43653 7.6386 2.43653 7.36166 2.60739 7.1908C2.76757 7.03062 3.02116 7.02043 3.193 7.16061L3.22604 7.1908L5.83338 9.79814L11.3574 4.27414Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="text-BG-Dark Text-S">{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={buttonHref2}
        size="small"
        color="white"
        label="Découvrir tous les avantages"
        className="font-medium max-mobile:w-full max-mobile:text-base/[24px]"
      />
    </div>
  </div>
);

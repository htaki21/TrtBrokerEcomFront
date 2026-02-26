import ButtonLink from "@/app/components/buttons/ButtonLink";
import { BlueStarIcon } from "@/app/components/icons/blue-star";
import { BoxIcon } from "@/app/components/icons/Box";
import CheckIcon from "@/app/components/icons/check-mark-gray";
import { SparkleIcon } from "@/app/components/icons/Sparkle";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import React from "react";

type Feature = {
  label: string;
  value: string;
};

type Plan = {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  isPopular?: boolean;
  buttonColor: "gray" | "black";
  features: Feature[];
};

const pricingPlans: Plan[] = [
  {
    icon: <BoxIcon />,
    title: "Basique",
    description: "Protection essentielle, sans fioritures.",
    price: "312,50 DH",
    buttonColor: "gray",
    features: [
      { label: "Capital décès :", value: "200 000 DH" },
      { label: "Invalidité permanente :", value: "300 000 DH" },
      { label: "Frais médicaux :", value: "50 000 DH" },
    ],
  },
  {
    icon: <BlueStarIcon className="text-Primary-500" />,
    title: "Confort",
    description: "Plus de garanties pour votre sérénité quotidienne.",
    price: "427,50 DH",
    buttonColor: "black",
    isPopular: true,
    features: [
      { label: "Capital décès :", value: "500 000 DH" },
      { label: "Invalidité permanente :", value: "750 000 DH" },
      { label: "Frais médicaux :", value: "150 000 DH" },
    ],
  },
  {
    icon: <SparkleIcon />,
    title: "Premium",
    description: "La protection maximale, rien n’est laissé au hasard.",
    price: "738,00 DH",
    buttonColor: "gray",
    features: [
      { label: "Capital décès :", value: "1 000 000 DH" },
      { label: "Invalidité permanente :", value: "1 500 000 DH" },
      { label: "Frais médicaux :", value: "300 000 DH" },
    ],
  },
];

const FeatureItem = ({ label, value }: Feature) => (
  <li className="flex gap-6">
    <div className="flex items-center gap-2 flex-1">
      <CheckIcon />
      <span className="text-BG-Dark Text-S">{label}</span>
    </div>
    <span className="text-Neutral-Dark font-medium text-lg/snug max-tablet:text-base/snug">
      {value}
    </span>
  </li>
);

const PricingCard = ({
  icon,
  title,
  description,
  price,
  isPopular,
  buttonColor,
  features,
}: Plan) => (
  <div className="f-col flex-1 p-2 rounded-3xl bg-Neutral-BG-1">
    <div className="f-col h-full gap-10 max-tablet:gap-6 max-tablet:p-4 p-5 rounded-2xl bg-white shadow-lg">
      <div className="f-col flex-1 gap-6 max-tablet:gap-4">
        {icon}
        <div className="f-col gap-2">
          <div className="flex gap-2 items-start">
            <h3 className="text-Neutral-Dark text-2xl/snug font-medium">
              {title}
            </h3>
            {isPopular && (
              <span className="text-Primary-300 Button-XS flex p-2 rounded-full bg-Primary-500">
                le plus populaire
              </span>
            )}
          </div>
          <p className="text-Text-Body Text-S">{description}</p>
        </div>
      </div>
      <div className="f-col gap-4 max-tablet:gap-3">
        <div className="flex gap-2 items-baseline">
          <span className="text-Neutral-Dark Headings-H4">{price}</span>
          <span className="text-Text-Body Text-S">HT / mois</span>
        </div>
        <ButtonLink
          href="/devis-assurance-individuelle-accidents"
          label="Obtenir mon devis"
          size="small"
          color={buttonColor}
          className=" max-tablet:py-3"
        />
      </div>
    </div>
    <ul className="f-col py-6 px-5 max-tablet:py-5 max-tablet:px-3 gap-7 max-tablet:gap-4 ">
      {features.map((feature) => (
        <FeatureItem key={`${feature.label}-${feature.value}`} {...feature} />
      ))}
    </ul>
  </div>
);

export default function Section3() {
  return (
    <section className="px-4 bg-[radial-gradient(125%_125%_at_50%_90%,_#fff_40%,_theme(colors.slate.300)_100%)]">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px] items-center py-[132px]">
        <SectionHeader
          badgeText="Nos Formules"
          heading="Choisissez le niveau de protection qui vous convient"
          headingClassName="max-w-[574px] w-full"
        />
        <div className="flex max-tablet:flex-col gap-2 w-full items-stretch">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </Wrapper1180>
    </section>
  );
}

import ButtonLink from "@/app/components/buttons/ButtonLink";
import { BlueStarIcon } from "@/app/components/icons/blue-star";
import CheckIcon from "@/app/components/icons/check-mark-gray";
import { DiamondIcon } from "@/app/components/icons/Diamond";
import { ShieldIcon } from "@/app/components/icons/Shield";
import { SparkleIcon } from "@/app/components/icons/Sparkle";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

export default function Section2() {
  return (
    <section className="px-4">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center py-[132px]">
        <SectionHeader
          badgeText="Nos Offres"
          heading="Choisissez la formule qui s'adapte à votre façon de conduire."
          headingClassName="max-w-[686px] max-tablet:max-w-[460px] w-full"
        />
        <div className="w-full f-col p-2 gap-3 rounded-3xl bg-Neutral-BG-1
        max-tablet:max-w-[460px]">
          <div className="flex max-tablet:flex-col gap-2">
            {cardsData.map((card, index) => (
              <FeatureCard
                key={index}
                Icon={card.Icon}
                IconClassname={card.IconClassname}
                title={card.title}
                description={card.description}
                features={card.features}
              />
            ))}
          </div>
          <ButtonLink
            href="/devis-assurance-auto"
            label="Obtenir mon devis"
            color="black"
            iconClassName="w-6 h-6"
            className="w-full max-mobile:py-3"
          />
        </div>
      </Wrapper1180>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  features: string[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  IconClassname?: string;
}
const FeatureCard: React.FC<CardProps> = ({
  title,
  description,
  features,
  Icon = DiamondIcon,
  IconClassname
}) => {
  return (
    <div className="f-col flex-1 ">
      <div className="f-col p-5 gap-10 max-mobile:gap-5 rounded-2xl bg-white shadow-lg">
        <Icon className={IconClassname} />
        <div className="f-col gap-2">
          <h3 className="text-Neutral-Dark Headings-H7">{title}</h3>
          <p className="text-Text-Body Text-S">{description}</p>
        </div>
      </div>
      <ul className="f-col py-4 px-3 gap-5">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon />
            <span className="text-Neutral-Dark Text-S">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const cardsData = [
  {
    title: "Essentiel",
    description: "Pour rouler l'esprit tranquille à petit prix.",
    features: [
      "Responsabilité civile",
      "Événements exceptionnels",
      "Défense juridique",
      "Protection des passagers",
    ],
  },
  {
    Icon: ShieldIcon,
    IconClassname: "text-Secondary-Red-Medium",
    title: "Confort",
    description:
      "Une couverture renforcée pour ceux qui prennent souvent la route.",
    features: ["Responsabilité civile", "Vol", "Incendie"],
  },
  {
    Icon: BlueStarIcon,
    IconClassname: "text-Secondary-Blue-Medium",
    title: "Confort +",
    description: "Un niveau de sécurité supérieur pour votre tranquillité.",
    features: ["Tous les éléments de Confort", "Dommages collision"],
  },
  {
    Icon: SparkleIcon,
    title: "Tous Risques",
    description: "Notre protection la plus complète, sans compromis.",
    features: [
      "Tous les éléments de Confort +",
      "Bris de glace",
      "Dommages tous accidents",
      "Assistance premium",
    ],
  },
];

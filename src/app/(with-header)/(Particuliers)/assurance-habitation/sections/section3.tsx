import ButtonLink from "@/app/components/buttons/ButtonLink";
import { AddIcon } from "@/app/components/icons/Add";
import { CheckcircleIcon } from "@/app/components/icons/Check-circle";
import CheckIcon from "@/app/components/icons/check-mark-gray";
import PlusIcon from "@/app/components/icons/PlusIcon";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

const cardsData = [
  {
    Icon: CheckcircleIcon,
    title: "Garanties Essentielles",
    description:
      "Nos formules offrent une couverture de base pour les principaux risques de votre logement, sans frais additionnels.",
    features: [
      "Incendie & explosion",
      "Dégâts des eaux",
      "Responsabilité civile",
      "Catastrophes naturelles",
      "Bris de glace (vitrage, fenêtre, etc.)",
    ],
    iconClassName: "w-[104px] h-[104px] text-Primary-500",
    bgWhite: false,
  },
  {
    Icon: AddIcon,
    title: "Garanties Optionnelles",
    description:
      "Optez pour des protections supplémentaires pour personnaliser votre assurance selon votre style de vie et vos biens.",
    features: [
      "Piscine et installations extérieures",
      "Vol et vandalisme",
      "Objets de valeur",
      "Dépendances / caves / garages",
      "Dommages électriques",
    ],
    iconClassName: "w-[104px] h-[104px]",
    bgWhite: true,
  },
];

export default function Section3() {
  return (
    <section className="px-4">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center py-[132px]">
        <SectionHeader
          badgeText="Vos Garanties, Votre Choix"
          heading="Composez la protection qui vous ressemble"
          headingClassName="max-w-[460px] w-full"
          descriptionClassName="max-w-[460px] w-full"
          description="Des experts du courtage vous accompagnent avec des solutions fiables, adaptées et transparentes."
        />
        <div className="w-full f-col p-2 gap-3 max-tablet:max-w-[460px] rounded-3xl bg-Neutral-BG-1">
          <div className="flex max-tablet:flex-col gap-2">
            {cardsData.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
          <ButtonLink
            href="/devis-assurance-habitation"
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
  iconClassName?: string;
  bgWhite?: boolean;
}
const FeatureCard: React.FC<CardProps> = ({
  title,
  description,
  features,
  Icon,
  iconClassName,
  bgWhite,
}) => {
  return (
    <div
      className={`f-col p-6 max-mobile:py-6 max-mobile:px-4 max-mobile:gap-5 gap-8 flex-1 ${bgWhite ? "rounded-2xl bg-white shadow-lg" : ""}`}
    >
      <div className="f-col gap-7 max-mobile:gap-4">
        {Icon && <Icon className={iconClassName} />}
        <div className="f-col gap-2 max-w-[415px] w-full">
          <h3 className="text-Neutral-Dark font-medium text-2xl/snug max-mobile:text-xl">
            {title}
          </h3>
          <p className="text-Text-Body Text-S">{description}</p>
        </div>
      </div>
      <ul className="f-col gap-5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            {bgWhite ? <PlusIcon /> : <CheckIcon />}
            <span className="text-BG-Dark Text-S">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

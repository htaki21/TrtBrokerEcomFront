import ButtonLink from "@/app/components/buttons/ButtonLink";
import { AidKitIcon } from "@/app/components/icons/Aid-kit";
import { BirdIcon } from "@/app/components/icons/Bird";
import CheckIcon from "@/app/components/icons/check-mark-gray";
import { WheelIcon } from "@/app/components/icons/Wheel";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

const cardsData: CardProps[] = [
  {
    Icon: AidKitIcon,
    iconClassName: "text-Secondary-Red-Medium",
    title: "Assistance Médicale",
    features: [
      "Soins & hospitalisation pris en charge",
      "Dentiste en cas d’accident",
      "Transport ou hébergement pour proches",
    ],
  },
  {
    Icon: WheelIcon,
    title: "Assistance Automobile",
    features: [
      "Dépannage en cas de panne ou accident",
      "Transport passagers + véhicule",
      "Avance de fonds pour réparations",
      "Récupération du véhicule à l’étranger",
    ],
  },
  {
    Icon: BirdIcon,
    title: "Assistance en cas de décès",
    features: [
      "Rapatriement du corps",
      "Retour pris en charge des accompagnants",
      "Organisation complète des démarches",
    ],
  },
];

export default function Section3() {
  return (
    <section className="px-4 bg-[radial-gradient(125%_125%_at_50%_90%,_#fff_40%,_theme(colors.slate.300)_100%)]">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 items-center max-tablet:max-w-[460px] py-[132px]">
        <SectionHeader
          badgeText="Des garanties solides, à chaque imprévu"
          heading="Ce que couvre vraiment votre assistance voyage"
          headingClassName="max-w-[460px] w-full"
        />
        <div className="w-full f-col p-2 gap-3 rounded-3xl bg-Neutral-BG-1">
          <div className="flex max-tablet:flex-col gap-2">
            {cardsData.map((card, index) => (
              <FeatureCard key={`${card.title}-${index}`} {...card} />
            ))}
          </div>
          <ButtonLink
            href="/devis-assurance-assistance-voyage"
            label="Obtenir mon devis"
            color="black"
            iconClassName="w-6 h-6"
            className="w-full max-tablet:py-3"
          />
        </div>
      </Wrapper1180>
    </section>
  );
}

interface CardProps {
  title: string;
  features: string[];
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
}
const FeatureCard: React.FC<CardProps> = ({
  title,
  features,
  Icon,
  iconClassName,
}) => {
  return (
    <div className="f-col flex-1">
      <div className="f-col p-5 max-tablet:p-4 gap-10 max-tablet:gap-5 rounded-2xl bg-white shadow-lg">
        {Icon && <Icon className={`w-[104px] h-[104px] ${iconClassName ?? ""}`} />}
        <h3 className="text-Neutral-Dark Headings-H7">{title}</h3>
      </div>
      <ul className="f-col py-5 px-4 gap-5 max-tablet:gap-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckIcon />
            <span className="text-BG-Dark Text-S">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

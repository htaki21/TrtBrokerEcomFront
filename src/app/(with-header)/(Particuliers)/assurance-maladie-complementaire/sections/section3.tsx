import ButtonLink from "@/app/components/buttons/ButtonLink";
import CheckIcon from "@/app/components/icons/check-mark-gray";

import { MarocIcon } from "@/app/components/icons/Maroc";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

const cardsData = [
  {
    Icon: MarocIcon,
    title: "Maroc",
    description: "Idéal pour un budget maîtrisé et une couverture locale.",
    reimbursement: {
      percentage: 95,
      label: "de remboursement",
    },
    ceiling: {
      amount: "200 000",
      currency: "Dh / an",
    },
    features: [
      "Consultations médicales",
      "Médicaments prescrits",
      "Analyses & radiologie",
      "Urgences & hospitalisation",
    ],
  },
];

export default function Section3() {
  return (
    <section className="px-4">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px] items-center py-[132px]">
        <SectionHeader
          badgeText="Couverture étendue"
          heading="Votre santé protégée ici et partout ailleurs"
          headingClassName="max-w-[460px] w-full"
        />
        <div className="w-full f-col p-2 gap-3 rounded-3xl bg-Neutral-BG-1">
          <div className="flex max-tablet:flex-col gap-2">
            {cardsData.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
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
  reimbursement?: {
    percentage: number;
    label: string;
  };
  ceiling: {
    amount: string;
    currency: string;
  };
}
const FeatureCard: React.FC<CardProps> = ({
  title,
  description,
  features,
  Icon,
  reimbursement,
  ceiling,
}) => {
  return (
    <div className="flex max-tablet:flex-col flex-1">
      <div className="f-col flex-1 p-5 max-tablet:p-4 gap-16 max-tablet:gap-5 rounded-2xl bg-white shadow-lg">
        <div className="f-col gap-6 max-tablet:gap-4">
          {Icon && <Icon className="text-Secondary-Red-Medium" />}
          <div className="f-col gap-2">
            <h3 className="text-Neutral-Dark Headings-H7">{title}</h3>
            <p className="text-Text-Body Text-S">{description}</p>
          </div>
        </div>
        <ul
          className="flex items-center gap-10
                max-tablet:flex-col max-tablet:items-start max-tablet:gap-4"
        >
          {reimbursement && (
            <li>
              <span className="text-Text-Body Text-S">Jusqu’à</span>
              <div className="flex items-baseline gap-2">
                <span className="text-Neutral-Dark Headings-H3">
                  {reimbursement.percentage}%
                </span>
                <span className="text-Text-Body Text-S">
                  {reimbursement.label}
                </span>
              </div>
            </li>
          )}
          <li>
            <span className="text-Text-Body items-baseline  Text-S">
              Plafonnés jusqu’à
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-Neutral-Dark Headings-H3">
                {ceiling.amount}
              </span>
              <span className="text-Text-Body Text-S">{ceiling.currency}</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="f-col flex-1 py-4 px-3 max-tablet:gap-8 justify-between">
        <ul className="f-col gap-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-BG-Dark Text-S">{feature}</span>
            </li>
          ))}
        </ul>
        <ButtonLink
          href="/devis-assurance-sante"
          label="Obtenir mon devis"
          color="black"
          iconClassName="w-6 h-6"
          className="w-full max-tablet:py-3"
        />
      </div>
    </div>
  );
};

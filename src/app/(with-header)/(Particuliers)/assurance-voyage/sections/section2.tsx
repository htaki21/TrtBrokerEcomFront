import ButtonLink from "@/app/components/buttons/ButtonLink";
import { ExpartireIcon } from "@/app/components/icons/Expartire";
import { GlobalIcon } from "@/app/components/icons/Global";
import { ShengenIcon } from "@/app/components/icons/Shengen";
import { StudentIcon } from "@/app/components/icons/Student";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

interface CoverageCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  iconClassName?: string;
}

const coverageOptions = [
  {
    icon: ShengenIcon,
    title: "Schengen",
    description:
      "Formule requise pour le visa Schengen avec couverture médicale.",
    iconClassName: "text-Primary-800 w-[132px] h-[132px]",
  },
  {
    icon: GlobalIcon,
    title: "Monde",
    description:
      "Une protection globale pour voyager sereinement partout dans le monde.",
    iconClassName: "text-Primary-800 w-[132px] h-[132px]",
  },
  {
    icon: StudentIcon,
    title: "Étudiant",
    description:
      "Assistance complète pour vos séjours académiques à l’étranger.",
    iconClassName: "text-Primary-800 w-[132px] h-[132px]",
  },
  {
    icon: ExpartireIcon,
    title: "Expatrié",
    description:
      "Couverture longue durée idéale pour vivre et travailler à l’étranger.",
    iconClassName: "text-Primary-800 w-[132px] h-[132px]",
  },
];

export default function Section2() {
  return (
    <section className="f-col max-mobile:py-16 px-4 items-center py-[132px]">
      <Wrapper1180 className="max-tablet:gap-12 max-tablet:max-w-[460px]">
        <div className="max-tablet:gap-6 max-tablet:flex-col flex justify-between">
          <div className="f-col max-tablet:items-center max-tablet:gap-4 gap-6">
            <Tag label="Quelle assistance voyage vous correspond ?" />
            <h2 className="text-shadow-Neutral-Dark Headings-H2 max-tablet:text-center max-w-[600px] w-full text-balance">
              Choisissez la couverture adaptée à votre situation
            </h2>
          </div>
          <div className="flex max-tablet:justify-center items-end">
            <ButtonLink
              href="/devis-assurance-assistance-voyage"
              label="Obtenir mon devis"
              color="black"
              iconClassName="w-6 h-6"
              className="max-tablet:py-3 max-tablet:px-6 "
            />
          </div>
        </div>
        <ul className="flex max-tablet:flex-col gap-5">
          {coverageOptions.map((option) => (
            <CoverageCard key={option.title} {...option} />
          ))}
        </ul>
      </Wrapper1180>
    </section>
  );
}

function CoverageCard({
  icon: Icon,
  title,
  description,
  iconClassName,
}: CoverageCardProps) {
  return (
    <li className="f-col flex-1 gap-5 max-tablet:gap-3 rounded-2xl">
      <div className="flex-center h-[240px] max-tablet:bg-cover bg-center rounded-[20px]
       bg-Sage-Gray-Lowest bg-[url('/card-bg-couveture-section.png')] bg-no-repeat">
        <Icon className={iconClassName} />
      </div>
      <div className="f-col gap-2 max-tablet:gap-1">
        <h3 className="Headings-H7 text-Neutral-Dark">{title}</h3>
        <p className="Text-S text-Text-Body">{description}</p>
      </div>
    </li>
  );
}

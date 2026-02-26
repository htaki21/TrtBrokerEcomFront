import ButtonLink from "@/app/components/buttons/ButtonLink";
import { HealthIcon } from "@/app/components/icons/Health";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import Image from "next/image";
import { WarningIcon } from "../components/icons/Warning";

const products = [
  {
    title: "Assurance-vie",
    description:
      "Protégez ceux que vous aimez avec une couverture financière solide en cas de coup dur.",
    imageSrc: "/Assurance-vie-image.webp",
    imageAlt:
      "Une famille souriante dans un parc, représentant la sécurité financière de l'assurance-vie.",
    color: "violet" as const,
    href: "/devis-assurance-sante",
    icon: HealthIcon,
  },
  {
    title: "Individuelle Accidents",
    description:
      "Soyez couvert en toutes circonstances, au quotidien comme en déplacement.",
    imageSrc: "/Individuelle-Accidents-image.webp",
    imageAlt:
      "Une personne faisant de la randonnée en montagne, illustrant la protection contre les accidents individuels.",
    color: "blue" as const,
    href: "/devis-assurance-individuelle-accidents",
    icon: WarningIcon,
  },
];

type ProductCardProps = (typeof products)[number] & {
    reverseLayout?: boolean;
};

const ProductCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  color,
  href,
  icon: Icon,
  reverseLayout = false,
}: ProductCardProps) => {
  const colorMap = {
    violet: {
      text: "text-Secondary-Violet-High",
      textLower: "text-Secondary-Violet-Lower",
      button: "violetHigh" as const,
    },
    blue: {
      text: "text-Secondary-Blue-High",
      textLower: "text-Secondary-Blue-Lower",
      button: "blueHigh" as const,
    },
  };

  const selectedColor = colorMap[color];

  return (
    <li
      className={`flex max-tablet:flex-col items-center gap-5 max-tablet:gap-3 ${reverseLayout ? "flex-row-reverse" : ""}`}
    >
      <div
        className="f-col py-10 px-9 justify-between rounded-[20px] h-[364px] max-tablet:h-auto flex-1 bg-white 
            max-tablet:p-6 max-tablet:gap-12"
      >
        <div
          className={`${selectedColor.text} flex max-tablet:flex-col flex-wrap max-tablet:items-start items-center gap-2`}
        >
          {Icon && <Icon className="w-8 h-8" />}
          <h3 className="Headings-H4">{title}</h3>
        </div>
        <div className="f-col gap-4">
          <p className={`${selectedColor.textLower} Text-M`}>{description}</p>
          <ButtonLink
            href={href}
            label="Découvrir ce produit"
            color={selectedColor.button}
            iconClassName="w-6 h-6"
            className="max-tablet:py-3 max-tablet:px-6"
          />
        </div>
      </div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={680}
        height={364}
        className="rounded-[20px] max-tablet:h-[260px] object-cover"
      />
    </li>
  );
};

export default function ProvidenceSection() {
    return (
        <div className="w-full px-4 bg-gradient-to-b from-white via-[var(--color-Secondary-Violet-Lowest)] to-[var(--color-Secondary-Blue-Lowest)]">
            <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-6 max-tablet:max-w-[460px] items-center py-[132px] gap-14">
                <SectionHeader
                    badgeText="Aller plus loin avec la prévoyance"
                    heading="Anticipez l’imprévisible, protégez l’essentiel"
                    headingClassName="max-w-[460px] w-full"
                />
                <ul className="f-col gap-5 max-tablet:gap-3">
                    {products.map((product, index) => (
                        <ProductCard key={product.title} {...product} reverseLayout={index % 2 !== 0} />
                    ))}
                </ul>
            </Wrapper1180>
        </div>
    )
}

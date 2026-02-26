import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

type StatItemProps = {
  number: string;
  text: string;
  gap?: string;
};

const StatItem = ({ number, text, gap = "gap-[120px]" }: StatItemProps) => (
  <li className={`f-col ${gap} p-8 max-mobile:p-5 bg-Sage-Gray-Lowest rounded-[20px]`}>
    <span className="text-Brand-600 Headings-H2">{number}</span>
    <h6 className="text-Sage-Gray-High Text-M">{text}</h6>
  </li>
);

export default function Section2() {
  const stats = [
    {
      number: "+ 10 ans",
      text: "D’expertise en courtage",
      gap: "gap-[120px] max-mobile:gap-3",
    },
    {
      number: "+ 20 000",
      text: "Clients accompagnés",
      gap: "gap-[60px] max-mobile:gap-3",
    },
    {
      number: "30 compagnies",
      text: "Partenaires à l’international",
      gap: "gap-[120px] max-mobile:gap-3",
    },
  ];

  return (
    <Wrapper1180
      as="section"
      className="max-mobile:py-16 max-laptop:px-4 max-mobile:gap-12 gap-20 py-[132px]"
    >
      <div className="f-col gap-8 max-mobile:gap-4">
        <h2 className="text-Neutral-Dark Headings-H2">
          Experts du risque, bâtisseurs de confiance
        </h2>
        <p className="text-Text-Body Text-XL max-w-[865px] w-full">
          TRT Broker, cabinet de courtage en assurances basé à Casablanca, est
          votre partenaire de confiance pour toutes vos solutions d’assurance,
          que vous soyez particulier ou professionnel. Depuis plus de 10 ans,
          nous mettons notre expertise indépendante au service de nos clients,
          en proposant les meilleures offres du marché, adaptées à chaque besoin
          et à chaque budget.
        </p>
      </div>

      <ul className="grid grid-cols-3 max-tablet:grid-cols-2 max-mobile:grid-cols-1 items-end gap-5">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </ul>
    </Wrapper1180>
  );
}

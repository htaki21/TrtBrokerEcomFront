import { BadgeIcon } from "@/app/components/icons/Badge";
import { ChatIcon } from "@/app/components/icons/Chat";
import { PointerwithSparkIcon } from "@/app/components/icons/Pointer-with-Spark";
import { TagIcon } from "@/app/components/icons/Tag-icon";
import Tag from "@/app/components/text/Tag";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

export default function Section2() {
  return (
    <section className="max-mobile:hidden px-4">
      <Wrapper1180
        className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px]
       items-center py-[132px]"
      >
        <div className="f-col items-center gap-6">
          <Tag label="Pourquoi nous faire confiance ?" />
          <div className="f-col w-full max-w-[460px] gap-2 text-center">
            <h2 className="text-Neutral-Dark Headings-H2">
              L&apos;expérience au service de votre sécurité
            </h2>
            <p className="text-Text-Body Text-M">
              Des experts du courtage vous accompagnent avec des solutions
              fiables, adaptées et transparentes.
            </p>
          </div>
        </div>
        <div className="max-tablet:flex-col max-mobile:gap-6 flex gap-5">
          {data.map((item, index) => (
            <div key={index} className="f-col max-mobile:gap-3 flex-1 gap-5">
              <span className={`flex-center h-[248px] rounded-2xl ${item.bg}`}>
                {item.icon}
              </span>
              <h3 className="text-Text-Body Text-M">
                <span className="text-Neutral-Dark font-medium">
                  {item.title}
                </span>{" "}
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </Wrapper1180>
    </section>
  );
}

interface CardItem {
  bg: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}

const data: CardItem[] = [
  {
    bg: "bg-[#E2EFCE] bg-[url('/BadgeIcon-bg.png')] bg-center bg-cover bg-no-repeat",
    icon: <BadgeIcon />,
    title: "Savoir-faire reconnue.",
    text: "+40 ans d'expertise en courtage d'assurance.",
  },
  {
    bg: "bg-Secondary-Violet-Lowest bg-[url('/TagIcon-bg.png')] bg-center bg-cover bg-no-repeat",
    icon: <TagIcon />,
    title: "Tarifs compétitifs garantis.",
    text: "Des prix justes, transparents, sans surprise.",
  },
  {
    bg: "bg-Secondary-Blue-Lowest bg-[url('/ChatIcon-bg.png')] bg-center bg-cover bg-no-repeat",
    icon: <ChatIcon />,
    title: "Relation de proximité.",
    text: "Un conseiller dédié, disponible et à votre écoute.",
  },
  {
    bg: "bg-Secondary-Red-Lowest bg-[url('/PointerwithSparkIcon-bg.png')] bg-center bg-cover bg-no-repeat",
    icon: <PointerwithSparkIcon />,
    title: "Souscription simple & rapide.",
    text: "100% en ligne, en quelques clics.",
  },
];

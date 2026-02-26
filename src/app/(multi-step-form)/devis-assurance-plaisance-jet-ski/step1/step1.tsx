import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { AMoteurIcon } from "../../components/icons/AMoteur";
import { DePlaisanceIcon } from "../../components/icons/DePlaisance";
import { JetSkiIcon } from "../../components/icons/Jet-Ski";
import { AVoileIcon } from "../../components/icons/ÀVoile";

export default function Step1() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type: "De Plaisance" | "À Moteur" | "À Voile" | "Jet-Ski"
  ) => {
    setData((prev) => ({ ...prev, typeDeBateau: type }));
  };

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<DePlaisanceIcon className="w-[56px] h-[56px]" />}
          title="De Plaisance"
          description="Idéal pour les sorties en mer ou en rivière."
          selected={data.typeDeBateau === "De Plaisance"}
          onClick={() => handleSelect("De Plaisance")}
        />

        <Card
          padding="py-12 px-5"
          svg={<AMoteurIcon className="w-[56px] h-[56px]" />}
          title="À Moteur"
          description="Bateau rapide, souvent utilisé pour les sports nautiques."
          selected={data.typeDeBateau === "À Moteur"}
          onClick={() => handleSelect("À Moteur")}
        />
      </div>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<AVoileIcon className="w-[56px] h-[56px]" />}
          title="À Voile"
          description="Voilier ou catamaran principalement à voile."
          selected={data.typeDeBateau === "À Voile"}
          onClick={() => handleSelect("À Voile")}
        />

        <Card
          padding="py-12 px-5"
          svg={<JetSkiIcon className="w-[56px] h-[56px]" />}
          title="Jet-Ski"
          description="Véhicule nautique individuel à moteur pour le sport."
          selected={data.typeDeBateau === "Jet-Ski"}
          onClick={() => handleSelect("Jet-Ski")}
        />
      </div>
    </div>
  );
}

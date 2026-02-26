import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { OccasionIcon } from "../../components/icons/FilledIcon";
import { NouvelAchatIcon } from "../../components/icons/SettingsIcon";

export default function Step1() {
  const { data, setData } = useFormContext();

  const handleSelect = (type: "Nouvel Achat" | "Occasion") => {
    setData((prev) => ({ ...prev, typeDeVoiture: type }));
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        svg={<NouvelAchatIcon className="w-[60px] h-[60px]" />}
        title="Nouvel Achat"
        description="Vous venez d’acheter une voiture neuve (immatriculation récente)."
        selected={data.typeDeVoiture === "Nouvel Achat"}
        onClick={() => handleSelect("Nouvel Achat")}
      />

      <Card
        svg={<OccasionIcon className="w-[60px] h-[60px]" />}
        title="Occasion"
        description="La voiture a déjà été utilisée (ancien propriétaire ou importée)."
        selected={data.typeDeVoiture === "Occasion"}
        onClick={() => handleSelect("Occasion")}
      />
    </div>
  );
}

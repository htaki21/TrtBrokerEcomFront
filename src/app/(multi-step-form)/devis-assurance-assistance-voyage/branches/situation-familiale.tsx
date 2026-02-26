import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { MoiIcon } from "../../components/icons/Moi";
import { CouplerIcon } from "../../components/icons/Couple";
import { FamilleIcon } from "../../components/icons/Famille";

export default function SituationFamiliale() {
    const { data, setData } = useFormContext();
  
    const handleSelect = (type: "Individuel" | "Couple" | "Famille") => {
      setData((prev) => ({ ...prev, situationfamiliale: type }));
    };
  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        padding="py-[48px] px-[20px]"
        svg={<MoiIcon className="w-[56px] h-[56px]" />}
        title="Individuel"
        description="Vous voyagez seul."
        selected={data.situationfamiliale === "Individuel"}
        onClick={() => handleSelect("Individuel")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<CouplerIcon className="w-[56px] h-[56px]" />}
        title="Couple"
        description="Vous voyagez avec votre conjoint(e)."
        selected={data.situationfamiliale === "Couple"}
        onClick={() => handleSelect("Couple")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<FamilleIcon className="w-[56px] h-[56px]" />}
        title="Famille"
        description="Vous êtes accompagné de vos enfants."
        selected={data.situationfamiliale === "Famille"}
        onClick={() => handleSelect("Famille")}
      />
    </div>
  );
}

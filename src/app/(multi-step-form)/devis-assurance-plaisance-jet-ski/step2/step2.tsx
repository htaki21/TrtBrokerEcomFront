import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { AppartementIcon } from "../../components/icons/Appartement";
import { MaisonIcon } from "../../components/icons/Maison";

export default function Step2() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type: "Responsabilité Civile" | "Défense et Recours"
  ) => {
    setData((prev) => {
      const includesType = prev.garantiesDeBaseIncluses.includes(type);
      return {
        ...prev,
        garantiesDeBaseIncluses: includesType
          ? prev.garantiesDeBaseIncluses.filter((t) => t !== type) // remove if already selected
          : [...prev.garantiesDeBaseIncluses, type], // add if not selected
      };
    });
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        padding="py-[48px] px-[20px]"
        svg={<AppartementIcon className="w-[56px] h-[56px]" />}
        title="Responsabilité Civile"
        description="Couvre les dommages causés à des tiers"
        selected={data.garantiesDeBaseIncluses.includes(
          "Responsabilité Civile"
        )}
        onClick={() => handleSelect("Responsabilité Civile")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<MaisonIcon className="w-[56px] h-[56px]" />}
        title="Défense et Recours"
        description="Pavillon individuel, souvent avec un petit jardin."
        selected={data.garantiesDeBaseIncluses.includes("Défense et Recours")}
        onClick={() => handleSelect("Défense et Recours")}
      />
    </div>
  );
}

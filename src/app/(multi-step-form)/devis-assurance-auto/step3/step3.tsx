import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { DieselIcon } from "../../components/icons/Diesel";
import { EssenceIcon } from "../../components/icons/Essence";
import { HybrideIcon } from "../../components/icons/Hybride";
import { ÉlectriqueIcon } from "../../components/icons/Électrique";

export default function Step3() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type: "Essence" | "Diesel" | "Hybride" | "Électrique"
  ) => {
    setData((prev) => ({ ...prev, carburant: type }));
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
      <Card
        padding="py-12 px-5"
        svg={<EssenceIcon className="w-[56px] h-[56px]" />}
        title="Essence"
        description="Moteur à essence classique"
        selected={data.carburant === "Essence"}
        onClick={() => handleSelect("Essence")}
      />

      <Card
        padding="py-12 px-5"
        svg={<DieselIcon className="w-[56px] h-[56px]" />}
        title="Diesel"
        description="Moteur diesel"
        selected={data.carburant === "Diesel"}
        onClick={() => handleSelect("Diesel")}
      />

      <Card
        padding="py-12 px-5"
        svg={<HybrideIcon className="w-[56px] h-[56px]" />}
        title="Hybride"
        description="Moteur essence + électrique"
        selected={data.carburant === "Hybride"}
        onClick={() => handleSelect("Hybride")}
      />

      <Card
        padding="py-12 px-5"
        svg={<ÉlectriqueIcon className="w-[56px] h-[56px]" />}
        title="Électrique"
        description="100% électrique"
        selected={data.carburant === "Électrique"}
        onClick={() => handleSelect("Électrique")}
      />
    </div>
  );
}

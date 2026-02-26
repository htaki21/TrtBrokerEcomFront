import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { AppartementIcon } from "../../components/icons/Appartement";
import { MaisonIcon } from "../../components/icons/Maison";
import { VillaIcon } from "../../components/icons/Villa";

export default function Step1() {
  const { data, setData } = useFormContext();

  const handleSelect = (type: "Appartement" | "Maison" | "Villa") => {
    setData((prev) => ({ ...prev, typeHabitation: type }));
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        padding="py-[48px] px-[20px]"
        svg={<AppartementIcon className="w-[56px] h-[56px]" />}
        title="Appartement"
        description="  Pour les logements situés dans un immeuble collectif."
        selected={data.typeHabitation === "Appartement"}
        onClick={() => handleSelect("Appartement")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<MaisonIcon className="w-[56px] h-[56px]" />}
        title="Maison"
        description="Pavillon individuel, souvent avec un petit jardin."
        selected={data.typeHabitation === "Maison"}
        onClick={() => handleSelect("Maison")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<VillaIcon className="w-[56px] h-[56px]" />}
        title="Villa"
        description="Logement haut de gamme avec grande superficie et aménagements extérieurs."
        selected={data.typeHabitation === "Villa"}
        onClick={() => handleSelect("Villa")}
      />
    </div>
  );
}

import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { SantéMarocIcon } from "../../components/icons/SantéMaroc";
import { SantéMarocInternationalIcon } from "../../components/icons/SantéMarocInternational";

export default function Step1() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type: "Santé Maroc" | "Santé Maroc + International"
  ) => {
    setData((prev) => ({ ...prev, planSante: type }));
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        padding="py-[48px] px-[20px]"
        svg={<SantéMarocIcon className="w-[56px] h-[56px]" />}
        title="Santé Maroc"
        description="Pour une couverture locale efficace."
        selected={data.planSante === "Santé Maroc"}
        onClick={() => handleSelect("Santé Maroc")}
      />

      <Card
        padding="py-[48px] px-[20px]"
        svg={<SantéMarocInternationalIcon className="w-[56px] h-[56px]" />}
        title="Santé Maroc + International"
        description="Pour voyager en toute sérénité."
        selected={data.planSante === "Santé Maroc + International"}
        onClick={() => handleSelect("Santé Maroc + International")}
      />
    </div>
  );
}

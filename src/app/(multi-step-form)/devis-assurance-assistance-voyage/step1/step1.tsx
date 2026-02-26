import { useFormContext } from "../context";
import Card from "../../components/cards/card";

export default function Step1() {
  const { data, setData } = useFormContext();

  const handleSelect = (type: "6 mois" | "Plus de 6 mois") => {
    setData((prev) => ({ ...prev, dureeVisa: type }));
  };

  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        title="6 mois"
        description="Pour les séjours temporaires de courte durée."
        selected={data.dureeVisa === "6 mois"}
        onClick={() => handleSelect("6 mois")}
      />

      <Card
        title="Plus de 6 mois"
        description="Pour les séjours prolongés ou les installations longue durée."
        selected={data.dureeVisa === "Plus de 6 mois"}
        onClick={() => handleSelect("Plus de 6 mois")}
      />
    </div>
  );
}

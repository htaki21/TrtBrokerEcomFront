import { useFormContext } from "../context";
import Card from "../../components/cards/card";
import { DélaissementIcon } from "../../components/icons/Délaissement";
import { TousRisquesIcon } from "../../components/icons/TousRisques";
import { TransportéesIcon } from "../../components/icons/Transportées";
import { VolTotalIcon } from "../../components/icons/VolTotal";

export default function Step3() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type:
      | "Perte Totale & Délaissement"
      | "Vol Total"
      | "Tous Risques"
      | "Individuelle Personnes Transportées"
  ) => {
    setData((prev) => {
      const includesType = prev.garantiesOptionnelles.includes(type);
      return {
        ...prev,
        garantiesOptionnelles: includesType
          ? prev.garantiesOptionnelles.filter((t) => t !== type) // remove if already selected
          : [...prev.garantiesOptionnelles, type], // add if not selected
      };
    });
  };

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<DélaissementIcon className="w-[56px] h-[56px]" />}
          title="Perte Totale & Délaissement"
          description="	Remboursement en cas de perte irréversible ou abandon du bateau."
          selected={data.garantiesOptionnelles.includes(
            "Perte Totale & Délaissement"
          )}
          onClick={() => handleSelect("Perte Totale & Délaissement")}
        />

        <Card
          padding="py-12 px-5"
          svg={<VolTotalIcon className="w-[56px] h-[56px]" />}
          title="Vol Total"
          description="Bateau rapide, souvent utilisé pour les sports nautiques."
          selected={data.garantiesOptionnelles.includes("Vol Total")}
          onClick={() => handleSelect("Vol Total")}
        />
      </div>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<TousRisquesIcon className="w-[56px] h-[56px]" />}
          title="Tous Risques"
          description="Voilier ou catamaran principalement à voile."
          selected={data.garantiesOptionnelles.includes("Tous Risques")}
          onClick={() => handleSelect("Tous Risques")}
        />

        <Card
          padding="py-12 px-5"
          svg={<TransportéesIcon className="w-[56px] h-[56px]" />}
          title="Individuelle Personnes Transportées"
          description="Véhicule nautique individuel à moteur pour le sport."
          selected={data.garantiesOptionnelles.includes(
            "Individuelle Personnes Transportées"
          )}
          onClick={() => handleSelect("Individuelle Personnes Transportées")}
        />
      </div>
    </div>
  );
}

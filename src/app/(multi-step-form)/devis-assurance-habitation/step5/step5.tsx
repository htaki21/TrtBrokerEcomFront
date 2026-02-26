import Card from "../../components/cards/card";
import { BainMaureSaunaIcon } from "../../components/icons/BainMaureSauna";
import { ChauffeurIcon } from "../../components/icons/Chauffeur";
import { JardinierGardienIcon } from "../../components/icons/JardinierGardien";
import { PiscineIcon } from "../../components/icons/Piscine";
import { useFormContext } from "../context";

export default function Step5() {
  const { data, setData } = useFormContext();
  const handleSelect = (
    type: "piscine" | "bain_maure_sauna" | "chauffeur" | "jardinier_gardien"
  ) => {
    setData((prev) => {
      return {
        ...prev,
        garantiesOptionnelles: {
          ...prev.garantiesOptionnelles,
          [type]: !prev.garantiesOptionnelles[type], // toggle boolean value
        },
      };
    });
  };

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          disabled={data.typeHabitation === "Appartement"} // disable if Appartement
          padding="py-12 px-5"
          svg={<PiscineIcon className="w-[56px] h-[56px]" />}
          title="Piscine"
          description="Pour les dommages ou fuites de votre piscine."
          selected={data.garantiesOptionnelles.piscine}
          onClick={() => handleSelect("piscine")}
        />

        <Card
          padding="py-12 px-5"
          svg={<BainMaureSaunaIcon className="w-[56px] h-[56px]" />}
          title="Bain Maure / Sauna"
          description="Installation de bien-être à couvrir."
          selected={data.garantiesOptionnelles.bain_maure_sauna}
          onClick={() => handleSelect("bain_maure_sauna")}
        />
      </div>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<ChauffeurIcon className="w-[56px] h-[56px]" />}
          title="Chauffeur"
          description="Assurance responsabilité pour votre chauffeur."
          selected={data.garantiesOptionnelles.chauffeur}
          onClick={() => handleSelect("chauffeur")}
        />

        <Card
          disabled={data.typeHabitation === "Maison"} // disable if Appartement
          padding="py-12 px-5"
          svg={<JardinierGardienIcon className="w-[56px] h-[56px]" />}
          title="Jardinier / Gardien"
          description="Protégez votre personnel de maison."
          selected={data.garantiesOptionnelles.jardinier_gardien}
          onClick={() => handleSelect("jardinier_gardien")}
        />
      </div>
    </div>
  );
}

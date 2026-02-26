"use client";

import Card from "../../components/cards/card";
import { ExpatriéIcon } from "../../components/icons/Expatrié";
import { SantéMarocInternationalIcon } from "../../components/icons/SantéMarocInternational";
import { SchengenIcon } from "../../components/icons/Schengen";
import { ÉtudiantIcon } from "../../components/icons/Étudiant";
import { useFormContext } from "../context";

export default function Step2() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type: "Schengen" | "Monde" | "Étudiant" | "Expatrié"
  ) => {
    setData((prev) => ({ ...prev, assistanceVoyage: type }));
  };

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<SchengenIcon className="w-[56px] h-[56px]" />}
          title="Schengen"
          description="	Assistance obligatoire pour les visas vers l’espace Schengen."
          selected={data.assistanceVoyage === "Schengen"}
          onClick={() => handleSelect("Schengen")}
        />

        <Card
          padding="py-12 px-5"
          svg={<SantéMarocInternationalIcon className="w-[56px] h-[56px]" />}
          title="Monde"
          description="Couverture étendue à l'international, hors Schengen."
          selected={data.assistanceVoyage === "Monde"}
          onClick={() => handleSelect("Monde")}
        />
      </div>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<ÉtudiantIcon className="w-[56px] h-[56px]" />}
          title="Étudiant"
          description="Spécifique aux besoins des étudiants à l’étranger."
          selected={data.assistanceVoyage === "Étudiant"}
          onClick={() => handleSelect("Étudiant")}
        />

        <Card
          padding="py-12 px-5"
          svg={<ExpatriéIcon className="w-[56px] h-[56px]" />}
          title="Expatrié"
          description="Formule pour séjours longue durée à l’étranger."
          selected={data.assistanceVoyage === "Expatrié"}
          onClick={() => handleSelect("Expatrié")}
        />
      </div>
    </div>
  );
}

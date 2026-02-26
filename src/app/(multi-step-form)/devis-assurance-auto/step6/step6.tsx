"use client";

import { useEffect } from "react";
import Card from "../../components/cards/card";
import { useFormContext } from "../context";

export default function Step6() {
  const { data, setData } = useFormContext();

  // Auto-set age for new cars, but still show the step for confirmation
  useEffect(() => {
    if (data.typeDeVoiture === "Nouvel Achat" && !data.ageDeVoiture) {
      setData((prev) => ({ ...prev, ageDeVoiture: "Moins de 5 ans" }));
    }
  }, [data.typeDeVoiture, data.ageDeVoiture, setData]);

  const handleSelect = (type: "Moins de 5 ans" | "Plus de 5 ans") => {
    setData((prev) => ({ ...prev, ageDeVoiture: type }));
  };

  return (
    <div className="flex flex-col gap-6 max-mobile:gap-4">
      <div className="flex gap-4 max-mobile:flex-col max-mobile:gap-3">
        <Card
          title="Moins de 5 ans"
          description="Véhicule récent"
          selected={data.ageDeVoiture === "Moins de 5 ans"}
          onClick={() => handleSelect("Moins de 5 ans")}
        />

        <Card
          title="Plus de 5 ans"
          description="Véhicule plus ancien"
          selected={data.ageDeVoiture === "Plus de 5 ans"}
          onClick={() => handleSelect("Plus de 5 ans")}
        />
      </div>
    </div>
  );
}

"use client";

import { useFormContext } from "../context";
import Card from "../../components/cards/card";

export default function DureeDeLaCouverture() {
  const { data, setData } = useFormContext();

  const handleSelect = (type: "6 mois" | "1 an") => {
    setData((prev) => ({ ...prev, dureedelacouverture: type }));
  };
  return (
    <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
      <Card
        title="6 mois"
        description="Protection standard pour la moitié d'une année."
        selected={data.dureedelacouverture === "6 mois"}
        onClick={() => handleSelect("6 mois")}
      />

      <Card
        title="1 an"
        description="Une tranquillité sur toute l’année."
        selected={data.dureedelacouverture === "1 an"}
        onClick={() => handleSelect("1 an")}
      />
    </div>
  );
}

"use client";

import { useFormContext } from "../context";
import PrixInput from "../../components/inputs/prix";

export default function Step2() {
  const { data, setData } = useFormContext();

  return (
    <PrixInput
      value={data.valeurHabitation}
      onChange={(val) =>
        setData((prev) => ({ ...prev, valeurHabitation: val }))
      }
      placeholder="ex. 150 000"
      unit="DH"
    />
  );
}

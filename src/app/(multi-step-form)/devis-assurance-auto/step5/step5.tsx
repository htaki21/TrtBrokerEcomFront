"use client";

import { useFormContext } from "../context";
import PrixInput from "../../components/inputs/prix";

export default function Step5() {
  const { data, setData } = useFormContext();

  return (
    <PrixInput
      value={data.valeurEstimee}
      onChange={(val) => setData((prev) => ({ ...prev, valeurEstimee: val }))}
      placeholder="ex. 150 000"
      unit="DH"
    />
  );
}

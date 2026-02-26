"use client";

import { useFormContext } from "../context";
import PrixInput from "../../components/inputs/prix";

export default function Step4() {
  const { data, setData } = useFormContext();

  return (
    <PrixInput
      value={data.objetsValeur}
      onChange={(val) => setData((prev) => ({ ...prev, objetsValeur: val }))}
      placeholder="ex. 150 000"
      unit="DH"
    />
  );
}

"use client";

import { useFormContext } from "../context";
import PrixInput from "../../components/inputs/prix";

export default function Step3() {
  const { data, setData } = useFormContext();

  return (
    <PrixInput
      value={data.valeurContenu}
      onChange={(val) => setData((prev) => ({ ...prev, valeurContenu: val }))}
      placeholder="ex. 150 000"
      unit="DH"
    />
  );
}

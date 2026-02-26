"use client";

import { useEffect } from "react";
import { useFormContext } from "../context";

type Step1Props = {
  price: number; // pass price dynamically
};

export default function PrimeDeLAssistance({ price }: Step1Props) {
  const { setData } = useFormContext();

  // Update form data when this component mounts
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      primedelassistance: price, // store the price directly
    }));
  }, [price, setData]);

  return (
    <div className="flex p-2 rounded-3xl bg-Sage-Gray-Lowest">
      <div
        className="flex max-tablet:flex-col items-end justify-between gap-8 w-full py-7 px-8 max-tablet:p-5
      rounded-2xl bg-white shadow-md"
      >
        <div className="f-col gap-2">
          <h3 className="text-Neutral-Dark Headings-H3">
            Prime de l&apos;assistance*
          </h3>
          <p className="text-Sage-Gray-High Text-M">
            Le paiement se fait à la livraison du contrat ou sur place.
          </p>
        </div>
        <h3 className="text-Secondary-Blue-Medium Headings-H3">
          {price} DH TTC
        </h3>
      </div>
    </div>
  );
}

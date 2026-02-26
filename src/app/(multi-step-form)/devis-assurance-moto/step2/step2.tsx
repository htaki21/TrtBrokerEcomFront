import Card from "../../components/cards/card";
import { Moto1Icon } from "../../components/icons/moto-1";
import { Moto2Icon } from "../../components/icons/moto-2";
import { Moto3Icon } from "../../components/icons/moto-3";
import { Moto4Icon } from "../../components/icons/moto-4";
import { useFormContext } from "../context";

export default function Step2() {
  const { data, setData } = useFormContext();

  const handleSelect = (
    type:
      | "Moins de 49cc et < 60 km/h"
      | "Moins de 49cc et > 60 km/h"
      | "Entre 50cc et 125cc"
      | "125cc ou plus"
  ) => {
    setData((prev) => ({ ...prev, Typedemoto: type }));
  };

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<Moto1Icon className="w-[56px] h-[56px]" />}
          title=" Moins de 49cc et < 60 km/h"
          description="	Cyclomoteur léger, souvent utilisé sans permis ou pour les jeunes."
          selected={data.Typedemoto === "Moins de 49cc et < 60 km/h"}
          onClick={() => handleSelect("Moins de 49cc et < 60 km/h")}
        />

        <Card
          padding="py-12 px-5"
          svg={<Moto2Icon className="w-[56px] h-[56px]" />}
          title="Moins de 49cc et > 60 km/h"
          description="Petite moto plus rapide, parfois utilisée pour les trajets urbains."
          selected={data.Typedemoto === "Moins de 49cc et > 60 km/h"}
          onClick={() => handleSelect("Moins de 49cc et > 60 km/h")}
        />
      </div>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-3">
        <Card
          padding="py-12 px-5"
          svg={<Moto3Icon className="w-[56px] h-[56px]" />}
          title="Entre 50cc et 125cc"
          description="Scooter ou moto légère, parfaite pour les trajets quotidiens."
          selected={data.Typedemoto === "Entre 50cc et 125cc"}
          onClick={() => handleSelect("Entre 50cc et 125cc")}
        />

        <Card
          padding="py-12 px-5"
          svg={<Moto4Icon className="w-[56px] h-[56px]" />}
          title="125cc ou plus"
          description="Moto puissante, pour route ou usage mixte (ville + autoroute)."
          selected={data.Typedemoto === "125cc ou plus"}
          onClick={() => handleSelect("125cc ou plus")}
        />
      </div>
    </div>
  );
}

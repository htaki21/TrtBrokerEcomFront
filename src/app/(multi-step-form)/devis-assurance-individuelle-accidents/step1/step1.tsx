import ButtonLink from "@/app/components/buttons/ButtonLink";
import { BoxIcon } from "@/app/components/icons/Box";
import { SparkleIcon } from "@/app/components/icons/Sparkle";
import { BlueStarIcon } from "@/app/components/icons/blue-star";
import { useFormContext } from "../context";

export default function Step1({ goToNextStep }: { goToNextStep: () => void }) {
  const { data, setData } = useFormContext();

  return (
    <div className="grid grid-cols-2 max-tablet:grid-cols-1 gap-2">
      <div className="flex-center p-2 rounded-[24px] bg-Sage-Gray-Lowest">
        <div
          className="f-col justify-between p-5 gap-16 rounded-2xl w-full h-full
        bg-[url('/Formule-Basique-overlay.png')] bg-white bg-blend-multiply bg-contain bg-no-repeat bg-center
         shadow-md"
        >
          <div className="f-col justify-center gap-3">
            <BoxIcon className="text-Neutral-BG-4 w-8 h-8" />
            <div className="f-col gap-1">
              <h6 className="text-Neutral-Dark Headings-H6">Formule Basique</h6>
              <p className="text-Text-Body Text-S max-w-[340px]">
                Roulez l&apos;esprit tranquille avec une assurance auto complète et
                adaptée à vos besoins.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-Neutral-Dark Headings-H3">312,50 DH</h3>
            <ButtonLink
              direction="right"
              size="small"
              label="Obtenir mon devis"
              color="gray"
              iconClassName="w-5 h-5"
              className="max-mobile:py-3 font-medium"
              onClick={() => {
                setData({ ...data, formuleAccidents: "Formule Basique" });
                goToNextStep(); // new prop you pass from FormSteps
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-center p-2 rounded-[24px] bg-Sage-Gray-Lowest">
        <div
          className="f-col justify-between p-5 gap-16 rounded-2xl w-full h-full shadow-md
        bg-[url('/Formule-Confort-overlay.png')] bg-white bg-blend-multiply bg-contain bg-no-repeat bg-center"
        >
          <div className="f-col justify-center gap-3">
            <BlueStarIcon className="text-Primary-500 w-8 h-8" />
            <div className="f-col gap-1">
              <div className="flex gap-2 items-center">
                <h6 className="text-Neutral-Dark Headings-H6">
                  Formule Confort
                </h6>
                <span className="flex py-1 px-2 rounded-full bg-Primary-500 text-Primary-300 Button-XS">
                  le plus populaire
                </span>
              </div>
              <p className="text-Text-Body Text-S max-w-[340px]">
                Couvre les incidents modérés avec indemnisation étendue.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-Neutral-Dark Headings-H3">427,50 DH</h3>
            <ButtonLink
              direction="right"
              size="small"
              label="Obtenir mon devis"
              color="black"
              iconClassName="w-5 h-5"
              className="max-mobile:py-3 font-medium"
              onClick={() => {
                setData({ ...data, formuleAccidents: "Formule Confort" });
                goToNextStep(); // new prop you pass from FormSteps
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 max-tablet:col-span-1 flex-center p-2 rounded-[24px] bg-Sage-Gray-Lowest">
        <div
          className="f-col p-5 gap-16 rounded-2xl flex-1 shadow-md
        bg-[url('/Formule-Premium-overlay.png')] bg-white bg-blend-multiply bg-contain bg-no-repeat bg-center"
        >
          <div className="f-col justify-center gap-3">
            <SparkleIcon className="text-Neutral-BG-4 w-8 h-8" />
            <div className="f-col gap-1">
              <h6 className="text-Neutral-Dark Headings-H6">Formule Premium</h6>
              <p className="text-Text-Body Text-S">
                Couverture complète avec le maximum de garanties.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-Neutral-Dark Headings-H3">738,00 DH</h3>
            <ButtonLink
              direction="right"
              size="small"
              label="Obtenir mon devis"
              color="gray"
              iconClassName="w-5 h-5"
              className="max-mobile:py-3 font-medium"
              onClick={() => {
                setData({ ...data, formuleAccidents: "Formule Premium" });
                goToNextStep(); // new prop you pass from FormSteps
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Checkbox } from "@heroui/checkbox";
import FormInput from "../../components/inputs/form-input";
import { useFormContext } from "../context";
const timeSlots = [
  { value: "08:30 – 09:00", label: "08:30 – 09:00" },
  { value: "09:00 – 09:30", label: "09:00 – 09:30" },
  {
    value: "09:30 – 10:00",
    label: "09:30 – 10:00 (Indisponible)",
    disabled: true,
  },
  { value: "10:00 – 10:30", label: "10:00 – 10:30" },
  { value: "10:30 – 11:00", label: "10:30 – 11:00" },
];
export default function Step3() {
  const { data, setData } = useFormContext();

  const handleMarketingConsent = (checked: boolean) => {
    setData((prev) => ({ ...prev, marketingConsent: checked }));
  };

  const handleTermsAccepted = (checked: boolean) => {
    setData((prev) => ({ ...prev, termsAccepted: checked }));
  };

  return (
    <div className="flex flex-col gap-6 max-mobile:gap-4">
      <div className="flex p-2 rounded-3xl bg-Sage-Gray-Lowest">
        <div className="f-col p-5 rounded-2xl w-full bg-white shadow-md">
          <div className="f-col gap-5">
            <h5 className="text-Neutral-Dark Headings-H7">
              Détails de votre devis :
            </h5>
            <ul className="f-col gap-2">
              {data.assistanceVoyage && (
                <li className="flex items-center gap-4 Text-S">
                  <h6 className="text-Sage-Gray-High flex-1">
                    Assistance choisie :
                  </h6>
                  <span className="text-Neutral-Dark flex-1">
                    {data.assistanceVoyage}
                  </span>
                </li>
              )}
              {data.dureedelacouverture && (
                <li className="flex items-center gap-4 Text-S">
                  <h6 className="text-Sage-Gray-High flex-1">Durée :</h6>
                  <span className="text-Neutral-Dark flex-1">
                    {data.dureedelacouverture}
                  </span>
                </li>
              )}
              {data.transport && (
                <li className="flex items-center gap-4 Text-S">
                  <h6 className="text-Sage-Gray-High flex-1">
                    Option véhicule :
                  </h6>
                  <span className="text-Neutral-Dark flex-1">
                    {data.transport}
                  </span>
                </li>
              )}
              {data.situationfamiliale && (
                <li className="flex items-center gap-4 Text-S">
                  <h6 className="text-Sage-Gray-High flex-1">
                    Situation familiale :
                  </h6>
                  <span className="text-Neutral-Dark flex-1">
                    {data.situationfamiliale}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="f-col self-end">
            <h6 className="text-Sage-Gray-High Text-S">Prime estimée</h6>
            <div className="flex items-baseline gap-2">
              <span className="text-Neutral-Dark Headings-H2">
                {data.primedelassistance} DH
              </span>
            </div>
          </div>
        </div>
      </div>
      <span className="Line"></span>
      <div className="flex flex-col gap-4">
        <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
          Coordonnées de contact
        </h2>
        <div className="flex gap-4 max-mobile:flex-col max-mobile:gap-3">
          <FormInput
            name="nom"
            label="Nom"
            placeholder="Ex : El Mehdi"
            useFormContextHook={useFormContext}
            isRequired
          />
          <FormInput
            name="prenom"
            label="Prénom"
            placeholder="Ex : Amine"
            useFormContextHook={useFormContext}
            isRequired
          />
        </div>
        <div className="flex gap-4 max-mobile:flex-col max-mobile:gap-3">
          <FormInput
            name="phone"
            label="N° de téléphone"
            placeholder="Ex : 06 12 34 56 78"
            type="tel"
            useFormContextHook={useFormContext}
            isRequired
          />
          <FormInput
            name="email"
            label="Email (optionnel)"
            placeholder="exemple@email.com"
            useFormContextHook={useFormContext}
            type="email"
            isRequired={false}
          />
        </div>
      </div>
      {/* TEMPORARILY HIDDEN - Date and Time fields
      <span className="Line"></span>
      <div className="flex flex-col gap-4">
        <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
          Préférence horaire (optionnel)
        </h2>
        <div className="flex items-center gap-4 max-mobile:flex-col max-mobile:items-stretch max-mobile:gap-3">
          <Calendar24
            value={data.date ? new Date(data.date) : undefined}
            onChange={(date) =>
              setData((prev) => ({
                ...prev,
                date: date ? date.toISOString() : "",
              }))
            }
          />
          <div className="flex w-full flex-col gap-1.5">
            <h3 className="button2-s text-BG-Dark">Créneau horaire</h3>
            <SelectScrollable
              useFormContextHook={useFormContext}
              fieldName="creneauHoraire" // whatever you named it in Form2 data
              options={timeSlots}
              placeholder="Sélectionnez un horaire"
            />
          </div>
        </div>
      </div>
      */}
      <span className="Line"></span>
      <div className="flex flex-col gap-4">
        <Checkbox
          className="checkbox"
          radius="md"
          isSelected={data.marketingConsent}
          onValueChange={handleMarketingConsent}
        >
          Je souhaite recevoir des conseils, offres et nouveautés par e-mail.
        </Checkbox>
        <Checkbox
          className="checkbox"
          radius="md"
          isSelected={data.termsAccepted}
          onValueChange={handleTermsAccepted}
          isRequired={true}
        >
          J&apos;ai lu et j&apos;accepte les conditions générales
          d&apos;utilisation, notamment la mention relative à la protection des
          données personnelles.
        </Checkbox>
      </div>
    </div>
  );
}

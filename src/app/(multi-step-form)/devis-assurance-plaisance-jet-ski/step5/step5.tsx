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
export default function Step5() {
  const { data, setData } = useFormContext();

  const handleMarketingConsent = (checked: boolean) => {
    setData((prev) => ({ ...prev, marketingConsent: checked }));
  };

  const handleTermsAccepted = (checked: boolean) => {
    setData((prev) => ({ ...prev, termsAccepted: checked }));
  };

  return (
    <div className="flex flex-col gap-6 max-mobile:gap-4">
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

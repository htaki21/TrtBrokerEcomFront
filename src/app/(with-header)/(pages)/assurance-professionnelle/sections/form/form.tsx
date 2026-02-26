"use client";

import ButtonLink from "@/app/components/buttons/ButtonLink";
import Input from "@/app/components/input/input";
import { useToast } from "@/hooks/useToast";
import {
  AssuranceEntrepriseFormData,
  submitAssuranceEntrepriseForm,
} from "@/lib/services/assuranceEntrepriseFormService";
import {
  AssuranceProfessionnelleFormData,
  submitAssuranceProfessionnelleForm,
} from "@/lib/services/assuranceProfessionnelleFormService";
import { Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AccidentdetravailIcon } from "../../icons/catégories/Accidentdetravail";
import { AssistanceMédicaleIcon } from "../../icons/catégories/AssistanceMédicale";
import { FlotteautomobileIcon } from "../../icons/catégories/Flotteautomobile";
import { MaladieBaseIcon } from "../../icons/catégories/MaladieBase";
import { MultirisquesLocauxIcon } from "../../icons/catégories/MultirisquesLocaux";
import { RCDirigeantsMandatairesIcon } from "../../icons/catégories/RCDirigeantsMandataires";
import { RCExploitationIcon } from "../../icons/catégories/RCExploitation";
import { RetraiteComplémentaireIcon } from "../../icons/catégories/RetraiteComplémentaire";
import { TransportMarchandisesIcon } from "../../icons/catégories/TransportMarchandises";
import { CheckIcon } from "../../icons/check";
import { PlusgrayIcon } from "../../icons/plus-gray";
import { FormData, formSchema } from "./validation";

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

interface GridSelectItemProps {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  isActive?: boolean;
  selectable?: boolean;
  variant?: "red" | "blue"; // add variant
}

const GridSelectItem = ({
  label,
  Icon,
  onClick,
  isActive = false,
  selectable = false,
  variant = "red", // default to red
}: GridSelectItemProps) => {
  // Map variant colors
  const colors = {
    red: {
      bgActive: "bg-Secondary-Red-Lowest",
      outline: "outline-Secondary-Red-Medium",
      iconBgActive: "bg-Secondary-Red-Medium",
      iconText: "text-Secondary-Red-Medium",
    },
    blue: {
      bgActive: "bg-Secondary-Blue-Lowest",
      outline: "outline-Secondary-Blue-Medium",
      iconBgActive: "bg-Secondary-Blue-Medium",
      iconText: "text-Secondary-Blue-Medium",
    },
  };

  const c = colors[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`f-col relative w-full justify-center items-center py-6 gap-5 cursor-pointer rounded-2xl transition-colors 
        ${
          selectable
            ? isActive
              ? `${c.bgActive} outline ${c.outline}`
              : "bg-Neutral-BG-1 hover:bg-Neutral-BG-2"
            : "bg-Neutral-BG-1 hover:bg-Neutral-BG-2"
        }`}
    >
      {/* Only show plus/check if selectable */}
      {selectable && (
        <span
          className={`absolute top-3 right-3 flex-center p-1 rounded-full w-6 h-6 transition ${
            isActive ? c.iconBgActive : "bg-Neutral-BG-3"
          }`}
        >
          {isActive ? <CheckIcon /> : <PlusgrayIcon />}
        </span>
      )}

      <span
        className={`flex-center ${c.iconText} p-3 rounded-2xl bg-white w-[68px] h-[68px]`}
      >
        <Icon />
      </span>
      <span className="text-Neutral-Dark text-base/snug font-medium max-mobile:text-sm text-center">
        {label}
      </span>
    </button>
  );
};

const catégories = [
  { label: "Maladie de Base", Icon: MaladieBaseIcon },
  { label: "Assistance Médicale", Icon: AssistanceMédicaleIcon },
  { label: "Retraite Complémentaire", Icon: RetraiteComplémentaireIcon },
  { label: "Accident de travail", Icon: AccidentdetravailIcon },
  { label: "Flotte automobile", Icon: FlotteautomobileIcon },
  { label: "Multirisques Locaux", Icon: MultirisquesLocauxIcon },
  { label: "RC Dirigeants/Mandataires", Icon: RCDirigeantsMandatairesIcon },
  { label: "Transport Marchandises", Icon: TransportMarchandisesIcon },
  { label: "RC Exploitation", Icon: RCExploitationIcon },
];

interface Secteur {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface stepContent {
  title: string;
  description: string;
}

interface CategorySelectionFormProps {
  colorVariant?: "red" | "blue";
  gridSize?: "small" | "large";
  secteurs: Secteur[];
  stepContents: stepContent[];
  formType?: "professionnelle" | "entreprise";
}

const GRID_CLASSES = {
  small: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
  large:
    "grid-cols-[repeat(auto-fit,minmax(260px,1fr))] max-mobile:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
};

const CategorySelectionForm = ({
  colorVariant = "red", // default to red
  gridSize = "small",
  secteurs,
  stepContents,
  formType = "professionnelle",
}: CategorySelectionFormProps) => {
  const gridclassName = GRID_CLASSES[gridSize];
  const [accepted, setAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(""); // REMOVED - Date/Time fields hidden
  const [step, setStep] = useState(1);
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();
  const router = useRouter();

  const goNext = () => setStep((s) => s + 1);
  const goPrev = () => setStep((s) => s - 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur", // validate on blur
  });

  const onSubmit = async (data: FormData) => {
    if (
      !data.nomStructure ||
      !data.ville ||
      !data.nom ||
      !data.prenom ||
      !data.telephone ||
      !accepted ||
      !selectedSecteur ||
      activeCategories.length === 0
    ) {
      toastError(
        "Veuillez remplir tous les champs et accepter les conditions !"
      );
      return;
    }

    setIsFormSubmitting(true);

    try {
      if (formType === "entreprise") {
        const formData: AssuranceEntrepriseFormData = {
          selectedSecteur,
          activeCategories,
          nomStructure: data.nomStructure,
          ville: data.ville,
          prenom: data.prenom,
          nom: data.nom,
          telephone: data.telephone,
          email: data.email,
          // selectedTimeSlot, // REMOVED - Date/Time fields hidden
          marketingConsent,
          termsAccepted: accepted,
        };

        const result = await submitAssuranceEntrepriseForm(formData);

        if (result.success) {
          toastSuccess(result.message);
          // Redirect to success page after a short delay
          setTimeout(() => {
            router.push("/success");
          }, 2000);
        } else {
          toastError(
            result.error || "Une erreur s'est produite. Veuillez réessayer."
          );
        }
      } else {
        const formData: AssuranceProfessionnelleFormData = {
          selectedSecteur,
          activeCategories,
          nomStructure: data.nomStructure,
          ville: data.ville,
          prenom: data.prenom,
          nom: data.nom,
          telephone: data.telephone,
          email: data.email,
          // selectedTimeSlot, // REMOVED - Date/Time fields hidden
          marketingConsent,
          termsAccepted: accepted,
        };

        const result = await submitAssuranceProfessionnelleForm(formData);

        if (result.success) {
          toastSuccess(result.message);
          // Redirect to success page after a short delay
          setTimeout(() => {
            router.push("/success");
          }, 2000);
        } else {
          toastError(
            result.error || "Une erreur s'est produite. Veuillez réessayer."
          );
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toastError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <section className="f-col w-full gap-[68px] items-center">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="f-col items-center w-full gap-10 max-mobile:gap-5"
      >
        <div className="f-col gap-2 items-center text-center">
          <h3 className="text-BG-BG-5 Headings-H5 max-mobile:text-balance">
            {stepContents[step - 1].title}
          </h3>
          <p className="text-Text-Body Text-M max-w-[460px] w-full">
            {stepContents[step - 1].description}
          </p>
        </div>

        {/* Step 1: Secteur (no active state, no icons) */}
        {step === 1 && (
          <div className={`grid ${gridclassName} gap-3 w-full`}>
            {secteurs.map((secteur) => (
              <GridSelectItem
                variant={colorVariant}
                key={secteur.label}
                label={secteur.label}
                Icon={secteur.Icon}
                selectable={false} // 🚀 disable check/plus
                onClick={() => {
                  setSelectedSecteur(secteur.label);
                  setStep(2); // go directly to step 2
                }}
              />
            ))}
          </div>
        )}

        {/* Step 2: Catégories (selectable) */}
        {step === 2 && (
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3 w-full
          max-mobile:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
          >
            {catégories.map((category) => {
              const isActive = activeCategories.includes(category.label);
              return (
                <GridSelectItem
                  variant={colorVariant}
                  key={category.label}
                  label={category.label}
                  Icon={category.Icon}
                  selectable={true}
                  isActive={isActive}
                  onClick={() =>
                    setActiveCategories((prev) =>
                      isActive
                        ? prev.filter((c) => c !== category.label)
                        : [...prev, category.label]
                    )
                  }
                />
              );
            })}
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="flex w-full flex-col gap-6 max-mobile:gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
                Nature d&apos;activité
              </h2>
              <div className="flex max-mobile:flex-col gap-4 ">
                <Input<FormData>
                  label="Nom de votre structure"
                  id="nomStructure"
                  name="nomStructure" // ✅ matches FormData key
                  placeholder="Ex : Société Marocaine d'Assistance"
                  register={register}
                  error={errors.nomStructure?.message}
                />
                <Input<FormData>
                  label="Ville"
                  id="ville"
                  name="ville" // ✅ matches FormData key
                  placeholder="Ex : Casablanca"
                  register={register}
                  error={errors.ville?.message}
                />
              </div>
            </div>
            <span className="Line"></span>
            <div className="flex flex-col gap-4">
              <h2 className="Button-M text-BG-Dark ">Coordonnées de contact</h2>
              <div className="flex max-mobile:flex-col gap-4 ">
                <Input<FormData>
                  label="Nom"
                  id="nom"
                  name="nom" // ✅ matches FormData key
                  placeholder="Ex : El Mehdi"
                  register={register}
                  error={errors.nom?.message}
                />
                <Input<FormData>
                  label="Prénom"
                  id="prenom"
                  name="prenom" // ✅ matches FormData key
                  placeholder="Ex : Amine"
                  register={register}
                  error={errors.prenom?.message}
                />
              </div>

              <div className="flex max-mobile:flex-col gap-4 ">
                <Input<FormData>
                  label="N° de téléphone"
                  id="telephone"
                  name="telephone" // ✅ matches FormData key
                  placeholder="Ex : 06 12 34 56 78"
                  register={register}
                  error={errors.telephone?.message}
                />
                <Input<FormData>
                  label="Email (optionnel)"
                  id="email"
                  name="email" // ✅ matches FormData key
                  placeholder="Ex : amine@email.com"
                  register={register}
                  error={errors.email?.message}
                />
              </div>
            </div>
            <span className="Line"></span>
            {/* TEMPORARILY HIDDEN - Date and Time fields
            <div className="flex flex-col gap-4">
              <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
                Préférence horaire (optionnel)
              </h2>
              <div className="flex items-center gap-4 max-mobile:flex-col max-mobile:items-stretch max-mobile:gap-3">
                <Calendar24 />
                <div className="flex w-full flex-col gap-1.5">
                  <h3 className="button2-s text-BG-Dark">Créneau horaire</h3>
                  <SelectScrollable
                    options={timeSlots}
                    placeholder="Sélectionnez un horaire"
                    useFormContextHook={() => ({
                      data: { selectedTimeSlot },
                      setData: (
                        updater: React.SetStateAction<{
                          selectedTimeSlot: string;
                        }>
                      ) => {
                        if (typeof updater === "function") {
                          const newData = updater({ selectedTimeSlot });
                          setSelectedTimeSlot(newData.selectedTimeSlot);
                        } else {
                          setSelectedTimeSlot(updater.selectedTimeSlot);
                        }
                      },
                    })}
                    fieldName="selectedTimeSlot"
                  />
                </div>
              </div>
            </div>
            */}
            <span className="Line"></span>
            <div className="flex p-2 rounded-3xl w-full bg-Neutral-BG-1">
              <div className="f-col gap-5 p-5 rounded-2xl w-full bg-white shadow-md">
                <h3 className="text-Neutral-Dark text-lg font-medium">
                  Détails de votre demande :
                </h3>
                <div className="f-col gap-3 w-full">
                  <div className="flex max-mobile:flex-col gap-4 w-full">
                    <h4 className="text-Text-Body Text-S flex-1">Secteur :</h4>
                    <div className="flex-1">
                      <span className="flex whitespace-nowrap w-fit py-1 px-2 rounded-full bg-Neutral-BG-2 text-Neutral-Dark Text-S">
                        {selectedSecteur}
                      </span>
                    </div>
                  </div>
                  <div className="flex max-mobile:flex-col gap-4 w-full">
                    <h4 className="text-Text-Body Text-S flex-1">
                      Catégories :
                    </h4>
                    <div className="flex gap-2 flex-wrap flex-1">
                      {activeCategories.map((cat) => (
                        <span
                          key={cat}
                          className="flex whitespace-nowrap w-fit py-1 px-2 rounded-full bg-Neutral-BG-2 text-Neutral-Dark Text-S"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="Line"></span>
            <div className="flex flex-col gap-4">
              <Checkbox
                className="checkbox"
                radius="md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMarketingConsent(e.target.checked)
                }
              >
                Je souhaite recevoir des conseils, offres et nouveautés par
                e-mail.
              </Checkbox>
              <Checkbox
                className="checkbox"
                radius="md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAccepted(e.target.checked)
                }
              >
                J&apos;ai lu et j&apos;accepte les conditions générales
                d&apos;utilisation, notamment la mention relative à la
                protection des données personnelles.
              </Checkbox>
            </div>
          </div>
        )}
      </form>

      <div className="relative flex justify-between items-center w-full">
        {/* Step indicator in center */}
        <div className="max-mobile:hidden absolute left-1/2 transform -translate-x-1/2 flex-center p-4 gap-2 rounded-full bg-Neutral-BG-2">
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 1 ? "bg-Neutral-Dark w-8" : "bg-Neutral-BG-4 w-2"
            }`}
          ></span>
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 2 ? "bg-Neutral-Dark w-8" : "bg-Neutral-BG-4 w-2"
            }`}
          ></span>
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 3 ? "bg-Neutral-Dark w-8" : "bg-Neutral-BG-4 w-2"
            }`}
          ></span>
        </div>

        {/* Step buttons */}
        {step === 1 && <div className="w-full"></div>}

        {step === 2 && (
          <>
            <ButtonLink
              direction="left"
              color="gray"
              iconClassName="w-7 h-7"
              onClick={goPrev}
            />
            <ButtonLink
              direction="right"
              color={colorVariant}
              iconClassName="w-7 h-7"
              onClick={goNext}
              disabled={activeCategories.length === 0}
              className={
                activeCategories.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            />
          </>
        )}

        {step === 3 && (
          <>
            <ButtonLink
              direction="left"
              color="gray"
              iconClassName="w-7 h-7"
              onClick={goPrev}
            />
            <ButtonLink
              type="submit"
              direction="right"
              disabled={isFormSubmitting}
              label={
                isFormSubmitting ? "Envoi en cours..." : "Envoyer ma demande"
              }
              color={colorVariant}
              iconClassName="w-6 h-6"
              onClick={handleSubmit(onSubmit)}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default CategorySelectionForm;

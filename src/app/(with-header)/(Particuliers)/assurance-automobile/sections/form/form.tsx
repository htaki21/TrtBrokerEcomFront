"use client";

import { Calendar24 } from "@/app/(multi-step-form)/components/date-picker-shadcn";
import { SelectScrollable } from "@/app/(multi-step-form)/components/select-scroll";
import ButtonLink from "@/app/components/buttons/ButtonLink";
import Input from "@/app/components/input/input";
import { useToast } from "@/hooks/useToast";
import {
  CarteVerteFormData,
  submitCarteVerteForm,
} from "@/lib/services/carteVerteFormService";
import {
  CarteVerteVoyageFormData,
  submitCarteVerteVoyageForm,
} from "@/lib/services/carteVerteVoyageFormService";
import { Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const arabicLetters = [
  { label: "أ", value: "أ" },
  { label: "ب", value: "ب" },
  { label: "ج", value: "ج" },
  { label: "د", value: "د" },
  { label: "ر", value: "ر" },
  { label: "ز", value: "ز" },
  { label: "س", value: "س" },
  { label: "ط", value: "ط" },
  { label: "ع", value: "ع" },
  { label: "ف", value: "ف" },
  { label: "ق", value: "ق" },
  { label: "ك", value: "ك" },
  { label: "ل", value: "ل" },
  { label: "م", value: "م" },
  { label: "ن", value: "ن" },
  { label: "ه", value: "ه" },
  { label: "و", value: "و" },
  { label: "ي", value: "ي" },
];

interface PopoverFormProps {
  formType?: "auto" | "voyage";
}

export default function PopoverForm({ formType = "auto" }: PopoverFormProps) {
  const [accepted, setAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedArabicLetter, setSelectedArabicLetter] = useState<string>("أ");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { success: toastSuccess, error: toastError } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    if (!accepted) {
      toastError("Veuillez accepter les conditions !");
      return;
    }

    if (!selectedArabicLetter) {
      toastError(
        "Veuillez sélectionner une lettre arabe pour l'immatriculation !"
      );
      return;
    }

    // Custom validation for immatriculation fields
    if (data.Immatriculation.length !== 3) {
      toastError(
        "Le numéro d'immatriculation doit contenir exactement 3 chiffres !"
      );
      return;
    }

    if (data.Chassis.length !== 5) {
      toastError("Le numéro de châssis doit contenir exactement 5 chiffres !");
      return;
    }

    setIsFormSubmitting(true);

    try {
      const formData: CarteVerteFormData | CarteVerteVoyageFormData = {
        immatriculationNum1: data.Immatriculation,
        immatriculationLettre: selectedArabicLetter,
        immatriculationNum2: data.Chassis,
        dateReceptionSouhaitee: data.dateSouhaiteeReception
          .toISOString()
          .split("T")[0],
        nom: data.nom,
        prenom: data.prenom,
        telephone: data.telephone,
        email: data.email,
        // datePreference: new Date().toISOString().split("T")[0], // REMOVED - Date/Time fields hidden
        // creneauHoraire: selectedTimeSlot || "10:00 – 10:30", // REMOVED - Date/Time fields hidden
        optinMarketing: marketingConsent,
        conditionsAcceptees: accepted,
      };

      const result =
        formType === "voyage"
          ? await submitCarteVerteVoyageForm(
              formData as CarteVerteVoyageFormData
            )
          : await submitCarteVerteForm(formData as CarteVerteFormData);

      if (result.success) {
        toastSuccess(result.message);
        // Redirect to success page after a short delay
        setTimeout(() => {
          router.push("/success");
        }, 2000);
        reset();
      } else {
        toastError(
          result.error || "Une erreur s'est produite. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toastError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="f-col items-center w-full gap-10 max-mobile:gap-5"
    >
      <div
        className="flex max-tablet:h-[500px] max-mobile:h-[400px] max-tablet:pl-0.5  max-tablet:pr-2 
        max-tablet:overflow-y-auto max-tablet:overflow-x-hidden
       w-full flex-col gap-6 max-mobile:gap-4"
      >
        <div className="flex flex-col gap-4">
          <h2 className="Button-M text-BG-Dark">
            Informations sur votre véhicule
          </h2>

          <div className="flex max-tablet:flex-col gap-4">
            {/* Left side */}
            <div className="flex gap-4 flex-1 items-end max-mobile:w-full">
              <Input<FormData>
                label="Immatriculation"
                id="Immatriculation"
                name="Immatriculation"
                placeholder="123"
                register={register}
                numeric
              />

              <div className="w-full">
                <SelectScrollable
                  showHoraireIcon={false}
                  options={arabicLetters}
                  useFormContextHook={() => ({
                    data: { selectedArabicLetter },
                    setData: (
                      updater: React.SetStateAction<{
                        selectedArabicLetter: string;
                      }>
                    ) => {
                      if (typeof updater === "function") {
                        const newData = updater({ selectedArabicLetter });
                        setSelectedArabicLetter(newData.selectedArabicLetter);
                      } else {
                        setSelectedArabicLetter(updater.selectedArabicLetter);
                      }
                    },
                  })}
                  fieldName="selectedArabicLetter"
                />
              </div>

              <Input<FormData>
                id="Chassis"
                name="Chassis"
                placeholder="12345"
                register={register}
                numeric
              />
            </div>

            {/* Right side */}
            <div className="flex-1 max-mobile:w-full">
              <Calendar24
                name="dateSouhaiteeReception"
                placeholder="JJ / MM / AAAA"
                control={control}
                label="Date souhaitée de réception"
              />
            </div>
          </div>
        </div>

        <span className="Line"></span>

        {/* Coordonnées */}
        <div className="flex flex-col gap-4">
          <h2 className="Button-M text-BG-Dark">Coordonnées de contact</h2>
          <div className="flex max-tablet:flex-col gap-4 ">
            <Input<FormData>
              label="Nom *"
              id="nom"
              name="nom"
              placeholder="Ex : El Mehdi"
              register={register}
              error={errors.nom?.message}
            />
            <Input<FormData>
              label="Prénom *"
              id="prenom"
              name="prenom"
              placeholder="Ex : Amine"
              register={register}
              error={errors.prenom?.message}
            />
          </div>

          <div className="flex max-tablet:flex-col gap-4 ">
            <Input<FormData>
              label="N° de téléphone *"
              id="telephone"
              name="telephone"
              placeholder="Ex : 06 12 34 56 78"
              register={register}
              numeric
              error={errors.telephone?.message}
            />
            <Input<FormData>
              label="Email (optionnel)"
              id="email"
              name="email"
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
          <div className="flex items-center gap-4 max-tablet:flex-col max-mobile:items-stretch max-mobile:gap-3">
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

        {/* Conditions */}
        <div className="flex flex-col gap-4">
          <Checkbox
            className="checkbox"
            radius="md"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMarketingConsent(e.target.checked)
            }
          >
            Je souhaite recevoir des conseils, offres et nouveautés par e-mail.
          </Checkbox>
          <Checkbox
            className="checkbox"
            radius="md"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAccepted(e.target.checked)
            }
          >
            J’ai lu et j’accepte les conditions générales d’utilisation,
            notamment la mention relative à la protection des données
            personnelles. *
          </Checkbox>
        </div>
      </div>

      <ButtonLink
        className="self-end"
        type="submit"
        direction="right"
        disabled={isFormSubmitting}
        label={isFormSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        color="brand"
        iconClassName="w-6 h-6"
      />
    </form>
  );
}

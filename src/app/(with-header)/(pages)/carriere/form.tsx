"use client";

import ButtonLink from "@/app/components/buttons/ButtonLink";
import Input from "@/app/components/input/input";
import { Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { SelectItems } from "./select-items";
import { SelectableTabs } from "./SelectableTabs";
import SingleFileUploader from "./SingleFileUploader";
import { FormData, formSchema } from "./validation";

export default function FormSection() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      telephone: "",
      email: "",
      niveauEtudes: undefined,
      anneesExperience: undefined,
      fonctionProfil: undefined,
      insuranceExperience: "yes", // matches schema default
      acceptTerms: "no",
      file: undefined,
    },
    mode: "onBlur", // validate on blur
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Convert file to base64 if it exists
      let fileData = data.file;
      if (
        data.file &&
        typeof data.file === "object" &&
        "name" in data.file &&
        "size" in data.file &&
        "type" in data.file
      ) {
        // Convert File object to base64
        const file = data.file as File;
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Remove data URL prefix (data:application/pdf;base64,)
            const base64Data = result.split(",")[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64,
        };
      }

      const response = await fetch("/api/send-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          file: fileData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Show success toast
        toast.success(
          "Candidature envoyée avec succès ! Nous vous contacterons bientôt."
        );
        // Redirect to success page
        router.push("/success");
      } else {
        // Show error toast
        toast.error(
          result.error || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="f-col p-12 max-tablet:p-7 max-mobile:p-5 max-mobile:gap-6 gap-7 rounded-3xl bg-white shadow-xl">
      <div className="flex flex-col gap-5">
        <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
          Coordonnées de contact
        </h2>
        <div className="flex max-mobile:flex-col gap-4 ">
          <Input<FormData>
            label="Nom *"
            id="nom"
            name="nom" // ✅ matches FormData key
            placeholder="Ex : El Mehdi"
            register={register}
            error={errors.nom?.message}
          />
          <Input<FormData>
            label="Prénom *"
            id="prenom"
            name="prenom" // ✅ matches FormData key
            placeholder="Ex : Amine"
            register={register}
            error={errors.prenom?.message}
          />
        </div>
        <div className="flex max-mobile:flex-col gap-4 ">
          <Input<FormData>
            label="N° de téléphone *"
            id="telephone"
            name="telephone" // ✅ matches FormData key
            placeholder="Ex : 06 12 34 56 78"
            register={register}
            error={errors.telephone?.message}
          />
          <Input<FormData>
            label="Email *"
            id="email"
            name="email" // ✅ matches FormData key
            placeholder="Ex : amine@email.com"
            register={register}
            error={errors.email?.message}
          />
        </div>
      </div>
      <span className="Line bg-Sage-Gray-Lowest "></span>
      <div className="flex flex-col gap-5">
        <h2 className="Button-M text-BG-Dark ">À propos de vous</h2>
        <div className="flex max-mobile:flex-col gap-4 ">
          <SelectItems
            name="niveauEtudes"
            label="Niveau d'études *"
            placeholder="Sélectionnez votre niveau"
            control={control}
            options={[
              { value: "primaire", label: "Primaire" },
              { value: "college", label: "Collège" },
              { value: "lycee", label: "Lycée", disabled: true }, // ✅ disabled
              { value: "universite", label: "Université" },
              { value: "autre", label: "Autre" },
            ]}
            error={errors.niveauEtudes?.message}
          />
          <SelectItems
            name="anneesExperience"
            label="Années d'expérience *"
            placeholder="Sélectionnez vos années d'expérience"
            control={control}
            options={[
              { value: "0", label: "0" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6", label: "6" },
              { value: "7", label: "7" },
              { value: "8", label: "8" },
              { value: "9", label: "9" },
              { value: "10+", label: "10+" },
            ]}
            error={errors.anneesExperience?.message}
          />
        </div>
        <div className="flex max-mobile:flex-col gap-4 ">
          <SelectItems
            name="fonctionProfil"
            label="Fonction / Profil recherché *"
            placeholder="Sélectionnez votre fonction ou profil"
            control={control}
            options={[
              { value: "developer", label: "Développeur" },
              { value: "designer", label: "Designer" },
              { value: "product-manager", label: "Chef de projet" },
              { value: "other", label: "Autre" },
            ]}
            error={errors.fonctionProfil?.message}
          />
          <SelectableTabs
            name="insuranceExperience"
            label="Avez-vous une expérience en assurance ? *"
            control={control}
            options={[
              { value: "yes", label: "Oui" },
              { value: "no", label: "Non" },
            ]}
          />
        </div>
      </div>
      <span className="Line bg-Sage-Gray-Lowest "></span>
      <div className="flex flex-col gap-5">
        <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
          Coordonnées de contact
        </h2>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <SingleFileUploader
              onChange={field.onChange}
              error={errors.file?.message as string | undefined} // ✅ cast
            />
          )}
        />
      </div>
      <span className="Line bg-Sage-Gray-Lowest "></span>
      <Controller
        name="acceptTerms"
        control={control}
        render={({ field }) => (
          <div className="f-col gap-1">
            <Checkbox
              className="checkbox"
              radius="md"
              checked={field.value === "yes"}
              onChange={(e) => field.onChange(e.target.checked ? "yes" : "no")}
            >
              J’ai lu et j’accepte les conditions générales d’utilisation,
              notamment la mention relative à la protection des données
              personnelles. *
            </Checkbox>

            {/* Error message */}
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>
        )}
      />

      <ButtonLink
        className="self-end max-mobile:w-full max-mobile:py-3 max-mobile:px-6"
        type="submit"
        direction="right"
        disabled={isSubmitting}
        label={isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
        color="brand"
        iconClassName="w-7 h-7"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
}

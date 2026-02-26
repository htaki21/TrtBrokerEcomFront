"use client";

import { FormProvider } from "@/app/(multi-step-form)/devis-assurance-auto/context";
import ButtonLink from "@/app/components/buttons/ButtonLink";
import Input from "@/app/components/input/input";
import { useToast } from "@/hooks/useToast";
import { Checkbox } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormData, formSchema } from "./validation";

// Removed timeSlots - not needed for contact form
export default function FormSection() {
  const { success, error, loading } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      telephone: "",
      email: "",
      marketingConsent: false,
      acceptTerms: "no",
    },
    mode: "onBlur", // validate on blur
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const loadingToast = loading("Envoi du message en cours...");

    try {
      const timestamp = Date.now();
      const payload = {
        prenom: data.prenom,
        nom: data.nom,
        telephone: data.telephone,
        email: data.email,
        marketingConsent: data.marketingConsent || false,
        _timestamp: timestamp,
      };

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        success("Message envoyé avec succès ! Nous vous contacterons bientôt.");
        reset(); // Reset form after successful submission
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          window.location.href = "/success";
        }, 2000);
      } else {
        error(result.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      error(
        "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."
      );
    } finally {
      setIsSubmitting(false);
      // Dismiss loading toast if it exists
      if (
        loadingToast &&
        typeof loadingToast === "object" &&
        "dismiss" in loadingToast
      ) {
        (loadingToast as { dismiss: () => void }).dismiss();
      }
    }
  };

  return (
    <FormProvider>
      <div className="f-col max-mobile:gap-6 gap-8 flex-1">
        <div className="f-col gap-4">
          <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
            Coordonnées de contact
          </h2>
          <div className="f-col gap-4">
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
          <div className="f-col gap-4">
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
        {/* TEMPORARILY HIDDEN - Date and Time fields
        <div className="f-col gap-4">
          <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
            Préférence horaire (optionnel)
          </h2>
          <div className="f-col items-center gap-4 max-mobile:gap-3">
            <Calendar24></Calendar24>
            <div className="f-col w-full gap-1.5">
              <h3 className="button2-s text-BG-Dark">Créneau horaire</h3>
              <SelectScrollable
                options={timeSlots}
                placeholder="Sélectionnez un horaire"
              />
            </div>
          </div>
        </div>
        */}
        <div className="f-col gap-4">
          <Controller
            name="marketingConsent"
            control={control}
            render={({ field }) => (
              <Checkbox
                className="checkbox"
                radius="md"
                isSelected={field.value}
                onValueChange={field.onChange}
              >
                Je souhaite recevoir des conseils, offres et nouveautés par
                e-mail.
              </Checkbox>
            )}
          />
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <div className="f-col gap-1">
                <Checkbox
                  className="checkbox"
                  radius="md"
                  isSelected={field.value === "yes"}
                  onValueChange={(checked) =>
                    field.onChange(checked ? "yes" : "no")
                  }
                >
                  J&apos;ai lu et j&apos;accepte les conditions générales
                  d&apos;utilisation, notamment la mention relative à la
                  protection des données personnelles. *
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
        </div>

        <ButtonLink
          className="max-mobile:w-full max-mobile:py-3 max-mobile:px-6"
          size="large"
          type="submit"
          direction="right"
          disabled={isSubmitting}
          label={isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
          color="brand"
          iconClassName="w-6 h-6"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </FormProvider>
  );
}

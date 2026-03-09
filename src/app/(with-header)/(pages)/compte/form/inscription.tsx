"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { IconeyeClosed, Iconeye, IconAroowLeft } from "./connexion";
import { InscriptionData, InscriptionSchema } from "./inscription-schema";
import { SVGProps } from "react";

export function Iconcheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.3133 4.31319C12.5085 4.11793 12.825 4.11793 13.0203 4.31319C13.2155 4.50846 13.2156 4.82498 13.0203 5.02023L6.35364 11.6869C6.15839 11.8821 5.84187 11.8821 5.64661 11.6869L2.97994 9.02023C2.78468 8.82496 2.78468 8.50846 2.97994 8.31319C3.1752 8.11793 3.49171 8.11793 3.68697 8.31319L6.00012 10.6263L12.3133 4.31319Z"
        fill="currentColor"
      />
    </svg>
  );
}

type CheckboxItem = {
  id: string;
  label: React.ReactNode;
};

const checkboxItems: CheckboxItem[] = [
  {
    id: "newsletter",
    label: (
      <>Je souhaite recevoir des conseils, offres et nouveautés par e-mail.</>
    ),
  },
  {
    id: "terms",
    label: (
      <>
        J’ai lu et j’accepte{" "}
        <Link
          href="/conditions-generales"
          className="text-Neutral-Dark underline"
          onClick={(e) => e.stopPropagation()} // prevent toggling checkbox
        >
          les conditions générales d’utilisation,
        </Link>{" "}
        notamment la mention relative à{" "}
        <Link
          href="/politique-de-confidentialite"
          className="text-Neutral-Dark underline"
          onClick={(e) => e.stopPropagation()} // prevent toggling checkbox
        >
          la protection des données personnelles.
        </Link>
      </>
    ),
  },
];

export default function InscriptionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InscriptionData>({
    resolver: zodResolver(InscriptionSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: InscriptionData) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="f-col gap-7 w-full button2-s"
    >
      <div className="f-col gap-4">
        {/* NOM */}
        <label className="f-col gap-1.5">
          <span>Nom complet</span>
          <input
            type="text"
            placeholder="Ex : Amine El Mehdi"
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? "nom-error" : undefined}
            disabled={isSubmitting}
            {...register("nom")}
            className={`placeholder:text-Sage-Gray-Medium outline-none border-none py-3 px-4 w-full rounded-[8px]
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark disabled:opacity-50 transition hover:ring 
            select-none cursor-text ${errors.nom ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
          />
          {errors.nom && (
            <p id="nom-error" className="text-red-500">
              {errors.nom.message}
            </p>
          )}
        </label>

        {/* EMAIL */}
        <label className="f-col gap-1.5">
          <span>Adresse email</span>
          <input
            type="email"
            placeholder="amina@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isSubmitting}
            {...register("email")}
            className={`placeholder:text-Sage-Gray-Medium outline-none border-none py-3 px-4 w-full rounded-[8px]
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark disabled:opacity-50 transition hover:ring 
            select-none cursor-text ${errors.email ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500">
              {errors.email.message}
            </p>
          )}
        </label>

        {/* TELEPHONE  */}
        <label className="f-col gap-1.5">
          <span>Téléphone</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Ex : 06 12 34 56 78"
            aria-invalid={!!errors.telephone}
            aria-describedby={errors.telephone ? "tel-error" : undefined}
            disabled={isSubmitting}
            {...register("telephone")}
            className={`placeholder:text-Sage-Gray-Medium outline-none border-none py-3 px-4 w-full rounded-[8px]
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark disabled:opacity-50 transition hover:ring 
            select-none cursor-text ${errors.telephone ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
          />
          {errors.telephone && (
            <p id="tel-error" className="text-red-500">
              {errors.telephone.message}
            </p>
          )}
        </label>

        {/* PASSWORD */}
        <label className="f-col gap-1.5">
          <span>Mot de passe</span>
          <div
            className={` py-3 px-4 w-full rounded-[8px] transition hover:ring flex items-center gap-2 cursor-text
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark disabled:opacity-50 select-none 
             ${errors.password ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 caractères"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              disabled={isSubmitting}
              {...register("password")}
              className="placeholder:text-Sage-Gray-Medium outline-none border-none w-full"
            />
            {showPassword ? (
              <IconeyeClosed
                className="shrink-0 cursor-pointer size-5"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Iconeye
                className="shrink-0 cursor-pointer size-5"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {errors.password && (
            <p id="password-error" className="text-red-500">
              {errors.password.message}
            </p>
          )}
        </label>
      </div>

      {/* CHECKBOX */}
      <ul className="f-col gap-4">
        {checkboxItems.map((item) => {
          const fieldName = item.id as keyof InscriptionData;
          const isActive = watch(fieldName);
          const error = errors[fieldName];

          return (
            <li key={item.id} className="f-col gap-1">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  disabled={isSubmitting}
                  {...register(fieldName)}
                />
                <span
                  className={`mt-0.5 flex-center size-4 shrink-0 outline-2 rounded-[6px] transition ${
                    isActive
                      ? " outline-Neutral-Dark bg-Neutral-Dark text-white"
                      : "outline-Neutral-BG-4 text-transparent"
                  } ${error ? "outline-red-500" : ""}`}
                >
                  <Iconcheck className="shrink-0" />
                </span>
                <p className="text-shadow-Neutral-BG-5 select-none text-pretty">{item.label}</p>
              </label>
              {error && (
                <p className="text-red-500 p-s px-3 text-start">
                  {error.message}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <div className="f-col gap-3 text-center">
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-center gap-1 flex-1 py-2 px-4 rounded-full bg-Brand-500 text-white transition
           hover:bg-Brand-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{isSubmitting ? "..." : "Créer mon compte"}</span>
          <IconAroowLeft className=" shrink-0" />
        </button>
        <div className="f-col items-center gap-1">
          <p>Vous avez déjà un compte ?</p>
          <Link href="/connexion" className="text-Brand-600 border-b w-fit">
            Se connecter
          </Link>
        </div>
      </div>
    </form>
  );
}

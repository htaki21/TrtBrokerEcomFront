"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";
import { IconeyeClosed, Iconeye } from "./connexion";
import { SVGProps } from "react";
import { IconMail, IconPhone } from "../connexion/page";
import { useAuth } from "@/app/components/auth/AuthContext";
import toast from "react-hot-toast";

const InfoSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.string().min(1, "Email requis").email("Email invalide"),
  telephone: z
    .string()
    .min(10, "Le numéro doit contenir 10 chiffres")
    .max(10, "Le numéro doit contenir 10 chiffres")
    .regex(/^\d+$/, "Chiffres uniquement")
    .optional()
    .or(z.literal("")),
  password: z.string().min(8, "Min. 8 caractères").optional().or(z.literal("")),
});

type InfoData = z.infer<typeof InfoSchema>;

export function IconUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99967 12.7083C11.939 12.7083 13.7247 13.1981 15.0452 14.0234C16.3569 14.8433 17.2913 16.0562 17.2913 17.5C17.2913 17.8452 17.0115 18.125 16.6663 18.125C16.3212 18.125 16.0413 17.8452 16.0413 17.5C16.0413 16.6427 15.4837 15.772 14.3828 15.0838C13.2905 14.4011 11.7422 13.9583 9.99967 13.9583C8.25712 13.9583 6.70886 14.4011 5.61654 15.0838C4.5156 15.772 3.95801 16.6427 3.95801 17.5C3.95801 17.8452 3.67819 18.125 3.33301 18.125C2.98783 18.125 2.70801 17.8452 2.70801 17.5C2.70801 16.0562 3.64241 14.8433 4.9541 14.0234C6.27464 13.1981 8.06033 12.7083 9.99967 12.7083Z"
        fill="#0F110C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99967 1.875C12.646 1.875 14.7913 4.0203 14.7913 6.66667C14.7913 9.31303 12.646 11.4583 9.99967 11.4583C7.35331 11.4583 5.20801 9.31303 5.20801 6.66667C5.20801 4.0203 7.35331 1.875 9.99967 1.875ZM9.99967 3.125C8.04367 3.125 6.45801 4.71066 6.45801 6.66667C6.45801 8.62268 8.04367 10.2083 9.99967 10.2083C11.9557 10.2083 13.5413 8.62268 13.5413 6.66667C13.5413 4.71066 11.9557 3.125 9.99967 3.125Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0003 11.875C10.3871 11.875 10.7579 12.0288 11.0314 12.3022C11.3049 12.5757 11.4587 12.9466 11.4587 13.3333C11.4587 13.7201 11.3049 14.0909 11.0314 14.3644C10.7579 14.6379 10.3871 14.7917 10.0003 14.7917C9.61355 14.7917 9.24273 14.6379 8.96924 14.3644C8.69575 14.0909 8.54199 13.7201 8.54199 13.3333C8.54199 12.9466 8.69575 12.5757 8.96924 12.3022C9.24273 12.0288 9.61355 11.875 10.0003 11.875ZM10.0003 13.125C9.94507 13.125 9.8921 13.147 9.85303 13.186C9.81396 13.2251 9.79199 13.2781 9.79199 13.3333C9.79199 13.3886 9.81396 13.4416 9.85303 13.4806C9.8921 13.5197 9.94507 13.5417 10.0003 13.5417C10.0556 13.5417 10.1086 13.5197 10.1476 13.4806C10.1867 13.4416 10.2087 13.3886 10.2087 13.3333C10.2087 13.2781 10.1867 13.2251 10.1476 13.186C10.1086 13.147 10.0556 13.125 10.0003 13.125Z"
        fill="#0F110C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0003 1.875C11.0501 1.875 12.0567 2.29234 12.799 3.03467C13.5413 3.777 13.9587 4.78352 13.9587 5.83333V8.54167H14.167C14.7748 8.54167 15.3575 8.78328 15.7873 9.21305C16.217 9.64282 16.4587 10.2255 16.4587 10.8333V15.8333C16.4587 16.4411 16.217 17.0238 15.7873 17.4536C15.3575 17.8834 14.7748 18.125 14.167 18.125H5.83366C5.22587 18.125 4.64315 17.8834 4.21338 17.4536C3.78361 17.0238 3.54199 16.4411 3.54199 15.8333V10.8333C3.54199 10.2255 3.78361 9.64282 4.21338 9.21305C4.64315 8.78328 5.22587 8.54167 5.83366 8.54167H6.04199V5.83333C6.04199 4.78352 6.45933 3.777 7.20166 3.03467C7.94399 2.29234 8.95051 1.875 10.0003 1.875ZM5.83366 9.79167C5.55739 9.79167 5.29252 9.90149 5.09717 10.0968C4.90182 10.2922 4.79199 10.5571 4.79199 10.8333V15.8333C4.79199 16.1096 4.90182 16.3745 5.09717 16.5698C5.29252 16.7652 5.55739 16.875 5.83366 16.875H14.167C14.4433 16.875 14.7081 16.7652 14.9035 16.5698C15.0988 16.3745 15.2087 16.1096 15.2087 15.8333V10.8333C15.2087 10.5571 15.0988 10.2922 14.9035 10.0968C14.7081 9.90149 14.4433 9.79167 14.167 9.79167H5.83366ZM10.0003 3.125C9.28203 3.125 8.59336 3.41055 8.08545 3.91846C7.57754 4.42637 7.29199 5.11504 7.29199 5.83333V8.54167H12.7087V5.83333C12.7087 5.11504 12.4231 4.42637 11.9152 3.91846C11.4073 3.41055 10.7186 3.125 10.0003 3.125Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function IconPencil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7497 3.26831C14.1412 3.26831 14.5289 3.34555 14.8906 3.49536C15.2523 3.6452 15.5814 3.86469 15.8582 4.14152C16.1351 4.41837 16.3546 4.74743 16.5044 5.10913C16.6542 5.4708 16.7314 5.85863 16.7314 6.25008C16.7314 6.64162 16.6542 7.03011 16.5044 7.39185C16.3546 7.75336 16.1349 8.08191 15.8582 8.35864L7.10824 17.1086C6.99104 17.2258 6.83205 17.2917 6.66634 17.2917H3.33301C2.9879 17.2917 2.70812 17.0118 2.70801 16.6667V13.3334C2.70807 13.1678 2.77403 13.0087 2.89111 12.8915L11.6411 4.14152C11.918 3.86469 12.247 3.6452 12.6087 3.49536C12.9705 3.34555 13.3581 3.26831 13.7497 3.26831ZM3.95801 13.5922V16.0417H6.40755L13.6992 8.75008L11.2497 6.30054L3.95801 13.5922ZM13.7497 4.51831C13.5223 4.51831 13.2973 4.56319 13.0872 4.65015C12.8772 4.73717 12.6857 4.86455 12.5249 5.02531L12.1335 5.41675L14.583 7.86629L14.9744 7.47485C15.1351 7.31415 15.2626 7.12325 15.3496 6.91333C15.4366 6.70326 15.4814 6.47747 15.4814 6.25008C15.4814 6.02278 15.4366 5.79765 15.3496 5.58765C15.2626 5.37755 15.1352 5.18612 14.9744 5.02531C14.8137 4.86455 14.6222 4.73717 14.4121 4.65015C14.2021 4.56319 13.977 4.51831 13.7497 4.51831Z"
        fill="#0F110C"
      />
    </svg>
  );
}

export default function InfoPersonnellesForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { user, update, refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InfoData>({
    resolver: zodResolver(InfoSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      nom: user?.nom || "",
      email: user?.email || "",
      telephone: user?.telephone || "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nom: user.nom || "",
        email: user.email || "",
        telephone: user.telephone || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: InfoData) => {
    setSubmitError(null);
    try {
      const payload: Record<string, string> = {};
      if (data.nom !== (user?.nom || "")) payload.nom = data.nom;
      if (data.email !== user?.email) payload.email = data.email;
      if (data.telephone !== (user?.telephone || "")) payload.telephone = data.telephone || "";
      if (data.password) payload.password = data.password;
      if (Object.keys(payload).length === 0) return;
      await update(payload);
      await refreshUser();
      reset({ nom: data.nom, email: data.email, telephone: data.telephone || "", password: "" });
      toast.success("Informations mises à jour");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur lors de la mise à jour");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="p-7 f-col gap-7 rounded-[20px] bg-white button2-s"
    >
      <h5 className="Headings-H5">Info personnelles</h5>
      <div className="f-col gap-4">
        {/* NOM */}
        <label className="f-col gap-1.5">
          <span>Nom complet</span>
          <div className="flex items-center gap-1.5">
            <div className="f-col gap-1.5 flex-1">
              <div
                className={`flex items-center gap-2 py-3 px-4 w-full rounded-[8px] transition hover:ring
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark select-none cursor-text
             ${errors.nom ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
              >
                <IconUser className="shrink-0" />
                <input
                  type="text"
                  placeholder="Ex : Amine El Mehdi"
                  aria-invalid={!!errors.nom}
                  disabled={isSubmitting}
                  {...register("nom")}
                  className="placeholder:text-Sage-Gray-Medium outline-none border-none w-full"
                />
              </div>
              {errors.nom && (
                <p className="text-red-500">{errors.nom.message}</p>
              )}
            </div>
            <span className="p-3 flex-center rounded-full bg-Sage-Gray-Lower">
              <IconPencil className="shrink-0" />
            </span>
          </div>
        </label>

        {/* EMAIL */}
        <label className="f-col gap-1.5">
          <span>Adresse email</span>
          <div className="flex items-center gap-1.5">
            <div className="f-col gap-1.5 flex-1">
              <div
                className={`flex items-center gap-2 py-3 px-4 w-full rounded-[8px] transition hover:ring
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark select-none cursor-text
             ${errors.email ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
              >
                <IconMail className="shrink-0 size-5" />
                <input
                  type="email"
                  placeholder="amina@email.com"
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                  {...register("email")}
                  className="placeholder:text-Sage-Gray-Medium outline-none border-none w-full"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <span className="p-3 flex-center rounded-full bg-Sage-Gray-Lower">
              <IconPencil className="shrink-0" />
            </span>
          </div>
        </label>

        {/* TELEPHONE */}
        <label className="f-col gap-1.5">
          <span>Téléphone</span>
          <div className="flex items-center gap-1.5">
            <div className="f-col gap-1.5 flex-1">
              <div
                className={`flex items-center gap-2 py-3 px-4 w-full rounded-[8px] transition hover:ring
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark select-none cursor-text
             ${errors.telephone ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
              >
                <IconPhone className="size-5 shrink-0" />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Ex : 0612345678"
                  aria-invalid={!!errors.telephone}
                  disabled={isSubmitting}
                  {...register("telephone")}
                  className="placeholder:text-Sage-Gray-Medium outline-none border-none w-full"
                />
              </div>
              {errors.telephone && (
                <p className="text-red-500">{errors.telephone.message}</p>
              )}
            </div>
            <span className="p-3 flex-center rounded-full bg-Sage-Gray-Lower">
              <IconPencil className="shrink-0" />
            </span>
          </div>
        </label>

        {/* PASSWORD */}
        <label className="f-col gap-1.5">
          <span>Nouveau mot de passe</span>
          <div className="flex items-center gap-1.5">
            <div className="f-col gap-1.5 flex-1">
              <div
                className={`flex items-center gap-2 py-3 px-4 w-full rounded-[8px] transition hover:ring
            bg-Sage-Gray-Lowest focus-within:ring focus-within:ring-Neutral-Dark select-none cursor-text
             ${errors.password ? "ring-red-500 focus-within:ring-red-500 hover:ring-red-500" : "hover:ring-Neutral-Dark"} `}
              >
                <IconLock className="shrink-0"/>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Laisser vide pour ne pas changer"
                  aria-invalid={!!errors.password}
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
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <span className="p-3 flex-center rounded-full bg-Sage-Gray-Lower">
              <IconPencil className="shrink-0" />
            </span>
          </div>
        </label>
      </div>

      {submitError && <p className="text-red-500">{submitError}</p>}
      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className="flex-center gap-1 flex-1 py-2 px-4 rounded-full bg-Brand-500 text-white
           hover:bg-Brand-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{isSubmitting ? "..." : "Enregistrer"}</span>
      </button>
    </form>
  );
}

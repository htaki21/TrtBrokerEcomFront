"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnexionData, ConnexionSchema } from "./connexion-schema";
import { SVGProps } from "react";
import { useAuth } from "@/app/components/auth/AuthContext";

export function Iconeye(props: SVGProps<SVGSVGElement>) {
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
        d="M9.99984 6.875C11.7257 6.875 13.1248 8.27411 13.1248 10C13.1248 11.7259 11.7257 13.125 9.99984 13.125C8.27395 13.125 6.87484 11.7259 6.87484 10C6.87484 8.27411 8.27395 6.875 9.99984 6.875ZM9.99984 8.125C8.9643 8.125 8.12484 8.96447 8.12484 10C8.12484 11.0355 8.9643 11.875 9.99984 11.875C11.0354 11.875 11.8748 11.0355 11.8748 10C11.8748 8.96447 11.0354 8.125 9.99984 8.125Z"
        fill="#525252"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99984 4.375C12.7241 4.375 14.7486 5.73998 16.0667 7.05811C16.7275 7.71886 17.2217 8.37791 17.5511 8.87207C17.7162 9.11968 17.841 9.32735 17.9255 9.4751C17.9677 9.54897 18.0001 9.60838 18.0223 9.65006C18.0332 9.6706 18.0414 9.68709 18.0475 9.69889C18.0506 9.70484 18.053 9.70995 18.0548 9.71354C18.0557 9.71521 18.0567 9.71646 18.0573 9.71761L18.0581 9.71924C18.0582 9.71949 18.0589 9.72049 17.4998 10C18.049 10.2746 18.0589 10.2796 18.0589 10.2799L18.0573 10.2824C18.0567 10.2835 18.0557 10.2848 18.0548 10.2865C18.053 10.2901 18.0506 10.2952 18.0475 10.3011C18.0414 10.3129 18.0332 10.3294 18.0223 10.3499C18.0001 10.3916 17.9677 10.451 17.9255 10.5249C17.841 10.6726 17.7162 10.8803 17.5511 11.1279C17.2217 11.6221 16.7275 12.2811 16.0667 12.9419C14.7486 14.26 12.7241 15.625 9.99984 15.625C7.27561 15.625 5.25107 14.26 3.93294 12.9419C3.27219 12.2811 2.77801 11.6221 2.44857 11.1279C2.2835 10.8803 2.15865 10.6726 2.07422 10.5249C2.03201 10.451 1.99961 10.3916 1.97738 10.3499C1.96643 10.3294 1.95824 10.3129 1.95215 10.3011C1.94908 10.2952 1.94665 10.2901 1.94482 10.2865C1.94398 10.2848 1.94296 10.2835 1.94238 10.2824L1.94157 10.2808C1.94144 10.2805 1.94082 10.2795 2.49984 10C1.95065 9.7254 1.9408 9.72039 1.94076 9.72005L1.94238 9.71761C1.94296 9.71646 1.94398 9.71521 1.94482 9.71354C1.94665 9.70995 1.94908 9.70484 1.95215 9.69889C1.95824 9.68709 1.96643 9.6706 1.97738 9.65006C1.99961 9.60838 2.03201 9.54897 2.07422 9.4751C2.15865 9.32735 2.2835 9.11968 2.44857 8.87207C2.77801 8.37791 3.27219 7.71886 3.93294 7.05811C5.25107 5.73998 7.27561 4.375 9.99984 4.375ZM9.99984 5.625C7.72406 5.625 5.99861 6.76002 4.81673 7.94189C4.22749 8.53114 3.78417 9.12209 3.48861 9.56543C3.37511 9.73568 3.28469 9.88372 3.21598 10C3.28469 10.1163 3.37511 10.2643 3.48861 10.4346C3.78417 10.8779 4.22749 11.4689 4.81673 12.0581C5.99861 13.24 7.72406 14.375 9.99984 14.375C12.2756 14.375 14.0011 13.24 15.1829 12.0581C15.7722 11.4689 16.2155 10.8779 16.5111 10.4346C16.6244 10.2645 16.7142 10.1162 16.7829 10C16.7142 9.88377 16.6244 9.7355 16.5111 9.56543C16.2155 9.12209 15.7722 8.53114 15.1829 7.94189C14.0011 6.76002 12.2756 5.625 9.99984 5.625Z"
        fill="#525252"
      />
      <path
        d="M2.49984 10L1.94076 10.2791L1.80078 10L1.94076 9.72005L2.49984 10Z"
        fill="#525252"
      />
      <path
        d="M18.1989 10L18.0589 10.2799L17.4998 10L18.0589 9.72087L18.1989 10Z"
        fill="#525252"
      />
    </svg>
  );
}
export function IconeyeClosed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.3165 7.6925C20.4865 7.31477 20.93 7.14654 21.3077 7.31652C21.6854 7.48655 21.8537 7.93005 21.6837 8.30773C20.8172 10.2332 19.5595 11.726 18.087 12.7882L20.1066 15.5587C20.3501 15.8934 20.2761 16.3627 19.9415 16.6066C19.6068 16.8502 19.1376 16.776 18.8937 16.4415L16.8058 13.5763C15.5313 14.2389 14.1495 14.6215 12.7501 14.7218V17.5001C12.75 17.9142 12.4142 18.25 12.0001 18.2501C11.5859 18.2501 11.2502 17.9143 11.2501 17.5001V14.7218C9.85049 14.6215 8.46816 14.2391 7.19347 13.5763L5.10656 16.4415C4.86272 16.7761 4.39342 16.8501 4.05871 16.6066C3.72408 16.3627 3.65005 15.8934 3.89367 15.5587L5.91222 12.7882C4.44004 11.726 3.18289 10.2329 2.31652 8.30773C2.14654 7.93 2.31477 7.4865 2.6925 7.31652C3.07022 7.14659 3.51374 7.31479 3.68371 7.6925C7.01843 15.1027 16.9819 15.1028 20.3165 7.6925Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function IconAroowLeft(props: SVGProps<SVGSVGElement>) {
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
        d="M12.2466 5.58028C12.4907 5.3362 12.8871 5.3362 13.1312 5.58028L17.1082 9.55814C17.3523 9.80222 17.3523 10.1979 17.1082 10.4419L13.1312 14.4198C12.8871 14.6638 12.4907 14.6638 12.2466 14.4198C12.0025 14.1757 12.0025 13.7793 12.2466 13.5352L15.1576 10.625H3.33301C2.98785 10.625 2.70803 10.3452 2.70801 10C2.70801 9.65486 2.98783 9.37503 3.33301 9.37503H15.1576L12.2466 6.46488C12.0025 6.22081 12.0025 5.82435 12.2466 5.58028Z"
        fill="white"
      />
    </svg>
  );
}

export default function ConnexionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConnexionData>({
    resolver: zodResolver(ConnexionSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ConnexionData) => {
    setSubmitError(null);
    try {
      await login(data.email, data.password);
      router.replace("/compte");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur de connexion");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      className="f-col gap-7 w-full button2-s"
    >
      <div className="f-col gap-4">
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
        <div className="f-col gap-3 w-full">
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
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
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

          <span className="text-Brand-600 cursor-pointer">
            Mot de passe oublie?
          </span>
        </div>
      </div>
      <div className="f-col gap-3 text-center">
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-center gap-1 flex-1 py-2 px-4 rounded-full bg-Brand-500 text-white transition
           hover:bg-Brand-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{isSubmitting ? "..." : "Se connecter"}</span>
          <IconAroowLeft className=" shrink-0" />
        </button>
        <div className="f-col items-center gap-1">
          <p>Vous n’avez pas encore de compte ?</p>
          <Link
            href="/compte/inscription"
            className="text-Sage-Gray-Higher border-b w-fit"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </form>
  );
}

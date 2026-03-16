"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/app/components/auth/AuthContext";
import FormInput from "./inputs/form-input";

interface UserInfoRecapProps<T> {
  useFormContextHook: () => {
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    fieldErrors: Partial<Record<keyof T, string>>;
    clearFieldError: (field: keyof T) => void;
  };
  children: React.ReactNode;
}

export default function UserInfoRecap<
  T extends {
    nom: string;
    prenom: string;
    email: string;
    phone: string;
  },
>({ useFormContextHook, children }: UserInfoRecapProps<T>) {
  const { user } = useAuth();
  const { data, setData } = useFormContextHook();
  const hasAutoFilled = useRef(false);

  // Auto-fill form data from user profile
  useEffect(() => {
    if (!user || hasAutoFilled.current) return;
    hasAutoFilled.current = true;

    const updates: Partial<T> = {} as Partial<T>;

    // Split user.nom into prenom + nom
    if (user.nom) {
      const parts = user.nom.trim().split(" ");
      if (parts.length > 1) {
        if (!data.prenom) (updates as Record<string, unknown>).prenom = parts[0];
        if (!data.nom) (updates as Record<string, unknown>).nom = parts.slice(1).join(" ");
      } else {
        if (!data.nom) (updates as Record<string, unknown>).nom = user.nom;
      }
    }

    if (user.email && !data.email) {
      (updates as Record<string, unknown>).email = user.email;
    }

    if (user.telephone && !data.phone) {
      (updates as Record<string, unknown>).phone = user.telephone;
    }

    if (Object.keys(updates).length > 0) {
      setData((prev) => ({ ...prev, ...updates }));
    }
  }, [user]);

  const isLoggedIn = !!user;
  const hasPhone = !!user?.telephone;

  // Not logged in: show original form
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  // Logged in: show recap + phone input if missing
  const displayName = user.nom || [data.prenom, data.nom].filter(Boolean).join(" ") || "—";
  const displayEmail = user.email || data.email || "—";
  const displayPhone = user.telephone || data.phone || "—";

  return (
    <div className="flex flex-col gap-4">
      <h2 className="Button-M text-BG-Dark max-mobile:text-lg">
        Vos coordonnées
      </h2>
      <div className="flex flex-col gap-3 rounded-2xl bg-Sage-Gray-Lowest p-5">
        <div className="flex items-center justify-between">
          <span className="text-Sage-Gray-Higher text-[14px]/[20px]">Nom complet</span>
          <span className="text-Neutral-Dark text-[14px]/[20px] font-medium">{displayName}</span>
        </div>
        <span className="h-px bg-Sage-Gray-Low" />
        <div className="flex items-center justify-between">
          <span className="text-Sage-Gray-Higher text-[14px]/[20px]">Email</span>
          <span className="text-Neutral-Dark text-[14px]/[20px] font-medium">{displayEmail}</span>
        </div>
        {hasPhone && (
          <>
            <span className="h-px bg-Sage-Gray-Low" />
            <div className="flex items-center justify-between">
              <span className="text-Sage-Gray-Higher text-[14px]/[20px]">Téléphone</span>
              <span className="text-Neutral-Dark text-[14px]/[20px] font-medium">{displayPhone}</span>
            </div>
          </>
        )}
      </div>
      {!hasPhone && (
        <FormInput
          name={"phone" as keyof T}
          label="N° de téléphone"
          placeholder="Ex : 06 12 34 56 78"
          type="tel"
          useFormContextHook={useFormContextHook}
          isRequired
        />
      )}
    </div>
  );
}

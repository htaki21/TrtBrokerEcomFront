"use client";

import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label?: string;
  id: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  error?: string;
  disabled?: boolean;
  numeric?: boolean;
}

export default function Input<T extends FieldValues>({
  label,
  id,
  name,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  disabled = false,
  numeric = false,
}: InputProps<T>) {
  let maxDigits: number | undefined;
  if (numeric) {
    if (name === "Immatriculation") maxDigits = 3;
    if (name === "Chassis") maxDigits = 5;
  }

  const finalValidation: RegisterOptions<T, Path<T>> = {
    ...validation,
    ...(numeric && maxDigits
      ? {
          validate: (value: string) => {
            if (!/^\d*$/.test(value)) return "Seulement des chiffres autorisés";
            if (value.length !== maxDigits)
              return `Doit contenir ${maxDigits} chiffres`;
            return true;
          },
        }
      : {}),
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-Neutral-Dark text-sm/[20px]">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, finalValidation)}
        onInput={
          numeric
            ? (e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/\D/g, "");
                if (maxDigits) target.value = target.value.slice(0, maxDigits);
              }
            : undefined
        }
        className={`w-full py-3 px-4 rounded-[8px] bg-Sage-Gray-Lowest hover:bg-Sage-Gray-Lower placeholder:text-Neutral-BG-4 text-sm/[20px] outline outline-transparent focus:outline-Neutral-Dark ${
          error ? "outline-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

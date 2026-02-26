"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import CustomInput from "./input";

interface FormInputProps<FormDataType> {
  name: keyof FormDataType;
  label: string;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
  useFormContextHook: () => {
    data: FormDataType;
    setData: React.Dispatch<React.SetStateAction<FormDataType>>;
    fieldErrors: Partial<Record<keyof FormDataType, string>>;
    clearFieldError: (field: keyof FormDataType) => void;
  };
}

export default function FormInput<FormDataType>({
  name,
  label,
  placeholder,
  type = "text",
  isRequired = false,
  useFormContextHook,
}: FormInputProps<FormDataType>) {
  const { data, setData, fieldErrors, clearFieldError } = useFormContextHook();
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Email validation regex
  const validateEmail = useCallback(
    (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
    []
  );

  // Format phone number: max 10 digits, spaces every 2 digits
  const formatPhone = useCallback(
    (val: string) =>
      val
        .replace(/\D/g, "") // remove non-digits
        .slice(0, 10) // limit to 10 digits
        .replace(/(\d{2})(?=\d)/g, "$1 "), // space every 2 digits
    []
  );

  // Validate format for email and mark invalid if needed
  const formatInvalid = useMemo(() => {
    if (!touched) return false;
    if (name === "email") {
      const emailValue = (data[name] as string) || "";
      // Only validate if user provided an email (not empty)
      return emailValue.length > 0 && !validateEmail(emailValue);
    }
    return false;
  }, [name, data, touched, validateEmail, isRequired]);

  const handleChange = useCallback(
    (val: string) => {
      if (name === "phone") {
        const cursorPos = inputRef.current?.selectionStart ?? val.length;
        const rawBefore = ((data[name] as string) || "").replace(/\D/g, "");
        const rawAfter = val.replace(/\D/g, "");
        const formatted = formatPhone(rawAfter);
        setData((prev) => ({ ...prev, [name]: formatted }));

        requestAnimationFrame(() => {
          if (!inputRef.current) return;
          const diff = rawAfter.length - rawBefore.length;
          const newPos = cursorPos + (diff > 0 ? 1 : 0);
          inputRef.current.selectionStart = inputRef.current.selectionEnd =
            newPos;
        });
      } else {
        setData((prev) => ({ ...prev, [name]: val }));
      }
      clearFieldError(name);
    },
    [name, setData, data, clearFieldError, formatPhone]
  );

  const isInvalid = !!fieldErrors[name] || formatInvalid;

  return (
    <CustomInput
      label={label}
      placeholder={placeholder}
      type={name === "phone" ? "tel" : type}
      value={(data[name] as string) || ""}
      onChange={handleChange}
      isRequired={isRequired}
      isInvalid={isInvalid}
      errorMessage={
        formatInvalid
          ? name === "email"
            ? "Veuillez saisir une adresse email valide"
            : "Format de données invalide"
          : fieldErrors[name] || ""
      }
      onBlur={() => setTouched(true)}
      inputMode={name === "phone" ? "numeric" : undefined}
      ref={inputRef}
    />
  );
}

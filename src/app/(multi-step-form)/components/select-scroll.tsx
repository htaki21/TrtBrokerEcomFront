"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select-gray";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { SVGProps } from "react";

export function HoraireIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 5.20833C10.3452 5.20833 10.625 5.48816 10.625 5.83333V9.375H14.1667C14.5118 9.375 14.7917 9.65482 14.7917 10C14.7917 10.3452 14.5118 10.625 14.1667 10.625H10C9.65482 10.625 9.375 10.3452 9.375 10V5.83333C9.375 5.48816 9.65482 5.20833 10 5.20833Z"
        fill="#525252"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C14.4873 1.875 18.125 5.51269 18.125 10C18.125 14.4873 14.4873 18.125 10 18.125C5.51269 18.125 1.875 14.4873 1.875 10C1.875 5.51269 5.51269 1.875 10 1.875ZM10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125Z"
        fill="#525252"
      />
    </svg>
  );
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectScrollableProps<FormDataType> {
  useFormContextHook?: () => {
    data: FormDataType;
    setData: React.Dispatch<React.SetStateAction<FormDataType>>;
  };
  fieldName?: keyof FormDataType;
  options: Option[];
  placeholder?: string;
  showHoraireIcon?: boolean;
}

export function SelectScrollable<FormDataType>({
  useFormContextHook,
  fieldName,
  options,
  placeholder, // optional
  showHoraireIcon = true,
}: SelectScrollableProps<FormDataType>) {
  const formContext = useFormContextHook?.();

  // Only set default if there is no placeholder
  const defaultOptionValue =
    !placeholder && options.length > 0 ? options[0].value : "";

  const [localValue, setLocalValue] = React.useState(defaultOptionValue);
  const [open, setOpen] = React.useState(false);

  const value = formContext
    ? (formContext.data[fieldName!] as string) || defaultOptionValue
    : localValue;

  const handleChange = (val: string) => {
    if (formContext && fieldName) {
      formContext.setData((prev) => ({ ...prev, [fieldName]: val }));
    } else {
      setLocalValue(val);
    }
  };

  return (
    <Select
      value={value}
      defaultValue={defaultOptionValue}
      onValueChange={handleChange}
      onOpenChange={setOpen}
    >
      <SelectTrigger
        className="min-h-11 bg-Sage-Gray-Lowest hover:bg-Sage-Gray-Lower flex items-center justify-between"
        variant="input"
      >
        <div className="flex gap-2 items-center">
          {showHoraireIcon && <HoraireIcon />}
          <SelectValue placeholder={placeholder} />
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {open ? (
            <ChevronUpIcon className="h-4 w-4 text-Neutral-Dark" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-Neutral-Dark" />
          )}
        </motion.div>
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label, disabled }) => (
          <SelectItem key={value} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}




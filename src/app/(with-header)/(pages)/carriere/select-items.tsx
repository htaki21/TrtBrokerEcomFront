"use client";
import { Control, Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select-gray";

import { type FormData } from "./validation"; // your schema file

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectItemsProps = {
  name: keyof FormData; // ✅ bound to schema keys
  label: string; // ✅ added label prop
  placeholder: string;
  options: Option[];
  control: Control<FormData>; // from react-hook-form
  error?: string;
};

export function SelectItems({
  name,
  label,
  placeholder,
  options,
  control,
  error,
}: SelectItemsProps) {
  const id = String(name);

  return (
    <div className="relative f-col gap-1.5 flex-1">
      {/* ✅ Label added */}
      <label htmlFor={id} className="text-Neutral-Dark text-sm/[20px]">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={typeof field.value === "string" ? field.value : ""}
          >
            <SelectTrigger id={id} className="min-h-11" variant="input">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

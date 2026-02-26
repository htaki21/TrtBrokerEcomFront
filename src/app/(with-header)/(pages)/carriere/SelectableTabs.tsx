"use client";
import { Control, Controller } from "react-hook-form";
import { type FormData } from "./validation";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectableTabsProps = {
  name: keyof FormData; // field name in the form
  label: string;
  options: Option[];
  control: Control<FormData>; // react-hook-form control
};

export function SelectableTabs({
  name,
  label,
  options,
  control,
}: SelectableTabsProps) {
  return (
    <div className="relative f-col gap-1.5 flex-1">
      <label htmlFor={name} className="text-Neutral-Dark text-sm/[20px]">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex p-0.5 gap-0.5 h-fit items-center w-full rounded-[8px] bg-Sage-Gray-Lowest">
            {options.map((option) => {
              const isSelected = field.value === option.value;
              return (
                <div
                  key={option.value}
                  onClick={() =>
                    !option.disabled && field.onChange(option.value)
                  }
                  className={`flex-center py-2.5 px-3 flex-1 rounded-[6px] cursor-pointer ${
                    isSelected
                      ? "bg-white shadow-[0_1px_3px_0_rgba(58,64,49,0.02),0_3px_8px_-2px_rgba(58,64,49,0.03)]"
                      : ""
                  } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="text-Neutral-Dark button2-s">
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}

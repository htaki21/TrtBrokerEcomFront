"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CalenderIcon } from "./icons";

interface Calendar24Props<FormDataType extends FieldValues = FieldValues> {
  name?: keyof FormDataType;
  control?: Control<FormDataType>;
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function Calendar24<FormDataType extends FieldValues = FieldValues>({
  name,
  control,
  label = "Date",
  placeholder = "Sélectionnez une date",
  value,
  onChange,
}: Calendar24Props<FormDataType>) {
  const [open, setOpen] = React.useState(false);
  const [localDate, setLocalDate] = React.useState<Date | undefined>(value);

  const date = value ?? localDate;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (control && name) return; // let Controller handle
    if (onChange) onChange(selectedDate);
    else setLocalDate(selectedDate);
    setOpen(false);
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (control && name) return; // let Controller handle
    if (onChange) onChange(undefined);
    else setLocalDate(undefined);
  };

  // Use Controller if control is passed
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name as Path<FormDataType>}
        render={({ field }) => {
          const fieldDate = field.value as Date | undefined;
          return (
            <DatePickerUI
              date={fieldDate}
              setDate={field.onChange}
              open={open}
              setOpen={setOpen}
              clearDate={() => field.onChange(undefined)}
              label={label}
              placeholder={placeholder}
              // error={fieldState.error?.message}
            />
          );
        }}
      />
    );
  }

  // Standalone
  return (
    <DatePickerUI
      date={date}
      setDate={handleDateSelect}
      open={open}
      setOpen={setOpen}
      clearDate={clearDate}
      label={label}
      placeholder={placeholder}
    />
  );
}

// Reusable UI part
interface DatePickerUIProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  clearDate: (e: React.MouseEvent) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

function DatePickerUI({
  date,
  setDate,
  open,
  setOpen,
  clearDate,
  label,
  placeholder,
  error,
}: DatePickerUIProps) {
  return (
    <div className="flex w-full flex-col gap-2 relative">
      {label && (
        <Label
          htmlFor="date-picker"
          className="text-Neutral-Dark px-1 font-normal text-[14px]/[20px]"
        >
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="input"
            variant="input"
            id="date-picker"
            className={`w-full relative justify-between bg-Sage-Gray-Lowest hover:bg-Sage-Gray-Lower gap-2 font-normal ${
              date ? "text-Neutral-Dark" : "text-Sage-Gray-Medium"
            }`}
          >
            <div className="flex items-center gap-2">
              <CalenderIcon />
              {date ? formatDateToString(date) : placeholder}
            </div>
            {date && (
              <span
                onClick={clearDate}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-[24px] text-Sage-Gray-Medium hover:text-Neutral-Dark transition-colors h-full w-[44px] flex items-center justify-center"
              >
                ×
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={setDate}
            disabled={(d) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return d < today;
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

// helper
function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

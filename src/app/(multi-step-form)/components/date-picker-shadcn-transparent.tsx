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
import { CalenderIcon } from "./icons";

interface CalendarTransparentProps {
  useFormContextHook: () => {
    data: Record<string, unknown>;
    setData: (
      updater:
        | ((prev: Record<string, unknown>) => Record<string, unknown>)
        | Record<string, unknown>
    ) => void;
  };
}

export function CalendarTransparent({
  useFormContextHook,
}: CalendarTransparentProps) {
  const { data, setData } = useFormContextHook();
  const [open, setOpen] = React.useState(false);

  const date = data.dateMiseEnCirculation
    ? stringToDate(data.dateMiseEnCirculation as string)
    : undefined;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate ? formatDateToString(selectedDate) : "";
    console.log("Date selected:", { selectedDate, formattedDate });
    setData((prev: Record<string, unknown>) => {
      const newData = {
        ...prev,
        dateMiseEnCirculation: formattedDate,
      };
      console.log("Setting data:", newData);
      return newData;
    });
    setOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor="date-picker" className="text-Neutral-Dark px-1 hidden">
        Date (à partir d&apos;aujourd&apos;hui)
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="input"
            variant="transparent"
            id="date-picker"
            className={`w-fit justify-start bg-transparent gap-2 max-tablet:px-0 
              underline underline-offset-8 decoration-Sage-Gray-Low
              ${date ? "text-Neutral-Dark decoration-Neutral-Dark" : "text-Sage-Gray-Low "}`}
          >
            <CalenderIcon className="!w-10 !h-10 max-tablet:!w-8 max-tablet:!h-8" />
            {date ? formatDateToString(date) : "JJ/MM/AAAA"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={(d) => {
              const today = new Date();
              const oneYearFromNow = new Date();
              oneYearFromNow.setFullYear(today.getFullYear() + 1);
              // Allow past dates but restrict future dates beyond 1 year
              return d > oneYearFromNow;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Helpers
function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function stringToDate(dateStr: string): Date {
  // Handle both DD/MM/YYYY and DD-MM-YYYY formats
  const separator = dateStr.includes("/") ? "/" : "-";
  const [day, month, year] = dateStr.split(separator).map(Number);
  return new Date(year, month - 1, day);
}

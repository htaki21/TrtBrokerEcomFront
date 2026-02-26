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

import { CalenderIcon } from "@/app/components/icons/CalenderIcon";
import { useFormContext } from "../devis-assurance-auto/context";

export function CalendarGray() {
  const [open, setOpen] = React.useState(false);
  const { data, setData } = useFormContext();

  // Convert stored string to Date for the Calendar
  const date = data.selectedDate ? stringToDate(data.selectedDate) : undefined;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setData((prev) => ({
      ...prev,
      selectedDate: selectedDate ? formatDateToString(selectedDate) : "",
    }));
    setOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label
        htmlFor="date-picker"
        className="text-Neutral-Dark font-normal px-1"
      >
        Date (à partir d&apos;aujourd&apos;hui)
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="input"
            variant="input"
            id="date-picker"
            className={`w-full justify-start bg-Neutral-BG-1 hover:bg-Neutral-BG-2 gap-2 font-normal ${
              date ? "text-Neutral-Dark" : "text-Neutral-BG-4"
            }`}
          >
            <CalenderIcon />
            {date ? formatDateToString(date) : "Sélectionnez une date future"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            disabled={(date) => {
              // Disable past dates (yesterday and earlier)
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Set to start of today
              return date < today;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * Converts Date to DD-MM-YYYY without UTC shift
 */
function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Converts DD-MM-YYYY string to Date (local time)
 */
function stringToDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

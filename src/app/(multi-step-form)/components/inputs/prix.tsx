"use client";

import { useRef, useEffect, useState } from "react";

interface PrixInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textColorClass?: string; // Tailwind class for text color
  borderColorClass?: string; // Tailwind class for border when empty
  unit?: string;
  fontSize?: string;
}

export default function PrixInput({
  value,
  onChange,
  placeholder = "Enter value",
  textColorClass = "Neutral-Dark",
  unit = "",
  fontSize = "text-[32px]/[40px]",
}: PrixInputProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  // now value is always a string internally
  const formattedValue = (value || "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const hasValue = formattedValue.length > 0;

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 4);
    }
  }, [formattedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    onChange(numericValue);
  };

  return (
    <div className="flex w-fit items-center gap-2 relative">
      {/* hidden span to measure width */}
      <span
        ref={spanRef}
        className={`invisible absolute whitespace-pre ${fontSize} font-medium`}
      >
        {formattedValue || placeholder}
      </span>

      {/* dynamic border color */}
      <div
        className={`border-b-3 ${
          hasValue ? `border-${textColorClass}` : `border-Sage-Gray-Low`
        }`}
      >
        <input
          type="text"
          value={formattedValue}
          onChange={handleChange}
          placeholder={placeholder}
          style={{ width: inputWidth }}
          className={`outline-none text-${textColorClass} placeholder:text-Sage-Gray-Low ${fontSize} font-medium`}
        />
      </div>

      {unit && (
        <span className={`${textColorClass} ${fontSize} font-medium`}>
          {unit}
        </span>
      )}
    </div>
  );
}

"use client";
import React from "react";

interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <div className="border-Neutral-BG-1 flex w-fit items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <circle cx="4" cy="4" r="4" fill="#0F110C" />
      </svg>
      <span className="text-BG-Dark button-s">{label}</span>
    </div>
  );
}

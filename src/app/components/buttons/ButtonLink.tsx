"use client";

import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonLinkProps {
  href?: string;
  label?: string;
  className?: string;
  size?: "small" | "medium" | "large" | "ultraLarge";
  color?:
    | "white"
    | "black"
    | "brand"
    | "gray"
    | "blue"
    | "red"
    | "blueHigh"
    | "violetHigh";
  iconClassName?: string;
  direction?: "left" | "right" | "bottom";
  outline?: boolean;
  ghost?: boolean;
  reverse?: boolean;
  disabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export default function ButtonLink({
  href,
  label,
  className,
  size = "medium",
  color = "brand",
  iconClassName = "w-5 h-5 max-mobile:w-6 max-mobile:h-6",
  direction = "right",
  outline = false,
  ghost = false,
  reverse = false,
  disabled = false,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonLinkProps) {
  // --- size styles ---
  const sizeStyles: Record<string, string> = {
    small: "py-2 px-4 text-sm/[20px] gap-1",
    medium: "py-2 px-4 text-base/[24px] gap-2",
    large: "py-3 px-6 text-base/[24px] gap-2",
    ultraLarge: "py-3 px-8 text-base/[24px] font-medium gap-2",
  };

  // --- color styles ---
  const colorStyles: Record<string, string> = {
    white: twMerge(
      "bg-white text-Neutral-Dark hover:bg-Neutral-BG-3",
      outline && "outline-2 outline-gray-300",
      ghost &&
        "border border-[var(--color-Neutral-BG-1)] shadow-[0_1px_3px_0_rgba(58,64,49,0.02),0_3px_8px_-2px_rgba(58,64,49,0.03)]"
    ),
    black: "bg-Neutral-Dark text-white hover:bg-Neutral-BG-5",
    brand: "bg-Primary-500 text-white hover:bg-Primary-600",
    gray: "bg-Neutral-BG-2 text-Neutral-Dark hover:bg-Neutral-BG-3",
    blue: "bg-Secondary-Blue-Medium text-white hover:bg-Secondary-Blue-High",
    blueHigh:
      "bg-Secondary-Blue-High text-white hover:bg-Secondary-Blue-Higher",
    violetHigh:
      "bg-Secondary-Violet-High text-white hover:bg-Secondary-Violet-Higher",
    red: "bg-Secondary-Red-Medium text-white hover:bg-Secondary-Red-High",
  };

  const ArrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={twMerge(
        direction === "left" && "rotate-180",
        direction === "bottom" && "rotate-90",
        iconClassName
      )}
    >
      <path
        d="M12.2476 5.57954C12.4916 5.33546 12.8881 5.33546 13.1322 5.57954L17.1092 9.55741C17.3533 9.80149 17.3533 10.1971 17.1092 10.4412L13.1322 14.4191C12.8881 14.6631 12.4916 14.6631 12.2476 14.4191C12.0035 14.175 12.0035 13.7785 12.2476 13.5345L15.1585 10.6243H3.33398C2.98882 10.6243 2.70901 10.3445 2.70898 9.9993C2.70898 9.65412 2.98881 9.3743 3.33398 9.3743H15.1585L12.2476 6.46415C12.0035 6.22008 12.0035 5.82362 12.2476 5.57954Z"
        fill="currentColor"
      />
    </svg>
  );

  const commonClasses = twMerge(
    "flex items-center justify-center w-fit rounded-full transition-colors whitespace-nowrap",
    reverse && "flex-row-reverse",
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
    sizeStyles[size],
    colorStyles[color],
    className
  );

  const content = (
    <>
      {label && <span>{label}</span>}
      {ArrowIcon}
    </>
  );

  // ✅ handle anchor links (#section2) separately
  if (href && href.startsWith("#")) {
    return (
      <a
        href={href}
        className={commonClasses}
        aria-label={ariaLabel || label}
        onClick={(e) => {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          onClick?.(e); // still allow custom onClick
        }}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={disabled ? "#" : href}
        prefetch={true} // Enable prefetching for better performance
        onClick={
          disabled
            ? (e) => e.preventDefault()
            : (onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void)
        }
        className={commonClasses}
        aria-label={ariaLabel || label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      disabled={disabled}
      className={commonClasses}
      aria-label={ariaLabel || label}
    >
      {content}
    </button>
  );
}

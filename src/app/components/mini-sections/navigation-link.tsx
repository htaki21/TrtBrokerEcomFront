"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SVGProps } from "react";

export function Chevrondown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M12.8915 8.72481C13.1356 8.48073 13.5312 8.48073 13.7753 8.72481C14.0193 8.96889 14.0193 9.36453 13.7753 9.6086L10.4419 12.9419C10.1979 13.186 9.80222 13.186 9.55814 12.9419L6.22481 9.6086C5.98073 9.36452 5.98073 8.96888 6.22481 8.72481C6.46888 8.48073 6.86452 8.48073 7.1086 8.72481L10 11.6162L12.8915 8.72481Z"
        fill="#0F110C"
      />
    </svg>
  );
}

const navItems = [
  {
    label: "Particuliers",
    href: "/",
    isPathActive: (pathname: string) =>
      // Always active unless we're on Professionnelle or Entreprise
      pathname !== "/assurance-professionnelle" &&
      pathname !== "/assurance-entreprise",
  },
  { label: "Professionnels", href: "/assurance-professionnelle" },
  { label: "Entreprises", href: "/assurance-entreprise" },
];

export default function NavigationLinks() {
  const pathname = usePathname();

  const activeItem = useMemo(
    () =>
      navItems.find((item) =>
        item.isPathActive
          ? item.isPathActive(pathname)
          : pathname === item.href,
      ),
    [pathname],
  );

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className="relative group max-tablet:hidden"
    >
      {/* Trigger */}
      <div
        className="flex items-center justify-center gap-1 py-2 px-4 rounded-full border border-Neutral-BG-1
       bg-white shadow-soft cursor-pointer transition group-hover:bg-Sage-Gray-Lower group-hover:border-Sage-Gray-Low"
      >
        <span className="button-s text-Neutral-Dark">{activeItem?.label}</span>
        <Chevrondown className="transition group-hover:rotate-180" />
      </div>

      {/* Dropdown */}
      <ul className="absolute top-full left-0 mt-1 w-[187px] max-w-[187px] flex flex-col gap-1 rounded-[20px] border border-Sage-Gray-Lower bg-white shadow-lg p-3 opacity-0 invisible translate-y-2 transition group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
        {navItems.map((item, index) => {
          const isActive = activeItem?.href === item.href;

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`button-s flex py-2 px-3 rounded-[8px] transition ${
                  isActive
                    ? "text-white bg-Neutral-Dark"
                    : "text-Sage-Gray-Higher hover:bg-Sage-Gray-Lower"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

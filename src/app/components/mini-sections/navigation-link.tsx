"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

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
interface NavigationLinksProps {
  className?: string;
}
export default function NavigationLinks({ className }: NavigationLinksProps) {
  const pathname = usePathname();
  const [highlightStyle, setHighlightStyle] = useState({});
  const containerRef = useRef<HTMLUListElement>(null);

  const activeItem = useMemo(
    () =>
      navItems.find((item) =>
        item.isPathActive ? item.isPathActive(pathname) : pathname === item.href
      ),
    [pathname]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !activeItem) return;

    const activeEl = container.querySelector<HTMLLIElement>(
      `[data-href="${activeItem.href}"]`
    );

    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHighlightStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - containerRect.left}px)`,
      });
    }
  }, [activeItem]);

  return (
    <nav role="navigation" aria-label="Navigation principale">
      <ul
        ref={containerRef}
        className={twMerge(
          `max-tablet:fixed max-tablet:bottom-2 max-tablet:left-1/2 max-tablet:-translate-x-1/2
          max-tablet:shadow-lg border border-Neutral-BG-1 relative flex gap-1 rounded-full bg-white`,
          className
        )}
      >
        {/* Moving dark background */}
        <span
          className="absolute left-0 top-0 h-full rounded-full bg-Neutral-Dark transition-all duration-300 ease-in-out z-10"
          style={highlightStyle}
          role="presentation"
          aria-hidden="true"
        />

        {navItems.map((item) => {
          const isActive = activeItem?.href === item.href;

          return (
            <li
              key={item.href}
              data-href={item.href}
              className={`button2-s relative max-tablet:w-full max-tablet:text-center cursor-pointer rounded-full transition-colors duration-300 ${
                isActive ? "text-white z-20" : "text-Neutral-Dark z-20"
              }`}
            >
              <Link
                href={item.href}
                prefetch={true} // Enable prefetching for better performance
                className={`block h-full w-full max-tablet:py-2.5 max-tablet:px-4 px-3 py-1.5 ${
                  isActive ? "text-white" : "text-Neutral-Dark"
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

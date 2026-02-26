"use client";

import { useEffect, useState } from "react";
import HeaderDesktop from "./components/head-desktop";
import HeaderMobile from "./components/head-mobile";
import NavigationLinks from "../mini-sections/navigation-link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setShowHeader(false);
      } else {
        // scrolling up → show
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="z-[50] relative">
      <div
        className={`fixed z-[99] top-0 left-0 w-full transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <HeaderDesktop onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <HeaderMobile
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
      <NavigationLinks className="hidden z-[49] max-tablet:w-full relative max-tablet:flex" />
    </header>
  );
}

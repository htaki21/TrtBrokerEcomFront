"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import ButtonLink from "../../buttons/ButtonLink";
import { BurgerMenuIcon } from "../../icons/Burger-Menu";
import { Logosvg } from "../../logo/logo";
import NavigationLinks from "../../mini-sections/navigation-link";
import { NavigationMenuDemo } from "../../mini-sections/navigation-menu";
import Wrapper1180 from "../../wrapper/wrapper-1180";

type HeaderVariant = "green" | "red" | "blue";

interface HeaderDesktopProps {
  onMobileMenuToggle: () => void;
}

const HeaderDesktop = ({ onMobileMenuToggle }: HeaderDesktopProps) => {
  const pathname = usePathname();
  // Pick variant based on pathname
  const variant: HeaderVariant = useMemo(() => {
    if (pathname?.toLowerCase().includes("assurance-professionnelle")) return "red";
    if (pathname?.toLowerCase().includes("assurance-entreprise")) return "blue";
    return "green"; // default
  }, [pathname]);

  // Check if we should show the right-side navigation menu
  const shouldShowRightNav = useMemo(() => {
    // Hide right navigation on professionnels and entreprises pages
    if (
      pathname?.toLowerCase().includes("assurance-professionnelle") ||
      pathname?.toLowerCase().includes("assurance-entreprise")
    ) {
      return false;
    }
    // Show right navigation on particuliers pages
    return true;
  }, [pathname]);

  const buttonColor: Record<HeaderVariant, "brand" | "red" | "blue"> = {
    green: "brand",
    red: "red",
    blue: "blue",
  };

  // Map background color per variant
  const bgColor: Record<HeaderVariant, string> = {
    green: "bg-Sage-Gray-Lowest", // your default
    red: "bg-Secondary-Red-Lowest", // adjust to your theme color
    blue: "bg-Secondary-Blue-Lowest", // adjust to your theme color
  };
  return (
    <div
      className={`relative z-10 flex w-full items-center justify-center ${bgColor[variant]}`}
    >
      <Wrapper1180 className="max-mobile:max-w-[500px] max-laptop:p-4 max-laptop:justify-between flex-row gap-6 py-4">
        <Logosvg
          href="/"
          className="max-mobile:w-[92px] max-mobile:h-[40px]"
          variant={variant}
        />

        <div className="max-tablet:justify-end max-laptop:gap-1.5 flex flex-1 items-center justify-between">
          <NavigationLinks className="max-tablet:hidden"/>
          <div className="text-button-s flex items-center gap-1.5">
            {shouldShowRightNav && <NavigationMenuDemo />}
            <ButtonLink
              href="/contact"
              iconClassName="w-5 h-5 max-laptop:hidden"
              label="Contactez-nous"
              size="small"
              color={buttonColor[variant]}
              direction="right"
            />

            {/* Burger icon */}
            {!pathname?.toLowerCase().includes("assurance-professionnelle") &&
              !pathname?.toLowerCase().includes("assurance-entreprise") && (
                <span
                  className="max-laptop:flex bg-Sage-Gray-Lower hidden cursor-pointer rounded-full p-2"
                  onClick={onMobileMenuToggle}
                >
                  <BurgerMenuIcon variant="open" />
                </span>
              )}
          </div>
        </div>
      </Wrapper1180>
    </div>
  );
};

export default HeaderDesktop;

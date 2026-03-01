"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ButtonLink from "../../buttons/ButtonLink";
import { BurgerMenuIcon } from "../../icons/Burger-Menu";
import { Logosvg } from "../../logo/logo";
import NavigationLinks from "../../mini-sections/navigation-link";
import { NavigationMenuDemo } from "../../mini-sections/navigation-menu";
import Wrapper1180 from "../../wrapper/wrapper-1180";
import { SVGProps } from "react";
import Link from "next/link";
import { usePopup } from "../../popup/PopupContext";
import { getDrafts } from "@/app/(with-header)/(pages)/drafts/draftManager";
import { useDraft } from "@/app/(with-header)/(pages)/drafts/DraftContext";

export function IconSearch(props: SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16667 1.875C13.1937 1.875 16.4583 5.13959 16.4583 9.16667C16.4583 10.9552 15.8131 12.5921 14.7445 13.8607L17.9419 17.0581L17.985 17.1053C18.1853 17.3508 18.1707 17.7131 17.9419 17.9419C17.7131 18.1707 17.3508 18.1853 17.1053 17.985L17.0581 17.9419L13.8607 14.7445C12.5921 15.8131 10.9552 16.4583 9.16667 16.4583C5.13959 16.4583 1.875 13.1937 1.875 9.16667C1.875 5.13959 5.13959 1.875 9.16667 1.875ZM9.16667 3.125C5.82995 3.125 3.125 5.82995 3.125 9.16667C3.125 12.5034 5.82995 15.2083 9.16667 15.2083C12.5034 15.2083 15.2083 12.5034 15.2083 9.16667C15.2083 5.82995 12.5034 3.125 9.16667 3.125Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function Iconshoppingcart(props: SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66667 15.2083C7.05344 15.2083 7.42426 15.3621 7.69775 15.6356C7.97124 15.9091 8.125 16.2799 8.125 16.6667C8.125 17.0534 7.97124 17.4243 7.69775 17.6978C7.42426 17.9712 7.05344 18.125 6.66667 18.125C6.27989 18.125 5.90907 17.9712 5.63558 17.6978C5.36209 17.4243 5.20833 17.0534 5.20833 16.6667C5.20833 16.2799 5.36209 15.9091 5.63558 15.6356C5.90907 15.3621 6.27989 15.2083 6.66667 15.2083ZM6.66667 16.4583C6.61141 16.4583 6.55844 16.4803 6.51937 16.5194C6.4803 16.5584 6.45833 16.6114 6.45833 16.6667C6.45833 16.7219 6.4803 16.7749 6.51937 16.814C6.55844 16.853 6.61141 16.875 6.66667 16.875C6.72192 16.875 6.7749 16.853 6.81396 16.814C6.85303 16.7749 6.875 16.7219 6.875 16.6667C6.875 16.6114 6.85303 16.5584 6.81396 16.5194C6.7749 16.4803 6.72192 16.4583 6.66667 16.4583Z"
        fill="#0F110C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 15.2083C15.3868 15.2083 15.7576 15.3621 16.0311 15.6356C16.3046 15.9091 16.4583 16.2799 16.4583 16.6667C16.4583 17.0534 16.3046 17.4243 16.0311 17.6978C15.7576 17.9712 15.3868 18.125 15 18.125C14.6132 18.125 14.2424 17.9712 13.9689 17.6978C13.6954 17.4243 13.5417 17.0534 13.5417 16.6667C13.5417 16.2799 13.6954 15.9091 13.9689 15.6356C14.2424 15.3621 14.6132 15.2083 15 15.2083ZM15 16.4583C14.9447 16.4583 14.8918 16.4803 14.8527 16.5194C14.8136 16.5584 14.7917 16.6114 14.7917 16.6667C14.7917 16.7219 14.8136 16.7749 14.8527 16.814C14.8918 16.853 14.9447 16.875 15 16.875C15.0553 16.875 15.1082 16.853 15.1473 16.814C15.1864 16.7749 15.2083 16.7219 15.2083 16.6667C15.2083 16.6114 15.1864 16.5584 15.1473 16.5194C15.1082 16.4803 15.0553 16.4583 15 16.4583Z"
        fill="#0F110C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.72298 1.875C2.91115 1.875 3.0866 1.87462 3.23405 1.88558C3.38936 1.89714 3.55717 1.92386 3.72803 1.9987L3.73291 2.00033C3.97816 2.11003 4.1921 2.28639 4.3457 2.51384C4.45046 2.66739 4.50649 2.82663 4.5459 2.97608C4.58371 3.11952 4.61549 3.29229 4.64925 3.47656L4.81445 4.375H15.8252C16.0995 4.375 16.3465 4.37431 16.5479 4.39209C16.7541 4.41031 16.9846 4.45215 17.2013 4.58252C17.4664 4.74066 17.6729 4.97796 17.7938 5.2596L17.8402 5.3833C17.918 5.62427 17.9072 5.86016 17.8784 6.06527C17.8503 6.26557 17.7942 6.50614 17.7327 6.77328L17.7319 6.77409L16.4258 12.4325C16.425 12.4359 16.425 12.4396 16.4242 12.443C16.3613 12.715 16.3027 13.009 16.1597 13.256L16.0929 13.3586C15.9384 13.571 15.729 13.7377 15.4875 13.8411L15.4867 13.842C15.3206 13.9126 15.1581 13.9376 15.0081 13.9486C14.8661 13.9589 14.6979 13.9583 14.5182 13.9583H5.83333C5.53192 13.9583 5.27364 13.7429 5.21891 13.4465L3.4196 3.7028C3.38254 3.50053 3.3602 3.38162 3.3374 3.29509C3.31681 3.21695 3.30635 3.20802 3.31299 3.21778L3.30973 3.21289C3.29038 3.18426 3.26135 3.15905 3.22428 3.14209C3.21469 3.13973 3.19019 3.13597 3.14128 3.13233C3.05089 3.12561 2.92953 3.125 2.72298 3.125H2.5C2.15482 3.125 1.875 2.84518 1.875 2.5C1.875 2.15482 2.15482 1.875 2.5 1.875H2.72298ZM6.35335 12.7083H14.5182C14.7158 12.7083 14.831 12.7081 14.917 12.7018C14.9665 12.6982 14.9893 12.6932 14.9967 12.6912C15.0307 12.6764 15.0604 12.6529 15.0822 12.6229C15.0858 12.616 15.0953 12.5951 15.1099 12.548C15.135 12.4667 15.1605 12.3562 15.2043 12.1672C15.2048 12.1646 15.2053 12.1616 15.2059 12.159L16.5145 6.49251C16.5812 6.20278 16.6219 6.02474 16.6406 5.89112C16.6519 5.81088 16.6497 5.77475 16.6488 5.76416C16.6326 5.71951 16.6023 5.68145 16.5617 5.65674C16.5517 5.65353 16.5172 5.64422 16.438 5.63721C16.3044 5.62542 16.1223 5.625 15.8252 5.625H5.04557L6.35335 12.7083Z"
        fill="#0F110C"
      />
    </svg>
  );
}
export function Iconuser(props: SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99996 1.66663C14.6025 1.66663 18.3333 5.39746 18.3333 9.99996C18.3333 14.6025 14.6025 18.3333 9.99996 18.3333C5.39746 18.3333 1.66663 14.6025 1.66663 9.99996C1.66663 5.39746 5.39746 1.66663 9.99996 1.66663ZM9.99996 12.5C7.97913 12.5 6.13595 13.1844 4.78512 14.1536C5.40909 14.9379 6.20239 15.5715 7.10527 16.0066C8.00816 16.4417 8.99769 16.6673 9.99996 16.6666C11.0022 16.6673 11.9918 16.4417 12.8947 16.0066C13.7975 15.5715 14.5908 14.9379 15.2148 14.1536C13.864 13.1844 12.0208 12.5 9.99996 12.5ZM9.99996 4.99996C9.61694 4.99996 9.23729 5.07555 8.88342 5.22213C8.5297 5.3687 8.20853 5.58371 7.93778 5.85445C7.66704 6.12519 7.45203 6.44637 7.30546 6.80009C7.15888 7.15396 7.08329 7.5336 7.08329 7.91663C7.08329 8.69017 7.3908 9.43182 7.93778 9.9788C8.48477 10.5258 9.22641 10.8333 9.99996 10.8333C10.7735 10.8333 11.5152 10.5258 12.0621 9.9788C12.6091 9.43182 12.9166 8.69017 12.9166 7.91663C12.9166 7.5336 12.841 7.15396 12.6945 6.80009C12.5479 6.44637 12.3329 6.12519 12.0621 5.85445C11.7914 5.58371 11.4702 5.3687 11.1165 5.22213C10.7626 5.07555 10.383 4.99996 9.99996 4.99996Z"
        fill="white"
      />
    </svg>
  );
}

type HeaderVariant = "green" | "red" | "blue";

interface HeaderDesktopProps {
  onMobileMenuToggle: () => void;
}

const HeaderDesktop = ({ onMobileMenuToggle }: HeaderDesktopProps) => {
  const { open } = usePopup();
  const pathname = usePathname();
  // Pick variant based on pathname
  const variant: HeaderVariant = useMemo(() => {
    if (pathname?.toLowerCase().includes("assurance-professionnelle"))
      return "red";
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

  const { drafts } = useDraft();
  const draftCount = drafts.length;

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
          <NavigationLinks />
          <div className="text-button-s flex items-center gap-1">
            {shouldShowRightNav && <NavigationMenuDemo />}
            <button
              onClick={() => open("Search")}
              className="flex p-2 outline-none rounded-full bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition cursor-pointer"
            >
              <IconSearch className=" shrink-0" />
            </button>
            <Link
              href="/drafts"
              className="relative flex p-2 rounded-full bg-Sage-Gray-Lower hover:bg-Sage-Gray-Medium transition cursor-pointer"
            >
              {draftCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 rounded-full bg-Brand-500
           text-[11px] leading-[16px] font-medium text-white size-5 flex-center"
                >
                  {draftCount}
                </span>
              )}
              <Iconshoppingcart className="shrink-0" />
            </Link>
            <span className="flex p-2 rounded-full bg-BG-BG-3-3 hover:bg-Sage-Gray-Higher transition cursor-pointer">
              <Iconuser className=" shrink-0" />
            </span>
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

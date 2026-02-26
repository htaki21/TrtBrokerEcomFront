import type { SVGProps } from "react";

interface BurgerMenuIconProps extends SVGProps<SVGSVGElement> {
  variant?: "open" | "close"; // manually choose which icon to display
}

export function BurgerMenuIcon({
  variant = "open",
  ...props
}: BurgerMenuIconProps) {
  if (variant === "close") {
    // Close icon (X)
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16.419 6.51959C16.7119 6.2267 17.1877 6.2267 17.4806 6.51959C17.7732 6.81233 17.773 7.28723 17.4806 7.58014L13.0606 12.0001L17.4806 16.419C17.7734 16.7119 17.7734 17.1876 17.4806 17.4805C17.1877 17.7734 16.7119 17.7734 16.419 17.4805L12.0001 13.0606L7.58016 17.4805C7.28724 17.7734 6.81238 17.7734 6.51961 17.4805C6.22685 17.1876 6.2271 16.7119 6.51961 16.419L10.9395 12.0001L6.51961 7.58014C6.22685 7.28723 6.2271 6.81233 6.51961 6.51959C6.81238 6.22683 7.28724 6.22708 7.58016 6.51959L12.0001 10.9395L16.419 6.51959Z"
          fill="black"
        />
      </svg>
    );
  }

  // Open icon (hamburger)
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.9975 12.001H19.001H19.0009H18.9975V12.001ZM11.9993 12.001H12.0028H12.0027H11.9993V12.001ZM5.00101 12.001H5.00451H5.00442H5.00101V12.001Z"
        stroke="#0F110C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9975 19.001H19.001H19.0009H18.9975V19.001ZM11.9993 19.001H12.0028H12.0027H11.9993V19.001ZM5.00101 19.001H5.00451H5.00442H5.00101V19.001Z"
        stroke="#0F110C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9975 5.00098H19.001H19.0009H18.9975V5.00098ZM11.9993 5.00098H12.0028H12.0027H11.9993V5.00098ZM5.00101 5.00098H5.00451H5.00442H5.00101V5.00098Z"
        stroke="#0F110C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

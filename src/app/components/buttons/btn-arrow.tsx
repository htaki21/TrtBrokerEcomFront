interface BtnArrowProps {
  variant?: "previous" | "next" | "white" | "Black" | "avantage";
  direction?: "left" | "right";
  label?: string;
  labelClassName?: string; // optional custom label
  className?: string;
  outline?: boolean;
  iconSize?: number | string;
  showIcon?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function BtnArrow({
  variant = "previous",
  direction = "left",
  label = "",
  labelClassName,
  className = "",
  outline = false,
  iconSize = 20,
  showIcon = true,
  onClick,
  ariaLabel,
}: BtnArrowProps) {
  const variantStyles = {
    previous: {
      container:
        "py-2 px-4 max-mobile:py-2 max-mobile:px-4 gap-1 bg-Sage-Gray-Lower text-black hover:bg-BG-BG-3",
      label: "button-s",
    },
    next: {
      container:
        "py-2 px-4 max-mobile:py-2 max-mobile:px-4 gap-1 bg-Brand-500 text-white hover:bg-Brand-600",
      label: "button-s",
    },
    white: {
      container: `py-3 px-8 max-mobile:py-3 max-mobile:px-6 gap-2 bg-white text-BG-BG-3-3 filter hover:brightness-95 ${
        outline ? "outline-[5px] outline-white/30" : ""
      }`,
      label: "Button-M",
    },
    avantage: {
      container:
        "py-2 px-4 gap-2 bg-white text-BG-BG-3-3 border border-Sage-Gray-Lower shadow-[0_1px_3px_0_rgba(58,64,49,0.02),_0_3px_8px_-2px_rgba(58,64,49,0.03)] filter hover:brightness-98",
      label: "button-s max-mobile:Button-M",
    },
    Black: {
      container:
        "py-2 px-4 gap-2 bg-BG-BG-3-3 text-white hover:bg-BG-BG-3-3/90",
      label: "Button-M",
    },
  };

  const finalLabelClass = labelClassName || variantStyles[variant].label;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-fit rounded-full cursor-pointer transition-colors ${variantStyles[variant].container} ${className}`}
      aria-label={ariaLabel || label}
    >
      {label && <span className={finalLabelClass}>{label}</span>}

      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 29 28"
          fill="none"
          className={direction === "left" ? "rotate-180" : ""}
        >
          <path
            d="M17.6457 7.8124C17.9874 7.47069 18.5424 7.47069 18.8841 7.8124L24.452 13.3814C24.7937 13.7231 24.7937 14.277 24.452 14.6187L18.8841 20.1877C18.5424 20.5294 17.9874 20.5294 17.6457 20.1877C17.304 19.846 17.304 19.291 17.6457 18.9493L21.721 14.8751H5.16666C4.68343 14.8751 4.29169 14.4833 4.29166 14.0001C4.29166 13.5168 4.68341 13.1251 5.16666 13.1251H21.721L17.6457 9.05085C17.304 8.70915 17.304 8.15412 17.6457 7.8124Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}

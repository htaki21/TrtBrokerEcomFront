import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
  badgeText?: string | null;
  badgeClassName?: string;
  heading?: string | null;
  headingClassName?: string;
  headingSizeClass?: string;
  description?: string | null;
  descriptionClassName?: string;
  className?: string; // wrapper div
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeClassName,
  heading,
  headingClassName,
  headingSizeClass = "Headings-H2",
  description,
  descriptionClassName,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "f-col items-center gap-6 max-mobile:gap-4",
        className
      )}
    >
      {badgeText && (
        <div
          className={twMerge(
            "border-Neutral-BG-1 flex w-fit items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm",
            badgeClassName
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#0F110C" />
          </svg>
          <span className="text-BG-Dark button-s">{badgeText}</span>
        </div>
      )}

      {(heading || description) && (
        <div className="f-col w-full gap-4 max-mobile:gap-3 text-center">
          {heading && (
            <h2
              className={twMerge(
                "text-Neutral-Dark",
                headingSizeClass,
                headingClassName
              )}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              className={twMerge("text-Text-Body Text-M", descriptionClassName)}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;

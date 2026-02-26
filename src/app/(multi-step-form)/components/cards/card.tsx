import { twMerge } from "tailwind-merge";

interface CardProps {
  svg?: React.ReactNode;
  title: string;
  description: string;
  selected?: boolean;
  padding?: string;
  svgClassName?: string;
  disabled?: boolean; // <-- new prop
  onClick?: () => void;
}

export default function Card({
  svg,
  title,
  description,
  selected,
  padding = "p-14",
  svgClassName = "",
  disabled = false, // default false
  onClick,
}: CardProps) {
  return (
    <div
      onClick={!disabled ? onClick : undefined} // ignore click if disabled
      className={twMerge(
        `flex flex-1 flex-col max-tablet:flex-row max-tablet:justify-start items-center 
         justify-center gap-6 max-tablet:gap-4 rounded-2xl border transition-colors ${padding} max-tablet:p-4`,
        disabled
          ? "cursor-not-allowed opacity-50 bg-Sage-Gray-Lowest border-transparent"
          : "cursor-pointer",
        selected
          ? "border-Sage-Gray-Higher bg-Sage-Gray-Lower"
          : !disabled &&
              "hover:border-Sage-Gray-Medium bg-Sage-Gray-Lowest border-transparent"
      )}
    >
      {svg && (
        <span
          className={twMerge(
            "flex-center rounded-xl max-tablet:w-12 max-tablet:h-12 max-tablet:p-2 bg-white p-3",
            svgClassName
          )}
        >
          {svg}
        </span>
      )}
      <div className="flex flex-col gap-2 max-tablet:gap-1 text-center max-tablet:text-left">
        <h3 className="text-Neutral-Dark Headings-H7">{title}</h3>
        <p className="text-Sage-Gray-High Text-S">{description}</p>
      </div>
    </div>
  );
}

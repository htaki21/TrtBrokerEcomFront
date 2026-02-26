import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InfoCardProps {
  icon: ReactNode;
  text: string;
  position: string; // Tailwind classes for absolute positioning
  className?: string; // ✅ Allow external styles
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  text,
  position,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `absolute ${position} f-col max-tablet:flex-row max-tablet:py-2 max-tablet:px-3 max-tablet:gap-2 p-4 gap-3 
        rounded-2xl max-w-[166px] max-tablet:max-w-[174px] w-full backdrop-blur-xl bg-[rgba(93,93,93,0.25)] shadow-[-4px_8px_32px_0_rgba(6,6,6,0.25)]`,
        className
      )}
    >
      {icon}
      <span className="text-white text-[15px]/[21px] font-medium">{text}</span>
    </div>
  );
};

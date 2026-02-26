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
        `max-tablet:scale-70 absolute ${position} f-col px-3 pt-3 pb-2 gap-2 
        rounded-2xl max-w-[156px] w-full backdrop-blur-xl bg-[rgba(85,85,85,0.6)]`,
        className
      )}
    >
      <div className="flex-center py-3 px-2 rounded-[4px] bg-[rgba(192,192,192,0.25)]">
        {icon}
      </div>
      <div className="flex-center p-1">
        <span className="text-white button-s">{text}</span>
      </div>
    </div>
  );
};

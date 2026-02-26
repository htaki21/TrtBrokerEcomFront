import React from "react";

interface PlusIconProps {
  className?: string; // optional additional classes for the wrapper
  size?: number; // optional size for the SVG
  color?: string; // optional color for the SVG
}

const PlusIcon: React.FC<PlusIconProps> = ({
  className = "",
  size = 14,
  color = "black",
}) => {
  return (
    <span
      className={`flex-center bg-Neutral-BG-3 rounded-full p-[1px] ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 15"
        fill={color}
      >
        <path
          d="M6.99984 2.97949C7.24146 2.97949 7.43734 3.17537 7.43734 3.41699V7.06283H11.0832C11.3248 7.06283 11.5207 7.2587 11.5207 7.50033C11.5207 7.74195 11.3248 7.93783 11.0832 7.93783H7.43734V11.5837C7.43734 11.8253 7.24146 12.0212 6.99984 12.0212C6.75821 12.0212 6.56234 11.8253 6.56234 11.5837V7.93783H2.9165C2.67488 7.93783 2.479 7.74195 2.479 7.50033C2.479 7.2587 2.67488 7.06283 2.9165 7.06283H6.56234V3.41699C6.56234 3.17537 6.75821 2.97949 6.99984 2.97949Z"
          fill="black"
        />
      </svg>
    </span>
  );
};

export default PlusIcon;

import React from "react";

interface CheckIconProps {
  className?: string; // optional additional classes for the wrapper
  size?: number; // optional size for the SVG
  color?: string; // optional color for the SVG
}

const CheckIcon: React.FC<CheckIconProps> = ({
  className = "",
  size = 14,
  color = "black",
}) => {
  return (
    <span className={`flex-center bg-Neutral-BG-3 rounded-full p-[1px] ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size} 
        viewBox="0 0 14 15"
        fill="none"
      >
        <path
          d="M11.3574 4.27414C11.5282 4.10328 11.8052 4.10328 11.976 4.27414C12.1469 4.44499 12.1469 4.72195 11.976 4.89279L6.14271 10.7261C5.97186 10.897 5.69491 10.8969 5.52406 10.7261L2.60739 7.80946C2.43653 7.6386 2.43653 7.36166 2.60739 7.1908C2.76757 7.03062 3.02116 7.02043 3.193 7.16061L3.22604 7.1908L5.83338 9.79814L11.3574 4.27414Z"
          fill={color}
        />
      </svg>
    </span>
  );
};

export default CheckIcon;

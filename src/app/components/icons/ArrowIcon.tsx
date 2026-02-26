import type { SVGProps } from "react";
import clsx from "clsx";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
    direction?: "right" | "left" ;
};

export function ArrowIcon({
    direction = "right",
    className,
    width = 28,  
    height = 28,
    ...props
}: ArrowIconProps) {
    const rotation = {
        right: "rotate-0",
        left: "rotate-180",
    }[direction];

    return (
        <svg
            viewBox="0 0 28 28"
            width={width}
            height={height}
            className={clsx("transition-transform", rotation, className)}
            fill="none"
            {...props}
        >
            <path
                d="M17.147 7.81243C17.4887 7.47073 18.0437 7.47073 18.3854 7.81243L23.9533 13.3814C24.295 13.7232 24.295 14.2771 23.9533 14.6188L18.3854 20.1878C18.0437 20.5294 17.4887 20.5294 17.147 20.1878C16.8053 19.8461 16.8053 19.291 17.147 18.9493L21.2223 14.8751H4.66797C4.18474 14.8751 3.793 14.4833 3.79297 14.0001C3.79297 13.5168 4.18472 13.1251 4.66797 13.1251H21.2223L17.147 9.05088C16.8053 8.70918 16.8053 8.15415 17.147 7.81243Z"
                fill="currentColor"
            />
        </svg>
    );
}

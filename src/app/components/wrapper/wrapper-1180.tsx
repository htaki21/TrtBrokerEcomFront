import { ReactNode, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface Wrapper1180Props {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType; // allows you to pass "div" | "section" | "main" | etc.
}

export default function Wrapper1180({
  children,
  className,
  id,
  as: Component = "div", // default to div
}: Wrapper1180Props) {
  return (
    <Component
    id={id}
      className={twMerge(
        "mx-auto flex w-full max-w-[1180px] flex-col gap-14",
        className
      )}
    >
      {children}
    </Component>
  );
}

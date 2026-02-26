"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group Headings-H3"
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--color-Primary-500)",
          color: "white",
          border: "none",
        },
        className: "Headings-H3",
      }}
      {...props}
    />
  );
};

export { Toaster };

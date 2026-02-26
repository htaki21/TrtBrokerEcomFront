import React from "react";

export default function AssuranceAutoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="overflow-x-hidden">{children}</main>
    </>
  );
}

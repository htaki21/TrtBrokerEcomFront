"use client";

import { usePathname } from "next/navigation";
import FormHeader from "./form-header";
import FormFooter from "./form-footer";
import Footer from "../components/footer/footer";
import PopupEnregistrer from "../components/popup/PopupEnregistrer";
import { Suspense } from "react";

export default function MultiStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/success" && <FormHeader />}
      <PopupEnregistrer />

      <Suspense fallback={<div>Loading form...</div>}>{children}</Suspense>

      <FormFooter />
      <Footer />
    </>
  );
}

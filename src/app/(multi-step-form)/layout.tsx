"use client";

import FormHeader from "./form-header";
import FormFooter from "./form-footer";
import Footer from "../components/footer/footer";

export default function MultiStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormHeader />
      {children}
      <FormFooter />
      <Footer />
    </>
  );
}

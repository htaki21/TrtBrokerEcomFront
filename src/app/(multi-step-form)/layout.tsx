"use client";

import FormHeader from "./form-header";
import FormFooter from "./form-footer";
import Footer from "../components/footer/footer";
import PopupEnregistrer from "../components/popup/PopupEnregistrer";
import { DraftProvider } from "./DraftContext";

export default function MultiStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DraftProvider>
      <FormHeader />
      <PopupEnregistrer />
      {children}
      <FormFooter />
      <Footer />
    </DraftProvider>
  );
}

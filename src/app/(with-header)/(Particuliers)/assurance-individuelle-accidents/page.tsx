import InsuranceHero from "@/app/main-sections/InsuranceHero";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";

export default function IndividuelleAccidentsPage() {
  const heroData = {
    bgOverlayUrl: "/Individuelle-Accidents-bg-overlay.webp",
    bgDesktopUrl: "/Individuelle-Accidents-bg.webp",
    bgMobileUrl: "/Individuelle-Accidents-bg-mobile.webp",
    tag: "Individuelle Accidents",
    title: "Une couverture qui suit votre quotidien",
    mobileTitle: "Une couverture qui suit votre quotidien",
    description:
      "Une chute, un accident de sport ou un souci sur la route ? Soyez couvert dès maintenant avec une assurance qui prend soin de vous.",
    features: [
      "Couverture instantanée, sans délai.",
      "Couverture pour hospitalisation, invalidité ou décès.",
    ],
    price: "10 DH",
    priceUnit: "HT / jour",
    ctaLabel: "Obtenir mon devis",
    ctaLink: "/devis-assurance-individuelle-accidents",
  };

  return (
    <>
      <InsuranceHero {...heroData} />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </>
  );
}

import HeroType1 from "@/app/main-sections/HeroType1";

export default function Section1() {
  return (
    <HeroType1
      className1="bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]"
      className2="bg-[url('/Assurance-moto-bg.webp')] max-mobile:bg-[url('/Assurance-Moto-bg-mobile.webp')]"
      badgeText="Assurance Moto"
      title={
        <>
          Roulez libre.
          <br />
          On vous couvre.
        </>
      }
      description="Souscrivez en ligne en 3 minutes. Gestion 100 % digitale, assistance 24/7, et aucun papier à remplir."
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-moto"
    />
  );
}

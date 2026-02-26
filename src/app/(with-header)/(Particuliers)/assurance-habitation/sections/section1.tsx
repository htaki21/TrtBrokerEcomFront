import HeroType1 from "@/app/main-sections/HeroType1";

export default function Section1() {
  return (
    <HeroType1
      className1="bg-[linear-gradient(180deg,var(--color-Sage-Gray-Lowest)_0%,var(--color-Sage-Gray-Lower)_100%)]"
      className2="bg-[url('/Assurance-Habitation-bg.jpg')] max-mobile:bg-[url('/Assurance-Habitation-bg-mobile.jpg')]"
      badgeText="Assurance Habitation"
      title="Protégez votre logement, sans prise de tête"
      description="Multirisque habitation complète : vos biens, votre responsabilité civile, et votre sérénité à prix clair."
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-habitation"
    />
  );
}

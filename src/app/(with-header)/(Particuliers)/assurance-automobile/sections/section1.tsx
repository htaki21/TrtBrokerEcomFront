import HeroType1 from "@/app/main-sections/HeroType1";

export default function Section1() {
  return (
    <HeroType1
      badgeText="Assurance Auto"
      title="Assurez votre voiture en ligne, en toute confiance. "
      description="Souscrivez en ligne en 3 minutes. Gestion 100 % digitale, assistance 24/7, et aucun papier à remplir."
      descriptionClassName="max-mobile:hidden"
      buttonLabel="Obtenir mon devis"
      buttonHref="/devis-assurance-auto"
    />
  );
}

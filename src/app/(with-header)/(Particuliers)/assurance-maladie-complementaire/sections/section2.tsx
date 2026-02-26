import BenefitsSection from "@/app/main-sections/BenefitsSection";


const benefits = [
    {
        title: "Formules personnalisables",
        description: "Adaptez votre contrat à vos besoins réels.",
    },
    {
        title: "Remboursements élevés",
        description: "Bénéficiez de remboursements importants sur vos frais de santé.",
    },
    {
        title: "Traitement rapide",
        description: "Vos demandes traitées sans perte de temps. ",
    },
];

export default function Section2() {
    return (
        <BenefitsSection
            badgeText="Avantages de l’assurance santé"
            heading="Des garanties taillées sur-mesure pour votre bien-être"
            benefits={benefits}
        />
    )
}
import BenefitsSection from "@/app/main-sections/BenefitsSection";


const benefits = [
    {
        title: "Souscription rapide 100% en ligne",
    },
    {
        title: "Suivi des garanties via votre espace client",
    },
    {
        title: "Assistance dédiée et réactive",
    },
    {
        title: "Couverture immédiate dès validation"
    }
];

export default function Section4() {
    return (
        <BenefitsSection
            badgeText="Avantages exclusifs"
            heading="Bien plus qu’une assurance, un vrai filet de sécurité"
            headingMaxWidth="max-w-[560px]"
            benefits={benefits}
        />
    )
}
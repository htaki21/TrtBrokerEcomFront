import CoveredSection from "@/app/components/mini-sections/ImageTextSection";

export default function Section4() {
    return (
            <CoveredSection
                h2="Voyagez en voiture en toute légalité à l’étranger"
                p="Cette attestation d’assurance responsabilité civile est obligatoire pour traverser certaines frontières. Elle protège votre véhicule, vos passagers et vous-même, en conformité avec les exigences internationales. "
                h2className="text-Secondary-Violet-High"
                pclassName="text-Secondary-Violet-Lower"
                gradientEndColor="var(--color-Secondary-Violet-Lowest)"
                buttonLabel="Demander ma carte verte"
                buttonColor="violetHigh"
                imageSrc="/voyage-voiture-legal-etranger.jpg"
                imageAlt=""
            />
    )
}
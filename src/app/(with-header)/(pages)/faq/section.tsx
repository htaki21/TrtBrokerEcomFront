import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SVGProps } from "react";

export function Xicon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99984 3.54102C10.345 3.54102 10.6248 3.82084 10.6248 4.16602V9.37435H15.8332C16.1783 9.37435 16.4582 9.65417 16.4582 9.99935C16.4582 10.3445 16.1783 10.6243 15.8332 10.6243H10.6248V15.8327C10.6248 16.1779 10.345 16.4577 9.99984 16.4577C9.65466 16.4577 9.37484 16.1779 9.37484 15.8327V10.6243H4.1665C3.82133 10.6243 3.5415 10.3445 3.5415 9.99935C3.5415 9.65417 3.82133 9.37435 4.1665 9.37435H9.37484V4.16602C9.37484 3.82084 9.65466 3.54102 9.99984 3.54102Z"
        fill="currentColor"
      />
    </svg>
  );
}

type CategoryKey =
  | "auto"
  | "moto"
  | "habitation"
  | "sante"
  | "epargne"
  | "voyage"
  | "plaisance"
  | "service"
  | "tous";

function FaqAccordion({
  data,
  category,
}: {
  data: { text: string; answer: string }[];
  category: CategoryKey; // ✅ strong typing
}) {
  return (
    <>
      {data.map((item, idx) => (
        <AccordionItem
          key={idx}
          value={`${category}-${idx}`}
          className="bg-Sage-Gray-Lowest rounded-[12px]"
        >
          <AccordionTrigger className="cursor-pointer">
            <div className="flex items-center w-full justify-between py-5 px-6 max-mobile:py-3 max-mobile:px-4">
              <div className="flex items-center gap-3">
                <span className="dark-ellipse"></span>
                <h6 className="text-Neutral-Dark Headings-H7 text-balance">
                  {item.text}
                </h6>
              </div>
              <span className="x-icon flex py-0.5 px-1.5 rounded-full duration-200 ease-in text-Neutral-Dark bg-Sage-Gray-Low">
                <Xicon className="duration-200 ease-in" />
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex w-full px-6 max-mobile:px-4">
              <p className="text-Neutral-Dark Text-M">{item.answer}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}

export default function FaqSection() {
  const categories: { key: CategoryKey; label: string }[] = [
    { key: "tous", label: "Tous" },
    { key: "auto", label: "Auto" },
    { key: "moto", label: "Moto" },
    { key: "habitation", label: "Habitation" },
    { key: "sante", label: "Santé" },
    { key: "epargne", label: "Épargne" },
    { key: "voyage", label: "Voyage" },
    { key: "plaisance", label: "Plaisance & Jet-Ski" },
    { key: "service", label: "Service Client" },
  ];

  const baseFaqData = {
    auto: [
      {
        text: "L'assurance auto est-elle obligatoire au Maroc ?",
        answer:
          "Oui, la loi impose à tout conducteur de souscrire au minimum une assurance responsabilité civile.",
      },
      {
        text: "Quelle est la différence entre assurance au tiers et tous risques ?",
        answer:
          "Au tiers, seule la responsabilité civile est couverte. Tous risques couvre aussi vos propres dommages.",
      },
      {
        text: "Comment réduire le prix de mon assurance auto ?",
        answer:
          "Comparez les devis, évitez les sinistres, et privilégiez les options adaptées à votre usage.",
      },
      {
        text: "Le bonus-malus existe-t-il au Maroc ?",
        answer:
          "Oui, il impacte directement le montant de votre prime d'assurance auto.",
      },
      {
        text: "Puis-je payer mon assurance auto en plusieurs fois ?",
        answer:
          "Oui, certains assureurs proposent des facilités de paiement mensuel ou trimestriel.",
      },
      {
        text: "Quels documents sont nécessaires pour souscrire une assurance auto ?",
        answer:
          "Carte grise, permis de conduire, relevé d'informations et pièce d'identité.",
      },
    ],
    moto: [
      {
        text: "L'assurance moto est-elle obligatoire ?",
        answer:
          "Oui, tout véhicule motorisé, y compris les motos et scooters, doit être assuré.",
      },
      {
        text: "Quelle formule choisir pour ma moto ?",
        answer:
          "Au tiers pour une moto ancienne, tous risques pour un véhicule neuf ou de grande valeur.",
      },
      {
        text: "Puis-je assurer un scooter comme une moto ?",
        answer:
          "Oui, mais le contrat est adapté spécifiquement au type de deux-roues.",
      },
      {
        text: "Les jeunes conducteurs paient-ils plus cher ?",
        answer:
          "Oui, car ils représentent un risque plus élevé selon les assureurs.",
      },
      {
        text: "Quels documents fournir pour assurer une moto ?",
        answer:
          "Permis de conduire adapté, carte grise de la moto et pièce d'identité.",
      },
      {
        text: "L'assurance moto couvre-t-elle les passagers ?",
        answer:
          "Oui, la responsabilité civile inclut généralement les dommages aux passagers.",
      },
    ],
    habitation: [
      {
        text: "L'assurance habitation est-elle obligatoire au Maroc ?",
        answer:
          "Non, mais elle est fortement recommandée, surtout pour les locataires et propriétaires.",
      },
      {
        text: "Qu'est-ce qu'une assurance multirisque habitation ?",
        answer:
          "C'est une formule qui couvre le logement, le mobilier et la responsabilité civile.",
      },
      {
        text: "Suis-je couvert contre les catastrophes naturelles ?",
        answer:
          "Oui, selon les clauses de votre contrat et les extensions choisies.",
      },
      {
        text: "Comment réduire ma prime d'assurance habitation ?",
        answer:
          "En installant des dispositifs de sécurité (alarme, serrures renforcées, etc.).",
      },
      {
        text: "L'assurance habitation couvre-t-elle le vol de bijoux ?",
        answer:
          "Oui, si la garantie vol est incluse, mais souvent avec un plafond d'indemnisation.",
      },
      {
        text: "Est-il obligatoire d'assurer une location meublée ?",
        answer:
          "Oui, les locataires sont obligés de souscrire au minimum une assurance responsabilité civile.",
      },
    ],
    sante: [
      {
        text: "Quelle est la différence entre assurance santé et mutuelle ?",
        answer:
          "La mutuelle complète la couverture de base de l'assurance santé.",
      },
      {
        text: "L'assurance santé couvre-t-elle tous les soins ?",
        answer:
          "Non, cela dépend des garanties choisies (hospitalisation, dentaire, optique, etc.).",
      },
      {
        text: "Puis-je assurer ma famille avec un seul contrat ?",
        answer: "Oui, les contrats familiaux couvrent conjoint(e) et enfants.",
      },
      {
        text: "Comment fonctionne le remboursement ?",
        answer:
          "Vous avancez les frais, puis l'assureur rembourse selon votre contrat.",
      },
      {
        text: "L'assurance santé couvre-t-elle les soins dentaires ?",
        answer:
          "Cela dépend du contrat : certains incluent les soins dentaires, d'autres non.",
      },
      {
        text: "Peut-on changer de contrat d'assurance santé en cours d'année ?",
        answer:
          "Oui, sous certaines conditions et en respectant les délais de résiliation.",
      },
    ],
    epargne: [
      {
        text: "À quoi sert une assurance individuelle accidents ?",
        answer:
          "Elle indemnise en cas d'accident corporel, même si vous êtes responsable.",
      },
      {
        text: "Quelle est la différence avec une assurance santé ?",
        answer:
          "L'assurance santé couvre les soins, l'individuelle accidents couvre les conséquences d'un accident (invalidité, décès).",
      },
      {
        text: "Est-ce obligatoire pour les étudiants ?",
        answer:
          "Elle est souvent demandée dans les écoles, universités ou clubs sportifs.",
      },
      {
        text: "L'assurance couvre-t-elle les accidents sportifs ?",
        answer: "Oui, si le sport pratiqué est inclus dans le contrat.",
      },
      {
        text: "Puis-je souscrire une assurance individuelle accidents pour mes enfants ?",
        answer:
          "Oui, de nombreux contrats incluent une couverture pour les enfants.",
      },
      {
        text: "L'assurance individuelle accidents couvre-t-elle les accidents domestiques ?",
        answer: "Oui, elle couvre aussi les accidents de la vie quotidienne.",
      },
    ],
    voyage: [
      {
        text: "L'assurance voyage est-elle obligatoire ?",
        answer:
          "Pas toujours, mais elle est exigée pour certains pays et fortement recommandée.",
      },
      {
        text: "Que couvre une assurance voyage ?",
        answer:
          "Annulation, soins médicaux à l'étranger, perte de bagages, assistance rapatriement.",
      },
      {
        text: "Quelle est la durée de validité ?",
        answer:
          "Elle dépend du contrat : par voyage, ou annuelle multi-voyages.",
      },
      {
        text: "Les cartes bancaires couvrent-elles déjà l'assurance voyage ?",
        answer:
          "Oui, mais les garanties sont souvent limitées par rapport à une vraie assurance voyage.",
      },
      {
        text: "Quels documents faut-il pour activer une assistance voyage ?",
        answer:
          "Un justificatif de voyage (billet, réservation) et votre contrat d'assurance suffisent.",
      },
      {
        text: "L'assurance voyage couvre-t-elle les pandémies comme le Covid-19 ?",
        answer:
          "Certains contrats incluent des garanties liées aux pandémies, vérifiez les conditions générales.",
      },
    ],
    plaisance: [
      {
        text: "L'assurance bateau est-elle obligatoire au Maroc ?",
        answer:
          "Oui, pour tout navire motorisé naviguant en mer ou sur un plan d'eau.",
      },
      {
        text: "Que couvre une assurance plaisance ?",
        answer:
          "Responsabilité civile, dommages au bateau, assistance et parfois le vol.",
      },
      {
        text: "L'assurance jet-ski est-elle différente de celle d'un bateau ?",
        answer: "Oui, les contrats sont spécifiques au type d'embarcation.",
      },
      {
        text: "Existe-t-il des assurances saisonnières pour la plaisance ?",
        answer:
          "Oui, certains assureurs proposent des contrats valables uniquement en période estivale.",
      },
      {
        text: "Quels documents fournir pour assurer un bateau ?",
        answer:
          "Carte de navigation, immatriculation du bateau et pièce d'identité du propriétaire.",
      },
      {
        text: "L'assurance jet-ski couvre-t-elle le remorquage ?",
        answer:
          "Oui, si la garantie assistance est incluse dans votre contrat.",
      },
    ],
    service: [
      {
        text: "Comment remplir correctement les formulaires en ligne sur le site ?",
        answer:
          "Indiquez vos informations personnelles exactes, choisissez la catégorie d'assurance souhaitée et joignez les documents demandés.",
      },
      {
        text: "Comment être sûr que ma demande en ligne a bien été envoyée ?",
        answer:
          "Vous recevez un e-mail de confirmation après avoir soumis un formulaire sur le site.",
      },
      {
        text: "Puis-je contacter un conseiller directement depuis le site ?",
        answer:
          "Oui, via le formulaire de contact ou le chat en ligne disponible sur le site.",
      },
      {
        text: "Quel est le délai de réponse du service client ?",
        answer:
          "En général, un conseiller vous répond sous 24 à 48 heures ouvrées.",
      },
    ],
  };

  const faqData: Record<CategoryKey, { text: string; answer: string }[]> = {
    ...baseFaqData,
    tous: Object.values(baseFaqData).flat(),
  };

  return (
    <section className="w-full">
      <Tabs defaultValue="tous" className="items-start w-full">
        {/* Tabs Header */}
        <TabsList className="h-auto overflow-x-auto hide-scrollbar rounded-none border-b bg-transparent w-full justify-start p-0">
          {categories.map(({ key, label }) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:after:bg-Neutral-Dark relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        <Accordion type="single" className="w-full" collapsible>
          {categories.map(({ key }) => (
            <TabsContent key={key} value={key}>
              <FaqAccordion data={faqData[key]} category={key} />
            </TabsContent>
          ))}
        </Accordion>
      </Tabs>
    </section>
  );
}

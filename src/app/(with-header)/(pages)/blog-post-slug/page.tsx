import Image from "next/image";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

import FacebookIcon from "@/app/components/social-icons/FacebookIcon";
import InstagramIcon from "@/app/components/social-icons/InstagramIcon";
import TwitterIcon from "@/app/components/social-icons/TwitterIcon";
import LinkedInIcon from "@/app/components/social-icons/LinkedInIcon";

export default function PostStructurePage() {
  const socialIcons = [
    { id: "facebook", Icon: FacebookIcon },
    { id: "instagram", Icon: InstagramIcon },
    { id: "twitter", Icon: TwitterIcon },
    { id: "linkedin", Icon: LinkedInIcon },
  ];

  return (
    <Wrapper1180
      as="section"
      className="pt-[132px] max-laptop:px-4 max-mobile:gap-9 gap-[120px] max-mobile:py-16 max-mobile:px-2"
    >
      {/* Header section */}
      <div className="flex gap-6 max-tablet:flex-col-reverse">
        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <ul className="flex items-center gap-2">
              <li className="button2-s text-Sage-Gray-Higher">
                Actualités et conseils
              </li>
              <span className="gray-ellipse" />
              <li className="button2-s text-Sage-Gray-Higher">Santé</li>
            </ul>

            <h2 className="Headings-H2 text-Neutral-Dark text-balance">
              Assurance santé : comment choisir la meilleure couverture pour
              votre famille ?
            </h2>

            <p className="Text-M text-Text-Body max-w-[490px]">
              Nous travaillons avec les plus grandes compagnies d’assurance au
              Maroc pour vous garantir fiabilité, économie et tranquillité
              d’esprit.
            </p>
          </div>

          <span className="button2-s text-Sage-Gray-Higher">24 Août 2025</span>
        </div>

        <Image
          src="/Épargne-Préparation.png"
          alt="Couverture assurance santé famille"
          width={578}
          height={493}
          className="flex-1 rounded-[20px] shadow"
          priority
        />
      </div>

      {/* Content + Sidebar */}
      <div className="flex justify-between gap-9 max-tablet:flex-col">
        {/* Main article */}
        <ul className="f-col w-full max-w-[680px] max-tablet:max-w-full gap-8">
          <li>
            <p className="Text-M text-Text-Body-2">
              Choisir une assurance santé adaptée n’est pas toujours simple.
              Entre les garanties de base, les options, les tarifs et les
              besoins spécifiques de votre famille, il est facile de s’y perdre.
              <br />
              Dans cet article, nous allons vous guider étape par étape pour
              comprendre comment sélectionner une couverture optimale, tout en
              maîtrisant votre budget.
            </p>
          </li>

          {/* Section 1 */}
          <li className="f-col gap-4">
            <h4 className="Headings-H4 text-Neutral-Dark">
              1. Comprendre les besoins réels de votre famille
            </h4>
            <p className="Text-M text-Text-Body-2">
              Chaque foyer a des besoins différents. Avant même de comparer les
              offres, prenez le temps de répondre à ces questions :
            </p>
            <ul className="Text-M text-Text-Body-2 list-disc space-y-2 pl-5">
              <li>
                Avez-vous des enfants en bas âge nécessitant des visites
                médicales fréquentes ?
              </li>
              <li>
                Vos parents ou vous-même avez-vous besoin de soins spécialisés ?
              </li>
              <li>
                Pratiquez-vous un sport nécessitant une couverture renforcée
                contre les accidents ?
              </li>
            </ul>
            <p className="Text-M bg-Primary-300 text-Primary-800 rounded-[8px] py-2 px-3">
              <span className="font-bold">Astuce :</span> Notez les dépenses
              médicales des 12 derniers mois. Cela vous donnera une vision
              claire de vos besoins réels.
            </p>
          </li>

          {/* Section 2 */}
          <li className="f-col gap-4">
            <h4 className="Headings-H4 text-Neutral-Dark">
              2. Les garanties de base indispensables
            </h4>
            <p className="Text-M text-Text-Body-2">
              Une bonne assurance santé doit au minimum couvrir :
            </p>
            <ul className="Text-M text-Text-Body-2 list-disc space-y-2 pl-5">
              <li>
                Les consultations médicales (généralistes et spécialistes)
              </li>
              <li>Les médicaments prescrits</li>
              <li>Les frais d’hospitalisation</li>
              <li>Les urgences médicales</li>
            </ul>
            <p className="Text-M bg-Secondary-Red-Lowest text-Secondary-Red-Higher rounded-[8px] py-2 px-3">
              <span className="font-bold">Attention :</span> certaines formules
              d’entrée de gamme peuvent sembler attractives, mais elles excluent
              parfois les hospitalisations longues ou les soins coûteux.
            </p>
          </li>

          {/* Section 3 */}
          <li className="f-col gap-4">
            <h4 className="Headings-H4 text-Neutral-Dark">
              3. Les options à considérer pour plus de sérénité
            </h4>
            <p className="Text-M text-Text-Body-2">
              Si votre budget le permet, certaines options peuvent faire la
              différence :
            </p>
            <ul className="Text-M text-Text-Body-2 list-disc space-y-2 pl-5">
              <li>
                Soins dentaires (souvent mal remboursés par les formules
                basiques)
              </li>
              <li>Optique : lunettes, lentilles et chirurgies correctrices</li>
              <li>
                Assistance voyage : couverture en cas d’urgence médicale à
                l’étranger
              </li>
              <li>Maternité : suivi de grossesse et accouchement</li>
            </ul>
            <p className="Text-M bg-Neutral-BG-1 text-Text-Body-2-2 rounded-[8px] py-2 px-3">
              <span className="font-bold">À retenir :</span> ces options peuvent
              augmenter votre prime, mais elles évitent des dépenses lourdes en
              cas de besoin.
            </p>
          </li>

          {/* Section 4 */}
          <li className="f-col gap-4">
            <h4 className="Headings-H4 text-Neutral-Dark">
              4. Comparer et négocier les offres
            </h4>
            <p className="Text-M text-Text-Body-2">
              Une fois vos besoins identifiés, comparez plusieurs devis :
            </p>
            <ul className="Text-M text-Text-Body-2 list-disc space-y-2 pl-5">
              <li>Analysez les remboursements par type de soin</li>
              <li>Comparez les niveaux de franchise et de reste à charge</li>
              <li>
                N’hésitez pas à négocier avec votre conseiller ou courtier
              </li>
            </ul>
            <p className="Text-M bg-Neutral-BG-1 text-Text-Body-2-2 rounded-[8px] py-2 px-3">
              <span className="font-bold">Exemple :</span> Deux formules au même
              prix peuvent offrir des niveaux de couverture très différents pour
              l’optique ou la maternité.
            </p>
          </li>
          {/* Section 5 */}
          <li className="f-col gap-4">
            <h4 className="Headings-H4 text-Neutral-Dark">
              5. L’importance du service client
            </h4>
            <p className="Text-M text-Text-Body-2">
              Ne négligez pas l’expérience utilisateur :
            </p>
            <ul className="Text-M text-Text-Body-2 list-disc space-y-2 pl-5">
              <li>Analysez les remboursements par type de soin</li>
              <li>Comparez les niveaux de franchise et de reste à charge</li>
              <li>
                N’hésitez pas à négocier avec votre conseiller ou courtier
              </li>
            </ul>
            <p className="Text-M text-Text-Body-2-2 rounded-[8px]">
              <span className="font-bold">Conseil pratique :</span>
              consultez les avis clients avant de souscrire. Une assurance
              réactive peut faire toute la différence en cas d’urgence médicale.
            </p>
          </li>

          <p className="text-base text-Primary-800 font-semibold pl-4 border-l-1 border-Primary-800">
            “Une bonne assurance santé ne se limite pas au prix, mais à la
            tranquillité d’esprit qu’elle vous apporte.”
          </p>
        </ul>

        {/* Sidebar */}
        <aside className="f-col w-full max-w-[280px] gap-4">
          <h6 className="Headings-H6 text-Neutral-Dark">Partager l’article</h6>
          <ul className="flex items-center gap-1">
            {socialIcons.map(({ id, Icon }) => (
              <li key={id} className="bg-Sage-Gray-Low flex rounded-[12px] p-3">
                <Icon />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Wrapper1180>
  );
}

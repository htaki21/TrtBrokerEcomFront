import ButtonLink from "@/app/components/buttons/ButtonLink";
import { AddIcon } from "@/app/components/icons/Add";
import { CheckcircleIcon } from "@/app/components/icons/Check-circle";
import { FingerPrintIcon } from "@/app/components/icons/finger-print";
import { FireIcon } from "@/app/components/icons/Fire";
import { ScaleIcon } from "@/app/components/icons/Scale";
import { ShieldIcon } from "@/app/components/icons/Shield";
import { TeamIcon } from "@/app/components/icons/Team";
import { WarningIcon } from "@/app/components/icons/Warning";
import SectionHeader from "@/app/components/mini-sections/sec-header";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";

export default function Section3() {
  return (
    <section className="bg-(image:--my-gradient) px-4 bg-no-repeat bg-bottom">
      <Wrapper1180 className="max-mobile:py-16 max-mobile:gap-12 max-tablet:max-w-[460px] items-center py-[132px]">
        <div className="f-col items-center gap-6">
          <SectionHeader
            badgeText="Ce que couvre votre contrat"
            heading="Une protection sur-mesure pour vos sorties en mer."
            headingClassName="max-w-[574px] w-full"
          />
          <ButtonLink
            href="/devis-assurance-plaisance-jet-ski"
            label="Obtenir mon devis"
            color="black"
            iconClassName="w-6 h-6"
            className="max-tablet:py-3 max-tablet:px-6"
          />
        </div>
        <div className="f-col gap-4 w-full rounded-3xl bg-white max-tablet:bg-transparent">
          <div className="grid grid-cols-3 max-tablet:shadow-xl max-tablet:flex max-tablet:flex-col  gap-5 max-tablet:py-6 max-tablet:px-5 py-9 px-8 rounded-3xl bg-white">
            <div className="f-col max-tablet:order-2 gap-3 flex-1">
              <div className="flex-center flex-1 py-9 px-5 rounded-2xl bg-Sage-Gray-Lowest">
                <ShieldIcon
                  fill="currentColor"
                  className="text-Brand-600 w-10 h-10"
                />
              </div>
              <div className="f-col gap-1">
                <h3 className="text-Neutral-Dark Button-M">
                  Responsabilité Civile
                </h3>
                <p className="text-Text-Body Text-S">
                  Protège contre les conséquences financières liées aux dommages
                  causés à des tiers par votre bateau (matériels et/ou
                  corporels).
                </p>
              </div>
            </div>
            <div className="f-col max-tablet:order-1 max-tablet:p-0 max-tablet:bg-transparent max-tablet:items-start justify-center items-center gap-4 flex-1 py-20 px-10 rounded-2xl bg-Sage-Gray-Lowest">
              <CheckcircleIcon className="w-10 h-10 text-Primary-500" />
              <div className="f-col gap-3 text-center max-tablet:text-left">
                <h3 className="text-Neutral-Dark text-[28px]/snug font-medium">
                  Nos garanties incluses
                </h3>
                <p className="text-Text-Body Text-S">
                  Chaque assurance bateau débute par des garanties de base
                  solides. Voici la couverture minimale incluse dans votre
                  contrat pour assurer votre sécurité.
                </p>
              </div>
            </div>
            <div className="f-col max-tablet:order-3 gap-3 flex-1">
              <div className="flex-center flex-1 py-9 px-5 rounded-2xl bg-Sage-Gray-Lowest">
                <ScaleIcon
                  fill="currentColor"
                  className="text-Brand-600 w-10 h-10"
                />
              </div>
              <div className="f-col gap-1">
                <h3 className="text-Neutral-Dark Button-M">
                  Responsabilité Civile
                </h3>
                <p className="text-Text-Body Text-S">
                  Protège contre les conséquences financières liées aux dommages
                  causés à des tiers par votre bateau (matériels et/ou
                  corporels).
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 max-tablet:shadow-xl max-tablet:flex max-tablet:flex-col max-tablet:py-6 max-tablet:px-5 gap-5 py-9 px-8 rounded-3xl bg-white">
            <div className="f-col max-tablet:order-2 gap-3 max-tablet:gap-5">
              <div className="f-col gap-3 flex-1">
                <div className="flex-center flex-1 py-11 px-5 rounded-2xl bg-Secondary-Blue-Lowest">
                  <WarningIcon
                    fill="currentColor"
                    className="text-Secondary-Blue-Medium w-10 h-10"
                  />
                </div>
                <div className="f-col gap-1">
                  <h3 className="text-Secondary-Blue-High Button-M">
                    Perte Totale et Délaissement
                  </h3>
                  <p className="text-Secondary-Blue-Lower Text-S">
                    Couvre la destruction totale du bateau ou son abandon en mer
                    après sinistre grave.
                  </p>
                </div>
              </div>
              <div className="f-col gap-3 flex-1">
                <div className="flex-center flex-1 py-11 px-5 rounded-2xl bg-Secondary-Blue-Lowest">
                  <FireIcon
                    fill="currentColor"
                    className="text-Secondary-Blue-Medium w-10 h-10"
                  />
                </div>
                <div className="f-col gap-1">
                  <h3 className="text-Secondary-Blue-High Button-M">
                    Tous Risques
                  </h3>
                  <p className="text-Secondary-Blue-Lower Text-S">
                    Une couverture étendue incluant les sinistres accidentels
                    non prévus par la garantie de base.
                  </p>
                </div>
              </div>
            </div>
            <div className="f-col max-tablet:order-1 max-tablet:p-0 max-tablet:bg-transparent max-tablet:items-start justify-center items-center gap-4 flex-1 py-20 px-10 rounded-2xl bg-Secondary-Blue-Lowest">
              <AddIcon
                fill="currentColor"
                className="text-Secondary-Blue-Medium w-10 h-10"
              />
              <div className="f-col gap-3 text-center max-tablet:text-left">
                <h3 className="text-Neutral-Dark text-[28px]/snug font-medium">
                  Nos garanties en option
                </h3>
                <p className="text-Text-Body Text-S">
                  Renforcez votre couverture avec nos options. Complétez votre
                  assurance bateau pour une protection accrue contre le vol et
                  les dommages en mer.
                </p>
              </div>
            </div>
            <div className="f-col max-tablet:order-3 gap-3 max-tablet:gap-5">
              <div className="f-col gap-3 flex-1">
                <div className="flex-center flex-1 py-11 px-5 rounded-2xl bg-Secondary-Blue-Lowest">
                  <FingerPrintIcon className="w-10 h-10" />
                </div>
                <div className="f-col gap-1">
                  <h3 className="text-Secondary-Blue-High Button-M">
                    Vol Total
                  </h3>
                  <p className="text-Secondary-Blue-Lower Text-S">
                    Indemnisation si votre embarcation est volée, à quai ou en
                    mouillage.
                  </p>
                </div>
              </div>
              <div className="f-col gap-3 flex-1">
                <div className="flex-center flex-1 py-11 px-5 rounded-2xl bg-Secondary-Blue-Lowest">
                  <TeamIcon className="w-10 h-10" />
                </div>
                <div className="f-col gap-1">
                  <h3 className="text-Secondary-Blue-High Button-M">
                    Individuelle Personnes Transportées
                  </h3>
                  <p className="text-Secondary-Blue-Lower Text-S">
                    Protège les passagers à bord avec une indemnisation en cas
                    de blessure ou décès..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
}

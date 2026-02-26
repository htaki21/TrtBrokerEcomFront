import ButtonLink from "@/app/components/buttons/ButtonLink";

export default function ConditionsGeneralesVentePage() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-[url('/overlay.png'),linear-gradient(180deg,white_0%,var(--color-Sage-Gray-Lower)_100%)] bg-contain bg-top bg-no-repeat">
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-Primary-500 to-Primary-600 shadow-2xl mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-Neutral-Dark mb-6 tracking-tight">
              Conditions Générales de Vente
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-Primary-500 to-Primary-600 mx-auto mb-8"></div>
            <p className="text-xl text-Sage-Gray-Higher max-w-3xl mx-auto leading-relaxed">
              Conditions de vente et de souscription des services
              d&apos;assurance proposés par TRT Broker
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-Primary-500 to-Primary-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                Conditions Commerciales et Contractuelles
              </h2>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Avertissement */}
              <section className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Avertissement
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Vous venez de vous connecter sur le site www.trtbroker.ma de
                    la société TRT Broker.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Nous vous invitons à lire attentivement les dispositions
                    suivantes qui constituent les conditions générales
                    applicables aux services proposés par TRT Broker via son
                    site Internet.
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-red-200">
                    <p className="text-Sage-Gray-Higher leading-relaxed font-semibold">
                      La validation d&apos;un formulaire en ligne vaut
                      acceptation des présentes conditions générales. En
                      conséquence, vous ne pouvez solliciter un devis ou une
                      offre de services que si vous acceptez l&apos;ensemble des
                      conditions ci-dessous.
                    </p>
                  </div>
                </div>
              </section>

              {/* Préambule */}
              <section className="bg-gradient-to-r from-Sage-Gray-Lowest to-white p-8 rounded-2xl border border-Sage-Gray-Low">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Préambule
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les présentes conditions générales de vente régissent toutes
                    les demandes effectuées sur le site web de TRT Broker.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Toute demande transmise par formulaire en ligne suppose
                    l&apos;acceptation pleine et entière des présentes CGV par
                    le client.
                  </p>
                </div>
              </section>

              {/* Objet */}
              <section className="bg-gradient-to-r from-Sage-Gray-Lowest to-white p-8 rounded-2xl border border-Sage-Gray-Low">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Objet
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le présent contrat à distance a pour objet de définir les
                    droits et obligations des parties dans le cadre de la
                    prestation de services de courtage en assurances proposée
                    par TRT Broker.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    En tant que courtier en assurances, TRT Broker agit en
                    qualité d&apos;intermédiaire entre le client et les
                    compagnies d&apos;assurance et d&apos;assistance
                    partenaires.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    TRT Broker ne porte pas le risque des contrats
                    d&apos;assurance et n&apos;est pas partie à ces contrats,
                    lesquels sont conclus exclusivement entre le client et la
                    compagnie d&apos;assurance ou d&apos;assistance concernée.
                  </p>
                </div>
              </section>

              {/* Processus de demande */}
              <section className="bg-white p-8 rounded-2xl border border-Sage-Gray-Low shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Processus de demande
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le site trtbroker.ma ne constitue pas une boutique en ligne.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le client peut :
                  </p>
                  <ul className="pl-4 space-y-2 text-Sage-Gray-Higher">
                    <li>
                      • remplir un formulaire de demande de devis ou
                      d&apos;information,
                    </li>
                    <li>
                      • être recontacté par un conseiller commercial de TRT
                      Broker afin de finaliser la proposition,
                    </li>
                    <li>
                      • recevoir ensuite une offre personnalisée adaptée à ses
                      besoins.
                    </li>
                  </ul>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    La demande transmise en ligne n&apos;a pas valeur de
                    contrat, mais d&apos;expression d&apos;intérêt.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le contrat d&apos;assurance est conclu uniquement après
                    validation et signature d&apos;un document contractuel avec
                    la compagnie d&apos;assurance partenaire.
                  </p>
                </div>
              </section>

              {/* Prix */}
              <section className="bg-white p-8 rounded-2xl border border-Sage-Gray-Low shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">Prix</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les prix et conditions tarifaires des assurances proposées
                    sont communiqués par le conseiller commercial de TRT Broker,
                    après réception et analyse du formulaire rempli en ligne.
                  </p>
                </div>
              </section>

              {/* Livraison des documents */}
              <section className="bg-gradient-to-r from-Sage-Gray-Lowest to-white p-8 rounded-2xl border border-Sage-Gray-Low">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Livraison des documents
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Après validation et souscription définitive du contrat
                    auprès de la compagnie d&apos;assurance partenaire, les
                    documents contractuels sont transmis au client :
                  </p>
                  <ul className="pl-4 space-y-2 text-Sage-Gray-Higher">
                    <li>• par voie électronique (e-mail), ou</li>
                    <li>
                      • par tout autre moyen convenu avec le conseiller
                      commercial.
                    </li>
                  </ul>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le délai et le mode d&apos;envoi sont définis au moment de
                    la conclusion du contrat d&apos;assurance.
                  </p>
                </div>
              </section>

              {/* Confidentialité des données */}
              <section className="bg-gradient-to-r from-Sage-Gray-Lowest to-white p-8 rounded-2xl border border-Sage-Gray-Low">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Confidentialité des données
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les informations personnelles collectées via les formulaires
                    en ligne sont nécessaires au traitement des demandes et sont
                    traitées de manière confidentielle.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Conformément à la loi n°09-08, le client dispose d&apos;un
                    droit d&apos;accès, de rectification et d&apos;opposition à
                    ses données personnelles.
                  </p>
                </div>
              </section>

              {/* Force majeure */}
              <section className="bg-white p-8 rounded-2xl border border-Sage-Gray-Low shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-Primary-500 to-Primary-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Force majeure
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    TRT Broker n&apos;est tenu d&apos;exécuter ses obligations
                    que dans la mesure où aucun événement de force majeure ne
                    vient les entraver.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-Primary-500 to-Primary-600 p-8 rounded-2xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Questions sur les CGV</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <p className="text-white/90">contact@trtbroker.com</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Téléphone</h4>
                    <p className="text-white/90">05222-70343</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Adresse</h4>
                    <p className="text-white/90">
                      N°33 IMM SEMIRAMI, ANGLE RUES FAKER MOHAMED ET KAMAL
                      MOHAMED
                      <br />
                      Casablanca 23000
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center py-8 border-t border-Sage-Gray-Low">
                <p className="text-Sage-Gray-Higher mb-4">
                  Dernière mise à jour :{" "}
                  {new Date().toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                  <ButtonLink
                    href="/"
                    label="Retour à l'accueil"
                    size="large"
                    iconClassName="w-5 h-5"
                    color="white"
                    ghost
                    reverse
                    direction="left"
                  />
                  <ButtonLink
                    href="/contact"
                    label="Nous contacter"
                    size="large"
                    iconClassName="w-5 h-5"
                    color="brand"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

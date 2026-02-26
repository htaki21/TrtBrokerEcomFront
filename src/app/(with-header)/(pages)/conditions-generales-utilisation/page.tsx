import ButtonLink from "@/app/components/buttons/ButtonLink";

export default function ConditionsGeneralesUtilisationPage() {
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-Neutral-Dark mb-6 tracking-tight">
              Conditions Générales d&apos;Utilisation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-Primary-500 to-Primary-600 mx-auto mb-8"></div>
            <p className="text-xl text-Sage-Gray-Higher max-w-3xl mx-auto leading-relaxed">
              Conditions d&apos;utilisation des services TRT Broker et règles
              d&apos;accès à notre plateforme d&apos;assurance
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-Primary-500 to-Primary-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                Conditions d&apos;Accès et d&apos;Utilisation
              </h2>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Protection des données personnelles */}
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
                    Protection des données personnelles
                  </h3>
                </div>
                <div className="space-y-6">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Conformément à la loi n°09-08, vous disposez d&apos;un droit
                    d&apos;accès, de rectification et d&apos;opposition au
                    traitement de vos données personnelles.
                  </p>
                  <div className="p-6 bg-white rounded-xl border border-Sage-Gray-Low">
                    <p className="font-semibold text-Sage-Gray-Higher mb-4">
                      Les informations personnelles que vous renseignez sur le
                      site trtbroker.ma sont utilisées uniquement pour :
                    </p>
                    <ul className="space-y-2 text-Sage-Gray-Higher">
                      <li>• Traiter vos demandes en ligne.</li>
                      <li>
                        • Vous informer sur les services et produits commandés.
                      </li>
                    </ul>
                  </div>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les données personnelles de chaque utilisateur sont
                    conservées dans des conditions de sécurité et de
                    confidentialité optimales.
                  </p>
                </div>
              </section>

              {/* Utilisation des cookies */}
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
                    Utilisation des cookies
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les données personnelles peuvent être collectées par
                    l&apos;utilisation de cookies.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    L&apos;utilisateur a la possibilité de refuser expressément
                    l&apos;utilisation des cookies en quittant le site.
                  </p>
                </div>
              </section>

              {/* Droits des utilisateurs */}
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Droits des utilisateurs
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Vous disposez d&apos;un droit :
                  </p>
                  <ul className="pl-4 space-y-2 text-Sage-Gray-Higher">
                    <li>• d&apos;accès à vos données,</li>
                    <li>• de modification et de rectification,</li>
                    <li>• de suppression de vos données personnelles.</li>
                  </ul>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Ces droits peuvent être exercés en envoyant une demande via
                    le formulaire de contact disponible sur :
                    trtbroker.ma/contact.
                  </p>
                </div>
              </section>

              {/* Responsabilités et restrictions */}
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Responsabilités et restrictions
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    TRT Broker se réserve le droit de :
                  </p>
                  <ul className="pl-4 space-y-2 text-Sage-Gray-Higher">
                    <li>
                      • Supprimer tout contenu illégal, contraire à
                      l&apos;éthique ou aux bonnes pratiques publié sur le site.
                    </li>
                    <li>
                      • Restreindre ou interdire l&apos;accès au site aux
                      utilisateurs ayant enfreint les présentes conditions
                      générales d&apos;utilisation.
                    </li>
                  </ul>
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
                  <h3 className="text-2xl font-bold">Questions sur les CGU</h3>
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

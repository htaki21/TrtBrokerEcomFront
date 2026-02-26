import ButtonLink from "@/app/components/buttons/ButtonLink";

export default function MentionsLegalesPage() {
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
                  d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 13H8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17H8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 9H8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-Neutral-Dark mb-6 tracking-tight">
              Mentions Légales
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-Primary-500 to-Primary-600 mx-auto mb-8"></div>
            <p className="text-xl text-Sage-Gray-Higher max-w-3xl mx-auto leading-relaxed">
              Informations légales et réglementaires concernant TRT Broker et
              l&apos;utilisation de nos services d&apos;assurance professionnels
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-Primary-500 to-Primary-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                Informations Générales
              </h2>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Informations légales */}
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Informations légales
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-xl border border-Sage-Gray-Low">
                    <p className="text-Sage-Gray-Higher leading-relaxed mb-4">
                      Le présent site est la propriété de la société{" "}
                      <strong>TRT Broker</strong>, Société à Responsabilité
                      Limitée, au capital de <strong>250 000 MAD</strong>,
                      inscrite au registre du commerce et des sociétés du
                      Tribunal de Casablanca, sous le numéro{" "}
                      <strong>249605 (ICE 000167635000069)</strong>, dont le
                      siège social est situé à rue Mohamed Kamal -ex Pilote
                      Vidal , ang. rue Faker Mohamed, imm. Sémiramis n° 33 20000
                      Casablanca - Maroc.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-Primary-50 rounded-lg">
                        <p className="font-semibold text-Sage-Gray-Higher mb-2">
                          Directeur de publication
                        </p>
                        <p className="text-Neutral-Dark font-medium">
                          TRT Broker
                        </p>
                      </div>
                      <div className="p-4 bg-Primary-50 rounded-lg">
                        <p className="font-semibold text-Sage-Gray-Higher mb-2">
                          Contact directeur de publication
                        </p>
                        <p className="text-Neutral-Dark font-medium">
                          Formulaire de contact disponible sur le site
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hébergement */}
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
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-Neutral-Dark">
                    Hébergement
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Le site est hébergé par :Hostinger, dont le siège social est
                    situé à : Vilnius, Lituanie.
                  </p>
                </div>
              </section>

              {/* Propriété intellectuelle */}
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
                    Propriété intellectuelle
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    L&apos;accès au site trtbroker.ma confère à
                    l&apos;utilisateur un droit d&apos;usage personnel et non
                    exclusif de ce site.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Toute reproduction totale ou partielle des textes, données,
                    marques, logos, visuels, ou photographies sans
                    l&apos;autorisation expresse de TRT Broker est illégale et
                    passible de sanctions conformément au Code de la propriété
                    intellectuelle au Maroc, notamment :
                  </p>
                  <div className="pl-4 space-y-2">
                    <p className="text-Sage-Gray-Higher leading-relaxed">
                      Dahir n° 1-00-20 du 9 kaada 1420 (15 février 2000)
                      promulguant la loi n° 2-00 relative aux droits
                      d&apos;auteur et droits voisins.
                    </p>
                    <p className="text-Sage-Gray-Higher leading-relaxed">
                      Dahir n° 1-05-192 du 15 moharrem 1427 (15 février 2006)
                      promulguant la loi n° 34-05 modifiant et complétant la
                      précédente.
                    </p>
                  </div>
                </div>
              </section>

              {/* Données personnelles */}
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
                    Données personnelles
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    TRT Broker s&apos;engage à protéger les données personnelles
                    des utilisateurs conformément à la réglementation en
                    vigueur, et en particulier à la loi n°09-08 relative à la
                    protection des personnes physiques à l&apos;égard du
                    traitement des données à caractère personnel.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les traitements mis en œuvre sur le site ont pour finalités
                    :
                  </p>
                  <ul className="pl-4 space-y-2 text-Sage-Gray-Higher">
                    <li>
                      • La réalisation de devis d&apos;assurance en ligne.
                    </li>
                    <li>• Le traitement des demandes de contact.</li>
                    <li>
                      • La gestion des candidatures et demandes d&apos;emploi.
                    </li>
                  </ul>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    En cas de non-saisie des champs obligatoires, TRT Broker ne
                    pourra pas satisfaire la demande de l&apos;utilisateur.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Destinataire des données : TRT Broker. Toutefois, TRT Broker
                    pourra transmettre ces données pour répondre à ses
                    obligations légales.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    Les données collectées peuvent être transmises à des
                    sous-traitants au sens de la loi 09-08, strictement dans le
                    cadre des missions qui leur sont confiées.
                  </p>
                  <p className="text-Sage-Gray-Higher leading-relaxed">
                    TRT Broker met en place toutes les mesures physiques,
                    techniques et organisationnelles nécessaires afin de
                    garantir la sécurité et la confidentialité des données
                    personnelles des utilisateurs.
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
                  <h3 className="text-2xl font-bold">Contact & Support</h3>
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

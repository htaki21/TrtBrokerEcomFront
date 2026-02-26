import Image from "next/image";
import Link from "next/link";
import ButtonLink from "../../buttons/ButtonLink";
import FooterLinks from "../../mini-sections/FooterLinks";
import FacebookIcon from "../../social-icons/FacebookIcon";
import InstagramIcon from "../../social-icons/InstagramIcon";
import LinkedInIcon from "../../social-icons/LinkedInIcon";
import TwitterIcon from "../../social-icons/TwitterIcon";
import Wrapper1180 from "../../wrapper/wrapper-1180";

const Section2 = () => {
  const currentYear = new Date().getFullYear();
  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    {
      href: "/conditions-generales-utilisation",
      label: "Conditions Générales d'Utilisation",
    },
    {
      href: "/conditions-generales-vente",
      label: "Conditions Générales de Vente",
    },
  ];
  const socialIcons = [
    { Component: FacebookIcon },
    { Component: InstagramIcon },
    { Component: TwitterIcon },
    { Component: LinkedInIcon },
  ];

  return (
    <section
      className="flex-center px-4 max-mobile:pt-0 max-mobile:bg-[url('/overlay-mobile.png'),linear-gradient(180deg,white_50%,var(--color-Sage-Gray-Lower)_100%)]
     max-mobile:bg-[position:0_160px] relative w-full bg-[url('/overlay.png'),linear-gradient(180deg,white_0%,var(--color-Sage-Gray-Lower)_100%)]
      bg-contain bg-top bg-no-repeat pt-[132px]"
    >
      <Wrapper1180 className="max-mobile:py-4 max-mobile:gap-0">
        <div
          className="max-mobile:py-6 max-mobile:px-4 max-mobile:bg-[url('/conseiller-mobile.webp')] relative
         flex h-[474px] w-full flex-col items-start justify-end overflow-hidden rounded-3xl
          p-12  bg-[url('/conseiller.webp')] bg-cover bg-center"
        >
          <div className="f-col gap-6">
            <div className="f-col gap-4">
              <h2 className="Headings-H2 text-white">
                Un conseiller à votre écoute
              </h2>
              <p className="Text-M text-white/70">
                Nous vous aidons à choisir la solution la mieux adaptée à vos
                besoins.
              </p>
            </div>
            <ButtonLink
              href="/contact"
              label="Prendre rendez-vous"
              color="white"
              className="font-medium py-3 px-7 max-mobile:py-3 max-mobile:px-6 max-mobile:w-full"
              iconClassName="w-6 h-6"
            />
          </div>
        </div>
        <div className="f-col max-mobile:py-16 max-mobile:gap-14 w-full gap-16 py-[132px]">
          <div className="f-col max-mobile:gap-14 gap-10">
            <div className="flex items-center justify-between">
              <Image
                src="/logo-trt-broker.png"
                alt="logo"
                width={185}
                height={80}
              />
              <ul className="max-mobile:hidden flex items-center justify-end gap-1">
                {socialIcons.map(({ Component }, index) => (
                  <li
                    key={index}
                    className="bg-Sage-Gray-Low flex rounded-[12px] p-2"
                  >
                    <Component />
                  </li>
                ))}
              </ul>
            </div>
            <FooterLinks
              sections={[
                {
                  title: "À propos",
                  links: [
                    { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
                    { label: "Carrières", href: "/carriere" },
                  ],
                },
                {
                  title: "Ressources",
                  links: [
                    {
                      label: "Actualités et conseils",
                      href: "/actualites-conseils",
                    },
                    { label: "FAQ", href: "/faq" },
                    { label: "Contactez-nous", href: "/contact" },
                  ],
                },
                {
                  title: "Auto",
                  links: [
                    { label: "Assurance Auto", href: "/assurance-automobile" },
                    { label: "Assurance Moto", href: "/assurance-moto" },
                    { label: "Carte Verte", href: "/contact" },
                  ],
                },
                {
                  title: "Habitation",
                  links: [
                    { label: "Appartement", href: "/assurance-habitation" },
                    { label: "Villa", href: "/assurance-habitation" },
                    { label: "Immeuble", href: "/assurance-habitation" },
                    { label: "Secondaire", href: "/assurance-habitation" },
                  ],
                },
                {
                  title: "Santé",
                  links: [
                    { label: "Assurance Santé", href: "/assurance-sante" },
                    {
                      label: "Maladie Complémentaire",
                      href: "/assurance-maladie-complementaire",
                    },
                    {
                      label: "Individuelle Accidents",
                      href: "/assurance-individuelle-accidents",
                    },
                  ],
                },
                {
                  title: "Voyage",
                  links: [
                    { label: "Assistance Voyage", href: "/assurance-voyage" },
                    {
                      label: "Plaisance / Jet-ski",
                      href: "/assurance-plaisance-jet-ski",
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="max-mobile:flex-col max-mobile:items-start max-mobile:gap-6 flex justify-between">
            <ul className="max-mobile:gap-2 max-mobile:flex hidden items-center justify-end gap-1">
              {socialIcons.map(({ Component }, index) => (
                <li
                  key={index}
                  className="bg-Sage-Gray-Low flex rounded-[12px] p-2"
                >
                  <Component />
                </li>
              ))}
            </ul>
            <span className="button2-s text-Sage-Gray-High max-mobile:order-3 whitespace-nowrap">
              © {currentYear} TRTBROKER. All rights reserved.
            </span>
            <div className="max-tablet:flex-col max-tablet:items-start justify-end max-mobile:gap-4 button2-s text-Sage-Gray-Higher max-mobile:order-2 flex items-center gap-3">
              {legalLinks.map(({ href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="hover:text-Sage-Gray-High underline-offset-3 transition hover:underline"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Wrapper1180>
    </section>
  );
};

export default Section2;

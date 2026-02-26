import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trtbroker.com";

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOConfig): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
    openGraph: {
      title,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: "TRT Broker",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fr_MA",
      ...(ogType === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
      }),
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`],
      creator: "@trtbroker",
      site: "@trtbroker",
    },
    other: {
      "geo.region": "MA",
      "geo.placename": "Morocco",
      "geo.position": "33.5731;-7.5898",
      ICBM: "33.5731, -7.5898",
    },
  };
}

export function generateStructuredData(
  type:
    | "Organization"
    | "WebSite"
    | "Article"
    | "BreadcrumbList"
    | "FAQPage"
    | "Service"
    | "LocalBusiness",
  data: Record<string, unknown>
) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructure,
        name: "TRT Broker",
        url: "https://trtbroker.com",
        logo: "https://trtbroker.com/logo.png",
        description:
          "Courtier en assurance spécialisé dans les solutions d'assurance pour particuliers, professionnels et entreprises au Maroc.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
          addressLocality: "Casablanca",
          addressRegion: "Casablanca-Settat",
          postalCode: "20000",
          streetAddress: "123, Avenue Hassan II",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+212-5222-70343",
          contactType: "customer service",
          availableLanguage: "French",
        },
        sameAs: [
          "https://www.facebook.com/trtbroker",
          "https://www.linkedin.com/company/trtbroker",
          "https://twitter.com/trtbroker",
        ],
      };

    case "LocalBusiness":
      return {
        ...baseStructure,
        name: "TRT Broker",
        description:
          "Courtier en assurance au Maroc spécialisé dans les solutions d'assurance pour particuliers, professionnels et entreprises.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
          addressLocality: "Casablanca",
          addressRegion: "Casablanca-Settat",
          postalCode: "20000",
          streetAddress: "123, Avenue Hassan II",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.5731,
          longitude: -7.5898,
        },
        telephone: "+212-5222-70343",
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        serviceArea: {
          "@type": "Country",
          name: "Morocco",
        },
      };

    case "WebSite":
      return {
        ...baseStructure,
        name: "TRT Broker",
        url: "https://trtbroker.com",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "Article":
      return {
        ...baseStructure,
        headline: data.title,
        description: data.description,
        image: data.image,
        url: data.url,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        author: {
          "@type": "Organization",
          name: data.author || "TRT Broker",
        },
        publisher: {
          "@type": "Organization",
          name: "TRT Broker",
          logo: {
            "@type": "ImageObject",
            url: "https://trtbroker.com/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
        articleSection: data.section,
        keywords: data.keywords,
      };

    case "Service":
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: "TRT Broker",
        },
        areaServed: "MA",
        serviceType: data.serviceType,
        offers: {
          "@type": "Offer",
          description: data.offerDescription,
        },
      };

    case "BreadcrumbList":
      return {
        ...baseStructure,
        itemListElement: (
          data.items as Array<{ name: string; url: string }>
        ).map((item, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    case "FAQPage":
      return {
        ...baseStructure,
        mainEntity: (
          data.faqs as Array<{ question: string; answer: string }>
        ).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

    default:
      return baseStructure;
  }
}

export const SEO_PAGES = {
  HOME: {
    title: "TRT Broker - Courtier en Assurance au Maroc | Devis Gratuit",
    description:
      "Courtier en assurance spécialisé dans les solutions d'assurance pour particuliers, professionnels et entreprises au Maroc. Devis gratuits, comparaison des meilleures offres et conseil personnalisé.",
    keywords: [
      // Core keywords
      "assurance Maroc",
      "courtier assurance Maroc",
      "devis assurance Maroc",
      "assurance Casablanca",
      "assurance Rabat",
      "assurance Marrakech",
      "assurance Fès",
      "assurance Meknès",
      "assurance Agadir",
      "assurance Tanger",
      "courtier assurance Casablanca",
      "courtier assurance Rabat",

      // Target audience
      "particuliers Maroc",
      "professionnels Maroc",
      "entreprises Maroc",
      "PME Maroc",
      "TPE Maroc",
      "auto-entrepreneur Maroc",
      "professions libérales Maroc",

      // Insurance types
      "assurance auto Maroc",
      "assurance habitation Maroc",
      "assurance moto Maroc",
      "assurance santé Maroc",
      "assurance voyage Maroc",
      "assurance professionnelle Maroc",
      "assurance entreprise Maroc",
      "mutuelle Maroc",
      "complémentaire santé Maroc",
      "assurance RC Maroc",
      "responsabilité civile Maroc",
      "assurance multirisques Maroc",

      // Services
      "devis gratuit assurance Maroc",
      "comparateur assurance Maroc",
      "conseil assurance Maroc",
      "souscription assurance Maroc",
      "gestion sinistre Maroc",
      "indemnisation assurance Maroc",
      "assistance assurance Maroc",

      // Geographic
      "assurance Royaume du Maroc",
      "assurance Maroc français",
      "assurance Maroc arabe",
      "courtier assurance Casablanca-Settat",
      "courtier assurance Rabat-Salé-Kénitra",
      "courtier assurance Marrakech-Safi",
      "courtier assurance Fès-Meknès",
      "courtier assurance Tanger-Tétouan-Al Hoceïma",

      // Long-tail keywords
      "meilleur courtier assurance Maroc",
      "assurance pas cher Maroc",
      "assurance rapide Maroc",
      "assurance en ligne Maroc",
      "assurance 24h/24 Maroc",
      "assurance mobile Maroc",
      "assurance digitale Maroc",
      "courtier assurance indépendant Maroc",
      "courtier assurance agréé Maroc",
      "courtier assurance certifié Maroc",

      // TRT Broker specific positioning
      "TRT Broker",
      "cabinet courtage assurance Maroc",
      "cabinet courtage assurance Casablanca",
      "courtier assurance Casablanca",
      "partenaire confiance assurance Maroc",
      "partenaire confiance assurance Casablanca",
      "solutions assurance adaptées Maroc",
      "solutions assurance personnalisées Maroc",
      "solutions assurance sur mesure Maroc",
      "meilleures offres marché assurance Maroc",
      "offres marché assurance Maroc",
      "expertise indépendante assurance Maroc",
      "expertise 10 ans assurance Maroc",
      "expérience 10 ans assurance Maroc",
      "plus de 10 ans expertise assurance Maroc",
      "assurance adaptée besoin Maroc",
      "assurance adaptée budget Maroc",
      "assurance tous budgets Maroc",
      "assurance petit budget Maroc",
      "assurance moyen budget Maroc",
      "assurance gros budget Maroc",
      "assurance économique Maroc",
      "assurance premium Maroc",
      "assurance haut de gamme Maroc",
      "assurance entrée de gamme Maroc",

      // Partnership and trust
      "partenaire assurance particulier Maroc",
      "partenaire assurance professionnel Maroc",
      "partenaire assurance entreprise Maroc",
      "partenaire assurance PME Maroc",
      "partenaire assurance TPE Maroc",
      "partenaire assurance startup Maroc",
      "partenaire assurance auto-entrepreneur Maroc",
      "partenaire assurance freelance Maroc",
      "partenaire assurance consultant Maroc",
      "partenaire assurance indépendant Maroc",
      "partenaire assurance salarié Maroc",
      "partenaire assurance retraité Maroc",
      "partenaire assurance étudiant Maroc",
      "partenaire assurance senior Maroc",
      "partenaire assurance famille Maroc",
      "partenaire assurance couple Maroc",
      "partenaire assurance célibataire Maroc",

      // Expertise and experience
      "expert assurance 10 ans Maroc",
      "spécialiste assurance 10 ans Maroc",
      "professionnel assurance 10 ans Maroc",
      "vétéran assurance Maroc",
      "expert chevronné assurance Maroc",
      "spécialiste chevronné assurance Maroc",
      "professionnel chevronné assurance Maroc",
      "expert expérimenté assurance Maroc",
      "spécialiste expérimenté assurance Maroc",
      "professionnel expérimenté assurance Maroc",
      "expert reconnu assurance Maroc",
      "spécialiste reconnu assurance Maroc",
      "professionnel reconnu assurance Maroc",
      "expert établi assurance Maroc",
      "spécialiste établi assurance Maroc",
      "professionnel établi assurance Maroc",

      // Market positioning
      "leader courtage assurance Maroc",
      "référence courtage assurance Maroc",
      "excellence courtage assurance Maroc",
      "qualité courtage assurance Maroc",
      "innovation courtage assurance Maroc",
      "modernité courtage assurance Maroc",
      "tradition courtage assurance Maroc",
      "sérieux courtage assurance Maroc",
      "fiabilité courtage assurance Maroc",
      "transparence courtage assurance Maroc",
      "impartialité courtage assurance Maroc",
      "neutralité courtage assurance Maroc",
      "objectivité courtage assurance Maroc",
      "proximité courtage assurance Maroc",
      "accessibilité courtage assurance Maroc",
      "disponibilité courtage assurance Maroc",
    ],
  },
  ASSURANCE_AUTO: {
    title: "Assurance Auto Maroc - Devis Gratuit | TRT Broker",
    description:
      "Comparez les meilleures offres d'assurance auto au Maroc. Devis gratuit et personnalisé en quelques minutes. Économisez sur votre assurance automobile avec TRT Broker.",
    keywords: [
      // Core auto insurance
      "assurance auto Maroc",
      "assurance automobile Maroc",
      "devis auto Maroc",
      "tarif assurance auto Maroc",
      "prix assurance auto Maroc",
      "coût assurance auto Maroc",
      "tarification assurance auto Maroc",

      // Coverage types
      "assurance auto tous risques Maroc",
      "assurance auto tiers simple Maroc",
      "assurance auto tiers plus Maroc",
      "assurance auto au tiers Maroc",
      "garantie vol auto Maroc",
      "garantie incendie auto Maroc",
      "garantie bris de glace auto Maroc",
      "garantie dommages collision auto Maroc",

      // Vehicle types
      "assurance voiture neuve Maroc",
      "assurance voiture occasion Maroc",
      "assurance 4x4 Maroc",
      "assurance camionnette Maroc",
      "assurance utilitaire Maroc",
      "assurance véhicule de tourisme Maroc",
      "assurance véhicule commercial Maroc",

      // Driver profiles
      "assurance auto jeune conducteur Maroc",
      "assurance auto permis probatoire Maroc",
      "assurance auto conducteur novice Maroc",
      "assurance auto conducteur expérimenté Maroc",
      "assurance auto femme Maroc",
      "assurance auto senior Maroc",
      "assurance auto étudiant Maroc",

      // Geographic
      "assurance auto Casablanca",
      "assurance auto Rabat",
      "assurance auto Marrakech",
      "assurance auto Fès",
      "assurance auto Meknès",
      "assurance auto Agadir",
      "assurance auto Tanger",
      "assurance auto Kenitra",
      "assurance auto Oujda",
      "assurance auto Tetouan",

      // Services
      "devis assurance auto gratuit Maroc",
      "comparateur assurance auto Maroc",
      "souscription assurance auto en ligne Maroc",
      "renouvellement assurance auto Maroc",
      "résiliation assurance auto Maroc",
      "changement assurance auto Maroc",
      "ajout conducteur assurance auto Maroc",

      // Companies (competitors)
      "Wafa Assurance auto Maroc",
      "RMA Wataniya assurance auto Maroc",
      "AXA Assurance auto Maroc",
      "Allianz assurance auto Maroc",
      "Atlanta assurance auto Maroc",
      "Sanad assurance auto Maroc",
      "Mutuelle Marocaine d'Assurance auto",
      "Saham assurance auto Maroc",

      // Long-tail
      "meilleure assurance auto Maroc",
      "assurance auto pas cher Maroc",
      "assurance auto rapide Maroc",
      "assurance auto 24h Maroc",
      "assurance auto mobile Maroc",
      "assurance auto digitale Maroc",
      "courtier assurance auto Maroc",
      "intermédiaire assurance auto Maroc",
    ],
  },
  ASSURANCE_HABITATION: {
    title: "Assurance Habitation Maroc - Devis Gratuit | TRT Broker",
    description:
      "Protégez votre logement au Maroc avec une assurance habitation adaptée. Devis gratuit et comparaison des meilleures offres du marché avec TRT Broker.",
    keywords: [
      // Core habitation insurance
      "assurance habitation Maroc",
      "assurance logement Maroc",
      "devis habitation Maroc",
      "garantie habitation Maroc",
      "prix assurance habitation Maroc",
      "tarif assurance habitation Maroc",
      "coût assurance habitation Maroc",

      // Coverage types
      "assurance multirisques habitation Maroc",
      "assurance MRH Maroc",
      "assurance propriétaire Maroc",
      "assurance locataire Maroc",
      "assurance copropriété Maroc",
      "assurance villa Maroc",
      "assurance appartement Maroc",
      "assurance maison Maroc",
      "assurance studio Maroc",
      "assurance duplex Maroc",
      "assurance riad Maroc",
      "assurance dar Maroc",

      // Guarantees
      "garantie vol habitation Maroc",
      "garantie incendie habitation Maroc",
      "garantie dégâts des eaux Maroc",
      "garantie tempête habitation Maroc",
      "garantie inondation habitation Maroc",
      "garantie séisme habitation Maroc",
      "garantie bris de glace habitation Maroc",
      "garantie vandalisme habitation Maroc",
      "garantie bris de machine habitation Maroc",
      "garantie dommages électriques habitation Maroc",

      // Property types
      "assurance résidence principale Maroc",
      "assurance résidence secondaire Maroc",
      "assurance logement vide Maroc",
      "assurance logement meublé Maroc",
      "assurance logement étudiant Maroc",
      "assurance logement locatif Maroc",
      "assurance investissement locatif Maroc",

      // Geographic
      "assurance habitation Casablanca",
      "assurance habitation Rabat",
      "assurance habitation Marrakech",
      "assurance habitation Fès",
      "assurance habitation Meknès",
      "assurance habitation Agadir",
      "assurance habitation Tanger",
      "assurance habitation Kenitra",
      "assurance habitation Oujda",
      "assurance habitation Tetouan",
      "assurance habitation Mohammedia",
      "assurance habitation Temara",

      // Services
      "devis assurance habitation gratuit Maroc",
      "comparateur assurance habitation Maroc",
      "souscription assurance habitation en ligne Maroc",
      "renouvellement assurance habitation Maroc",
      "résiliation assurance habitation Maroc",
      "changement assurance habitation Maroc",
      "extension garantie habitation Maroc",

      // Companies
      "Wafa Assurance habitation Maroc",
      "RMA Wataniya assurance habitation Maroc",
      "AXA Assurance habitation Maroc",
      "Allianz assurance habitation Maroc",
      "Atlanta assurance habitation Maroc",
      "Sanad assurance habitation Maroc",
      "Mutuelle Marocaine d'Assurance habitation",
      "Saham assurance habitation Maroc",

      // Long-tail
      "meilleure assurance habitation Maroc",
      "assurance habitation pas cher Maroc",
      "assurance habitation rapide Maroc",
      "assurance habitation 24h Maroc",
      "assurance habitation mobile Maroc",
      "assurance habitation digitale Maroc",
      "courtier assurance habitation Maroc",
      "intermédiaire assurance habitation Maroc",
    ],
  },
  ASSURANCE_MOTO: {
    title: "Assurance Moto Maroc - Devis Gratuit | TRT Broker",
    description:
      "Assurance moto et scooter au Maroc au meilleur prix. Devis gratuit, garanties adaptées et remboursement rapide avec TRT Broker.",
    keywords: [
      // Core moto insurance
      "assurance moto Maroc",
      "assurance scooter Maroc",
      "devis moto Maroc",
      "garantie moto Maroc",
      "prix assurance moto Maroc",
      "tarif assurance moto Maroc",
      "coût assurance moto Maroc",

      // Vehicle types
      "assurance moto 125 Maroc",
      "assurance moto 250 Maroc",
      "assurance moto 500 Maroc",
      "assurance moto 750 Maroc",
      "assurance moto 1000 Maroc",
      "assurance scooter 50 Maroc",
      "assurance scooter 125 Maroc",
      "assurance quad Maroc",
      "assurance moto cross Maroc",
      "assurance moto trail Maroc",
      "assurance moto sport Maroc",
      "assurance moto custom Maroc",

      // Coverage types
      "assurance moto tous risques Maroc",
      "assurance moto tiers simple Maroc",
      "assurance moto tiers plus Maroc",
      "assurance moto au tiers Maroc",
      "garantie vol moto Maroc",
      "garantie incendie moto Maroc",
      "garantie bris de glace moto Maroc",
      "garantie dommages collision moto Maroc",
      "garantie dommages tous accidents moto Maroc",

      // Driver profiles
      "assurance moto jeune conducteur Maroc",
      "assurance moto permis A Maroc",
      "assurance moto permis A1 Maroc",
      "assurance moto permis A2 Maroc",
      "assurance moto conducteur novice Maroc",
      "assurance moto conducteur expérimenté Maroc",

      // Geographic
      "assurance moto Casablanca",
      "assurance moto Rabat",
      "assurance moto Marrakech",
      "assurance moto Fès",
      "assurance moto Meknès",
      "assurance moto Agadir",
      "assurance moto Tanger",
      "assurance moto Kenitra",
      "assurance moto Oujda",
      "assurance moto Tetouan",

      // Services
      "devis assurance moto gratuit Maroc",
      "comparateur assurance moto Maroc",
      "souscription assurance moto en ligne Maroc",
      "renouvellement assurance moto Maroc",
      "résiliation assurance moto Maroc",
      "changement assurance moto Maroc",

      // Companies
      "Wafa Assurance moto Maroc",
      "RMA Wataniya assurance moto Maroc",
      "AXA Assurance moto Maroc",
      "Allianz assurance moto Maroc",
      "Atlanta assurance moto Maroc",
      "Sanad assurance moto Maroc",
      "Mutuelle Marocaine d'Assurance moto",
      "Saham assurance moto Maroc",

      // Long-tail
      "meilleure assurance moto Maroc",
      "assurance moto pas cher Maroc",
      "assurance moto rapide Maroc",
      "assurance moto 24h Maroc",
      "assurance moto mobile Maroc",
      "assurance moto digitale Maroc",
      "courtier assurance moto Maroc",
      "intermédiaire assurance moto Maroc",
    ],
  },
  ASSURANCE_SANTE: {
    title: "Assurance Santé Maroc - Complémentaire Santé | TRT Broker",
    description:
      "Assurance santé et mutuelle complémentaire au Maroc. Comparez les offres et trouvez la meilleure couverture santé avec TRT Broker.",
    keywords: [
      // Core health insurance
      "assurance santé Maroc",
      "mutuelle Maroc",
      "complémentaire santé Maroc",
      "sécurité sociale Maroc",
      "assurance maladie Maroc",
      "couverture santé Maroc",
      "protection santé Maroc",

      // Coverage types
      "assurance santé individuelle Maroc",
      "assurance santé familiale Maroc",
      "assurance santé entreprise Maroc",
      "assurance santé collective Maroc",
      "assurance santé étudiante Maroc",
      "assurance santé senior Maroc",
      "assurance santé expatrié Maroc",
      "assurance santé internationale Maroc",

      // Medical coverage
      "remboursement frais médicaux Maroc",
      "remboursement frais dentaires Maroc",
      "remboursement frais optiques Maroc",
      "remboursement frais hospitalisation Maroc",
      "remboursement frais chirurgie Maroc",
      "remboursement médicaments Maroc",
      "remboursement consultations Maroc",
      "remboursement analyses Maroc",
      "remboursement radiologie Maroc",

      // Healthcare providers
      "assurance santé clinique Maroc",
      "assurance santé hôpital Maroc",
      "assurance santé médecin Maroc",
      "assurance santé dentiste Maroc",
      "assurance santé pharmacie Maroc",
      "assurance santé laboratoire Maroc",

      // Geographic
      "assurance santé Casablanca",
      "assurance santé Rabat",
      "assurance santé Marrakech",
      "assurance santé Fès",
      "assurance santé Meknès",
      "assurance santé Agadir",
      "assurance santé Tanger",
      "assurance santé Kenitra",
      "assurance santé Oujda",
      "assurance santé Tetouan",

      // Services
      "devis assurance santé gratuit Maroc",
      "comparateur assurance santé Maroc",
      "souscription assurance santé en ligne Maroc",
      "renouvellement assurance santé Maroc",
      "résiliation assurance santé Maroc",
      "changement assurance santé Maroc",

      // Companies
      "Wafa Assurance santé Maroc",
      "RMA Wataniya assurance santé Maroc",
      "AXA Assurance santé Maroc",
      "Allianz assurance santé Maroc",
      "Atlanta assurance santé Maroc",
      "Sanad assurance santé Maroc",
      "Mutuelle Marocaine d'Assurance santé",
      "Saham assurance santé Maroc",
      "Mutuelle Générale du Personnel des Administrations Publiques",
      "CNSS Maroc",
      "CNOPS Maroc",

      // Long-tail
      "meilleure assurance santé Maroc",
      "assurance santé pas cher Maroc",
      "assurance santé rapide Maroc",
      "assurance santé 24h Maroc",
      "assurance santé mobile Maroc",
      "assurance santé digitale Maroc",
      "courtier assurance santé Maroc",
      "intermédiaire assurance santé Maroc",
    ],
  },
  ASSURANCE_VIAGE: {
    title: "Assurance Voyage Maroc - Protection Voyageurs | TRT Broker",
    description:
      "Assurance voyage et assistance depuis le Maroc. Protégez-vous lors de vos déplacements au Maroc et à l'étranger avec TRT Broker.",
    keywords: [
      // Core travel insurance
      "assurance voyage Maroc",
      "assistance voyage Maroc",
      "protection voyageur Maroc",
      "assurance expatrié Maroc",
      "assurance tourisme Maroc",
      "assurance vacances Maroc",
      "assurance séjour Maroc",

      // Travel types
      "assurance voyage individuelle Maroc",
      "assurance voyage familiale Maroc",
      "assurance voyage groupe Maroc",
      "assurance voyage étudiant Maroc",
      "assurance voyage senior Maroc",
      "assurance voyage business Maroc",
      "assurance voyage loisir Maroc",
      "assurance voyage sport Maroc",

      // Coverage types
      "assurance voyage annulation Maroc",
      "assurance voyage interruption Maroc",
      "assurance voyage bagages Maroc",
      "assurance voyage retard Maroc",
      "assurance voyage responsabilité civile Maroc",
      "assurance voyage rapatriement Maroc",
      "assurance voyage assistance Maroc",
      "assurance voyage médicale Maroc",
      "assurance voyage accident Maroc",

      // Destinations
      "assurance voyage Europe Maroc",
      "assurance voyage France Maroc",
      "assurance voyage Espagne Maroc",
      "assurance voyage Italie Maroc",
      "assurance voyage Allemagne Maroc",
      "assurance voyage Afrique Maroc",
      "assurance voyage Asie Maroc",
      "assurance voyage Amérique Maroc",
      "assurance voyage monde Maroc",

      // Visa types
      "assurance voyage Schengen Maroc",
      "assurance voyage visa touristique Maroc",
      "assurance voyage visa business Maroc",
      "assurance voyage visa étudiant Maroc",
      "assurance voyage visa travail Maroc",

      // Geographic
      "assurance voyage Casablanca",
      "assurance voyage Rabat",
      "assurance voyage Marrakech",
      "assurance voyage Fès",
      "assurance voyage Meknès",
      "assurance voyage Agadir",
      "assurance voyage Tanger",
      "assurance voyage Kenitra",
      "assurance voyage Oujda",
      "assurance voyage Tetouan",

      // Services
      "devis assurance voyage gratuit Maroc",
      "comparateur assurance voyage Maroc",
      "souscription assurance voyage en ligne Maroc",
      "assurance voyage instantanée Maroc",
      "assurance voyage 24h Maroc",

      // Companies
      "Wafa Assurance voyage Maroc",
      "RMA Wataniya assurance voyage Maroc",
      "AXA Assurance voyage Maroc",
      "Allianz assurance voyage Maroc",
      "Atlanta assurance voyage Maroc",
      "Sanad assurance voyage Maroc",
      "Mutuelle Marocaine d'Assurance voyage",
      "Saham assurance voyage Maroc",

      // Long-tail
      "meilleure assurance voyage Maroc",
      "assurance voyage pas cher Maroc",
      "assurance voyage rapide Maroc",
      "assurance voyage mobile Maroc",
      "assurance voyage digitale Maroc",
      "courtier assurance voyage Maroc",
      "intermédiaire assurance voyage Maroc",
    ],
  },
  ASSURANCE_PLAISANCE: {
    title:
      "Assurance Plaisance Jet-Ski Maroc - Bateau et Nautisme | TRT Broker",
    description:
      "Assurance plaisance et jet-ski au Maroc. Protégez votre bateau, voilier ou jet-ski avec des garanties adaptées avec TRT Broker.",
    keywords: [
      // Core marine insurance
      "assurance plaisance Maroc",
      "assurance jet-ski Maroc",
      "assurance bateau Maroc",
      "assurance nautisme Maroc",
      "assurance marine Maroc",
      "assurance maritime Maroc",
      "assurance navigation Maroc",

      // Boat types
      "assurance voilier Maroc",
      "assurance bateau à moteur Maroc",
      "assurance yacht Maroc",
      "assurance catamaran Maroc",
      "assurance zodiac Maroc",
      "assurance semi-rigide Maroc",
      "assurance bateau pneumatique Maroc",
      "assurance bateau gonflable Maroc",
      "assurance kayak Maroc",
      "assurance paddle Maroc",
      "assurance planche à voile Maroc",
      "assurance kitesurf Maroc",
      "assurance surf Maroc",

      // Coverage types
      "assurance bateau tous risques Maroc",
      "assurance bateau tiers simple Maroc",
      "assurance bateau tiers plus Maroc",
      "garantie vol bateau Maroc",
      "garantie incendie bateau Maroc",
      "garantie bris de machine bateau Maroc",
      "garantie avarie commune bateau Maroc",
      "garantie collision bateau Maroc",
      "garantie échouement bateau Maroc",
      "garantie remorquage bateau Maroc",
      "garantie assistance bateau Maroc",

      // Geographic
      "assurance plaisance Casablanca",
      "assurance plaisance Rabat",
      "assurance plaisance Marrakech",
      "assurance plaisance Agadir",
      "assurance plaisance Tanger",
      "assurance plaisance Mohammedia",
      "assurance plaisance Essaouira",
      "assurance plaisance El Jadida",
      "assurance plaisance Safi",
      "assurance plaisance Nador",

      // Marinas and ports
      "assurance plaisance Marina Casablanca",
      "assurance plaisance Marina Rabat",
      "assurance plaisance Marina Agadir",
      "assurance plaisance Marina Mohammedia",
      "assurance plaisance Port Tanger",
      "assurance plaisance Port Nador",

      // Services
      "devis assurance plaisance gratuit Maroc",
      "comparateur assurance plaisance Maroc",
      "souscription assurance plaisance en ligne Maroc",
      "renouvellement assurance plaisance Maroc",
      "résiliation assurance plaisance Maroc",
      "changement assurance plaisance Maroc",

      // Companies
      "Wafa Assurance plaisance Maroc",
      "RMA Wataniya assurance plaisance Maroc",
      "AXA Assurance plaisance Maroc",
      "Allianz assurance plaisance Maroc",
      "Atlanta assurance plaisance Maroc",
      "Sanad assurance plaisance Maroc",
      "Mutuelle Marocaine d'Assurance plaisance",
      "Saham assurance plaisance Maroc",

      // Long-tail
      "meilleure assurance plaisance Maroc",
      "assurance plaisance pas cher Maroc",
      "assurance plaisance rapide Maroc",
      "assurance plaisance 24h Maroc",
      "assurance plaisance mobile Maroc",
      "assurance plaisance digitale Maroc",
      "courtier assurance plaisance Maroc",
      "intermédiaire assurance plaisance Maroc",
    ],
  },
  ASSURANCE_INDIVIDUELLE_ACCIDENTS: {
    title:
      "Assurance Individuelle Accidents Maroc - Protection Personnelle | TRT Broker",
    description:
      "Assurance individuelle accidents au Maroc. Protégez-vous contre les risques d'accidents de la vie quotidienne avec TRT Broker.",
    keywords: [
      // Core accident insurance
      "assurance individuelle accidents Maroc",
      "assurance accidents Maroc",
      "protection personnelle Maroc",
      "garantie accidents Maroc",
      "assurance accident vie Maroc",
      "assurance accident corporel Maroc",
      "assurance invalidité Maroc",
      "assurance incapacité Maroc",

      // Coverage types
      "assurance accident individuelle Maroc",
      "assurance accident familiale Maroc",
      "assurance accident collective Maroc",
      "assurance accident entreprise Maroc",
      "assurance accident scolaire Maroc",
      "assurance accident sport Maroc",
      "assurance accident voyage Maroc",
      "assurance accident professionnel Maroc",

      // Accident types
      "assurance accident domestique Maroc",
      "assurance accident circulation Maroc",
      "assurance accident sportif Maroc",
      "assurance accident loisir Maroc",
      "assurance accident travail Maroc",
      "assurance accident vacances Maroc",
      "assurance accident quotidien Maroc",
      "assurance accident extérieur Maroc",

      // Benefits
      "garantie décès accident Maroc",
      "garantie invalidité accident Maroc",
      "garantie incapacité accident Maroc",
      "garantie frais médicaux accident Maroc",
      "garantie frais hospitalisation accident Maroc",
      "garantie frais chirurgie accident Maroc",
      "garantie capital invalidité Maroc",
      "garantie rente invalidité Maroc",

      // Geographic
      "assurance accident Casablanca",
      "assurance accident Rabat",
      "assurance accident Marrakech",
      "assurance accident Fès",
      "assurance accident Meknès",
      "assurance accident Agadir",
      "assurance accident Tanger",
      "assurance accident Kenitra",
      "assurance accident Oujda",
      "assurance accident Tetouan",

      // Services
      "devis assurance accident gratuit Maroc",
      "comparateur assurance accident Maroc",
      "souscription assurance accident en ligne Maroc",
      "renouvellement assurance accident Maroc",
      "résiliation assurance accident Maroc",
      "changement assurance accident Maroc",

      // Companies
      "Wafa Assurance accident Maroc",
      "RMA Wataniya assurance accident Maroc",
      "AXA Assurance accident Maroc",
      "Allianz assurance accident Maroc",
      "Atlanta assurance accident Maroc",
      "Sanad assurance accident Maroc",
      "Mutuelle Marocaine d'Assurance accident",
      "Saham assurance accident Maroc",

      // Long-tail
      "meilleure assurance accident Maroc",
      "assurance accident pas cher Maroc",
      "assurance accident rapide Maroc",
      "assurance accident 24h Maroc",
      "assurance accident mobile Maroc",
      "assurance accident digitale Maroc",
      "courtier assurance accident Maroc",
      "intermédiaire assurance accident Maroc",
    ],
  },
  ASSURANCE_MALADIE_COMPLEMENTAIRE: {
    title:
      "Assurance Maladie Complémentaire Maroc - Mutuelle Santé | TRT Broker",
    description:
      "Assurance maladie complémentaire au Maroc. Complétez votre couverture santé avec une mutuelle adaptée avec TRT Broker.",
    keywords: [
      // Core complementary health insurance
      "assurance maladie complémentaire Maroc",
      "mutuelle santé Maroc",
      "complémentaire santé Maroc",
      "assurance santé complémentaire Maroc",
      "mutuelle complémentaire Maroc",
      "complémentaire maladie Maroc",
      "top-up santé Maroc",

      // Coverage types
      "complémentaire santé individuelle Maroc",
      "complémentaire santé familiale Maroc",
      "complémentaire santé entreprise Maroc",
      "complémentaire santé collective Maroc",
      "complémentaire santé étudiante Maroc",
      "complémentaire santé senior Maroc",
      "complémentaire santé retraité Maroc",

      // Medical coverage
      "complémentaire frais médicaux Maroc",
      "complémentaire frais dentaires Maroc",
      "complémentaire frais optiques Maroc",
      "complémentaire frais hospitalisation Maroc",
      "complémentaire frais chirurgie Maroc",
      "complémentaire médicaments Maroc",
      "complémentaire consultations Maroc",
      "complémentaire analyses Maroc",
      "complémentaire radiologie Maroc",
      "complémentaire kinésithérapie Maroc",

      // Healthcare providers
      "complémentaire santé clinique Maroc",
      "complémentaire santé hôpital Maroc",
      "complémentaire santé médecin Maroc",
      "complémentaire santé dentiste Maroc",
      "complémentaire santé pharmacie Maroc",
      "complémentaire santé laboratoire Maroc",

      // Geographic
      "complémentaire santé Casablanca",
      "complémentaire santé Rabat",
      "complémentaire santé Marrakech",
      "complémentaire santé Fès",
      "complémentaire santé Meknès",
      "complémentaire santé Agadir",
      "complémentaire santé Tanger",
      "complémentaire santé Kenitra",
      "complémentaire santé Oujda",
      "complémentaire santé Tetouan",

      // Services
      "devis complémentaire santé gratuit Maroc",
      "comparateur complémentaire santé Maroc",
      "souscription complémentaire santé en ligne Maroc",
      "renouvellement complémentaire santé Maroc",
      "résiliation complémentaire santé Maroc",
      "changement complémentaire santé Maroc",

      // Companies
      "Wafa Assurance complémentaire santé Maroc",
      "RMA Wataniya complémentaire santé Maroc",
      "AXA Assurance complémentaire santé Maroc",
      "Allianz complémentaire santé Maroc",
      "Atlanta complémentaire santé Maroc",
      "Sanad complémentaire santé Maroc",
      "Mutuelle Marocaine d'Assurance complémentaire santé",
      "Saham complémentaire santé Maroc",
      "Mutuelle Générale du Personnel des Administrations Publiques",

      // Long-tail
      "meilleure complémentaire santé Maroc",
      "complémentaire santé pas cher Maroc",
      "complémentaire santé rapide Maroc",
      "complémentaire santé 24h Maroc",
      "complémentaire santé mobile Maroc",
      "complémentaire santé digitale Maroc",
      "courtier complémentaire santé Maroc",
      "intermédiaire complémentaire santé Maroc",
    ],
  },
  ASSURANCE_PROFESSIONNELLE: {
    title: "Assurance Professionnelle - TPE et PME au Maroc | TRT Broker",
    description:
      "Assurance professionnelle pour TPE, PME et professions libérales au Maroc. Protection complète de votre activité avec TRT Broker.",
    keywords: [
      // Core professional insurance
      "assurance professionnelle Maroc",
      "assurance entreprise Maroc",
      "assurance activité professionnelle Maroc",
      "assurance commerciale Maroc",
      "assurance business Maroc",
      "assurance profession libérale Maroc",

      // Company types
      "assurance TPE Maroc",
      "assurance PME Maroc",
      "assurance PMI Maroc",
      "assurance startup Maroc",
      "assurance micro-entreprise Maroc",
      "assurance auto-entreprise Maroc",
      "assurance freelance Maroc",
      "assurance consultant Maroc",

      // Professional categories
      "assurance professions libérales Maroc",
      "assurance médecin Maroc",
      "assurance dentiste Maroc",
      "assurance avocat Maroc",
      "assurance notaire Maroc",
      "assurance architecte Maroc",
      "assurance ingénieur Maroc",
      "assurance comptable Maroc",
      "assurance expert-comptable Maroc",
      "assurance vétérinaire Maroc",
      "assurance pharmacien Maroc",
      "assurance kinésithérapeute Maroc",

      // Coverage types
      "assurance RC professionnelle Maroc",
      "assurance responsabilité civile professionnelle Maroc",
      "assurance multirisques professionnelle Maroc",
      "assurance locaux professionnels Maroc",
      "assurance matériel professionnel Maroc",
      "assurance perte d'exploitation Maroc",
      "assurance cyber-risques Maroc",
      "assurance erreurs et omissions Maroc",

      // Sectors
      "assurance BTP Maroc",
      "assurance construction Maroc",
      "assurance immobilier Maroc",
      "assurance commerce Maroc",
      "assurance restauration Maroc",
      "assurance hôtellerie Maroc",
      "assurance transport Maroc",
      "assurance logistique Maroc",
      "assurance industrie Maroc",
      "assurance services Maroc",

      // Geographic
      "assurance professionnelle Casablanca",
      "assurance professionnelle Rabat",
      "assurance professionnelle Marrakech",
      "assurance professionnelle Fès",
      "assurance professionnelle Meknès",
      "assurance professionnelle Agadir",
      "assurance professionnelle Tanger",
      "assurance professionnelle Kenitra",
      "assurance professionnelle Oujda",
      "assurance professionnelle Tetouan",

      // Services
      "devis assurance professionnelle gratuit Maroc",
      "comparateur assurance professionnelle Maroc",
      "souscription assurance professionnelle en ligne Maroc",
      "renouvellement assurance professionnelle Maroc",
      "résiliation assurance professionnelle Maroc",
      "changement assurance professionnelle Maroc",

      // Companies
      "Wafa Assurance professionnelle Maroc",
      "RMA Wataniya assurance professionnelle Maroc",
      "AXA Assurance professionnelle Maroc",
      "Allianz assurance professionnelle Maroc",
      "Atlanta assurance professionnelle Maroc",
      "Sanad assurance professionnelle Maroc",
      "Mutuelle Marocaine d'Assurance professionnelle",
      "Saham assurance professionnelle Maroc",

      // Long-tail
      "meilleure assurance professionnelle Maroc",
      "assurance professionnelle pas cher Maroc",
      "assurance professionnelle rapide Maroc",
      "assurance professionnelle 24h Maroc",
      "assurance professionnelle mobile Maroc",
      "assurance professionnelle digitale Maroc",
      "courtier assurance professionnelle Maroc",
      "intermédiaire assurance professionnelle Maroc",
    ],
  },
  ASSURANCE_ENTREPRISE: {
    title: "Assurance Entreprise - Solutions Corporate au Maroc | TRT Broker",
    description:
      "Solutions d'assurance entreprise complètes au Maroc. Protection des risques professionnels et responsabilité civile avec TRT Broker.",
    keywords: [
      // Core corporate insurance
      "assurance entreprise Maroc",
      "assurance corporate Maroc",
      "assurance société Maroc",
      "assurance société anonyme Maroc",
      "assurance SARL Maroc",
      "assurance SA Maroc",
      "assurance EURL Maroc",
      "assurance SNC Maroc",
      "assurance SCS Maroc",
      "assurance SCA Maroc",

      // Company sizes
      "assurance grande entreprise Maroc",
      "assurance groupe Maroc",
      "assurance multinationale Maroc",
      "assurance holding Maroc",
      "assurance filiale Maroc",
      "assurance joint-venture Maroc",
      "assurance consortium Maroc",

      // Coverage types
      "assurance multirisques entreprise Maroc",
      "assurance locaux entreprise Maroc",
      "assurance matériel entreprise Maroc",
      "assurance stock entreprise Maroc",
      "assurance perte d'exploitation Maroc",
      "assurance interruption d'activité Maroc",
      "assurance cyber-risques Maroc",
      "assurance cyber-sécurité Maroc",
      "assurance données Maroc",

      // Liability coverage
      "assurance responsabilité civile entreprise Maroc",
      "assurance RC exploitation Maroc",
      "assurance RC produits Maroc",
      "assurance RC environnementale Maroc",
      "assurance RC décennale Maroc",
      "assurance RC professionnelle Maroc",
      "assurance RC directeurs Maroc",
      "assurance RC employeurs Maroc",

      // Employee coverage
      "assurance prévoyance entreprise Maroc",
      "assurance retraite entreprise Maroc",
      "assurance épargne entreprise Maroc",
      "assurance santé entreprise Maroc",
      "assurance accident entreprise Maroc",
      "assurance invalidité entreprise Maroc",
      "assurance décès entreprise Maroc",

      // Sectors
      "assurance industrie Maroc",
      "assurance manufacturier Maroc",
      "assurance textile Maroc",
      "assurance agroalimentaire Maroc",
      "assurance chimie Maroc",
      "assurance pharmaceutique Maroc",
      "assurance automobile Maroc",
      "assurance aéronautique Maroc",
      "assurance électronique Maroc",
      "assurance informatique Maroc",
      "assurance télécommunications Maroc",
      "assurance énergie Maroc",
      "assurance mines Maroc",
      "assurance pétrole Maroc",
      "assurance gaz Maroc",

      // Services
      "assurance banque Maroc",
      "assurance finance Maroc",
      "assurance assurance Maroc",
      "assurance réassurance Maroc",
      "assurance bourse Maroc",
      "assurance investissement Maroc",
      "assurance gestion d'actifs Maroc",
      "assurance conseil Maroc",
      "assurance audit Maroc",
      "assurance consulting Maroc",

      // Geographic
      "assurance entreprise Casablanca",
      "assurance entreprise Rabat",
      "assurance entreprise Marrakech",
      "assurance entreprise Fès",
      "assurance entreprise Meknès",
      "assurance entreprise Agadir",
      "assurance entreprise Tanger",
      "assurance entreprise Kenitra",
      "assurance entreprise Oujda",
      "assurance entreprise Tetouan",

      // Services
      "devis assurance entreprise gratuit Maroc",
      "comparateur assurance entreprise Maroc",
      "souscription assurance entreprise en ligne Maroc",
      "renouvellement assurance entreprise Maroc",
      "résiliation assurance entreprise Maroc",
      "changement assurance entreprise Maroc",
      "audit assurance entreprise Maroc",
      "conseil assurance entreprise Maroc",

      // Companies
      "Wafa Assurance entreprise Maroc",
      "RMA Wataniya assurance entreprise Maroc",
      "AXA Assurance entreprise Maroc",
      "Allianz assurance entreprise Maroc",
      "Atlanta assurance entreprise Maroc",
      "Sanad assurance entreprise Maroc",
      "Mutuelle Marocaine d'Assurance entreprise",
      "Saham assurance entreprise Maroc",

      // Long-tail
      "meilleure assurance entreprise Maroc",
      "assurance entreprise pas cher Maroc",
      "assurance entreprise rapide Maroc",
      "assurance entreprise 24h Maroc",
      "assurance entreprise mobile Maroc",
      "assurance entreprise digitale Maroc",
      "courtier assurance entreprise Maroc",
      "intermédiaire assurance entreprise Maroc",
      "conseil assurance entreprise Maroc",
      "expert assurance entreprise Maroc",
    ],
  },
  QUI_SOMMES_NOUS: {
    title:
      "Qui Sommes-Nous - TRT Broker Maroc | Courtier Assurance Indépendant",
    description:
      "Découvrez TRT Broker, courtier en assurance indépendant au Maroc. Notre expertise et notre engagement pour vous accompagner dans vos projets d'assurance.",
    keywords: [
      // Company identity
      "qui sommes nous",
      "TRT Broker",
      "courtier assurance Maroc",
      "courtier assurance indépendant Maroc",
      "courtier assurance agréé Maroc",
      "courtier assurance certifié Maroc",
      "courtier assurance professionnel Maroc",
      "courtier assurance expert Maroc",

      // Expertise
      "expertise assurance Maroc",
      "spécialiste assurance Maroc",
      "conseil assurance Maroc",
      "accompagnement assurance Maroc",
      "service assurance Maroc",
      "support assurance Maroc",
      "assistance assurance Maroc",

      // Values
      "indépendant Maroc",
      "impartialité assurance Maroc",
      "transparence assurance Maroc",
      "confiance assurance Maroc",
      "proximité assurance Maroc",
      "qualité assurance Maroc",
      "innovation assurance Maroc",
      "modernité assurance Maroc",

      // Services
      "comparateur assurance Maroc",
      "devis assurance gratuit Maroc",
      "souscription assurance Maroc",
      "gestion assurance Maroc",
      "suivi assurance Maroc",
      "renouvellement assurance Maroc",
      "résiliation assurance Maroc",
      "sinistre assurance Maroc",

      // Team
      "équipe TRT Broker",
      "conseillers assurance Maroc",
      "experts assurance Maroc",
      "spécialistes assurance Maroc",
      "professionnels assurance Maroc",
      "Yassine KHIRAOUI",
      "Directeur Général TRT Broker",

      // Company history and positioning
      "TRT Broker 10 ans",
      "TRT Broker plus de 10 ans",
      "TRT Broker depuis 10 ans",
      "TRT Broker expérience 10 ans",
      "TRT Broker expertise 10 ans",
      "TRT Broker tradition 10 ans",
      "TRT Broker établi 10 ans",
      "TRT Broker reconnu 10 ans",
      "cabinet courtage TRT Broker",
      "cabinet courtage Casablanca",
      "cabinet courtage assurance Casablanca",
      "cabinet courtage indépendant Casablanca",
      "cabinet courtage professionnel Casablanca",
      "cabinet courtage expert Casablanca",
      "cabinet courtage spécialisé Casablanca",
      "cabinet courtage établi Casablanca",
      "cabinet courtage reconnu Casablanca",
      "cabinet courtage fiable Casablanca",
      "cabinet courtage sérieux Casablanca",
      "cabinet courtage professionnel Casablanca",

      // Trust and partnership
      "partenaire confiance TRT Broker",
      "partenaire confiance assurance Maroc",
      "partenaire confiance assurance Casablanca",
      "partenaire de confiance TRT Broker",
      "partenaire de confiance assurance Maroc",
      "partenaire de confiance assurance Casablanca",
      "partenaire fiable assurance Maroc",
      "partenaire fiable assurance Casablanca",
      "partenaire sérieux assurance Maroc",
      "partenaire sérieux assurance Casablanca",
      "partenaire professionnel assurance Maroc",
      "partenaire professionnel assurance Casablanca",
      "partenaire expert assurance Maroc",
      "partenaire expert assurance Casablanca",
      "partenaire spécialisé assurance Maroc",
      "partenaire spécialisé assurance Casablanca",
      "partenaire établi assurance Maroc",
      "partenaire établi assurance Casablanca",
      "partenaire reconnu assurance Maroc",
      "partenaire reconnu assurance Casablanca",

      // Solutions and offers
      "solutions assurance TRT Broker",
      "solutions assurance adaptées TRT Broker",
      "solutions assurance personnalisées TRT Broker",
      "solutions assurance sur mesure TRT Broker",
      "solutions assurance particuliers TRT Broker",
      "solutions assurance professionnels TRT Broker",
      "solutions assurance entreprises TRT Broker",
      "solutions assurance PME TRT Broker",
      "solutions assurance TPE TRT Broker",
      "meilleures offres marché TRT Broker",
      "meilleures offres assurance TRT Broker",
      "meilleures offres assurance Maroc",
      "meilleures offres assurance Casablanca",
      "offres marché assurance TRT Broker",
      "offres marché assurance Maroc",
      "offres marché assurance Casablanca",
      "offres adaptées besoins TRT Broker",
      "offres adaptées budgets TRT Broker",
      "offres tous budgets TRT Broker",
      "offres petit budget TRT Broker",
      "offres moyen budget TRT Broker",
      "offres gros budget TRT Broker",

      // Geographic
      "courtier assurance Casablanca",
      "courtier assurance Rabat",
      "courtier assurance Marrakech",
      "courtier assurance Fès",
      "courtier assurance Meknès",
      "courtier assurance Agadir",
      "courtier assurance Tanger",
      "courtier assurance Kenitra",
      "courtier assurance Oujda",
      "courtier assurance Tetouan",

      // Long-tail
      "meilleur courtier assurance Maroc",
      "courtier assurance fiable Maroc",
      "courtier assurance sérieux Maroc",
      "courtier assurance professionnel Maroc",
      "courtier assurance expérimenté Maroc",
      "courtier assurance recommandé Maroc",
      "courtier assurance avis Maroc",
      "courtier assurance témoignage Maroc",
    ],
  },
  ACTUALITES: {
    title: "Actualités et Conseils Assurance Maroc | Blog TRT Broker",
    description:
      "Actualités assurance au Maroc, conseils et guides pratiques. Restez informé sur l'évolution du marché de l'assurance au Maroc avec TRT Broker.",
    keywords: [
      // Core content
      "actualités assurance Maroc",
      "conseils assurance Maroc",
      "guides assurance Maroc",
      "infos assurance Maroc",
      "blog assurance Maroc",
      "article assurance Maroc",
      "news assurance Maroc",
      "nouvelles assurance Maroc",

      // Content types
      "guide assurance auto Maroc",
      "guide assurance habitation Maroc",
      "guide assurance moto Maroc",
      "guide assurance santé Maroc",
      "guide assurance voyage Maroc",
      "guide assurance professionnelle Maroc",
      "guide assurance entreprise Maroc",
      "guide assurance plaisance Maroc",
      "guide assurance accident Maroc",

      // Topics
      "conseil assurance auto Maroc",
      "conseil assurance habitation Maroc",
      "conseil assurance moto Maroc",
      "conseil assurance santé Maroc",
      "conseil assurance voyage Maroc",
      "conseil assurance professionnelle Maroc",
      "conseil assurance entreprise Maroc",
      "conseil assurance plaisance Maroc",
      "conseil assurance accident Maroc",

      // Tips and advice
      "astuce assurance Maroc",
      "truc assurance Maroc",
      "tip assurance Maroc",
      "conseil pratique assurance Maroc",
      "aide assurance Maroc",
      "assistance assurance Maroc",
      "support assurance Maroc",
      "accompagnement assurance Maroc",

      // Market information
      "marché assurance Maroc",
      "évolution assurance Maroc",
      "tendance assurance Maroc",
      "réglementation assurance Maroc",
      "loi assurance Maroc",
      "réforme assurance Maroc",
      "changement assurance Maroc",
      "innovation assurance Maroc",

      // Companies and products
      "comparatif assurance Maroc",
      "test assurance Maroc",
      "avis assurance Maroc",
      "évaluation assurance Maroc",
      "notation assurance Maroc",
      "classement assurance Maroc",
      "ranking assurance Maroc",
      "meilleure assurance Maroc",

      // Geographic
      "actualités assurance Casablanca",
      "actualités assurance Rabat",
      "actualités assurance Marrakech",
      "actualités assurance Fès",
      "actualités assurance Meknès",
      "actualités assurance Agadir",
      "actualités assurance Tanger",
      "actualités assurance Kenitra",
      "actualités assurance Oujda",
      "actualités assurance Tetouan",

      // Long-tail
      "meilleur blog assurance Maroc",
      "site assurance Maroc",
      "portail assurance Maroc",
      "magazine assurance Maroc",
      "journal assurance Maroc",
      "newsletter assurance Maroc",
      "alerte assurance Maroc",
      "notification assurance Maroc",
    ],
  },
  CONTACT: {
    title: "Contact - TRT Broker Maroc | Devis Gratuit Assurance",
    description:
      "Contactez TRT Broker au Maroc pour vos questions d'assurance. Devis gratuit et conseil personnalisé. Notre équipe d'experts vous accompagne.",
    keywords: [
      // Core contact
      "contact Maroc",
      "contact TRT Broker",
      "contact courtier assurance Maroc",
      "contact assurance Maroc",
      "joindre courtier assurance Maroc",
      "appeler courtier assurance Maroc",
      "écrire courtier assurance Maroc",

      // Services
      "devis gratuit Maroc",
      "devis assurance gratuit Maroc",
      "devis assurance instantané Maroc",
      "devis assurance en ligne Maroc",
      "devis assurance rapide Maroc",
      "conseil assurance Maroc",
      "conseil gratuit assurance Maroc",
      "conseil personnalisé assurance Maroc",
      "information assurance Maroc",
      "renseignement assurance Maroc",
      "aide assurance Maroc",
      "assistance assurance Maroc",

      // Contact methods
      "téléphone courtier assurance Maroc",
      "email courtier assurance Maroc",
      "adresse courtier assurance Maroc",
      "localisation courtier assurance Maroc",
      "rendez-vous courtier assurance Maroc",
      "visite courtier assurance Maroc",
      "entretien courtier assurance Maroc",

      // Geographic contact
      "contact assurance Casablanca",
      "contact assurance Rabat",
      "contact assurance Marrakech",
      "contact assurance Fès",
      "contact assurance Meknès",
      "contact assurance Agadir",
      "contact assurance Tanger",
      "contact assurance Kenitra",
      "contact assurance Oujda",
      "contact assurance Tetouan",

      // Support
      "support assurance Maroc",
      "aide client assurance Maroc",
      "service client assurance Maroc",
      "service après-vente assurance Maroc",
      "suivi client assurance Maroc",
      "accompagnement client assurance Maroc",
      "relation client assurance Maroc",

      // TRT Broker specific contact
      "contact TRT Broker Casablanca",
      "contact TRT Broker Maroc",
      "joindre TRT Broker",
      "appeler TRT Broker",
      "écrire TRT Broker",
      "rendez-vous TRT Broker",
      "visite TRT Broker",
      "entretien TRT Broker",
      "consultation TRT Broker",
      "audit TRT Broker",
      "devis TRT Broker",
      "conseil TRT Broker",
      "information TRT Broker",
      "renseignement TRT Broker",
      "aide TRT Broker",
      "assistance TRT Broker",
      "support TRT Broker",
      "accompagnement TRT Broker",
      "suivi TRT Broker",
      "gestion TRT Broker",

      // Long-tail
      "comment contacter courtier assurance Maroc",
      "où trouver courtier assurance Maroc",
      "meilleur courtier assurance Maroc contact",
      "courtier assurance fiable Maroc contact",
      "courtier assurance sérieux Maroc contact",
      "courtier assurance professionnel Maroc contact",
      "courtier assurance expert Maroc contact",
      "courtier assurance recommandé Maroc contact",
      "comment contacter TRT Broker",
      "où trouver TRT Broker",
      "meilleur courtier assurance Casablanca contact",
      "courtier assurance fiable Casablanca contact",
      "courtier assurance sérieux Casablanca contact",
      "courtier assurance professionnel Casablanca contact",
      "courtier assurance expert Casablanca contact",
      "courtier assurance recommandé Casablanca contact",
      "cabinet courtage assurance Casablanca contact",
      "cabinet courtage indépendant Casablanca contact",
      "cabinet courtage professionnel Casablanca contact",
      "cabinet courtage expert Casablanca contact",
      "partenaire confiance assurance Maroc contact",
      "partenaire confiance assurance Casablanca contact",
      "partenaire fiable assurance Maroc contact",
      "partenaire fiable assurance Casablanca contact",
      "partenaire sérieux assurance Maroc contact",
      "partenaire sérieux assurance Casablanca contact",
      "partenaire professionnel assurance Maroc contact",
      "partenaire professionnel assurance Casablanca contact",
      "partenaire expert assurance Maroc contact",
      "partenaire expert assurance Casablanca contact",
    ],
  },
  FAQ: {
    title: "FAQ Assurance Maroc - Questions Fréquentes | TRT Broker",
    description:
      "Réponses aux questions les plus fréquentes sur l'assurance au Maroc. Trouvez rapidement les informations dont vous avez besoin avec TRT Broker.",
    keywords: [
      // Core FAQ
      "FAQ assurance Maroc",
      "questions fréquentes assurance Maroc",
      "aide assurance Maroc",
      "informations assurance Maroc",
      "réponses assurance Maroc",
      "solutions assurance Maroc",
      "problèmes assurance Maroc",
      "difficultés assurance Maroc",

      // Question types
      "comment assurance Maroc",
      "pourquoi assurance Maroc",
      "quand assurance Maroc",
      "où assurance Maroc",
      "combien assurance Maroc",
      "quelle assurance Maroc",
      "qui assurance Maroc",
      "quoi assurance Maroc",

      // Topics
      "FAQ assurance auto Maroc",
      "FAQ assurance habitation Maroc",
      "FAQ assurance moto Maroc",
      "FAQ assurance santé Maroc",
      "FAQ assurance voyage Maroc",
      "FAQ assurance professionnelle Maroc",
      "FAQ assurance entreprise Maroc",
      "FAQ assurance plaisance Maroc",
      "FAQ assurance accident Maroc",

      // Common questions
      "assurance obligatoire Maroc",
      "assurance facultative Maroc",
      "assurance recommandée Maroc",
      "assurance nécessaire Maroc",
      "assurance utile Maroc",
      "assurance importante Maroc",
      "assurance essentielle Maroc",
      "assurance indispensable Maroc",

      // Processes
      "comment souscrire assurance Maroc",
      "comment résilier assurance Maroc",
      "comment changer assurance Maroc",
      "comment renouveler assurance Maroc",
      "comment déclarer sinistre Maroc",
      "comment faire réclamation Maroc",
      "comment obtenir remboursement Maroc",
      "comment contester assurance Maroc",

      // Geographic
      "FAQ assurance Casablanca",
      "FAQ assurance Rabat",
      "FAQ assurance Marrakech",
      "FAQ assurance Fès",
      "FAQ assurance Meknès",
      "FAQ assurance Agadir",
      "FAQ assurance Tanger",
      "FAQ assurance Kenitra",
      "FAQ assurance Oujda",
      "FAQ assurance Tetouan",

      // Long-tail
      "aide en ligne assurance Maroc",
      "support en ligne assurance Maroc",
      "chat assurance Maroc",
      "assistance en ligne assurance Maroc",
      "service client assurance Maroc",
      "conseil gratuit assurance Maroc",
      "information gratuite assurance Maroc",
      "renseignement gratuit assurance Maroc",
    ],
  },
  CARRIERE: {
    title: "Carrières - Rejoignez TRT Broker Maroc | Emploi Assurance",
    description:
      "Rejoignez l'équipe TRT Broker au Maroc. Découvrez nos offres d'emploi et opportunités de carrière dans l'assurance. Postulez maintenant !",
    keywords: [
      // Core career
      "carrière assurance Maroc",
      "emploi assurance Maroc",
      "recrutement assurance Maroc",
      "offres d'emploi assurance Maroc",
      "opportunités carrière assurance Maroc",
      "poste assurance Maroc",
      "travail assurance Maroc",
      "job assurance Maroc",

      // Job types
      "emploi courtier assurance Maroc",
      "emploi conseiller assurance Maroc",
      "emploi commercial assurance Maroc",
      "emploi vendeur assurance Maroc",
      "emploi gestionnaire assurance Maroc",
      "emploi expert assurance Maroc",
      "emploi spécialiste assurance Maroc",
      "emploi analyste assurance Maroc",

      // Positions
      "poste courtier assurance Maroc",
      "poste conseiller assurance Maroc",
      "poste commercial assurance Maroc",
      "poste vendeur assurance Maroc",
      "poste gestionnaire assurance Maroc",
      "poste expert assurance Maroc",
      "poste spécialiste assurance Maroc",
      "poste analyste assurance Maroc",
      "poste directeur assurance Maroc",
      "poste manager assurance Maroc",

      // Skills and qualifications
      "compétences assurance Maroc",
      "qualifications assurance Maroc",
      "formation assurance Maroc",
      "diplôme assurance Maroc",
      "certification assurance Maroc",
      "licence assurance Maroc",
      "master assurance Maroc",
      "expérience assurance Maroc",

      // Company culture
      "culture d'entreprise TRT Broker",
      "valeurs TRT Broker",
      "mission TRT Broker",
      "vision TRT Broker",
      "équipe TRT Broker",
      "collaborateurs TRT Broker",
      "employés TRT Broker",
      "salariés TRT Broker",

      // Benefits
      "avantages sociaux assurance Maroc",
      "salaire assurance Maroc",
      "rémunération assurance Maroc",
      "prime assurance Maroc",
      "commission assurance Maroc",
      "formation professionnelle assurance Maroc",
      "évolution carrière assurance Maroc",
      "promotion assurance Maroc",

      // Geographic
      "emploi assurance Casablanca",
      "emploi assurance Rabat",
      "emploi assurance Marrakech",
      "emploi assurance Fès",
      "emploi assurance Meknès",
      "emploi assurance Agadir",
      "emploi assurance Tanger",
      "emploi assurance Kenitra",
      "emploi assurance Oujda",
      "emploi assurance Tetouan",

      // Application process
      "candidature assurance Maroc",
      "postuler assurance Maroc",
      "CV assurance Maroc",
      "lettre de motivation assurance Maroc",
      "entretien assurance Maroc",
      "recrutement assurance Maroc",
      "sélection assurance Maroc",
      "processus recrutement assurance Maroc",

      // TRT Broker specific career
      "emploi TRT Broker",
      "carrière TRT Broker",
      "recrutement TRT Broker",
      "offres emploi TRT Broker",
      "postuler TRT Broker",
      "candidater TRT Broker",
      "rejoindre TRT Broker",
      "intégrer TRT Broker",
      "travailler TRT Broker",
      "collaborer TRT Broker",
      "participer TRT Broker",
      "contribuer TRT Broker",
      "évoluer TRT Broker",
      "grandir TRT Broker",
      "développer TRT Broker",
      "progresser TRT Broker",
      "avancer TRT Broker",
      "réussir TRT Broker",
      "exceller TRT Broker",
      "briller TRT Broker",

      // TRT Broker company culture
      "culture TRT Broker",
      "valeurs TRT Broker",
      "mission TRT Broker",
      "vision TRT Broker",
      "équipe TRT Broker",
      "collaborateurs TRT Broker",
      "employés TRT Broker",
      "salariés TRT Broker",
      "membres TRT Broker",
      "partenaires TRT Broker",
      "alliances TRT Broker",
      "réseau TRT Broker",
      "communauté TRT Broker",
      "famille TRT Broker",
      "esprit TRT Broker",
      "ambiance TRT Broker",
      "atmosphère TRT Broker",
      "environnement TRT Broker",
      "milieu TRT Broker",
      "contexte TRT Broker",

      // Long-tail
      "comment postuler assurance Maroc",
      "où postuler assurance Maroc",
      "meilleur employeur assurance Maroc",
      "entreprise assurance recommandée Maroc",
      "société assurance sérieuse Maroc",
      "compagnie assurance fiable Maroc",
      "groupe assurance professionnel Maroc",
      "organisation assurance experte Maroc",
      "comment postuler TRT Broker",
      "où postuler TRT Broker",
      "meilleur employeur assurance Casablanca",
      "entreprise assurance recommandée Casablanca",
      "société assurance sérieuse Casablanca",
      "compagnie assurance fiable Casablanca",
      "groupe assurance professionnel Casablanca",
      "organisation assurance experte Casablanca",
      "cabinet courtage assurance emploi Casablanca",
      "cabinet courtage indépendant emploi Casablanca",
      "cabinet courtage professionnel emploi Casablanca",
      "cabinet courtage expert emploi Casablanca",
      "partenaire confiance assurance emploi Maroc",
      "partenaire confiance assurance emploi Casablanca",
      "partenaire fiable assurance emploi Maroc",
      "partenaire fiable assurance emploi Casablanca",
      "partenaire sérieux assurance emploi Maroc",
      "partenaire sérieux assurance emploi Casablanca",
      "partenaire professionnel assurance emploi Maroc",
      "partenaire professionnel assurance emploi Casablanca",
      "partenaire expert assurance emploi Maroc",
      "partenaire expert assurance emploi Casablanca",
    ],
  },
};

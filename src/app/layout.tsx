import WhatsAppWidget from "@/app/components/whatsapp/WhatsAppWidget";
import { generateStructuredData } from "@/lib/seo";
import { HeroUIProvider } from "@heroui/system";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trtbroker.com"),
  title: {
    default: "TRT Broker - Courtier en Assurance au Maroc",
    template: "%s | TRT Broker",
  },
  description:
    "TRT Broker, courtier en assurance au Maroc avec +40 ans d'expertise. Solutions d'assurance automobile, habitation, santé, voyage pour particuliers, professionnels et entreprises. Devis gratuit en ligne.",
  keywords: [
    // Main keywords
    "courtier assurance Maroc",
    "assurance Maroc",
    "TRT Broker",
    // Product keywords
    "assurance automobile Maroc",
    "assurance habitation Maroc",
    "assurance santé Maroc",
    "assurance voyage Maroc",
    "assurance entreprise Maroc",
    "assurance professionnelle Maroc",
    // Location keywords
    "courtier Casablanca",
    "assurance Rabat",
    // Action keywords
    "devis assurance gratuit",
    "souscription en ligne",
    "comparateur assurance Maroc",
  ],
  authors: [{ name: "TRT Broker" }],
  creator: "TRT Broker",
  publisher: "TRT Broker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://trtbroker.com",
    siteName: "TRT Broker",
    title: "TRT Broker - Courtier en Assurance au Maroc | +40 ans d'expertise",
    description:
      "Courtier en assurance de confiance au Maroc. Solutions personnalisées pour particuliers, professionnels et entreprises. Devis gratuit et souscription 100% en ligne.",
    images: [
      {
        url: "/logo-trt-broker.png", // TODO: Create dedicated og-image.jpg (1200x630px)
        width: 1200,
        height: 630,
        alt: "TRT Broker - Votre courtier en assurance au Maroc",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@trtbroker",
    creator: "@trtbroker",
    title: "TRT Broker - Courtier en Assurance au Maroc | +40 ans d'expertise",
    description:
      "Courtier en assurance de confiance au Maroc. Solutions personnalisées pour particuliers, professionnels et entreprises.",
    images: ["/logo-trt-broker.png"], // TODO: Create dedicated og-image.jpg (1200x630px)
  },
  verification: {
    google: "your-google-site-verification-code", // TODO: Replace with actual code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://trtbroker.com",
    languages: {
      "fr-MA": "https://trtbroker.com",
    },
  },
  category: "Insurance",
  classification: "Business",
  other: {
    // Geographic metadata
    "geo.region": "MA",
    "geo.placename": "Morocco",
    "geo.position": "33.5731;-7.5898",
    ICBM: "33.5731, -7.5898",
    // Business metadata
    "contact:country-name": "Morocco",
    "contact:locality": "Casablanca",
    "contact:region": "Casablanca-Settat",
    // Indexing directives
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    googlebot:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    // Language
    language: "French",
    "content-language": "fr-MA",
    // Rating
    rating: "General",
    // Mobile
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "TRT Broker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for organization
  const organizationData = generateStructuredData("Organization", {});
  const localBusinessData = generateStructuredData("LocalBusiness", {});
  const websiteData = generateStructuredData("WebSite", {});

  return (
    <html lang="fr">
      <head>
        {/* Additional meta tags for enhanced crawling */}
        <meta name="bingbot" content="index, follow, max-image-preview:large" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="theme-color" content="#739A38" />
        <meta name="format-detection" content="telephone=no" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteData),
          }}
        />

        <HeroUIProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
                zIndex: 9999,
              },
              success: {
                duration: 5000,
                style: {
                  background: "#10B981",
                  color: "#fff",
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: "#EF4444",
                  color: "#fff",
                },
              },
            }}
          />
          <WhatsAppWidget />
        </HeroUIProvider>
      </body>
    </html>
  );
}

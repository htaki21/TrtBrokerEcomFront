import { MetadataRoute } from "next";

/**
 * Enterprise-Level Robots.txt Configuration
 *
 * This file controls how search engines crawl and index the website.
 * It includes specific rules for different crawlers and disallows sensitive areas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. GOOGLE & MAJOR SEARCH ENGINES - Full Access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/*", // Block API endpoints
          "/admin/*", // Block admin pages if they exist
          "/_next/*", // Block Next.js internals
          "/devis-*/*", // Block deep devis steps (allow only entry pages)
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // 2. BING - Full Access
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/_next/*", "/devis-*/*"],
      },
      // 3. OTHER MAJOR CRAWLERS - Full Access
      {
        userAgent: ["DuckDuckBot", "Slurp"], // Yahoo
        allow: "/",
        disallow: ["/api/*", "/admin/*", "/_next/*"],
      },
      // 4. BAD BOTS & SCRAPERS - Block Completely
      {
        userAgent: [
          "SemrushBot",
          "AhrefsBot",
          "MJ12bot",
          "DotBot",
          "BLEXBot",
          "PetalBot",
        ],
        disallow: "/",
      },
      // 5. ALL OTHER BOTS - Restricted Access
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*", // Always block API
          "/admin/*", // Always block admin
          "/_next/*", // Block Next.js internals
          "/devis-*/*", // Block multi-step form internals
        ],
        crawlDelay: 10, // Prevent server overload
      },
    ],
    sitemap: "https://trtbroker.com/sitemap.xml",
  };
}

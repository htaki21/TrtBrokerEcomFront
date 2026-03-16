import type { NextConfig } from "next";

// Build dynamic image domains from NEXT_PUBLIC_STRAPI_API_URL
function getStrapiImagePatterns(): NextConfig["images"] {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const patterns: { protocol: "http" | "https"; hostname: string; port: string; pathname: string }[] = [];

  if (strapiUrl) {
    try {
      const url = new URL(strapiUrl);
      patterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || "",
        pathname: "/uploads/**",
      });
    } catch {}
  }

  // Always allow the main site domain
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      const url = new URL(siteUrl);
      patterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || "",
        pathname: "/**",
      });
    } catch {}
  }

  // Fallback for local dev
  if (patterns.length === 0) {
    patterns.push(
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "https", hostname: "backoffice.trtbroker.com", port: "", pathname: "/uploads/**" },
    );
  }

  return { remotePatterns: patterns };
}

const nextConfig: NextConfig = {
  images: getStrapiImagePatterns(),
  // Enable experimental features for better caching
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic content
      static: 180, // 3 minutes for static content
    },
  },
  // Add headers for better caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/actualites-conseils/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=300, s-maxage=600, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

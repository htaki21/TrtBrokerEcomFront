import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trtbroker.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "backoffice.trtbroker.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
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

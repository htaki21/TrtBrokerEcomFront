import {
  checkRateLimit,
  detectSuspiciousInput,
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check for blog API
    const rateLimitResult = checkRateLimit(request, "/api/blogs");
    if (!rateLimitResult.allowed) {
      logSecurityEvent(
        "RATE_LIMIT_EXCEEDED",
        {
          endpoint: "/api/blogs",
          ip: getClientIP(request),
          userAgent: request.headers.get("user-agent"),
        },
        request,
      );

      return NextResponse.json(
        {
          error: "Too many requests. Please wait before trying again.",
          retryAfter: Math.ceil(
            (rateLimitResult.resetTime - Date.now()) / 1000,
          ),
        },
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            "Retry-After": Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000,
            ).toString(),
          },
        },
      );
    }

    const { searchParams } = new URL(request.url);

    // Extract and validate query parameters
    const pageParam = searchParams.get("page") || "1";
    const pageSizeParam = searchParams.get("pageSize") || "12";
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "createdAt:desc";

    // Validate numeric parameters
    const page = Math.max(1, Math.min(1000, parseInt(pageParam, 10) || 1));
    const pageSize = Math.max(
      1,
      Math.min(100, parseInt(pageSizeParam, 10) || 12),
    );

    // Validate sort parameter against whitelist
    const allowedSorts = [
      "createdAt:desc",
      "createdAt:asc",
      "titre:asc",
      "titre:desc",
    ];
    const validatedSort = allowedSorts.includes(sort) ? sort : "createdAt:desc";

    // Build Strapi URL - use internal Docker network in production
    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    let url = `${strapiUrl}/api/blogs?`;
    url += `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    url += `&sort[0]=${validatedSort}`;
    url += `&populate[categorie][populate]=*&populate[image]=true`;

    // Add category filter if provided - validate against potential injection
    if (category && category !== "all") {
      // Sanitize category input
      const sanitizedCategory = category
        .replace(/[^a-zA-Z0-9\-_]/g, "")
        .substring(0, 50);

      if (sanitizedCategory && !detectSuspiciousInput(sanitizedCategory)) {
        url += `&filters[categorie][slug][$eq]=${encodeURIComponent(sanitizedCategory)}`;
      }
    }

    // Add search filter if provided
    if (search) {
      // Sanitize: allow letters (including French accents), digits, spaces, hyphens, apostrophes
      const sanitizedSearch = search
        .trim()
        .replace(/[<>]/g, "")
        .replace(/['"`;\\]/g, "")
        .replace(/--/g, "")
        .replace(/\.\./g, "")
        .replace(/[|&;$`{}]/g, "")
        .replace(/\s+/g, " ")
        .replace(/[^\p{L}\p{N}\s\-_.]/gu, "") // Allow all Unicode letters (French accents) + digits + spaces + hyphens
        .substring(0, 80);

      if (sanitizedSearch && !detectSuspiciousInput(sanitizedSearch)) {
        // Split into words and search each word independently for better multi-word matching
        const words = sanitizedSearch.split(" ").filter((w) => w.length >= 2);
        if (words.length === 1) {
          // Single word: search in title, slug, and category
          url += `&filters[$or][0][titre][$containsi]=${encodeURIComponent(words[0])}`;
          url += `&filters[$or][1][slug][$containsi]=${encodeURIComponent(words[0])}`;
          url += `&filters[$or][2][categorie][nom][$containsi]=${encodeURIComponent(words[0])}`;
        } else {
          // Multiple words: each word must match the title (AND logic)
          words.forEach((word, i) => {
            url += `&filters[$and][${i}][titre][$containsi]=${encodeURIComponent(word)}`;
          });
        }
      }
    }

    // Fetch from Strapi
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: ["blogs", "all"], // Add cache tags
      },
    });

    if (!response.ok) {
      console.error(`❌ Strapi API error: ${response.status}`);
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: getSecurityHeaders(),
    });
  } catch (error) {
    console.error("Blog API error:", error);

    // Log security event for API errors
    logSecurityEvent(
      "API_ERROR",
      {
        endpoint: "/api/blogs",
        ip: getClientIP(request),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      request,
    );

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    );
  }
}

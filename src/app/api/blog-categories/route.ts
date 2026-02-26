import {
  checkRateLimit,
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Rate limiting check for blog categories API
    const rateLimitResult = checkRateLimit(request, "/api/blog-categories");
    if (!rateLimitResult.allowed) {
      logSecurityEvent(
        "RATE_LIMIT_EXCEEDED",
        {
          endpoint: "/api/blog-categories",
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

    // Build Strapi URL for blog categories - use internal Docker network in production
    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const url = `${strapiUrl}/api/categories?sort[0]=nom:asc`;

    // Fetch from Strapi
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // Revalidate every hour (categories change less frequently)
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: getSecurityHeaders(),
    });
  } catch (error) {
    console.error("Blog categories API error:", error);

    // Log security event for API errors
    logSecurityEvent(
      "API_ERROR",
      {
        endpoint: "/api/blog-categories",
        ip: getClientIP(request),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      request,
    );

    return NextResponse.json(
      { error: "Failed to fetch blog categories" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    );
  }
}

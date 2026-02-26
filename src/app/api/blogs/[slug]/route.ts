import {
  detectSuspiciousInput,
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
} from "@/lib/security";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // No rate limiting for blog posts (public content)

    const { slug } = await params;

    // Validate and sanitize slug parameter - allow more URL-safe characters
    const sanitizedSlug = slug
      .replace(/[^a-zA-Z0-9\-_\.]/g, "") // Allow alphanumeric, hyphens, underscores, dots
      .substring(0, 100); // Reasonable length limit

    // Check for suspicious patterns in slug - be less strict for blog slugs
    if (
      !sanitizedSlug ||
      sanitizedSlug.length < 3 ||
      detectSuspiciousInput(slug)
    ) {
      logSecurityEvent(
        "SUSPICIOUS_SLUG_ACCESS",
        {
          endpoint: "/api/blogs/[slug]",
          ip: getClientIP(request),
          userAgent: request.headers.get("user-agent"),
          originalSlug: slug,
          sanitizedSlug: sanitizedSlug,
        },
        request,
      );

      return NextResponse.json(
        { error: "Invalid blog slug" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      );
    }

    // Build Strapi URL for single blog post - use internal Docker network in production
    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const url = `${strapiUrl}/api/blogs?filters[slug]=${encodeURIComponent(slug)}&populate[categorie][populate]=*&populate[image]=true`;

    // Fetch from Strapi with better error handling and retry logic
    let response;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 3600, // Revalidate every hour (longer cache)
            tags: ["blog", slug], // Add cache tags for better invalidation
          },
        });

        if (response.ok) {
          break; // Success, exit retry loop
        }

        if (response.status === 404) {
          return NextResponse.json(
            { error: "Blog post not found" },
            { status: 404, headers: getSecurityHeaders() },
          );
        }

        if (response.status >= 500) {
          // Server error, retry
          retryCount++;
          if (retryCount < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, retryCount * 1000),
            );
            continue;
          }
        }

        throw new Error(`Strapi API error: ${response.status}`);
      } catch (error) {
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, retryCount * 1000),
          );
          continue;
        }
        throw error;
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500, headers: getSecurityHeaders() },
      );
    }

    const data = await response.json();

    // Return the first blog post (should be unique by slug)
    if (data.data && data.data.length > 0) {
      return NextResponse.json(data.data[0]);
    } else {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Blog API error:", error);

    // Log security event for API errors
    logSecurityEvent(
      "API_ERROR",
      {
        endpoint: "/api/blogs/[slug]",
        ip: getClientIP(request),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      request,
    );

    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    );
  }
}

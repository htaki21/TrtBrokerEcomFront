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

    // Add search filter if provided with comprehensive sanitization
    if (search) {
      // Comprehensive sanitization to prevent all types of injection attacks
      const sanitizedSearch = search
        .trim()
        // XSS Protection
        .replace(/[<>]/g, "") // Remove HTML tags
        .replace(/javascript:/gi, "") // Remove javascript protocol
        .replace(/on\w+=/gi, "") // Remove event handlers
        .replace(/data:/gi, "") // Remove data URLs
        .replace(/vbscript:/gi, "") // Remove vbscript
        .replace(/eval\s*\(/gi, "") // Remove eval calls
        .replace(/expression\s*\(/gi, "") // Remove CSS expressions

        // SQL Injection Protection (enhanced patterns)
        .replace(/['"`;\\]/g, "") // Remove SQL injection characters
        .replace(/--/g, "") // Remove SQL comments
        .replace(/\/\*/g, "") // Remove SQL block comment start
        .replace(/\*\//g, "") // Remove SQL block comment end
        .replace(
          /\b(select|from|union|insert|update|delete|drop|create|alter|exec|execute|script|xp_cmdshell|sp_executesql)\b/gi,
          "",
        ) // Remove SQL keywords
        .replace(/\b(or|and)\s*(1\s*=\s*1|true|false)\b/gi, "") // Remove SQL boolean injections
        .replace(/\|\||&&/g, "") // Remove logical operators that could be used in injections

        // NoSQL Injection Protection
        .replace(/\$\w+/g, "") // Remove MongoDB operators
        .replace(/\{|\}/g, "") // Remove JSON-like structures

        // Directory Traversal Protection
        .replace(/\.\./g, "") // Remove directory traversal
        .replace(/[\\\/]/g, "") // Remove path separators

        // Command Injection Protection
        .replace(/[|&;$`]/g, "") // Remove command injection characters
        .replace(/\$\(/g, "") // Remove command substitution

        // Additional security measures
        .replace(/\s+/g, " ") // Normalize multiple spaces to single space
        .replace(/[^\w\s\-_.]/g, "") // Only allow alphanumeric, spaces, hyphens, underscores, dots
        .substring(0, 50); // Reasonable limit for search queries

      // Check for suspicious patterns after sanitization
      if (sanitizedSearch && !detectSuspiciousInput(sanitizedSearch)) {
        url += `&filters[$or][0][titre][$containsi]=${encodeURIComponent(sanitizedSearch)}&`;
        url += `filters[$or][1][slug][$containsi]=${encodeURIComponent(sanitizedSearch)}&`;
        url += `filters[$or][2][categorie][nom][$containsi]=${encodeURIComponent(sanitizedSearch)}`;
      } else if (search !== sanitizedSearch && detectSuspiciousInput(search)) {
        // Log suspicious search attempts
        logSecurityEvent(
          "SUSPICIOUS_SEARCH_ATTEMPT",
          {
            endpoint: "/api/blogs",
            ip: getClientIP(request),
            userAgent: request.headers.get("user-agent"),
            originalSearch: search,
            sanitizedSearch: sanitizedSearch,
          },
          request,
        );
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

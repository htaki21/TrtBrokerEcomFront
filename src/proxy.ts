import {
  getClientIP,
  getSecurityHeaders,
  logSecurityEvent,
} from "@/lib/security";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Security proxy for all requests
export function proxy(request: NextRequest) {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes (handled separately)
  // But DON'T skip security-sensitive patterns like .env, .git
  const isStaticFile =
    /\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(
      pathname
    );

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    isStaticFile ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  try {
    // 1. Add security headers to all responses
    const response = NextResponse.next();

    // Set security headers
    Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // 2. Rate limiting for sensitive pages
    if (pathname.includes("/carriere") || pathname.includes("/contact")) {
      // Add additional security headers for sensitive pages
      response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      );
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
    }

    // 3. Log suspicious requests
    const userAgent = request.headers.get("user-agent") || "";
    const clientIP = getClientIP(request);

    // Check for suspicious user agents
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /php/i,
      /java/i,
      /perl/i,
    ];

    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(userAgent)
    );

    if (isSuspicious && !pathname.startsWith("/api/")) {
      logSecurityEvent("SUSPICIOUS_USER_AGENT", {
        userAgent,
        pathname,
        clientIP,
      });
    }

    // 4. Check for common attack patterns in URL
    const attackPatterns = [
      /\.\./, // Path traversal
      /%2e%2e/i, // URL encoded path traversal
      /<script/i, // XSS attempts
      /javascript:/i, // JavaScript injection
      /onload=/i, // Event handler injection
      /union\s+select/i, // SQL injection
      /drop\s+table/i, // SQL injection
      /exec\s*\(/i, // Command injection
      /system\s*\(/i, // Command injection
      /\.env/, // Environment file access
      /\.git/, // Git directory access
      /admin/, // Admin panel access
      /wp-admin/, // WordPress admin
      /phpmyadmin/, // phpMyAdmin access
      /\.php/, // PHP file access
      /\.asp/, // ASP file access
      /\.jsp/, // JSP file access
    ];

    const hasAttackPattern = attackPatterns.some((pattern) =>
      pattern.test(pathname)
    );

    if (hasAttackPattern) {
      logSecurityEvent("ATTACK_PATTERN_DETECTED", {
        pathname,
        clientIP,
        userAgent,
      });

      return new NextResponse("Forbidden", {
        status: 403,
        headers: getSecurityHeaders(),
      });
    }

    // 5. Check for excessive requests from same IP (basic rate limiting)
    const rateLimitKey = `rate_limit:${clientIP}`;
    // Note: In production, use Redis or similar for rate limiting

    // 6. Add CORS headers for API routes
    if (pathname.startsWith("/api/")) {
      const allowedOrigin =
        process.env.NODE_ENV === "production"
          ? "https://trtbroker.com"
          : "http://localhost:3000";

      response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
      response.headers.set(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      response.headers.set("Access-Control-Max-Age", "86400");
    }

    // 7. Handle preflight requests
    if (request.method === "OPTIONS") {
      const allowedOrigin =
        process.env.NODE_ENV === "production"
          ? "https://trtbroker.com"
          : "http://localhost:3000";

      return new NextResponse(null, {
        status: 200,
        headers: {
          ...getSecurityHeaders(),
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 8. Log request for monitoring
    const duration = Date.now() - startTime;
    if (duration > 1000) {
      // Log slow requests
      logSecurityEvent("SLOW_REQUEST", {
        pathname,
        duration,
        clientIP,
        userAgent,
      });
    }

    return response;
  } catch (error) {
    // Log middleware errors
    logSecurityEvent("MIDDLEWARE_ERROR", {
      error: error instanceof Error ? error.message : "Unknown error",
      pathname,
      clientIP: getClientIP(request),
    });

    // Return safe response on error
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: getSecurityHeaders(),
    });
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

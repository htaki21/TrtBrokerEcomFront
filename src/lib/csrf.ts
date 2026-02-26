import { NextRequest } from "next/server";
import { generateCSRFToken, getClientIP, validateCSRFToken } from "./security";

// CSRF token storage (in production, use Redis or database)
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Generate CSRF token for a session
export function generateCSRFTokenForSession(sessionId: string): string {
  const token = generateCSRFToken();
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour

  csrfTokens.set(sessionId, { token, expires });

  // Clean up expired tokens
  cleanupExpiredTokens();

  return token;
}

// Validate CSRF token for a session
export function validateCSRFTokenForSession(
  sessionId: string,
  token: string
): boolean {
  const stored = csrfTokens.get(sessionId);

  if (!stored || Date.now() > stored.expires) {
    csrfTokens.delete(sessionId);
    return false;
  }

  const isValid = validateCSRFToken(token, stored.token);

  if (!isValid) {
    csrfTokens.delete(sessionId);
  }

  return isValid;
}

// Get CSRF token from request headers
export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  return (
    request.headers.get("x-csrf-token") ||
    request.headers.get("csrf-token") ||
    null
  );
}

// Get session ID from request (simplified - in production use proper session management)
export function getSessionIdFromRequest(request: NextRequest): string {
  // Try to get from cookie first
  const cookieSessionId = request.cookies.get("session-id")?.value;
  if (cookieSessionId) {
    return cookieSessionId;
  }

  // Fallback to IP-based session using improved IP detection
  const clientIP = getClientIP(request);

  return `ip-${clientIP}`;
}

// Clean up expired tokens
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now > data.expires) {
      csrfTokens.delete(sessionId);
    }
  }
}

// Clean up expired tokens every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000);

// CSRF middleware for API routes
export function withCSRFProtection(
  handler: (request: NextRequest) => Promise<Response>,
  options: { requireCSRF?: boolean } = { requireCSRF: true }
) {
  return async (request: NextRequest): Promise<Response> => {
    if (!options.requireCSRF) {
      return handler(request);
    }

    const sessionId = getSessionIdFromRequest(request);
    const token = getCSRFTokenFromRequest(request);

    if (!token || !validateCSRFTokenForSession(sessionId, token)) {
      return new Response(
        JSON.stringify({ error: "Token CSRF invalide ou manquant" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return handler(request);
  };
}

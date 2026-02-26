// Enterprise-level security configuration for TRT Broker

export const SECURITY_CONFIG = {
  // Rate limiting configuration
  RATE_LIMITS: {
    // API endpoints
    "/api/send-career": { maxRequests: 3, windowMs: 15 * 60 * 1000 }, // 3 requests per 15 minutes
    "/api/send-contact": { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
    "/api/send-devis": { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
    "/api/upload-file": { maxRequests: 10, windowMs: 15 * 60 * 1000 }, // 10 requests per 15 minutes
    "/api/serve-file": { maxRequests: 20, windowMs: 15 * 60 * 1000 }, // 20 requests per 15 minutes

    // Form endpoints with stricter limits
    "/carriere": { maxRequests: 2, windowMs: 60 * 60 * 1000 }, // 2 requests per hour
    "/contact": { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
  },

  // File upload security
  FILE_UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_FILES_PER_REQUEST: 1,
    ALLOWED_TYPES: [
      // Documents
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
      "text/plain",
      "text/csv",
      "application/rtf",
      // Images
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/bmp",
      "image/tiff",
    ],
    ALLOWED_EXTENSIONS: [
      // Documents
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
      ".txt",
      ".csv",
      ".rtf",
      // Images
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".bmp",
      ".tiff",
      ".tif",
    ],
    DANGEROUS_PATTERNS: [
      /\.exe$/i,
      /\.bat$/i,
      /\.cmd$/i,
      /\.com$/i,
      /\.pif$/i,
      /\.scr$/i,
      /\.vbs$/i,
      /\.js$/i,
      /\.jar$/i,
      /\.app$/i,
      /\.deb$/i,
      /\.pkg$/i,
      /\.rpm$/i,
      /\.dmg$/i,
      /\.iso$/i,
      /\.zip$/i,
      /\.rar$/i,
      /\.7z$/i,
    ],
    SCAN_CONTENT: true, // Enable content scanning for uploaded files
  },

  // Input validation
  INPUT_VALIDATION: {
    MAX_STRING_LENGTH: 1000,
    MAX_EMAIL_LENGTH: 254,
    MAX_PHONE_LENGTH: 15,
    SUSPICIOUS_PATTERNS: [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /expression\s*\(/i,
      /vbscript:/i,
      /data:/i,
      /blob:/i,
      /\.\.\//,
      /\.\.\\/,
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+set/i,
      /exec\s*\(/i,
      /system\s*\(/i,
      /shell_exec/i,
      /passthru/i,
      /file_get_contents/i,
      /fopen/i,
      /fwrite/i,
    ],
  },

  // CSRF protection
  CSRF: {
    TOKEN_LENGTH: 32,
    TOKEN_EXPIRY: 60 * 60 * 1000, // 1 hour
    REQUIRE_FOR_FORMS: true,
    REQUIRE_FOR_API: true,
  },

  // Security headers
  SECURITY_HEADERS: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },

  // Attack detection
  ATTACK_DETECTION: {
    // Patterns to detect in URLs and requests
    ATTACK_PATTERNS: [
      /\.\./,
      /%2e%2e/i,
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /union\s+select/i,
      /drop\s+table/i,
      /exec\s*\(/i,
      /system\s*\(/i,
      /\.env/,
      /\.git/,
      /admin/,
      /wp-admin/,
      /phpmyadmin/,
      /\.php/,
      /\.asp/,
      /\.jsp/,
    ],

    // Suspicious user agents
    SUSPICIOUS_USER_AGENTS: [
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
      /nikto/i,
      /sqlmap/i,
      /nmap/i,
      /masscan/i,
      /zap/i,
      /burp/i,
    ],

    // Request size limits
    MAX_REQUEST_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_HEADER_SIZE: 8192, // 8KB

    // Slow request threshold
    SLOW_REQUEST_THRESHOLD: 1000, // 1 second
  },

  // Session security
  SESSION: {
    TIMEOUT: 30 * 60 * 1000, // 30 minutes
    RENEW_ON_ACTIVITY: true,
    SECURE_COOKIES: true,
    HTTP_ONLY_COOKIES: true,
    SAME_SITE: "strict",
  },

  // Logging and monitoring
  LOGGING: {
    LOG_SECURITY_EVENTS: true,
    LOG_FAILED_ATTEMPTS: true,
    LOG_SUSPICIOUS_REQUESTS: true,
    LOG_FILE_UPLOADS: true,
    LOG_RATE_LIMIT_EXCEEDED: true,
    RETENTION_DAYS: 30,
  },

  // Email security
  EMAIL: {
    MAX_RECIPIENTS: 10,
    MAX_ATTACHMENTS: 5,
    MAX_ATTACHMENT_SIZE: 25 * 1024 * 1024, // 25MB
    SCAN_ATTACHMENTS: true,
    BLOCK_EXECUTABLES: true,
  },

  // Database security
  DATABASE: {
    MAX_QUERY_LENGTH: 10000,
    MAX_QUERY_TIME: 5000, // 5 seconds
    PREPARE_STATEMENTS: true,
    ESCAPE_STRINGS: true,
  },

  // API security
  API: {
    REQUIRE_HTTPS: true,
    REQUIRE_API_KEY: false, // Set to true for additional protection
    CORS_ORIGINS:
      process.env.NODE_ENV === "production"
        ? ["https://trtbroker.com"]
        : ["http://localhost:3000"],
    MAX_REQUESTS_PER_MINUTE: 60,
    MAX_REQUESTS_PER_HOUR: 1000,
  },

  // Content Security Policy
  CSP: {
    DIRECTIVES: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "https:"],
      "font-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
      "frame-ancestors": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
      "object-src": ["'none'"],
    },
  },

  // Environment-specific settings
  ENVIRONMENT: {
    DEVELOPMENT: {
      ENABLE_DEBUG_LOGGING: true,
      RELAXED_SECURITY: false,
      MOCK_RATE_LIMITING: false,
    },
    PRODUCTION: {
      ENABLE_DEBUG_LOGGING: false,
      RELAXED_SECURITY: false,
      MOCK_RATE_LIMITING: false,
      ENABLE_HONEYPOT: true,
      ENABLE_WAF: true,
    },
  },
};

// Security monitoring configuration
export const SECURITY_MONITORING = {
  // Thresholds for automatic actions
  THRESHOLDS: {
    MAX_FAILED_ATTEMPTS_PER_IP: 10,
    MAX_FAILED_ATTEMPTS_PER_HOUR: 50,
    MAX_SUSPICIOUS_REQUESTS_PER_IP: 5,
    MAX_FILE_UPLOADS_PER_IP: 20,
  },

  // Actions to take when thresholds are exceeded
  ACTIONS: {
    TEMPORARY_BAN_DURATION: 60 * 60 * 1000, // 1 hour
    PERMANENT_BAN_AFTER: 5, // 5 temporary bans
    NOTIFY_ADMIN_ON: [
      "PERMANENT_BAN",
      "MULTIPLE_FAILED_ATTEMPTS",
      "SUSPICIOUS_UPLOAD",
    ],
  },

  // Admin notification settings
  NOTIFICATIONS: {
    EMAIL_ADMIN_ON_CRITICAL: true,
    ADMIN_EMAIL: "security@trtbroker.com",
    SLACK_WEBHOOK: process.env.SLACK_SECURITY_WEBHOOK,
    DISCORD_WEBHOOK: process.env.DISCORD_SECURITY_WEBHOOK,
  },
};

// Security utilities
export const SECURITY_UTILS = {
  // Generate secure random strings
  generateSecureId: (length: number = 32): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Hash sensitive data
  hashSensitiveData: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  },

  // Validate file signature
  validateFileSignature: (buffer: Buffer, expectedType: string): boolean => {
    // File signature validation based on file type
    const signatures: Record<string, number[][]> = {
      // Documents
      "application/pdf": [[0x25, 0x50, 0x44, 0x46]], // %PDF
      "application/msword": [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]], // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [
          [0x50, 0x4b, 0x03, 0x04], // ZIP signature for DOCX
        ],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        [0x50, 0x4b, 0x03, 0x04], // ZIP signature for XLSX
      ],
      "text/plain": [[0x00], [0x20], [0x09], [0x0a], [0x0d]], // Text files (flexible)
      // Images
      "image/jpeg": [[0xff, 0xd8, 0xff]], // JPEG
      "image/jpg": [[0xff, 0xd8, 0xff]], // JPG
      "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]], // PNG
      "image/gif": [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
      ], // GIF87a, GIF89a
      "image/webp": [[0x52, 0x49, 0x46, 0x46]], // RIFF (WebP)
      "image/bmp": [[0x42, 0x4d]], // BM
      "image/tiff": [
        [0x49, 0x49, 0x2a, 0x00],
        [0x4d, 0x4d, 0x00, 0x2a],
      ], // TIFF
    };

    const expectedSignatures = signatures[expectedType];
    if (!expectedSignatures) return false;

    return expectedSignatures.some((signature) =>
      signature.every((byte, index) => buffer[index] === byte)
    );
  },
};

export default SECURITY_CONFIG;

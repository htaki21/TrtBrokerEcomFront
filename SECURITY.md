# TRT Broker Security Implementation

## Overview

This document outlines the comprehensive enterprise-level security measures implemented for the TRT Broker website to protect against brute force attacks, malicious file uploads, and other known security vulnerabilities.

## Security Features Implemented

### 1. Rate Limiting & Brute Force Protection

**Implementation**: `src/lib/security.ts`, `src/middleware/security.ts`

**Features**:

- **API Endpoint Rate Limiting**:
  - Career form: 3 requests per 15 minutes
  - Contact form: 5 requests per 15 minutes
  - Devis form: 5 requests per 15 minutes
  - File upload: 10 requests per 15 minutes
  - File serving: 20 requests per 15 minutes

- **Form Page Rate Limiting**:
  - Career page: 2 requests per hour
  - Contact page: 3 requests per hour

- **IP-based tracking** with automatic cleanup of expired entries
- **429 status codes** with `Retry-After` headers when limits exceeded

### 2. Input Validation & Sanitization

**Implementation**: `src/lib/security.ts`, `src/middleware/security.ts`

**Features**:

- **Comprehensive input sanitization** removing HTML tags, JavaScript, and malicious patterns
- **Email validation** with RFC-compliant regex and length limits
- **Phone number validation** for Morocco (10 digits)
- **Suspicious pattern detection** for XSS, SQL injection, and command injection attempts
- **String length limits** (1000 characters max for general input, 254 for emails)

**Blocked Patterns**:

- HTML/JavaScript injection: `<script>`, `javascript:`, `onload=`
- SQL injection: `UNION SELECT`, `DROP TABLE`, `INSERT INTO`
- Command injection: `exec()`, `system()`, `shell_exec`
- Path traversal: `../`, `%2e%2e`
- File system access: `file_get_contents`, `fopen`

### 3. File Upload Security

**Implementation**: `src/lib/security.ts`, `src/app/api/upload-file/route.ts`

**Features**:

- **File type validation**: Only PDF, DOC, DOCX allowed
- **File size limits**: 10MB maximum
- **Filename sanitization**: Removes special characters and path traversal attempts
- **Content type validation**: Server-side MIME type verification
- **Dangerous file pattern detection**: Blocks executables, scripts, and archive files

**Allowed File Types**:

- `application/pdf`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Blocked File Extensions**:

- Executables: `.exe`, `.bat`, `.cmd`, `.com`, `.pif`, `.scr`
- Scripts: `.vbs`, `.js`, `.jar`
- Archives: `.zip`, `.rar`, `.7z`
- System files: `.app`, `.deb`, `.pkg`, `.rpm`, `.dmg`, `.iso`

### 4. CSRF Protection

**Implementation**: `src/lib/csrf.ts`

**Features**:

- **Token generation**: 32-byte cryptographically secure tokens
- **Session-based validation**: Tokens tied to user sessions
- **Automatic expiration**: 1-hour token lifetime
- **Memory-based storage**: Automatic cleanup of expired tokens

### 5. Security Headers

**Implementation**: `src/lib/security.ts`, `src/middleware.ts`

**Headers Applied**:

- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Content-Security-Policy` - Comprehensive CSP rules
- `Strict-Transport-Security` - Enforces HTTPS
- `Permissions-Policy` - Controls browser features

### 6. Attack Detection & Monitoring

**Implementation**: `src/middleware.ts`, `src/lib/security.ts`

**Features**:

- **URL pattern detection**: Blocks common attack patterns in URLs
- **User agent analysis**: Identifies suspicious bots and scrapers
- **Request size limits**: 10MB maximum request size
- **Slow request monitoring**: Logs requests taking >1 second
- **Comprehensive logging**: All security events logged with timestamps

**Detected Attack Patterns**:

- Path traversal: `../`, `%2e%2e`
- XSS attempts: `<script>`, `javascript:`
- SQL injection: `UNION SELECT`, `DROP TABLE`
- Directory enumeration: `/admin`, `/wp-admin`, `/phpmyadmin`
- File access: `/.env`, `/.git`, `/*.php`

### 7. API Route Security

**Implementation**: `src/middleware/security.ts`

**Features**:

- **Request method validation**: Only POST allowed for form submissions
- **Content type validation**: Only `application/json` accepted
- **Request size validation**: Prevents oversized requests
- **Input sanitization**: All request data sanitized before processing
- **Security event logging**: Failed attempts and suspicious activity logged
- **Error handling**: Secure error responses without sensitive information

### 8. Email Security

**Implementation**: All API routes with email functionality

**Features**:

- **Attachment validation**: All email attachments validated
- **File size limits**: 25MB maximum per attachment
- **Content scanning**: Attachment content verified
- **Recipient limits**: Maximum 10 recipients per email
- **Secure error handling**: Email failures logged securely

## Security Configuration

### Environment Variables

Required security-related environment variables:

```bash
# SMTP Configuration (already configured)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Optional: Security monitoring
SLACK_SECURITY_WEBHOOK=your-slack-webhook
DISCORD_SECURITY_WEBHOOK=your-discord-webhook
```

### Rate Limiting Configuration

Rate limits can be adjusted in `src/lib/security-config.ts`:

```typescript
RATE_LIMITS: {
  '/api/send-career': { maxRequests: 3, windowMs: 15 * 60 * 1000 },
  '/api/send-contact': { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  // ... other endpoints
}
```

### File Upload Configuration

File upload settings in `src/lib/security-config.ts`:

```typescript
FILE_UPLOAD: {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  // ... other settings
}
```

## Security Monitoring

### Logged Events

The system logs the following security events:

- **Rate limit exceeded**: When users exceed request limits
- **Invalid file uploads**: Attempts to upload forbidden files
- **Suspicious input**: Detection of malicious patterns in form data
- **Attack patterns**: URLs containing known attack signatures
- **Failed form submissions**: Validation failures and errors
- **Slow requests**: Requests taking longer than expected

### Log Format

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "event": "RATE_LIMIT_EXCEEDED",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "details": {
    "endpoint": "/api/send-career",
    "attempts": 4
  }
}
```

## Security Best Practices

### For Developers

1. **Always validate input** on both client and server side
2. **Use prepared statements** for any database queries
3. **Sanitize output** when displaying user data
4. **Keep dependencies updated** to avoid known vulnerabilities
5. **Review security logs** regularly for suspicious activity

### For Administrators

1. **Monitor security logs** for attack attempts
2. **Review rate limit effectiveness** and adjust as needed
3. **Keep server software updated** with security patches
4. **Implement additional monitoring** for production environments
5. **Regular security audits** of the application

## Threat Mitigation

### Brute Force Attacks

- **Rate limiting** prevents rapid successive attempts
- **IP-based tracking** identifies persistent attackers
- **Automatic blocking** after multiple failed attempts
- **Logging and monitoring** for pattern analysis

### File Upload Attacks

- **Strict file type validation** prevents malicious uploads
- **Content scanning** detects hidden malicious content
- **Filename sanitization** prevents path traversal
- **Size limits** prevent DoS attacks via large files

### Injection Attacks

- **Input sanitization** removes malicious code
- **Pattern detection** identifies injection attempts
- **Output encoding** prevents XSS attacks
- **Parameterized queries** prevent SQL injection

### CSRF Attacks

- **Token validation** ensures requests are legitimate
- **Same-origin policy** enforced through headers
- **Session management** with secure tokens
- **Automatic token rotation** prevents token reuse

## Compliance

This security implementation helps ensure compliance with:

- **OWASP Top 10** security risks
- **GDPR** data protection requirements
- **ISO 27001** information security standards
- **Industry best practices** for web application security

## Maintenance

### Regular Tasks

1. **Review security logs** weekly
2. **Update rate limits** based on usage patterns
3. **Monitor for new attack patterns** and update detection rules
4. **Test security measures** with penetration testing
5. **Update dependencies** for security patches

### Emergency Procedures

1. **Immediate blocking** of suspicious IPs if needed
2. **Temporary rate limit reduction** during attacks
3. **Enhanced logging** for forensic analysis
4. **Communication plan** for security incidents

## Contact

For security-related questions or to report vulnerabilities:

- **Email**: security@trtbroker.com
- **Development Team**: Contact through established channels
- **Emergency**: Follow incident response procedures

---

_This security implementation provides enterprise-level protection for the TRT Broker website while maintaining usability and performance._

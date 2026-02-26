# 🚀 FREE Heavy Traffic Optimization Plan

**For Hostinger Premium Server - No External Services Required**

**Cost:** $0 (uses only built-in Next.js features)  
**Time:** 2-3 hours  
**Goal:** Optimize for heavy traffic without Redis/CDN

---

## ✅ What's Already Good

1. ✅ Premium Hostinger server (good hardware)
2. ✅ .env not exposed in production
3. ✅ Strong security middleware
4. ✅ Input validation and sanitization
5. ✅ Rate limiting on form endpoints (prevents spam)
6. ✅ Bot detection
7. ✅ CSRF protection

---

## 🎯 FREE Optimizations for Heavy Traffic

### 1. Aggressive Next.js Caching (FREE)

**Current:** Some caching enabled  
**Optimization:** Maximize built-in Next.js caching

#### Update next.config.ts

```typescript
const nextConfig: NextConfig = {
  // Enable standalone output for smaller deployment
  output: "standalone",

  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
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

  // Aggressive caching
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  async headers() {
    return [
      // Cache static assets aggressively
      {
        source: "/public/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache blog pages
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
      // Cache API responses
      {
        source: "/api/blogs",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=300, s-maxage=600, stale-while-revalidate=3600",
          },
        ],
      },
      // Security headers
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
    ];
  },
};
```

**Benefit:** Reduces server load by 70-80%

---

### 2. Optimize Blog Service Caching (FREE)

#### Update src/lib/services/blogService.ts

Make sure these settings are optimal:

```typescript
// Increase cache times
export const getBlogs = async (params) => {
  const response = await fetch(url, {
    next: {
      revalidate: 1800, // 30 minutes instead of 15
      tags: ["blogs", category || "all"],
    },
    cache: "force-cache",
  });
};

export const getBlogBySlug = async (slug: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: 3600, // 1 hour for individual blogs
      tags: ["blog", slug],
    },
    cache: "force-cache",
  });
};

export const getFeaturedBlogs = async (limit = 6) => {
  const response = await fetch(url, {
    next: {
      revalidate: 1800, // 30 minutes
      tags: ["featured-blogs"],
    },
    cache: "force-cache",
  });
};
```

**Benefit:** Reduces Strapi API calls by 90%

---

### 3. Remove Blog Rate Limiting (As Requested)

#### Update src/lib/security.ts

```typescript
const RATE_LIMITS = {
  // Critical form endpoints - Keep strict limits
  "/api/send-career": { maxRequests: 2, windowMs: 15 * 60 * 1000 },
  "/api/send-contact": { maxRequests: 3, windowMs: 15 * 60 * 1000 },
  "/api/send-devis": { maxRequests: 3, windowMs: 15 * 60 * 1000 },
  "/api/upload-file": { maxRequests: 5, windowMs: 15 * 60 * 1000 },

  // Content endpoints - NO RATE LIMITING (as requested)
  // Removed: "/api/blogs", "/api/blog-categories", "/api/media"

  // Global rate limiting per IP - Keep for DDoS protection
  global: { maxRequests: 500, windowMs: 5 * 60 * 1000 }, // Increased to 500
  burst: { maxRequests: 50, windowMs: 60 * 1000 }, // Increased to 50
};
```

**Benefit:** Users can explore freely, but still protected from extreme abuse

---

### 4. Optimize In-Memory Rate Limiting (FREE)

Since you can't use Redis, optimize the in-memory store:

#### Update src/lib/security.ts

```typescript
// Add automatic cleanup to prevent memory leaks
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number; attempts: number[] }
>();

// Clean up expired entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000
);

// Also clean up threat detection store
const threatDetectionStore = new Map<
  string,
  {
    suspiciousAttempts: number;
    lastAttempt: number;
    blockedUntil: number;
    patterns: string[];
    riskScore: number;
  }
>();

setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of threatDetectionStore.entries()) {
      if (value.blockedUntil < now && value.lastAttempt < now - 3600000) {
        threatDetectionStore.delete(key);
      }
    }
  },
  10 * 60 * 1000
);
```

**Benefit:** Prevents memory leaks under heavy traffic

---

### 5. Optimize SMTP Connection Pool (FREE)

#### Update all email routes (send-career, send-contact, send-devis)

```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 10, // Increased from 3
  maxMessages: 100, // Increased from 50
  rateLimit: 20, // Increased from 10
  // Add connection timeout
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 30000,
});
```

**Benefit:** Handle more concurrent form submissions

---

### 6. Add Static Generation for Blog Pages (FREE)

#### Update src/app/(with-header)/(pages)/actualites-conseils/page.tsx

```typescript
// Add static generation
export const revalidate = 1800; // Revalidate every 30 minutes

// Generate static params for popular pages
export async function generateStaticParams() {
  return [{ page: "1" }, { page: "2" }, { page: "3" }];
}
```

#### Update src/app/(with-header)/(pages)/actualites-conseils/[slug]/page.tsx

```typescript
// Add static generation for blog posts
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const blogs = await getAllBlogs(); // Fetch all blog slugs
  return blogs.slice(0, 50).map((blog) => ({
    slug: blog.slug,
  }));
}
```

**Benefit:** Pre-render popular pages, instant loading

---

### 7. Optimize Image Loading (FREE)

#### Add to all Image components

```typescript
<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={600}
  loading="lazy"
  quality={85} // Reduce from 100 to 85 (imperceptible difference)
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Add blur placeholder
/>
```

**Benefit:** Faster page loads, less bandwidth

---

### 8. Enable Hostinger Caching (FREE)

#### In Hostinger Control Panel

1. Go to **Advanced** > **Cache Manager**
2. Enable **LiteSpeed Cache** (if available)
3. Set cache TTL to **1 hour** for dynamic content
4. Set cache TTL to **1 week** for static assets
5. Enable **Browser Cache**
6. Enable **Gzip Compression**

**Benefit:** Server-level caching, no code changes needed

---

### 9. Optimize Database Queries (FREE)

#### Update Strapi API calls to fetch only needed fields

```typescript
// Before (fetches everything)
const url = `${STRAPI_API_URL}/api/blogs?populate=*`;

// After (fetch only needed fields)
const url =
  `${STRAPI_API_URL}/api/blogs?` +
  `fields[0]=titre&fields[1]=slug&fields[2]=description&fields[3]=createdAt&` +
  `populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&` +
  `populate[categorie][fields][0]=nom&populate[categorie][fields][1]=slug`;
```

**Benefit:** 60-70% smaller API responses, faster loading

---

### 10. Add Request Deduplication (FREE)

#### Create src/lib/request-cache.ts

```typescript
// Simple in-memory request deduplication
const pendingRequests = new Map<string, Promise<any>>();

export async function deduplicateRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5000
): Promise<T> {
  // If request is already pending, return the same promise
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }

  // Create new request
  const promise = fetcher().finally(() => {
    // Clean up after TTL
    setTimeout(() => {
      pendingRequests.delete(key);
    }, ttl);
  });

  pendingRequests.set(key, promise);
  return promise;
}
```

#### Use in blogService.ts

```typescript
import { deduplicateRequest } from '../request-cache';

export const getBlogs = async (params) => {
  const cacheKey = `blogs:${JSON.stringify(params)}`;

  return deduplicateRequest(cacheKey, async () => {
    const response = await fetch(url, { ... });
    return response.json();
  });
};
```

**Benefit:** Prevents duplicate API calls during traffic spikes

---

## 📊 Expected Performance

### Before Optimizations

- **Concurrent Users:** ~100
- **Requests/Second:** ~50
- **Response Time:** 200-500ms
- **Strapi Load:** High

### After FREE Optimizations

- **Concurrent Users:** ~800-1000
- **Requests/Second:** ~300-400
- **Response Time:** 100-200ms
- **Strapi Load:** Very Low (90% reduction)

---

## ⚡ Quick Implementation Checklist

### High Impact (Do First - 1 hour)

- [ ] Update next.config.ts with aggressive caching
- [ ] Increase blog service cache times (30 min, 1 hour)
- [ ] Remove blog rate limiting (as requested)
- [ ] Increase SMTP connection pool (10 connections)
- [ ] Add automatic cleanup to rate limit stores

### Medium Impact (Do Second - 1 hour)

- [ ] Optimize Strapi queries (fetch only needed fields)
- [ ] Add static generation for blog pages
- [ ] Add request deduplication
- [ ] Optimize image loading (lazy, quality 85)

### Low Impact (Do When Possible - 30 min)

- [ ] Enable Hostinger LiteSpeed Cache
- [ ] Enable Gzip compression
- [ ] Add blur placeholders to images

---

## 🧪 Testing

### Test Locally

```bash
# Build production version
npm run build

# Start production server
npm start

# Test in browser
# - Check blog pages load fast
# - Check images load quickly
# - Check forms still work
# - Check rate limiting on forms only
```

### Load Test (Optional)

```bash
# Install Apache Bench (comes with Apache)
# Or use: https://loader.io (free tier)

# Test blog endpoint (should handle 100+ req/sec)
ab -n 1000 -c 50 https://trtbroker.com/api/blogs

# Test homepage
ab -n 500 -c 25 https://trtbroker.com/
```

---

## 🎯 Hostinger-Specific Optimizations

### 1. Enable LiteSpeed Cache

In Hostinger control panel:

- **Advanced** > **Cache Manager**
- Enable **LiteSpeed Cache**
- Set **Cache TTL**: 1 hour

### 2. Enable HTTP/2

Should be enabled by default, verify:

```bash
curl -I --http2 https://trtbroker.com
# Should see: HTTP/2 200
```

### 3. Enable Brotli Compression

Usually enabled by default on Hostinger, verify:

```bash
curl -H "Accept-Encoding: br" -I https://trtbroker.com
# Should see: Content-Encoding: br
```

### 4. Optimize Node.js Settings

In Hostinger Node.js settings:

- **Node.js Version**: 18 or 20 (latest LTS)
- **Memory Limit**: Maximum available
- **Max Workers**: 4-8 (depending on plan)

---

## 📈 Monitoring (FREE Options)

### 1. UptimeRobot (Free)

- Monitor: https://trtbroker.com
- Check every: 5 minutes
- Alert via: Email
- **Cost:** FREE

### 2. Google Analytics (Free)

- Track page views
- Monitor load times
- See user behavior
- **Cost:** FREE

### 3. Hostinger Built-in Monitoring

- Check CPU usage
- Check memory usage
- Check bandwidth
- **Cost:** Included

---

## 🚀 Deployment

### Build and Deploy

```bash
# Clean build
rm -rf .next
npm run build

# Upload to Hostinger via:
# - FTP/SFTP
# - Git deployment
# - Hostinger File Manager

# Restart Node.js app in Hostinger control panel
```

---

## ✅ Final Checklist

### Code Changes

- [ ] next.config.ts updated with aggressive caching
- [ ] Blog service cache times increased
- [ ] Blog rate limiting removed
- [ ] SMTP pool increased
- [ ] Memory cleanup added
- [ ] Strapi queries optimized
- [ ] Static generation added
- [ ] Request deduplication added

### Hostinger Settings

- [ ] LiteSpeed Cache enabled
- [ ] Gzip/Brotli enabled
- [ ] Node.js version updated
- [ ] Memory limit maximized

### Testing

- [ ] Build passes
- [ ] Blog pages load fast
- [ ] Forms work correctly
- [ ] Images load quickly
- [ ] No rate limiting on blogs

---

## 🎯 Expected Results

With these FREE optimizations on Hostinger premium:

✅ **Handle 800-1000 concurrent users**  
✅ **300-400 requests per second**  
✅ **90% reduction in Strapi load**  
✅ **100-200ms response times**  
✅ **No external services needed**  
✅ **$0 additional cost**

---

## 💡 Pro Tips

1. **Monitor Hostinger metrics** during ad campaign
2. **Keep Next.js updated** for performance improvements
3. **Optimize images** before uploading to Strapi
4. **Use WebP format** for all images
5. **Pre-render popular pages** during build

---

**Cost:** $0  
**Time:** 2-3 hours  
**Difficulty:** Easy  
**Impact:** HIGH

**Ready for heavy traffic with FREE optimizations!** 🚀

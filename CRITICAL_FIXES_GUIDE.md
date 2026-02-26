# 🚨 CRITICAL FIXES - STEP BY STEP GUIDE

**STOP! Do these fixes RIGHT NOW before launching ads**

**Estimated Time:** 2-3 hours  
**Priority:** CRITICAL  
**Risk if not fixed:** Complete system compromise, DDoS attacks, data breach

---

## FIX #1: Remove Exposed Secrets (30 minutes)

### Step 1: Remove .env from Git History

```bash
# WARNING: This rewrites git history
# Backup your repository first!

# Remove .env from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remote
git push origin --force --all
git push origin --force --tags

# Verify it's gone
git log --all -- .env
# Should show: nothing
```

### Step 2: Rotate ALL Credentials

**Strapi API Token:**

1. Log into Strapi admin: https://backoffice.trtbroker.com/admin
2. Go to Settings > API Tokens
3. Delete old token
4. Create new token with same permissions
5. Copy new token

**SMTP Password:**

1. Log into mail.trtbroker.com control panel
2. Change password for leads@trtbroker.com
3. Copy new password

### Step 3: Update Production Environment

**If using Vercel:**

```bash
vercel env rm STRAPI_API_TOKEN production
vercel env add STRAPI_API_TOKEN production
# Paste new token

vercel env rm SMTP_PASS production
vercel env add SMTP_PASS production
# Paste new password
```

**If using Railway:**

1. Go to Railway dashboard
2. Select your project
3. Go to Variables tab
4. Update STRAPI_API_TOKEN
5. Update SMTP_PASS
6. Redeploy

**If using Docker:**

```bash
# Update .env file (NOT committed to git)
nano .env
# Update values
# Restart containers
docker-compose down
docker-compose up -d
```

### Step 4: Verify .gitignore

```bash
# Check .gitignore includes .env
cat .gitignore | grep "^\.env$"

# If not found, add it
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Ensure .env is ignored"
git push
```

---

## FIX #2: Add Rate Limiting to Blog Endpoints (15 minutes)

### Edit src/lib/security.ts

Find this section (around line 10):

```typescript
const RATE_LIMITS = {
  // Content endpoints - No rate limiting for public content
  // "/api/blogs": { maxRequests: 120, windowMs: 10 * 60 * 1000 }, // Disabled
  // "/api/blog-categories": { maxRequests: 60, windowMs: 10 * 60 * 1000 }, // Disabled
```

Replace with:

```typescript
const RATE_LIMITS = {
  // Content endpoints - Reasonable limits for public content
  "/api/blogs": { maxRequests: 60, windowMs: 60 * 1000 }, // 60 requests per minute
  "/api/blog-categories": { maxRequests: 30, windowMs: 60 * 1000 }, // 30 requests per minute
  "/api/media/[...path]": { maxRequests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
```

Save and test:

```bash
npm run build
# Should build successfully
```

---

## FIX #3: Move Supervisor Emails to Environment Variables (30 minutes)

### Step 1: Add to .env (NOT committed)

```bash
# Add to .env file
SUPERVISOR_EMAILS=houcine.taki21@gmail.com,ghazzalipro@gmail.com,contact@trtbroker.com
```

### Step 2: Update send-career/route.ts

Find this code (around line 200):

```typescript
const supervisorEmails = [
  "contact@trtbroker.com",
  "houcine.taki21@gmail.com",
  "ghazzalipro@gmail.com",
];
```

Replace with:

```typescript
const supervisorEmails = process.env.SUPERVISOR_EMAILS
  ? process.env.SUPERVISOR_EMAILS.split(",").map((e) => e.trim())
  : ["contact@trtbroker.com"];
```

### Step 3: Update send-contact/route.ts

Find this code (around line 350):

```typescript
to: "houcine.taki21@gmail.com",
// TODO: Add back other supervisors after fixing marketing consent:
```

Replace with:

```typescript
to: supervisorEmails,
```

And add at the top of the function:

```typescript
const supervisorEmails = process.env.SUPERVISOR_EMAILS
  ? process.env.SUPERVISOR_EMAILS.split(",").map((e) => e.trim())
  : ["contact@trtbroker.com"];
```

### Step 4: Update send-devis/route.ts

Find this code (around line 600):

```typescript
const supervisorEmails = [
  "contact@trtbroker.com",
  "houcine.taki21@gmail.com",
  "ghazzalipro@gmail.com",
];
```

Replace with:

```typescript
const supervisorEmails = process.env.SUPERVISOR_EMAILS
  ? process.env.SUPERVISOR_EMAILS.split(",").map((e) => e.trim())
  : ["contact@trtbroker.com"];
```

### Step 5: Update Production Environment

Add SUPERVISOR_EMAILS to your production environment variables (same process as Fix #1 Step 3).

---

## FIX #4: Enable HTTPS Enforcement (10 minutes)

### Edit next.config.ts

Add this to the config object:

```typescript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'header',
          key: 'x-forwarded-proto',
          value: 'http',
        },
      ],
      destination: 'https://trtbroker.com/:path*',
      permanent: true,
    },
  ];
},
```

Full example:

```typescript
const nextConfig: NextConfig = {
  images: {
    // ... existing config
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://trtbroker.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // ... existing config
  },
};
```

---

## FIX #5: Fix CORS Configuration (5 minutes)

### Edit src/lib/security-config.ts

Find this code (around line 80):

```typescript
CORS_ORIGINS: process.env.NODE_ENV === "production"
  ? ["https://trtbroker.com"]
  : ["*"],
```

Replace with:

```typescript
CORS_ORIGINS: [
  "https://trtbroker.com",
  "https://www.trtbroker.com",
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : []
  )
],
```

---

## VERIFICATION CHECKLIST

After completing all fixes, verify:

### 1. Secrets Removed

```bash
# Should return nothing
git log --all -- .env
git grep -i "7595b527d6cd9b029f84ae2b37e318a05af4c82262c6674fa65fb07a07089b193b465505fdd447367fc3aa97232a2d0b3025ee5b0435b9bedf94477cf5c0f6bf563f912604340defeda4a9b325ac07d8cb426449d4cb5ef1d7dc7fbf61a4d73464cdd57efbc7df55ae23028d1778c0b193f7005e288310dad578aa18c959b236"
git grep -i "73!*E$oP$+QFMK9"
```

### 2. Build Passes

```bash
npm run build
# Should complete without errors
```

### 3. Rate Limiting Works

```bash
# Test blog endpoint
for i in {1..70}; do
  curl -s -o /dev/null -w "%{http_code}\n" https://trtbroker.com/api/blogs
done
# Should see some 429 responses after 60 requests
```

### 4. Emails Use Environment Variables

```bash
# Search for hardcoded emails
git grep -i "houcine.taki21@gmail.com" src/
git grep -i "ghazzalipro@gmail.com" src/
# Should only find in comments or documentation
```

### 5. HTTPS Redirect Works

```bash
# Test HTTP to HTTPS redirect
curl -I http://trtbroker.com
# Should see: Location: https://trtbroker.com
```

---

## DEPLOYMENT

### Build and Test Locally

```bash
# Clean build
rm -rf .next
npm run build

# Test production build
npm start

# Open browser and test:
# - Homepage loads
# - Blog pages work
# - Forms submit
# - Images display
```

### Deploy to Production

```bash
# If using Vercel
vercel --prod

# If using Railway
railway up

# If using Docker
docker build -t trtbroker-frontend .
docker push your-registry/trtbroker-frontend
# Update production deployment
```

---

## POST-DEPLOYMENT VERIFICATION

### 1. Check Site is Up

```bash
curl -I https://trtbroker.com
# Should return 200 OK
```

### 2. Check Rate Limiting

```bash
# Make 70 requests quickly
for i in {1..70}; do
  curl -s https://trtbroker.com/api/blogs > /dev/null
done
# Should see rate limit after 60 requests
```

### 3. Check HTTPS

```bash
# Try HTTP
curl -I http://trtbroker.com
# Should redirect to HTTPS
```

### 4. Check Forms

- Submit career form
- Submit contact form
- Submit devis form
- Verify emails received at supervisor addresses

### 5. Check Logs

- No errors in console
- No exposed secrets in logs
- Rate limiting working

---

## ROLLBACK PLAN

If something breaks:

### Quick Rollback

```bash
# Revert last commit
git revert HEAD
git push

# Redeploy
vercel --prod  # or your deployment command
```

### Full Rollback

```bash
# Find last working commit
git log --oneline

# Reset to that commit
git reset --hard <commit-hash>
git push --force

# Redeploy
```

---

## NEXT STEPS

After these critical fixes:

1. **Set up Redis** (see REDIS_SETUP_GUIDE.md)
2. **Configure CDN** (see CDN_SETUP_GUIDE.md)
3. **Add Monitoring** (see MONITORING_SETUP_GUIDE.md)
4. **Load Test** (see LOAD_TESTING_GUIDE.md)

---

## SUPPORT

If you encounter issues:

1. Check build logs
2. Check production logs
3. Verify environment variables
4. Test locally first
5. Deploy to staging before production

---

**Status After Fixes:** 🟡 BETTER (but still need Redis + CDN)  
**Time to Complete:** 2-3 hours  
**Risk Level:** 🟢 LOW (after fixes applied)

**DO NOT SKIP THESE FIXES!**

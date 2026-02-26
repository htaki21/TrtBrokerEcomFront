# Blog 404 Prevention Guide

## Why Blog 404 Errors Happen

Blog pages can return 404 errors in production for these reasons:

1. **Static Generation at Build Time**: Next.js generates pages during build, but new blog posts added after deployment won't have pages
2. **ISR Cache**: Incremental Static Regeneration cache needs time to update
3. **Strapi Connection Issues**: If Strapi is unavailable during build, no pages are generated
4. **Missing Slugs**: Blog posts without proper slugs won't be accessible

## Solutions Implemented

### 1. Dynamic Parameters (`dynamicParams = true`)

This allows Next.js to generate pages on-demand for blog posts that weren't pre-generated at build time.

```typescript
export const dynamicParams = true;
```

**What this does:**
- ✅ New blog posts will work immediately without rebuilding
- ✅ No 404 errors for posts added after deployment
- ⚠️ First visit to a new post will be slightly slower (page generation)
- ✅ Subsequent visits will be fast (page is cached)

### 2. Shorter Revalidation Period

Changed from 1 hour (3600s) to 5 minutes (300s):

```typescript
export const revalidate = 300;
```

**What this does:**
- ✅ Blog updates appear faster in production
- ✅ Changed content is refreshed every 5 minutes
- ✅ Better balance between performance and freshness

### 3. Error Handling in `generateStaticParams`

Returns empty array if Strapi is unavailable:

```typescript
try {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
} catch {
  return []; // Pages will be generated on-demand
}
```

**What this does:**
- ✅ Build won't fail if Strapi is temporarily unavailable
- ✅ All pages will be generated on first visit
- ✅ No deployment failures due to API issues

## How It Works Now

### Scenario 1: Build Time
1. Next.js tries to fetch all blog posts from Strapi
2. If successful: Pre-generates pages for all existing posts
3. If failed: Build continues, pages will be generated on-demand

### Scenario 2: New Blog Post Added
1. You add a new blog post in Strapi
2. User visits the new blog URL
3. Next.js generates the page on-demand (thanks to `dynamicParams = true`)
4. Page is cached for subsequent visitors
5. After 5 minutes, page is revalidated with latest content

### Scenario 3: Blog Post Updated
1. You update a blog post in Strapi
2. Within 5 minutes, the page is revalidated
3. Users see the updated content

## Best Practices

### When Adding New Blog Posts

1. **Test the URL immediately** after publishing
   - First visit generates the page
   - Subsequent visits will be fast

2. **Use proper slugs**
   ```
   ✅ Good: "assurance-auto-conseils"
   ❌ Bad: "Assurance Auto & Conseils!!!"
   ```

3. **Check Strapi is accessible**
   - Ensure Strapi is running before deployment
   - Verify API tokens are valid

### When Updating Blog Posts

1. Changes appear within 5 minutes
2. Force immediate update: Trigger a rebuild
3. Clear CDN cache if using one (Vercel, Cloudflare, etc.)

### Manual Revalidation (if needed)

If you need immediate updates without waiting 5 minutes:

1. **Trigger a rebuild**:
   ```bash
   # On Vercel/deployment platform
   # Trigger new deployment
   ```

2. **Use On-Demand Revalidation** (future enhancement):
   ```typescript
   // Add API route for manual revalidation
   revalidatePath('/actualites-conseils/[slug]')
   ```

## Monitoring

### Check for 404s

1. **Browser DevTools**: Check Network tab for 404 responses
2. **Vercel Analytics**: Monitor 404 errors
3. **User Reports**: Users reporting "page not found"

### Common Fixes

| Issue | Solution |
|-------|----------|
| New blog post shows 404 | Wait ~30 seconds, refresh page (on-demand generation) |
| Updated content not showing | Wait up to 5 minutes for ISR revalidation |
| All blogs show 404 | Check Strapi connection, verify API token |
| Specific blog always 404 | Check slug format, verify post is published |

## Technical Details

### Configuration Summary

```typescript
// src/app/(with-header)/(pages)/actualites-conseils/[slug]/page.tsx

// 1. Pre-generate known pages at build time
export async function generateStaticParams() { ... }

// 2. Revalidate every 5 minutes
export const revalidate = 300;

// 3. Allow on-demand generation for new posts
export const dynamicParams = true;
```

### Deployment Checklist

Before deploying:
- [ ] Verify Strapi is accessible
- [ ] Test blog URLs locally
- [ ] Check `NEXT_PUBLIC_STRAPI_API_URL` env variable
- [ ] Verify API token is valid

After deploying:
- [ ] Test existing blog post URL
- [ ] Add a new test blog post
- [ ] Verify new post URL works (may take ~30 seconds)
- [ ] Check blog list page shows all posts

## Questions?

If blog 404s persist:
1. Check Strapi is running and accessible
2. Verify environment variables are set correctly
3. Check browser console for API errors
4. Try accessing Strapi API directly: `{STRAPI_URL}/api/blogs`
5. Trigger a fresh deployment

## Future Enhancements

Consider implementing:
- [ ] Webhook from Strapi to trigger revalidation
- [ ] Admin dashboard to manually revalidate specific pages
- [ ] Better error pages for missing blog posts
- [ ] Fallback content while page is being generated


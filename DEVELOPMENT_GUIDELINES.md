# Development Guidelines for TRT Broker Frontend

## Console Logging Policy

### ❌ DO NOT USE in Production Code

```javascript
// ❌ BAD - Never use console.log in production
console.log("User data:", userData);
console.log("Form submitted");
console.info("Debug info");
```

### ✅ Allowed Console Methods

Only `console.warn` and `console.error` are allowed for critical issues:

```javascript
// ✅ GOOD - Use for critical errors only
console.error("Failed to fetch data:", error);
console.warn("API rate limit approaching");
```

### Development Debugging

For development debugging, use these approaches:

1. **Use debugger statement:**
   ```javascript
   debugger; // This won't affect production
   ```

2. **Use development-only logging:**
   ```javascript
   if (process.env.NODE_ENV === 'development') {
     console.log("Debug info");
   }
   ```

3. **Use proper error handling:**
   ```javascript
   try {
     // Your code
   } catch (error) {
     console.error("Error:", error); // ✅ Allowed for errors
     // Handle error properly
   }
   ```

## Pre-Commit Checklist

Before committing code, ensure:

- [ ] No `console.log` statements in your code
- [ ] Run `npm run lint` to check for issues
- [ ] Run `npm run lint:fix` to auto-fix linting issues
- [ ] Test your changes locally

## Build Process

The build process now includes linting:

```bash
# Normal build (with linting)
npm run build

# Force build (skip linting - use only if necessary)
npm run build:force
```

## ESLint Configuration

The project is configured to warn about console statements:

- `console.log`, `console.info` → ⚠️ Warning
- `console.warn`, `console.error` → ✅ Allowed

## Why This Matters

Console logs in production:
- ❌ Expose sensitive information
- ❌ Clutter browser console for users
- ❌ Can impact performance
- ❌ Look unprofessional
- ❌ May reveal internal logic to bad actors

## Quick Fix

If you accidentally committed console.log statements:

```bash
# Check for console statements
npm run lint

# Auto-fix what can be fixed
npm run lint:fix

# Manually remove remaining console.log statements
# Then commit the fix
git add .
git commit -m "fix: Remove console.log statements"
git push
```

## Questions?

If you need to debug production issues, consider:
- Using proper error tracking (e.g., Sentry)
- Server-side logging
- Analytics tools
- Development tools with source maps


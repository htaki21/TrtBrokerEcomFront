# 🚨 BACKEND CONNECTION TROUBLESHOOTING

## If Backend Stops Working After Redeployment

### Problem

After redeploying the Strapi backend, the frontend can't connect and you get timeouts or 404 errors.

### Root Cause

Docker assigns new internal IP addresses when containers are redeployed. The `STRAPI_INTERNAL_URL` environment variable may be pointing to the old IP.

---

## ✅ SOLUTION: Update Internal Backend URL

### Step 1: Get New Backend IP

**SSH into your server:**

```bash
ssh root@72.60.185.43
```

**Access the Strapi backend container terminal** (via Coolify UI or SSH):

```bash
# Find backend container
docker ps | grep strapi

# Get the container's internal IP
docker exec <backend-container-name> hostname -i
```

Example output:

```
fdba:282a:cf49::7 10.0.1.7
```

The IPv4 address is what you need (e.g., `10.0.1.7`).

---

### Step 2: Update Frontend Environment Variable

**In Coolify:**

1. Go to your **Frontend Application**
2. Click **Environment Variables**
3. Find or add: `STRAPI_INTERNAL_URL`
4. Update the value to: `http://<NEW_IP>:1337`

   Example:

   ```
   STRAPI_INTERNAL_URL=http://10.0.1.7:1337
   ```

5. **Save** and **Redeploy** the frontend

---

### Step 3: Verify Connection

**Test from frontend container terminal:**

```bash
curl -I http://10.0.1.7:1337
```

You should see:

```
HTTP/1.1 302 Found
X-Powered-By: Strapi <strapi.io>
```

If it works, your frontend will now connect successfully!

---

## 🔧 ALTERNATIVE: Use Container Name (More Stable)

Instead of using IP addresses that change, use the backend container's name:

### Find Container Name:

```bash
docker ps --format "{{.Names}}" | grep strapi
```

Example output:

```
ecws04k8w0cs8g804gowokcc-1146597295218453
```

### Update Environment Variable:

```
STRAPI_INTERNAL_URL=http://ecws04k8w0cs8g804gowokcc-1146597295218453:1337
```

**Advantage:** Container names are stable and don't change on redeploy (unless you delete and recreate the app).

---

## 📋 Quick Checklist

- [ ] Backend container is running (`docker ps`)
- [ ] Got new internal IP (`hostname -i` from backend container)
- [ ] Updated `STRAPI_INTERNAL_URL` in Coolify frontend environment variables
- [ ] Redeployed frontend application
- [ ] Tested connection from frontend container (`curl -I http://<IP>:1337`)
- [ ] Website loads correctly

---

## 🆘 If Still Not Working

### Check DNS (External Access)

```bash
nslookup backoffice.trtbroker.com 8.8.8.8
```

Should return: `72.60.185.43`

If not, add DNS A records at LWS:

```
Type: A
Name: backoffice
Value: 72.60.185.43
TTL: 3600
```

### Check Firewall

```bash
sudo ufw status
```

Ports 80 and 443 should be ALLOW.

### Check Backend Logs

In Coolify, go to backend application → **Logs** tab to see if Strapi is running properly.

---

## 📝 Environment Variables Reference

### Frontend (.env or Coolify)

```env
# Internal Docker network (REQUIRED for production)
STRAPI_INTERNAL_URL=http://10.0.1.7:1337

# External URL (fallback, used by client-side)
NEXT_PUBLIC_STRAPI_API_URL=https://backoffice.trtbroker.com

# Strapi API Token
STRAPI_API_TOKEN=your-token-here
```

### How It Works

- **Server-side API calls** use `STRAPI_INTERNAL_URL` (fast, internal Docker network)
- **Client-side calls** use `NEXT_PUBLIC_STRAPI_API_URL` (external domain)
- If `STRAPI_INTERNAL_URL` is not set, falls back to external URL (slower, may timeout)

---

## 🎯 Key Points

1. **Always use internal Docker network** for server-to-server communication
2. **IP addresses change** on container redeploy - update environment variable
3. **Container names are stable** - prefer using container name over IP
4. **External domain works from browser** but not from containers (hairpin NAT issue)
5. **Test connection** before assuming it works

---

## 📞 Contact

If issues persist after following this guide, check:

- Coolify logs for both frontend and backend
- Docker network configuration
- Server firewall rules
- DNS propagation status

**Server IP:** 72.60.185.43  
**Frontend Domain:** trtbroker.com  
**Backend Domain:** backoffice.trtbroker.com  
**Backend Internal Port:** 1337

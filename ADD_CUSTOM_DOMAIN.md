# How to Add Custom Domain to Your EventHub App

## Prerequisites
- A registered domain (e.g., eventhub.com, myeventhub.app, etc.)
- Access to your domain's DNS settings

## Step 1: Add Domain to Frontend

### Via Vercel Dashboard (Easiest)
1. Go to: https://vercel.com/kaksaab2605-8884s-projects/frontend/settings/domains
2. Click **"Add"**
3. Enter your domain (e.g., `eventhub.com` or `www.eventhub.com`)
4. Click **"Add"**
5. Vercel will show you DNS records to add

### Via CLI
```bash
cd frontend
vercel domains add eventhub.com
```

## Step 2: Configure DNS

Vercel will provide you with DNS records. Add these to your domain provider:

### For Root Domain (eventhub.com)
Add an **A Record**:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

### For WWW Subdomain (www.eventhub.com)
Add a **CNAME Record**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

## Step 3: Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status: https://www.whatsmydns.net

## Step 4: Update Backend CORS

Once your domain is active, update the backend to allow it:

```bash
cd backend
```

Edit `src/server.ts` and add your domain to `defaultOrigins`:
```typescript
const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://frontend-topaz-tau-47.vercel.app",
  "https://eventhub.com",           // Add your domain
  "https://www.eventhub.com",       // Add www version
];
```

Then redeploy:
```bash
git add src/server.ts
git commit -m "Add custom domain to CORS"
git push
vercel --prod
```

## Step 5: Add Custom Domain to Backend (Optional)

If you want a custom API domain like `api.eventhub.com`:

1. Go to: https://vercel.com/kaksaab2605-8884s-projects/backend/settings/domains
2. Add `api.eventhub.com`
3. Add CNAME record in your DNS:
   ```
   Type: CNAME
   Name: api
   Value: cname.vercel-dns.com
   ```

4. Update frontend `.env.production`:
   ```
   VITE_API_BASE=https://api.eventhub.com/api
   ```

5. Redeploy frontend:
   ```bash
   cd frontend
   git add .env.production
   git commit -m "Use custom API domain"
   git push
   vercel --prod
   ```

## Example Domain Configurations

### Configuration 1: Single Domain
- **Frontend**: `eventhub.com`
- **Backend**: `backend-two-phi-51.vercel.app` (keep Vercel domain)

### Configuration 2: Subdomain for API
- **Frontend**: `eventhub.com`
- **Backend**: `api.eventhub.com`

### Configuration 3: Separate Subdomains
- **Frontend**: `app.eventhub.com`
- **Backend**: `api.eventhub.com`

## Recommended Domain Names

If you haven't registered a domain yet, here are some suggestions:

### Available .com domains (check availability)
- `eventhub.com` (might be taken)
- `myeventhub.com`
- `campuseventhub.com`
- `collegeeventhub.com`
- `eventhubapp.com`

### Alternative TLDs
- `eventhub.app`
- `eventhub.io`
- `eventhub.dev`
- `eventhub.live`
- `eventhub.online`

## Free Domain Options

### 1. Freenom (Free for 1 year)
- Offers: .tk, .ml, .ga, .cf, .gq
- Example: `eventhub.tk`
- Website: https://www.freenom.com

### 2. Use Vercel's Free Domain
- Keep using: `frontend-topaz-tau-47.vercel.app`
- It's free and works perfectly!

## SSL Certificate

Vercel automatically provides free SSL certificates for all domains (both Vercel domains and custom domains). No additional setup needed!

## Testing Your Custom Domain

After DNS propagation:
1. Visit your domain: `https://eventhub.com`
2. Test login/signup
3. Test all features
4. Check browser console for any CORS errors

## Troubleshooting

### Domain not working after 24 hours
- Verify DNS records are correct
- Check DNS propagation: https://www.whatsmydns.net
- Clear browser cache
- Try incognito mode

### CORS errors with custom domain
- Make sure you added the domain to backend CORS
- Redeploy backend after updating CORS
- Clear browser cache

### SSL certificate error
- Wait a few minutes for Vercel to provision SSL
- If persists after 1 hour, contact Vercel support

---

**Need help?** Check Vercel's domain documentation: https://vercel.com/docs/concepts/projects/domains

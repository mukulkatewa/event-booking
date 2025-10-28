# Quick Deploy to Vercel - TL;DR

## Prerequisites Setup (5 minutes)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Get a PostgreSQL Database** (Choose one):
   - [Neon](https://neon.tech) - Free tier, instant setup
   - [Supabase](https://supabase.com) - Free tier, includes auth
   - Copy the connection string

3. **Get Cloudinary Credentials**:
   - Sign up at [Cloudinary](https://cloudinary.com)
   - Get: Cloud Name, API Key, API Secret

## Deploy Backend (3 minutes)

```bash
cd backend
vercel login
vercel
```

After deployment, add environment variables in Vercel Dashboard:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - Random 32+ character string
- `CLOUDINARY_CLOUD_NAME` - From Cloudinary
- `CLOUDINARY_API_KEY` - From Cloudinary
- `CLOUDINARY_API_SECRET` - From Cloudinary
- `NODE_ENV` - Set to `production`

Then redeploy:
```bash
vercel --prod
```

**Copy your backend URL** (e.g., `https://xxx.vercel.app`)

## Deploy Frontend (2 minutes)

```bash
cd ../frontend

# Create production environment file
echo "VITE_API_BASE=https://YOUR-BACKEND-URL.vercel.app/api" > .env.production

# Deploy
vercel
vercel --prod
```

**Copy your frontend URL**

## Final Step: Update CORS

Edit `backend/src/server.ts` and add your frontend URL to CORS:

```typescript
origin: [
  'http://localhost:5173',
  'https://YOUR-FRONTEND-URL.vercel.app'  // Add this
],
```

Commit and redeploy backend:
```bash
cd backend
git add src/server.ts
git commit -m "Add production CORS"
git push
vercel --prod
```

## Done! 🎉

Your app is live at:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

## Common Issues

**CORS Error**: Make sure you added frontend URL to CORS and redeployed backend

**Database Error**: Check DATABASE_URL is correct and database is accessible

**404 on API**: Verify VITE_API_BASE in frontend .env.production

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

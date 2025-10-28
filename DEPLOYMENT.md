# Deployment Guide - Vercel

This guide will help you deploy both the frontend and backend to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed: `npm install -g vercel`
3. A PostgreSQL database (recommended: [Neon](https://neon.tech) or [Supabase](https://supabase.com))
4. Cloudinary account for image uploads

## Part 1: Deploy Backend

### Step 1: Prepare Database

1. Create a PostgreSQL database on Neon or Supabase
2. Copy the connection string (it should look like: `postgresql://user:password@host/database`)

### Step 2: Deploy Backend to Vercel

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `event-booking-backend` (or your choice)
   - In which directory is your code located? `./`
   - Want to override settings? **N**

5. Add environment variables in Vercel Dashboard:
   - Go to your project settings on [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to **Settings** → **Environment Variables**
   - Add these variables:
     ```
     DATABASE_URL=your-postgresql-connection-string
     JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     NODE_ENV=production
     ```

6. Redeploy to apply environment variables:
   ```bash
   vercel --prod
   ```

7. **Copy your backend URL** (e.g., `https://event-booking-backend.vercel.app`)

## Part 2: Deploy Frontend

### Step 1: Update Frontend Configuration

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Create `.env.production` file:
   ```bash
   echo "VITE_API_BASE=https://your-backend-url.vercel.app/api" > .env.production
   ```
   Replace `your-backend-url.vercel.app` with your actual backend URL from Part 1, Step 7.

### Step 2: Deploy Frontend to Vercel

1. Deploy:
   ```bash
   vercel
   ```

2. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `event-booking-frontend` (or your choice)
   - In which directory is your code located? `./`
   - Want to override settings? **N**

3. Deploy to production:
   ```bash
   vercel --prod
   ```

4. **Copy your frontend URL** (e.g., `https://event-booking-frontend.vercel.app`)

## Part 3: Update CORS Settings

1. Go back to backend code and update CORS origins in `src/server.ts`:
   ```typescript
   const corsOptions = {
     origin: [
       'http://localhost:5173',
       'http://localhost:8080',
       'https://your-frontend-url.vercel.app'  // Add this line
     ],
     credentials: true,
   };
   ```

2. Commit and push changes:
   ```bash
   cd backend
   git add src/server.ts
   git commit -m "Update CORS for production"
   git push
   ```

3. Redeploy backend:
   ```bash
   vercel --prod
   ```

## Part 4: Test Your Deployment

1. Visit your frontend URL
2. Try to:
   - Sign up as a new user
   - Login
   - Browse events
   - Create an event (as admin)
   - Book an event (as student)

## Troubleshooting

### Database Connection Issues
- Ensure your DATABASE_URL is correct
- Check if your database allows connections from Vercel IPs
- Verify Prisma migrations ran successfully

### CORS Errors
- Make sure you added your frontend URL to CORS origins
- Redeploy backend after updating CORS settings

### Environment Variables Not Working
- Check they're added in Vercel Dashboard
- Redeploy after adding/changing environment variables
- Use `vercel env pull` to verify local environment

### API Not Found (404)
- Verify VITE_API_BASE in frontend points to correct backend URL
- Check backend is deployed and accessible

## Useful Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables
vercel env pull

# Remove deployment
vercel remove [deployment-url]
```

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update CORS settings with new domain

## Continuous Deployment

Vercel automatically deploys when you push to your GitHub repository:

1. Connect your GitHub repository in Vercel Dashboard
2. Every push to `main` branch will trigger a deployment
3. Pull requests get preview deployments

---

**🎉 Your Event Booking Platform is now live!**

Frontend: `https://your-frontend.vercel.app`  
Backend: `https://your-backend.vercel.app`

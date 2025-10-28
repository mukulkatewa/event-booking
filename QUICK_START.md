# Quick Start Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL database
- Cloudinary account (for image uploads)

## Setup in 5 Minutes

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, and Cloudinary credentials

# Run database migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

Backend will run on **http://localhost:5000**

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

Frontend will run on **http://localhost:8080**

## First Time Usage

### Create Admin User

1. Open http://localhost:8080
2. Click "Sign Up"
3. Fill in details and select **"Club Admin"** role
4. Login with your credentials

### Create Your First Event

1. Navigate to "Create Event" (admin only)
2. Fill in event details
3. Upload a poster image (optional)
4. Click "Create Event"

### Book an Event

1. Create a student account (or use admin account)
2. Browse events on home page
3. Click "Book Now" on any event
4. Confirm booking

### View Bookings

1. Navigate to "My Bookings"
2. See upcoming and past bookings
3. Cancel bookings if needed

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Run `npx prisma migrate dev` to create tables

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify Vite proxy is configured (should be automatic)

### Image upload fails
- Verify Cloudinary credentials in backend .env
- Check file size (max 5MB)
- Ensure file is an image format

### CORS errors
- Backend CORS is configured for localhost:8080 and localhost:5173
- Vite proxy should handle this automatically
- If issues persist, check backend/src/server.ts CORS config

## Default Ports

- **Frontend**: 8080 (Vite dev server)
- **Backend**: 5000 (Express server)
- **Database**: 5432 (PostgreSQL default)

## Test Accounts

Create your own accounts using the signup flow. The system supports:
- **Student** role: Can browse and book events
- **Admin** role: Can create events + all student permissions

## Next Steps

- Explore the Club Dashboard (admin only)
- Try filtering and searching events
- Test the booking flow end-to-end
- Check the README.md for full documentation

## Need Help?

Check these files:
- `README.md` - Full documentation
- `INTEGRATION_SUMMARY.md` - Technical integration details
- Backend API docs in `backend/src/routes/`

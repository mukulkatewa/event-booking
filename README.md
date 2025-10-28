# Event Booking System

A full-stack event booking platform with React frontend and Express backend.

## Project Structure

```
event-booking/
├── backend/          # Express + Prisma + PostgreSQL API
└── frontend/         # React + Vite + TailwindCSS + shadcn/ui
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and set your DATABASE_URL, JWT_SECRET, and Cloudinary credentials
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment:
   ```bash
   cp .env.example .env
   # VITE_API_BASE is optional - defaults to /api (proxied to backend in dev)
   ```

4. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:8080`

## Features

- **Authentication**: User registration and login with JWT
- **Event Management**: Create, view, and browse events
- **Booking System**: Book event tickets with seat selection
- **Role-Based Access**: Student and Admin (Club) roles
- **Image Upload**: Cloudinary integration for event posters
- **Responsive Design**: Mobile-first UI with shadcn/ui components

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cloudinary (image uploads)
- CORS configured for frontend

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- React Query (TanStack Query)
- React Router
- React Hook Form + Zod validation

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - List all events (with filters)
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings/user` - Get user bookings (protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (protected)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary (protected)

## Development

### Running Both Servers

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```

### CORS Configuration

The backend CORS is configured to allow requests from:
- `http://localhost:8080` (frontend dev server)
- `http://localhost:5173` (alternative Vite port)

The frontend uses Vite's proxy in development to avoid CORS issues:
- `/api/*` requests are proxied to `http://localhost:5000`

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## License

MIT

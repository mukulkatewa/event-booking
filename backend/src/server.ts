import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import clubRoutes from "./routes/clubRoutes";
import eventRoutes from "./routes/eventRoutes";
import uploadRoutes from "./routes/uploadRoutes"; // ADD THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "https://frontend-topaz-tau-47.vercel.app",
  "https://frontend-kaksaab2605-8884s-projects.vercel.app",
];
const allowedOrigins = (
  process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(",")
    : defaultOrigins
).map((s) => s.trim());

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    console.log('CORS request from origin:', origin);
    // Allow server-to-server or curl (no origin)
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      console.log('Origin in allowedOrigins - allowing');
      return callback(null, true);
    }
    // Allow any Vercel deployment URL for this project
    if (origin.match(/^https:\/\/frontend-[a-z0-9]+-kaksaab2605-8884s-projects\.vercel\.app$/)) {
      console.log('Origin matches Vercel pattern - allowing');
      return callback(null, true);
    }
    // Log rejected origins for debugging
    console.log('CORS rejected origin:', origin);
    // Return error for rejected origins
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOptions));
// Preflight handling is covered by the global CORS middleware above
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/upload", uploadRoutes); // ADD THIS

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK",
    message: "Backend API is running",
    timestamp: new Date().toISOString(),
    env: {
      hasDatabase: !!process.env.DATABASE_URL,
      hasJWT: !!process.env.JWT_SECRET,
      hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    }
  });
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

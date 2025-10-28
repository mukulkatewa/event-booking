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
  "https://frontend-9lyxwwmjv-kaksaab2605-8884s-projects.vercel.app",
  "https://frontend-pxbv04vv3-kaksaab2605-8884s-projects.vercel.app",
];
const allowedOrigins = (
  process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(",")
    : defaultOrigins
).map((s) => s.trim());

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow server-to-server or curl (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Do not error; respond without CORS headers for disallowed origins
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // Let cors auto-reflect requested headers to avoid preflight mismatches
  // allowedHeaders omitted intentionally
  optionsSuccessStatus: 204,
  maxAge: 86400,
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

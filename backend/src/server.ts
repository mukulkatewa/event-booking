import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';
import clubRoutes from './routes/clubRoutes';
import uploadRoutes from './routes/uploadRoutes'; // ADD THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/upload', uploadRoutes); // ADD THIS

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
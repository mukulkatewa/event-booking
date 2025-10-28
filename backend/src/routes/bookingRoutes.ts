import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getEventBookings,
} from '../controllers/bookingController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/user', authenticateToken, getUserBookings);
router.put('/:id/cancel', authenticateToken, cancelBooking);
router.get('/event/:eventId', authenticateToken, isAdmin, getEventBookings);

export default router;
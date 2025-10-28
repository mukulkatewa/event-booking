import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, isAdmin, createEvent);
router.put('/:id', authenticateToken, isAdmin, updateEvent);
router.delete('/:id', authenticateToken, isAdmin, deleteEvent);

export default router;
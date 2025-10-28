import express from 'express';
import { createClub, getAllClubs, getClubById, getMyClub } from '../controllers/clubController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, isAdmin, createClub);
router.get('/', getAllClubs);
router.get('/my-club', authenticateToken, isAdmin, getMyClub);
router.get('/:id', getClubById);

export default router;
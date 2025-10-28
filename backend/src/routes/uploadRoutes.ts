import express, { Request, Response } from 'express';
import { upload } from '../middleware/upload';
import { uploadToCloudinary } from '../utils/cloudinary';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post(
  '/image',
  authenticateToken,
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const imageUrl = await uploadToCloudinary(req.file.buffer, 'events');

      res.json({ imageUrl });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
);

export default router;
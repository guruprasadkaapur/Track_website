// routes/userRoutes.js

import { Router } from 'express';
import { getUserProfile } from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Protected route (requires JWT)
router.get('/profile', authMiddleware, getUserProfile);  // Get user profile

export default router;

// routes/authRoutes.js

import { Router } from 'express';
import { registerUser, verifyOTP } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);  // Register User (Send OTP)
router.post('/verify', verifyOTP);  // Verify OTP and generate JWT token

export default router;

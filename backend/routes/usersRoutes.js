import express from 'express';
import { getCurrentUser, updateUser } from '../controllers/usersController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware(['employee', 'admin']), getCurrentUser);
export default router;

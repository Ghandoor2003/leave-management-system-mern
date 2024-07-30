import express from 'express';
import {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequestStatus,
  deleteLeaveRequest
} from '../controllers/leaveController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware(), createLeaveRequest);
router.get('/', authMiddleware(['admin']), getAllLeaveRequests);
router.get('/:id', authMiddleware(), getLeaveRequestById);
router.put('/:id/status', authMiddleware(['admin']), updateLeaveRequestStatus);
router.delete('/:id', authMiddleware(['admin']), deleteLeaveRequest);

export default router;

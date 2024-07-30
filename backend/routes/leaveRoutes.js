import express from 'express';
import { approveLeaveRequest, refuseLeaveRequest ,getLeaveRequestsByUser, createLeaveRequest, getAllLeaveRequests, getLeaveRequestById, updateLeaveRequest, deleteLeaveRequest } from '../controllers/leaveController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/', authMiddleware(['employee' , 'admin']), createLeaveRequest);

router.get('/', authMiddleware(['employee']), getLeaveRequestsByUser);
router.get('/admin', authMiddleware(['admin']), getAllLeaveRequests);

router.get('/:id', authMiddleware(['employee', 'admin']), getLeaveRequestById);
router.put('/:id', authMiddleware(['employee']), updateLeaveRequest);
router.delete('/:id', authMiddleware(['employee']), deleteLeaveRequest);


router.put('/:id/approve', authMiddleware(['admin']),approveLeaveRequest);
router.put('/:id/refuse', authMiddleware(['admin']), refuseLeaveRequest);


export default router;

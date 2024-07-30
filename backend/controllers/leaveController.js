import LeaveRequest from '../models/LeaveRequest.js';

export const createLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating leave request' });
  }
};

export const getAllLeaveRequests = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

    if (req.user.role !== 'admin' && leaveRequest.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLeaveRequestStatus = async (req, res) => {
  const { status } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

    leaveRequest.status = status;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLeaveRequest = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

    await leaveRequest.remove();
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

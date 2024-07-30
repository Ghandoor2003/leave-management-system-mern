import LeaveRequest from '../models/LeaveRequest.js';
import User from '../models/User.js'; // Assuming you have a User model

export const createLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  try {
    const leaveRequest = new LeaveRequest({
      user: req.user.id,
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
    const leaveRequests = await LeaveRequest.find().populate('user', 'name');
    res.json(leaveRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id).populate('user', 'name');
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

    if (req.user.role !== 'admin' && leaveRequest.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLeaveRequest = async (req, res) => {
  const { endDate , startDate , reason } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: 'Leave request not found' });

    leaveRequest.endDate = endDate;
    leaveRequest.startDate = startDate;
    leaveRequest.reason = reason;
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByIdAndDelete(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting leave request' });
  }
};

export const getLeaveRequestsByUser = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ user: req.user.id }).populate('user', 'name');
    if (!leaveRequests) return res.status(404).json({ message: 'No leave requests found for this user' });

    res.json(leaveRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' }, 
      { new: true }
    ).populate('user', 'name');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error approving leave request' });
  }
};

export const refuseLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'refused' },
      { new: true }
    ).populate('user', 'name');
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error refusing leave request' });
  }
};

import React from 'react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  approved: 'bg-green-500',
  pending: 'bg-yellow-400',
  refused: 'bg-red-600',
};

const LeaveRow = ({ leave, userRole }) => {
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  };
  


  const handleApprove = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${leave._id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to approve leave request');
      }

      const updatedLeave = await response.json();
      console.log('Leave request approved:', updatedLeave);
      refresh();
    } catch (error) {
      console.error('Error approving leave request:', error);
      alert('Failed to approve leave request');
    }
  };

  const handleRefuse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${leave._id}/refuse`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to refuse leave request');
      }

      const updatedLeave = await response.json();
      console.log('Leave request refused:', updatedLeave);
      refresh();
    } catch (error) {
      console.error('Error refusing leave request:', error);
      alert('Failed to refuse leave request');
    }
  };

  const handleUpdate = () => {
    navigate(`/leave/${leave._id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${leave._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete leave request');
      }

      const result = await response.json();
      console.log('Leave request deleted:', result.message);
      refresh()
    } catch (error) {
      console.error('Error deleting leave request:', error);
      alert('Failed to delete leave request');
    }
  };

  return (
    <tr className="border-b flex">
      <td className="py-2 pl-3 pr-1 w-24">
        <input type="checkbox" />
      </td>
      <td className={`px-1 mx-5 py-1 w-20  rounded-md text-center text-md  ${statusColors[leave.status]}`}>
        {leave.status}
      </td>
      <td className="py-2 px-1 w-full max-w-xs xl:max-w-lg truncate">{leave.reason}</td>
      <td className="py-2 px-1 flex-1 truncate">{leave.user.name}</td> {/* Display requester’s name */}
      <td className="py-2 px-1 flex-1 truncate">{new Date(leave.startDate).toLocaleDateString()}</td>
      <td className="py-2 px-1 flex-1 truncate">{new Date(leave.endDate).toLocaleDateString()}</td>
      <td className="py-2 px-1 flex-1 truncate">
        {userRole === 'admin' ? (
          <>
            <button onClick={handleApprove} className="text-green-500">Approve</button>
            <button onClick={handleRefuse} className="text-red-500">Refuse</button>
          </>
        ) : userRole === 'employee' ? (
          <>
            <button onClick={handleUpdate} className="text-blue-500">Update</button>
            <button onClick={handleDelete} className="text-red-500">Delete</button>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default LeaveRow;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LeaveForm from '../components/LeaveForm';

const UpdateLeave = () => {
  const { id } = useParams(); // Extract the leave request ID from the URL
  const navigate = useNavigate();
  const [leaveRequest, setLeaveRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/leaves/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaveRequest(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveRequest();
  }, [id]);

  const handleUpdate = async (updatedLeave) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedLeave)
      });
      if (response.ok) {
        navigate('/dashboard'); // Redirect to the dashboard or wherever you want
      } else {
        throw new Error('Failed to update leave request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="flex justify-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      <Sidebar active={'leave'} />
      <div className="flex-1 flex flex-col">
        <header
          aria-label="page caption"
          className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center shadow-sm"
        >
          <h1 id="page-caption" className="font-semibold text-lg">
            Update Leave Request
          </h1>
        </header>
        <main className="flex-grow flex min-h-0 border-t bg-gray-50">
          <div className="p-4 w-full">
            {leaveRequest && (
              <LeaveForm
                leaveRequest={leaveRequest}
                onSubmit={handleUpdate}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateLeave;

import React, { useState, useEffect } from 'react';

const LeaveForm = ({ leaveRequest, onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (leaveRequest) {
      setStartDate(new Date(leaveRequest.startDate).toISOString().split('T')[0] || '');
      setEndDate(new Date(leaveRequest.endDate).toISOString().split('T')[0] || '');
      setReason(leaveRequest.reason || '');
    }
  }, [leaveRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = leaveRequest ? `http://localhost:5000/api/leaves/${leaveRequest._id}` : 'http://localhost:5000/api/leaves';
      const method = leaveRequest ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ startDate, endDate, reason })
      });

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      const data = await response.json();
      setSuccess(leaveRequest ? 'Leave request updated successfully' : 'Leave request submitted successfully');
      // Reset form fields
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {leaveRequest ? 'Update Leave Request' : 'Submit Leave Request'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            id="endDate"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 mb-2">Reason</label>
          <textarea
            id="reason"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-green-700 text-white rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? 'Submitting...' : (leaveRequest ? 'Update Leave Request' : 'Submit Leave Request')}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </section>
  );
};

export default LeaveForm;

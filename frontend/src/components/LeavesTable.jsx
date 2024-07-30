import React from 'react';
import LeaveRow from './LeaveRow';

const LeavesTable = ({ leaveRequests, loading, error, role }) => {
  if (loading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <section aria-label="main content" className="flex min-h-0 flex-col flex-auto border-l">
      <header className="bg-white border-t flex items-center py-1 px-4">
        <div className="flex">
          <h2 id="content-caption" className="font-semibold">
            {role === 'admin' ? `Leaves requiring your attention: ${leaveRequests.length}` : `Leave requests submitted: ${leaveRequests.length}`}
          </h2>
        </div>
      </header>
      <table aria-describedby="info-popup" aria-label="open Leaves" className="border-t w-full min-h-0 h-full flex flex-col">
        <thead className="flex w-full flex-col px-4">
          <tr className="border-b flex">
            <th className="font-semibold text-left py-3 pl-3 pr-1 w-24">
              <input type="checkbox" />
            </th>
            <th className="font-semibold text-left py-3 px-1 w-24 truncate">Status</th>
            <th className="font-semibold text-left py-3 px-1 w-full max-w-xs xl:max-w-lg truncate">Reason</th>
            <th className="font-semibold text-left py-3 px-1 flex-1 truncate">Requester</th>
            <th className="font-semibold text-left py-3 px-1 flex-1 truncate">Starts At</th>
            <th className="font-semibold text-left py-3 px-1 flex-1 truncate">Ends At</th>
            <th className="font-semibold text-left py-3 px-1 flex-1 truncate">Actions</th>
          </tr>
        </thead>
        <tbody className="flex w-full flex-col flex-1 min-h-0 overflow-hidden px-4">
          {leaveRequests.length > 0 ? (
            leaveRequests.map((leave) => (
              <LeaveRow key={leave._id} leave={leave} userRole={role} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">No leave requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default LeavesTable;

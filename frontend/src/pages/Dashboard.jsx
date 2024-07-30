import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import LeavesTable from '../components/LeavesTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([{}]);
  const [userRole, setUserRole] = useState(null);



  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    let link ;
    if (role=='admin'){
      link = 'http://localhost:5000/api/leaves/admin'
    } else {
      link = 'http://localhost:5000/api/leaves'

    }
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch(link, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(localStorage.getItem('token'))
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };



    fetchLeaveRequests();
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      <Sidebar active={'dashboard'} />
      <div className="flex-1 flex flex-col">
        <header
          aria-label="page caption"
          className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center shadow-sm"
        >
          <h1 id="page-caption" className="font-semibold text-lg">
            Dashboard
          </h1>
        </header>
        <main className="flex-grow flex min-h-0 border-t bg-gray-50">
          <div className="p-4 w-full">
            <LeavesTable 
              leaveRequests={leaveRequests}
              loading={loading}
              error={error}
              role={userRole}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

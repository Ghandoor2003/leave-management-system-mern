import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-gray-500">Error: {error}</div>;
  }

  return (
    <div className="bg-transparent rounded-lg p-4">
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;

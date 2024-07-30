import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name , email, password , role }),
      });
      if (response.ok) {
        // Handle successful registration
        navigate('/signin');
      } else {
        // Handle error
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">full name</label>
            <input
              type="name"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
          <p className="mt-4 text-center">Already have an account? <a href="/signin" className="text-blue-500">Sign In</a></p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;

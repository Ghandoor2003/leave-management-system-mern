import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NewLeave from './pages/NewLeave';
import ProfilePage from './pages/ProfilePage';
import UpdateLeave from './pages/UpdateLeave';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/leave/:id' element={<UpdateLeave />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/leave' element={<NewLeave />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

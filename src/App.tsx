import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register ';
import HomePage from './pages/homepage/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import { useUser } from './context/UserContext';
import useAuth from './utils/useAuth';
import Discover from './pages/discover/Discover';

function App() {
  const { isAuthenticated } = useAuth();
  const { logout } = useUser();

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    setLoggedIn(false); // Reset loggedIn to false on logout
  };

  // Update loggedIn state whenever isAuthenticated changes
  useEffect(() => {
    setLoggedIn(isAuthenticated);
  }, [isAuthenticated]); // Depend on isAuthenticated to update loggedIn when it changes

  return (
    <Router>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setLoginState={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />

      </Routes>
    </Router>
  );
}

export default App;

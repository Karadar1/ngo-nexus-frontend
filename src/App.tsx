import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register ';
import HomePage from './pages/homepage/HomePage';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import { useUser } from './context/UserContext';
import { useAuth } from './utils/useAuth';
import Discover from './pages/discover/Discover';
import EventPage from './pages/event/EventPage';
import Chat from './pages/chat/Chat';
import UserPage from './pages/user-page/UserPage';

function App() {
    const { isAuthenticated, updateAuthStatus } = useAuth();
    const { logout } = useUser();

    const handleLogout = () => {
        logout(); // Clear user context
        localStorage.removeItem('jwt'); // Clear token
        updateAuthStatus(); // Update authentication status
    };

    return (
        <Router>
            <Navbar loggedIn={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login updateAuthStatus = {updateAuthStatus}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/discover" element={<Discover />} />
                <Route path='/event/:id' element={<EventPage />}/>
                <Route path="/event/:id/chat" element={<Chat  />} />
                <Route path="/user/:id" element={<UserPage  />} />

            </Routes>
        </Router>
    );
}

export default App;

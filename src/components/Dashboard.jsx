import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Location from "./Location";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', loginTime: '' });
  const [currentTime, setCurrentTime] = useState('');
  const [loggedOut, setLoggedOut] = useState(false); // Added loggedOut state for navigation
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const loginTime = localStorage.getItem('loginTime'); // Get login time from localStorage
    setUser({ name, email, loginTime });

    // Update current time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const logout = async () => {
    const userId = localStorage.getItem('userId'); 
    const logoutTime = new Date().toISOString(); 

    try {
      const response = await axios.post('http://localhost:5000/logout', { 
        userId, 
        logoutTime 
      });

      // Clear localStorage after successful logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('loginTime');

      // Set loggedOut to true to trigger redirection
      setLoggedOut(true);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (loggedOut) {
      navigate('/home'); // Navigate after logout
    }
  }, [loggedOut, navigate]); // Ensure navigate is in the dependency array

  return (
    <>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome, {user.name || 'User'}!</h1>
        <p>Email: {user.email || 'Not available'}</p>
        <p>Login Time: {user.loginTime || 'Not available'}</p>
        <p>Current Time: {currentTime}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={logout} style={{ padding: '10px 20px', fontSize: '16px' }}>Logout</button>
      </div>
      <Location/>
    </>
  );
};

export default Dashboard;

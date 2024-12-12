import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Location from "./Location";
import "./Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState({ name: '', email: '', loginTime: '' });
    const [currentTime, setCurrentTime] = useState('');
    const [loggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');
        const loginTime = localStorage.getItem('loginTime');
        if (name && email) {
            setUser({ name, email, loginTime });
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const logout = async () => {
        const userId = localStorage.getItem('userId');
        const logoutTime = new Date().toISOString();

        try {
            await axios.post('http://localhost:5000/logout', { userId, logoutTime });

            localStorage.clear();
            setLoggedOut(true);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        if (loggedOut) {
            navigate('/home');
        }
    }, [loggedOut, navigate]);

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Welcome, {user.name || 'User'}!</h1>
                <p>Email: {user.email || 'Not available'}</p>
                <p>Login Time: {user.loginTime || 'Not available'}</p>
                <p>Current Time: {currentTime}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={logout} style={{ padding: '10px 20px', fontSize: '16px' }}>Logout</button>
            </div>
            <Location />
        </div>
    );
};

export default Dashboard;

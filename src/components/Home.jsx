import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form fields
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // Send login request
            const response = await axios.post('http://localhost:5000/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log API response for debugging
            console.log('API Response:', response.data);

            // Extract response data
            const { authToken, user } = response.data;

            // Check if token exists
            if (!authToken) {
                throw new Error('No token received from the server.');
            }

            // Store data in localStorage
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', user.email);

            // Log stored token for debugging
            console.log('Stored token:', localStorage.getItem('authToken'));

            // Navigate to the next page
            navigate('/Index');
        } catch (err) {
            // Handle errors
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || 'Error connecting to the server.');
        }
    };

    return (
        <div className='fullscreen'>
            <div className="loginContainer">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn">Login</button>

                    <p className='sign'>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Home;

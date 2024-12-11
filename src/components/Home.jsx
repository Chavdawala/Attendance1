import React, { useState } from 'react';
import axios from 'axios'; // If you use axios
import { Link } from 'react-router-dom'; 
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Validation check
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // POST request to the backend API (login endpoint)
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If login is successful, store the JWT token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Redirect to the protected page or dashboard (example)
      window.location.href = '/dashboard'; // Replace with your dashboard URL

    } catch (err) {
      // Handle error during login (invalid credentials, server issues, etc.)
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || 'An error occurred');
      } else {
        // No response from the server
        setError('Error connecting to the server');
      }
    }
  };

  return (
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

        {/* Link to the signup page */}
        <p className='sign'>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Home;

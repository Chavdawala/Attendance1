import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const userData = { name, email, password };

    try {
      const VITE_API_URL_1 = process.env.VITE_API_URL_1 || 'http://localhost:5000/api/register';
      const response = await fetch(`${VITE_API_URL_1}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
      } else {
        setErrorMessage(data.message || 'Error registering user.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while registering.');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: 'black' }}>Sign Up</h2>

      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;

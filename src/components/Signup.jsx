import React, { useState } from 'react';

function Signup() {
  // Define state variables for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrorMessage('');

    // Validate email and password (basic check)
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    // Prepare user data
    const userData = {
      email,
      password
    };

    try {
      // Send POST request to the backend to register the user
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        // On success, redirect or show a success message
        alert('User registered successfully!');
        // Optionally, redirect to login page
        // window.location.href = '/login';
      } else {
        // Handle server-side errors
        setErrorMessage(data.message || 'Error registering user.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setErrorMessage('An error occurred while registering.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Signup;

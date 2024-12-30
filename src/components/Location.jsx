import React, { useState } from 'react';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Function to fetch the user's location
  const fetchPosition = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          

      
        },
        err => console.error("Error fetching location: ", err)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Find Your Location</h1>
      <button
        onClick={fetchPosition}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={e => (e.target.style.backgroundColor = '#007BFF')}
      >
        Get Location
      </button>

      {/* Display the latitude and longitude once available */}
      {latitude && longitude ? (
        <div style={{ marginTop: '20px' }}>
          <h3>Location:</h3>
          <p style={{color:'black'}}>Latitude: {latitude}</p>
          <p style={{color:'black'}}>Longitude: {longitude}</p>
        </div>
      ) : (
        <p style={{ color: 'black', marginTop: '20px' }}>
          Click "Get Location" to fetch your coordinates.
        </p>
      )}
    </div>
  );
};

export default App;

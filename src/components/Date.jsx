import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());
  const [inputName, setInputName] = useState(""); // For user input name
  const [inputEmail, setInputEmail] = useState(""); // For user input email
  const [statusMessage, setStatusMessage] = useState(""); // For status message (success/error)
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Function to format date and time in IST (Indian Standard Time)
  const formatLoginTime = (date) => {
    const options = {
      weekday: "short", 
      year: "numeric", 
      month: "short", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric", 
      second: "numeric",
      hour12: true, 
      timeZone: "Asia/Kolkata", 
    };

    return date.toLocaleString("en-IN", options); 
  };

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Fetch user's location on component mount
  useEffect(() => {
    fetchPosition();
  }, []);

  // Function to fetch the user's location
  const fetchPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error("Error fetching location: ", err);
          setStatusMessage("Error fetching location.");
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by your browser.");
    }
  };

  // Function to store date and time in the database
  const storeDateTime = async () => {
    const authToken = localStorage.getItem("authtoken");
    const name = inputName.trim();
    const email = inputEmail.trim();

    // Validate inputs
    if (!name || !email) {
      setStatusMessage("Name and Email are required.");
      return;
    }

    const formattedLoginTime = formatLoginTime(new Date()); 

    try {
      const VITE_API_URL_2 = import.meta.env.VITE_API_URL_2 || 'http://localhost:5000/api/user'
      const response = await axios.post(
        `${VITE_API_URL_2}/api/user`,
        {
          loginTime: formattedLoginTime,
          email,
          name,
          latitude: latitude || "N/A", // Pass latitude here
          longitude: longitude || "N/A", // Pass longitude here
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatusMessage(response.data.message || "Data stored successfully!");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        setStatusMessage(error.response.data.message || "Server error occurred.");
      } else {
        console.error("Network Error:", error);
        setStatusMessage("Unable to connect to server.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "black" }}>Store Login Time</h1>

      {/* Input Fields for User Name and Email */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "16px" }}>
          Name:
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <br />
        <label style={{ fontSize: "16px", marginTop: "10px" }}>
          Email:
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

      <h2 style={{ color: "black" }}>Current Date and Time</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>
        {formatLoginTime(dateTime)} {/* Display formatted time in IST */}
      </p>

      {/* Store Date and Time Button */}
      <button
        onClick={storeDateTime}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Store Date and Time
      </button>

      {/* Display status message (success or error) */}
      {statusMessage && (
        <p
          style={{
            color: statusMessage.includes("Error") ? "red" : "green",
            marginTop: "20px",
          }}
        >
          {statusMessage}
        </p>
      )}

      <Link
        to="/logout"
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Stop
      </Link>

      {/* Display the latitude and longitude */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Your Location</h1>
        {latitude && longitude ? (
          <div style={{ marginTop: "20px" }}>
            <h3>Location:</h3>
            <p style={{ color: "black" }}>Latitude: {latitude}</p>
            <p style={{ color: "black" }}>Longitude: {longitude}</p>
          </div>
        ) : (
          <p style={{ color: "black", marginTop: "20px" }}>
            Fetching your location...
          </p>
        )}
      </div>
    </div>
  );
}

export default DateTimeDisplay;

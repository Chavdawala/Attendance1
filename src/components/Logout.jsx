import React, { useState, useEffect } from "react";
import axios from "axios";

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState({ name: "", email: "" });
  const [inputName, setInputName] = useState(""); // For user input name
  const [inputEmail, setInputEmail] = useState(""); // For user input email
  const [statusMessage, setStatusMessage] = useState(""); // For status message (success/error)

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Format the date and time for display
  const formatDateTime = (date) => date.toLocaleString();

  // Store logout time in the database
  const storeLogoutTime = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No JWT token found. Please log in again.");
      return;
    }

    const currentTime = new Date();
    const formattedLogoutTime = currentTime.toLocaleString();

    // If input fields are empty, use stored user data
    const name = inputName || user.name;
    const email = inputEmail || user.email;

    if (!email || !name) {
      console.error("User name or email is missing!");
      return;
    }

    try {
      const VITE_API_URL_3 = import.meta.env.VITE_API_URL_3 || 'http://localhost:5000/api/logout'
      const response = await axios.post(
        `${VITE_API_URL_3}/api/logout`,
        {
          logoutTimes: formattedLogoutTime,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Set status message from response
      setStatusMessage(response.data.message); // Show the message returned from backend
      console.log("Logout time stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing logout time:", error.response?.data || error.message);
      setStatusMessage("Error storing logout time."); // Set error message if there's an issue
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "black" }}>Store Logout Time</h1>

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
        {formatDateTime(dateTime)}
      </p>

      {/* Button to Store Logout Time */}
      <button
        onClick={storeLogoutTime}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Store Logout Time
      </button>

      {/* Display status message (success or error) */}
      {statusMessage && (
        <p style={{ color: statusMessage.includes("Error") ? "red" : "green", marginTop: "20px" }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default DateTimeDisplay;

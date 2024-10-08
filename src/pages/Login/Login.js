// src/pages/Login/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import userImage from "../../assets/logo.png";
import "./Login.css"; // Create this CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hardcodedUsername = "Sheromi";
  const hardcodedPassword = "Sheromi123";

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === hardcodedUsername && password === hardcodedPassword) {
      setError("");
      navigate("/start"); // Navigate to /start on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <img src={userImage} alt="User" className="user-image" /> <h2>Login</h2>
      {/* User image */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-container">
          {" "}
          {/* Added wrapper for button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

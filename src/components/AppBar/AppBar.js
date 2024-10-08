// src/components/AppBar/AppBar.js
import React, { useState } from "react";
import { FaPowerOff, FaUserCircle } from "react-icons/fa"; // Import icons from react-icons
import userImage from "../../assets/user.png";
import "./AppBar.css";

const AppBar = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null); // State to keep track of selected value

  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false); // Close dropdown on logout
  };

  const handleSelectValue = (value) => {
    setSelectedValue(value); // Set selected value
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="app-bar">
      <h1>YogaInZ</h1>
      <div className="user-container">
        <img
          src={userImage} // Replace with your user image path
          className="user-images"
          onClick={handleToggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown">
            <div className="user-info">
              <span className="username">
                <FaUserCircle className="icon" />
                {username}
              </span>
              <div className="divider" />
              <span
                className={`logout ${
                  selectedValue === "Logout" ? "selected" : ""
                }`}
                onClick={handleLogout}
              >
                <FaPowerOff className="icon" />
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;

// UserCreation.js

import React, { useState } from "react";
import api from "./api";
import "./App.css";

function UserCreation({ onUserCreation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("General");

  const handleUserCreation = async () => {
    const cleanUsername = username.trim();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    if (!cleanUsername || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      const response = await api.post("/user", {
        username: cleanUsername,
        password,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        role,
      });

      console.log(response.data);
      const token = response.data.data.token;

      // const role = response.data.role;
      onUserCreation(token, response.data.data?.role || role, username);
    } catch (error) {
      alert("User creation failed");
      console.log(error);
    }
  };

  return (
    <div className="user-creation-container">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />

      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
        }}
        className="input"
      >
        <option value="General">General</option>
        <option value="Organizer">Organizer</option>
      </select>
      <button onClick={handleUserCreation} className="button">
        Create User
      </button>
    </div>
  );
}

export default UserCreation;

// Login.js

import React, { useState } from "react";
import api from "./api";
import "./App.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      const response = await api.post("/login", {
        username: cleanUsername,
        password,
      });
      const token = response.data.data[0].token;
      // const role = response.data.data[0].role;
      onLogin(token, response.data.data[0].role, username);
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
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
      <button onClick={handleLogin} className="button">
        Login
      </button>
    </div>
  );
}

export default Login;

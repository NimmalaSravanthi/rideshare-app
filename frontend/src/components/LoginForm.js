import React, { useState } from 'react';
import '../styles/Form.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/auth/login?email=${email}&password=${password}`, {
        method: "POST"
      });

      const data = await res.json();

      if (data.status === "invalid") {
        alert("Invalid credentials");
      } else if (data.status === "first_login") {
        onLogin("reset", data.email, data.role);
      } else if (data.status === "success") {
        onLogin("dashboard", data.email, data.role);
      }
    } catch (err) {
      alert("Backend connection failed");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;

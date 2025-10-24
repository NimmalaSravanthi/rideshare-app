import React from 'react';
import '../styles/Navbar.css';

function Navbar({ email, onLogout }) {
  return (
    <nav className="navbar">
      <span className="logo">🚗 RideShare</span>
      {email && <span className="user">Logged in as: {email}</span>}
      {email && <button onClick={onLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;

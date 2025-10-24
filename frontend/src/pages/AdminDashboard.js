import React, { useEffect, useState } from 'react';
import OnboardForm from '../components/OnboardForm';
import '../styles/Dashboard.css';

function AdminDashboard({ email, onNavigate }) {
  const [driverCount, setDriverCount] = useState(0);
  const [passengerCount, setPassengerCount] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:8080/admin/users?role=ADMIN");
        const users = await res.json();
        setDriverCount(users.filter(u => u.role === "DRIVER").length);
        setPassengerCount(users.filter(u => u.role === "PASSENGER").length);
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2>Admin Dashboard</h2>
      <p>Logged in as: <strong>{email}</strong></p>

      <div className="stats-panel">
        <div className="stat-card">
          <h3>{driverCount}</h3>
          <p>Drivers</p>
        </div>
        <div className="stat-card">
          <h3>{passengerCount}</h3>
          <p>Passengers</p>
        </div>
      </div>

      <div className="onboard-section">
        <OnboardForm />
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import RideBookingForm from '../components/RideBookingForm';
import RideStatusViewer from '../components/RideStatusViewer';
import OnboardForm from '../components/OnboardForm';
import '../styles/Dashboard.css';

function Dashboard({ email, role, onNavigate }) {
  const [users, setUsers] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [passengerCount, setPassengerCount] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (role === "ADMIN") {
      async function fetchUsers() {
        try {
          const res = await fetch("http://localhost:8080/admin/users?role=ADMIN");
          const data = await res.json();
          setUsers(data);
          setDriverCount(data.filter(u => u.role === "DRIVER").length);
          setPassengerCount(data.filter(u => u.role === "PASSENGER").length);
        } catch (err) {
          console.error("Failed to fetch users:", err);
        }
      }
      fetchUsers();
    }
  }, [role]);

  const toggleRoleDetails = (roleType) => {
    setSelectedRole(prev => (prev === roleType ? null : roleType));
  };

  return (
    <div className="dashboard-wrapper">
      <h2>Welcome to RideShare!</h2>
      <p>Logged in as: <strong>{email}</strong> ({role})</p>

      <ul>
        <li>🚗 Drivers can view assigned rides and mark them completed</li>
        <li>🧍 Passengers can book rides and track status</li>
        <li>🛠️ Admins can onboard users and monitor rides</li>
      </ul>

      {/* ✅ ADMIN VIEW */}
      {role === "ADMIN" && (
        <>
          <div className="stats-panel">
            <div className="stat-card" onClick={() => toggleRoleDetails("DRIVER")}>
              <h3>{driverCount}</h3>
              <p>Drivers</p>
            </div>
            <div className="stat-card" onClick={() => toggleRoleDetails("PASSENGER")}>
              <h3>{passengerCount}</h3>
              <p>Passengers</p>
            </div>
          </div>

          {selectedRole && (
            <div className="user-list">
              <h3>📊 {selectedRole} Details</h3>
              <ul>
                {users.filter(u => u.role === selectedRole).map((u) => (
                  <li key={u.id}>
                    <strong>{u.name || "Unnamed"}</strong> — {u.email} — {u.contact}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="onboard-section">
  <h3>👥 Onboard a New User</h3>
  <OnboardForm />
</div>

        </>
      )}

      {/* ✅ PASSENGER VIEW */}
      {role === "PASSENGER" && (
        <>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => onNavigate("book")}>🎫 Book a Ride</button>
          </div>
          <RideBookingForm email={email} />
          <RideStatusViewer email={email} />
        </>
      )}

      {/* ✅ DRIVER VIEW */}
      {role === "DRIVER" && (
        <>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => onNavigate("assigned")}>🚗 View Assigned Rides</button>
          </div>
          <RideStatusViewer email={email} />
        </>
      )}
    </div>
  );
}

export default Dashboard;

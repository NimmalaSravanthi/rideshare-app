import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

function DriverDashboard({ email }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/auth/assigned?email=${email}`)
      .then((res) => res.json())
      .then(setRides);
  }, [email]);

  const markCompleted = async (rideId) => {
    await fetch(`http://localhost:8080/auth/complete?rideId=${rideId}&email=${email}`, {
      method: 'POST',
    });
    setRides((prev) => prev.filter((r) => r.id !== rideId));
  };

  return (
    <div className="dashboard-container">
      <h2>Driver Dashboard</h2>
      <p>Logged in as: {email}</p>
      <ul>
        {rides.map((ride) => (
          <li key={ride.id}>
            {ride.pickupLocation} → {ride.dropLocation}
            <button onClick={() => markCompleted(ride.id)}>Mark Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverDashboard;


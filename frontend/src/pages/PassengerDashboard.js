import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

function PassengerDashboard({ email }) {
  const [ride, setRide] = useState(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [message, setMessage] = useState('');

  const bookRide = async () => {
    try {
      const res = await fetch(`http://localhost:8080/auth/book?email=${email}&pickup=${pickup}&drop=${drop}`, {
        method: 'POST',
      });
      if (res.ok) {
        setMessage('✅ Ride request submitted successfully');
        fetchRideStatus(); // Refresh ride info
      } else {
        setMessage('❌ Failed to book ride');
      }
    } catch (err) {
      setMessage('❌ Backend error');
    }
  };

  const fetchRideStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8080/auth/status?email=${email}`);
      const data = await res.json();
      setRide(data);
    } catch (err) {
      console.error('Error fetching ride status:', err);
    }
  };

  useEffect(() => {
    fetchRideStatus();
  }, [email]);

  return (
    <div className="dashboard-container">
      <h2>Passenger Dashboard</h2>
      <p>Logged in as: {email}</p>

      <div className="ride-form">
        <h3>Book a Ride</h3>
        <input
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
        <input
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
        />
        <button onClick={bookRide}>Book Ride</button>
        {message && <p className="status-message">{message}</p>}
      </div>

      <div className="ride-status">
        <h3>View My Ride</h3>
        {ride ? (
          <ul>
            <li><strong>Pickup:</strong> {ride.pickupLocation}</li>
            <li><strong>Drop:</strong> {ride.dropLocation}</li>
            <li><strong>Status:</strong> {ride.status}</li>
            <li><strong>Driver:</strong> {ride.driverEmail || 'Not assigned yet'}</li>
          </ul>
        ) : (
          <p>No ride booked yet.</p>
        )}
      </div>
    </div>
  );
}

export default PassengerDashboard;

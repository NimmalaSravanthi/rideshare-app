import React, { useState } from 'react';

function RideStatusViewer({ email }) {
  const [rideInfo, setRideInfo] = useState(null);

  const fetchStatus = async () => {
    const response = await fetch(`http://localhost:8080/auth/status?email=${email}`);
    const result = await response.json();
    setRideInfo(result);
  };

  return (
    <div>
      <h3>Check Ride Status</h3>
      <button onClick={fetchStatus}>View My Ride</button>

      {rideInfo && (
        <div>
          <p><strong>Pickup:</strong> {rideInfo.pickupLocation}</p>
          <p><strong>Drop:</strong> {rideInfo.dropLocation}</p>
          <p><strong>Status:</strong> {rideInfo.status}</p>
          <p><strong>Driver:</strong> {rideInfo.driverEmail}</p>
        </div>
      )}
    </div>
  );
}

export default RideStatusViewer;

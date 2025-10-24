import React, { useState } from 'react';

function RideBookingForm({ email }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/auth/book?email=${email}&pickup=${pickup}&drop=${drop}`, {
      method: 'POST',
    });

    const result = await response.text();
    setMessage(result);
  };

  return (
    <div>
      <h3>Book a Ride</h3>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          required
        />
        <button type="submit">Book Ride</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RideBookingForm;

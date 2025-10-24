import React, { useState } from 'react';
import '../styles/Form.css';

function OnboardForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    role: 'PASSENGER',
    vehicleDetails: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch('http://localhost:8080/admin/onboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('User onboarded and credentials emailed');
  };

  return (
    <div className="form-container">
      <h3>Onboard New User</h3>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="contact" placeholder="Contact Number" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="PASSENGER">Passenger</option>
        <option value="DRIVER">Driver</option>
      </select>
      {form.role === 'DRIVER' && (
        <input name="vehicleDetails" placeholder="Vehicle Details" onChange={handleChange} />
      )}
      <button onClick={handleSubmit}>Onboard User</button>
    </div>
  );
}

export default OnboardForm;

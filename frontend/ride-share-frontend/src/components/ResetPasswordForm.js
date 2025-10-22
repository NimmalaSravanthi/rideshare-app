import React, { useState } from 'react';
import '../styles/Form.css';

function ResetPasswordForm({ email, onReset }) {
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    await fetch(`http://localhost:8080/auth/reset-password?email=${email}&newPassword=${newPassword}`, {
      method: 'POST',
    });
    onReset();
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default ResetPasswordForm;

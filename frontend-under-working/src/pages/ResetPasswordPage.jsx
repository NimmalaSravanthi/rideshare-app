import { useState } from "react";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

import '../styles/ResetPasswordPage.css';
import axios from "axios";
export default function ResetPasswordPage() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {

    const email = localStorage.getItem('email');

    console.log(email);

    if (!(password &&
      password.length >= 8 &&
      password === confirmPassword
    )) {
      console.log('Invalid password format');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/auth/reset-password?email=${email}&newPassword=${password}`);

      console.log(res);

      localStorage.setItem('isFirstLogin', 'false');
      
    } catch (err) {
      console.log('error occured' + err);
    }
  };

  return (

    <>
      <Header />

      <div className="reset-password-container">
        <h1>Reset your password</h1>
        <form className="reset-password-form">

          <label >New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="reset-password-btn"
            type='button'
            onClick={handleResetPassword}
          >Reset</button>
        </form>
      </div>

    </>
  );
}

import { useState } from "react";
import Header from "../components/Header.jsx";
import '../styles/LoginPage.css';

import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleLoginBtnClick = () => {

  }

  return (
    <>
      <Header showLoginTypeBtn={true} />
      <div className="admin-login-container">
        <h1 className="admin-login-heading">Login</h1>
        <form className="admin-login-form">

          <div className='role-input-box'>
            <label>As :</label>
            <input
              type="radio"
              name='role'
              value="admin"
              checked={role === 'admin'}
              onClick={(e) => setRole(e.target.value)}
            />
            <label>Admin</label>

            <input
              type="radio"
              name='role'
              value="driver"
              checked={role === 'driver'}
              onClick={(e) => setRole(e.target.value)}

            />
            <label>Driver</label>

            <input
              type="radio"
              name='role'
              value="passanger"
              checked={role === 'passanger'}
              onClick={(e) => setRole(e.target.value)}

            />
            <label>Passanger</label>

          </div>

          <label >Email</label>
          <input
            type="text"
          />

          <label>Password</label>
          <input
            type="password"
          />

          <button
            className="admin-login-btn"
            onClick={() => handleLoginBtnClick}
          >Login in</button>
        </form>
      </div>
    </>
  );
}

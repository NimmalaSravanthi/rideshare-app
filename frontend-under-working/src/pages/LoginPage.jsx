import Header from "../components/Header.jsx";
import '../styles/LoginPage.css';

import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  return (
    <>
      <Header showLoginTypeBtn={true}/>
      <div className="admin-login-container">
        <h1 className="admin-login-heading">Login</h1>
        <form className="admin-login-form">

            

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
            onClick={() => navigate('/admin-dashboard')}
            >Login in</button>
        </form>
      </div>
    </>
  );
}

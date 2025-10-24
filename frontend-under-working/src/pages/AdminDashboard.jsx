import Header from "../components/Header.jsx";

import '../styles/AdminDashboard.css';
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();
  return (
    <>
      <Header showLoginTypeBtn={true}/>
      <div className="admin-dashboard">
        <button
        className="register-a-user-btn"
        onClick={() => navigate('/user-registration')}
        >
          Register a user
        </button>
      </div>
    </>
  );
}

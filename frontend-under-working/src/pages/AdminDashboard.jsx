import Header from "../components/Header.jsx";

import '../styles/AdminDashboard.css';
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();
  return (
    <>
      <Header/>
      <div className="admin-dashboard">
        <h1>Admin dashboard</h1>
      </div>
    </>
  );
}

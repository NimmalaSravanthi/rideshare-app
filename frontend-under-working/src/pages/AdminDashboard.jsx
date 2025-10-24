import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import '../styles/AdminDashboard.css';
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [ isUserAuthenticated, setUserAuthentication ] = useState(false);
  const [ role, setRole ] = useState('');

  useEffect(() => {
    const isUserLoggedin = localStorage.getItem('isUserLoggedin');
    const role = localStorage.getItem('role');

    
    if (isUserLoggedin === 'true' && role === 'ADMIN') {
      setUserAuthentication(true);
      setRole('ADMIN');
      return ;
    }
    
    if (!(isUserLoggedin === 'true')) {
      navigate('/login');
      return ;
    }

    if (role === 'DRIVER') {
      navigate('/driver-dashboard');
      return ;
    }

    if (role === 'PASSANGER') {
      navigate('/passanger-dashboard');
      return ;
    }

  }, []);
  
  return (
    (isUserAuthenticated && role === 'ADMIN') && (<>
      <Header/>
      <div className="admin-dashboard">
        <h1>Admin dashboard</h1>
      </div>
    </>)
  );
}

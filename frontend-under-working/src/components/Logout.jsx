import { useNavigate } from "react-router-dom";


export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <button
        
        className="logout-btn"
        onClick={handleLogout}
      >Logout</button>
    </>
  );
}

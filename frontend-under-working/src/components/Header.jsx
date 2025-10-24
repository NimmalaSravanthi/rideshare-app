
import '../styles/Header.css';
import{ useNavigate } from 'react-router-dom';
import Logout from './Logout.jsx';


export default function Header() {

  const navigate = useNavigate();
  return(
    <>
      <div className="header">
        <h1 onClick={() => navigate('/')}>Ride Sharing System</h1>
        <Logout />
      </div>
    </>
  );
}

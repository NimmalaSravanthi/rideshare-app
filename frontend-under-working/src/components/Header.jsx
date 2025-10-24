
import '../styles/Header.css';
import{ useNavigate } from 'react-router-dom';
import LoginAs from './LoginAs.jsx';
export default function Header(props) {

  const navigate = useNavigate();
  return(
    <>
      <div className="header">
        <h1 onClick={() => navigate('/')}>Ride Sharing System</h1>
        <LoginAs props={props}/>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginPage() {

  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isUserLoggedin = localStorage.getItem('isUserLoggedin');
    const role = localStorage.getItem('role');

    if (isUserLoggedin === 'true' && role === 'ADMIN') {
      navigate('/admin-dashboard');
      return ;
    }

    if (isUserLoggedin === 'true' && role === 'DRIVER') {
      navigate('/driver-dashboard');
      return ;
    }

    if (isUserLoggedin === 'true' && role === 'PASSANGER') {
      navigate('/passanger-dashboard');
      return ;
    }
  });

  const handleLogin = async () => {

    console.log(role, email, password);

    try {
      const res = await axios.post(`http://localhost:8080/auth/login?email=${email}&password=${password}`);
      const data = res.data;

      if (data.status === 'invalid') {
        console.log('Login credentials are invalid!!');
        return;
      }


      localStorage.setItem('role', data.role)
      localStorage.setItem('isUserLoggedin', 'true')

      if (data.role === 'ADMIN') {
        navigate('/admin-dashboard');
        return;
      }

    } catch (err) {
      console.log('Error occured in login: ' + err);
    }
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
              onChange={(e) => setRole(e.target.value)}
            />
            <label>Admin</label>

            <input
              type="radio"
              name='role'
              value="driver"
              checked={role === 'driver'}
              onChange={(e) => setRole(e.target.value)}

            />
            <label>Driver</label>

            <input
              type="radio"
              name='role'
              value="passanger"
              checked={role === 'passanger'}
              onChange={(e) => setRole(e.target.value)}

            />
            <label>Passanger</label>

          </div>

          <label >Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="admin-login-btn"
            onClick={handleLogin}
            type='button'
          >Login in</button>
        </form>
      </div>
    </>
  );
}

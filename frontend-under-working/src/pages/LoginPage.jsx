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
      return;
    }

    if (isUserLoggedin === 'true' && role === 'DRIVER') {
      navigate('/driver-dashboard');
      return;
    }

    if (isUserLoggedin === 'true' && role === 'PASSENGER') {
      navigate('/passenger-dashboard');
      return;
    }
  });

  const handleLogin = async () => {


    try {
      const res = await axios.post(`http://localhost:8080/auth/login?email=${email}&password=${password}`);
      const data = res.data;


      if (data.status === 'invalid') {
        console.log('Login credentials are invalid!!');
        return;
      }


      localStorage.setItem('role', data.role);
      localStorage.setItem('email', email);
      localStorage.setItem('isUserLoggedin', 'true');
      localStorage.setItem('isFirstLogin', data.firstLogin);



      if (data.role === 'ADMIN') {
        console.log(data.role);
        navigate('/admin-dashboard');
        return;
      }

      if (data.role === 'DRIVER' && !data.firstLogin) {
        navigate('/driver-dashboard');
        return;
      }

      if (data.role === 'PASSENGER' && !data.firstLogin) {
        navigate('/passenger-dashboard');
        return;
      }

      if (data.firstLogin) {
        localStorage.setItem('isFirstLogin', 'true');
        navigate('/reset-password');
        return;
      }



    } catch (err) {
      console.log('Error occured in login: ' + err);
    }
  }

  return (
    <>
      <Header showLoginTypeBtn={true} />
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form">

          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="login-type-input"
          >
            <option value="">--- Login type ---</option>
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
            <option value="passenger">Passenger</option>
          </select>


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
            className="login-btn"
            onClick={handleLogin}
            type='button'
          >Login in</button>
        </form>
      </div>
    </>
  );
}

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AdminLoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserRegistrationPage from './pages/UserRegistrationPage.jsx';
import PassangerDashboard from './pages/PassangerDashboard.jsx';
import DriverDashboard from './pages/DriverDashboard.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import { useEffect, useState } from 'react';

function App() {

  const [role, setRole] = useState('');
  const [isUserAuthenticated, setUserAuthentication] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const isUserLoggedin = localStorage.getItem('isUserLoggedin');
    if (
      savedRole === 'ADMIN' ||
      savedRole === 'DRIVER' ||
      savedRole === 'PASSANGER' &&
      isUserLoggedin === 'true'
    ) {
      setRole(savedRole);
      setUserAuthentication(true);
    }
  }, []);

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<AdminLoginPage />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/user-registration' element={<UserRegistrationPage />} />
          <Route path='/driver-dashboard' element={<DriverDashboard />} />
          <Route path='/passanger-dashboard' element={<PassangerDashboard />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App

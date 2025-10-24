import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import PassengerDashboard from './pages/PassengerDashboard';
import Navbar from './components/Navbar';

function App() {
  const [step, setStep] = useState('home');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Optional: Restore session on refresh
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedRole = localStorage.getItem('role');
    const savedStep = localStorage.getItem('step');
    if (savedEmail && savedRole && savedStep) {
      setEmail(savedEmail);
      setRole(savedRole);
      setStep(savedStep);
    }
  }, []);

  const handleLogin = (nextStep, userEmail, userRole) => {
    setEmail(userEmail);
    setRole(userRole);
    setStep(nextStep);

    // Optional: Save session
    localStorage.setItem('email', userEmail);
    localStorage.setItem('role', userRole);
    localStorage.setItem('step', nextStep);
  };

  const handleReset = () => {
    setStep('dashboard');
    localStorage.setItem('step', 'dashboard');
  };

  const handleLogout = () => {
    setStep('login');
    setEmail('');
    setRole('');
    localStorage.clear();
  };

  return (
    <>
      <Navbar email={email} onLogout={handleLogout} />
      {step === 'home' && <Home onExplore={() => setStep('login')} />}
      {step === 'login' && <LoginForm onLogin={handleLogin} />}
      {step === 'reset' && <ResetPasswordForm email={email} onReset={handleReset} />}
      {step === 'dashboard' && role === 'ADMIN' && <AdminDashboard email={email} />}
      {step === 'dashboard' && role === 'DRIVER' && <DriverDashboard email={email} />}
      {step === 'dashboard' && role === 'PASSENGER' && <PassengerDashboard email={email} />}
      {step === 'dashboard' && !['ADMIN', 'DRIVER', 'PASSENGER'].includes(role) && (
        <div style={{ padding: '2rem', color: 'red' }}>
          Unknown role: <strong>{role}</strong>
        </div>
      )}
    </>
  );
}

export default App;

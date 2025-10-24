import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AdminLoginPage from './pages/LoginPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import UserRegistrationPage from './pages/UserRegistrationPage.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<AdminLoginPage/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/user-registration' element={<UserRegistrationPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

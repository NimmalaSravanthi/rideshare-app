
import Header from '../components/Header.jsx';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className='overview-container'>
        <div className='content'>
          <h1>Uniting travelers through simple, shared journeys.
            Your journey begins with just one connection</h1>
          <button
            className='get-started-btn'
            onClick={() => navigate('/login')}
          >
            Get started
          </button>
        </div>

        <div className='cover-image'>

        </div>
      </div>
    </>
  );
}

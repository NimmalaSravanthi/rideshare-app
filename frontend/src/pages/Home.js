import React from 'react';
import '../styles/Home.css';
import rideBanner from '../assets/ride.jpg';

function Home({ onExplore }) {
  return (
    <div className="home-container">
      <img src={rideBanner} alt="RideShare Banner" className="banner-image" />
      <div className="overlay">
        <h1>Welcome to RideShare!</h1>
        <p>Your trusted ride-sharing platform</p>
        <button className="explore-btn" onClick={onExplore}>Explore</button>
      </div>
    </div>
  );
}

export default Home;

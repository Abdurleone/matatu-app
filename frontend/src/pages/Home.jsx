import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Logo Section */}
      <Link to="/login">
        <img 
          src={Logo} 
          alt="Mathree Logo" 
          className="home-logo"
        />
      </Link>

      {/* Footer Section */}
      <footer className="home-footer">
        <div>
          <Link to="/contact">Contact</Link>
          <Link to="/copyright">Copyright</Link>
          <Link to="/license">License</Link>
        </div>
        <p>© 2025 Mathree Management System</p>
      </footer>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx'; // Import the reusable layout component
const Home = () => {
  return (
    <PageLayout>
      {/* Logo Section */}
      <div className="home-container">
        <Link to="/login">
          <img 
            src="../assets/logo.png" 
            alt="Mathree Logo" 
            className="home-logo"
          />
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="home-footer">
        <div>
          <Link to="/contact">Contact</Link>
          <Link to="/copyright">Copyright</Link>
          <Link to="/license">License</Link>
        </div>
        <p>© 2025 Mathree Management System</p>
      </footer>
    </PageLayout>
  );
};

export default Home;

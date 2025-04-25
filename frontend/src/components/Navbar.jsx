import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Hide Navbar on the home page ("/")
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <nav className="flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-700 transition">Home</Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
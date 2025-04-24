import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); // assumes AuthContext provides these
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/">Matatu Manager</NavLink>
        </h1>

        <div className="space-x-4 hidden md:flex">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/matatus" className="hover:underline">Matatus</NavLink>
          <NavLink to="/bookings" className="hover:underline">Bookings</NavLink>
          <NavLink to="/drivers" className="hover:underline">Drivers</NavLink>
          {user ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <NavLink to="/login" className="hover:underline">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

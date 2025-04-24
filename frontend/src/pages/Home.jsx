// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Matatu Booking System</h1>
      <p className="mb-6">Book your ride, check available seats, and view matatu details with ease.</p>
      
      <div className="space-x-4">
        <Link to="/matatus" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Matatus
        </Link>
        <Link to="/book" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Book a Seat
        </Link>
      </div>
    </div>
  );
};

export default Home;
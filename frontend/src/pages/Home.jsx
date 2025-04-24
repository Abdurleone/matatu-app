import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Mathree Management System</h1>
        <p className="text-center mb-4">Welcome to the Mathree Management System</p>
        
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Chagua Mbogi!!</h2>
            <div className="flex flex-col gap-4">
              {/* Drivers/Conductors login */}
              <Link
                to="/driver-login"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center"
              >
                Kigonyi/Donda
              </Link>
              
              {/* Passengers login */}
              <Link
                to="/passenger-login"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-center"
              >
                Empress ama Yakuza
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

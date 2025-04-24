// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mathree App | Version 1.0.0 | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
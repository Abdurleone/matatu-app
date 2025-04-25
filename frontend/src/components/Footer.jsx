import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-gray-900 text-center text-sm text-gray-400">
      <div className="space-x-4">
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/copyright" className="hover:underline">Copyright</Link>
        <Link to="/license" className="hover:underline">License</Link>
      </div>
    </footer>
  );
};

export default Footer;
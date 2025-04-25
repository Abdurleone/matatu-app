import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [category, setCategory] = useState(''); // State to store selected category

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert('Please select a user category before logging in.');
      return;
    }
    // Send category, email, and password to the backend
    console.log('Category:', category);
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">User Category</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Jitambue
              </option>
              <option value="admin">Kigonyi</option>
              <option value="driver">Donda</option>
              <option value="passenger">Empress/Yakuza</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
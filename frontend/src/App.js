import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"; // Import the Login component
import MatatuDetailPage from "./pages/MatatuDetailPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Add the login route */}
          <Route path="/matatu/:id" element={<MatatuDetailPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

// Component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  // Hide Navbar on the home page ("/") and login page ("/login")
  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }
  return <Navbar />;
};

export default App;
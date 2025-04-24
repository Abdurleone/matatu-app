import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar.js';
import Home from './pages/Home.js';
import MatatuDetailPage from './pages/MatatuDetailPage.js';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matatu/:id" element={<MatatuDetailPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;


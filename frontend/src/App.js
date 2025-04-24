import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js"; // Adjust the import path if necessary
import Navbar from "./components/Navbar"; // Adjust the import path if necessary
import Home from "./pages/Home"; // Adjust the import path if necessary
import MatatuDetailPage from "./pages/MatatuDetailPage"; // Adjust the import path if necessary

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matatu/:id" element={<MatatuDetailPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

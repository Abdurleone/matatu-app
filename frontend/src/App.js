import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.js"; // Adjust the import path if necessary
import Navbar from "./components/Navbar"; // Adjust the import path if necessary
import Home from "./pages/Home"; // Adjust the import path if necessary
import MatatuDetailPage from "./pages/MatatuDetailPage"; // Adjust the import path if necessary

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

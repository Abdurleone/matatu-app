// filepath: c:\Users\AbdulKadir Sebit\OneDrive - DR. KALEBI LABS (DKL) LTD\Desktop\Matatu\matatu-app\frontend\src\components\PageLayout.jsx
import React from "react";
import "./PageLayout.css"; // Import the CSS file

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <div className="overlay"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default PageLayout;
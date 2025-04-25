import React from "react";
import PageLayout from "../components/PageLayout.jsx";

const DriverDashboard = () => {
  return (
    <PageLayout>
      <div className="dashboard-container">
        <h1>Driver Dashboard</h1>
        <p>Welcome to the driver dashboard. Here you can manage your trips and view assigned vehicles.</p>
      </div>
    </PageLayout>
  );
};

export default DriverDashboard;
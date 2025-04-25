import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MatatuDetailPage.css'; // Import the CSS file

const MatatuDetailPage = () => {
  const { id } = useParams(); // Get the matatu ID from the URL
  const [matatuDetails, setMatatuDetails] = useState(null);

  useEffect(() => {
    // Fetch matatu details from the backend
    const fetchMatatuDetails = async () => {
      try {
        const response = await fetch(`/api/matatus/${id}`); // Replace with your backend API endpoint
        const data = await response.json();
        setMatatuDetails(data);
      } catch (error) {
        console.error('Error fetching matatu details:', error);
      }
    };

    fetchMatatuDetails();
  }, [id]);

  if (!matatuDetails) {
    return <div className="loading">Loading matatu details...</div>;
  }

  return (
    <div className="matatu-details-container">
      <header className="matatu-header">
        <h1>Matatu Details</h1>
        <p>Here are the details for Matatu ID: {id}</p>
      </header>

      <section className="matatu-info">
        <h2>Vehicle Information</h2>
        <ul>
          <li><strong>Registration Number:</strong> {matatuDetails.registrationNumber}</li>
          <li><strong>Capacity:</strong> {matatuDetails.capacity} passengers</li>
          <li><strong>Route:</strong> {matatuDetails.route}</li>
          <li><strong>Status:</strong> {matatuDetails.isActive ? 'Active' : 'Inactive'}</li>
        </ul>
      </section>

      <section className="driver-info">
        <h2>Driver Information</h2>
        <ul>
          <li><strong>Name:</strong> {matatuDetails.driver.name}</li>
          <li><strong>Phone:</strong> {matatuDetails.driver.phone}</li>
        </ul>
      </section>
    </div>
  );
};

export default MatatuDetailPage;

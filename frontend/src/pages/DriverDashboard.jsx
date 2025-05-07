import React, { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import "./DriverDashboard.css";

const DriverDashboard = () => {
  const vehicleDetails = {
    registrationNumber: "KAA 123A",
    capacity: 33,
    route: "Nairobi - Mombasa",
  };

  const [trips] = useState([
    { id: 1, time: "8:00 AM", destination: "Mombasa", status: "Scheduled" },
    { id: 2, time: "2:00 PM", destination: "Nairobi", status: "Completed" },
  ]);

  const generateSeats = () => {
    const seatData = [];
    for (let i = 1; i <= 33; i++) {
      let seat = { seatNumber: i, status: "vacant" };

      if (i === 1) seat = { ...seat, status: "unavailable", label: "Driver" };
      else if (i === 2) seat = { ...seat, status: "unavailable", label: "Conductor" };
      else if ([3, 5, 6, 8, 9, 12].includes(i)) {
        seat = { ...seat, status: "booked", label: `Passenger ${i}` };
      }

      seatData.push(seat);
    }
    return seatData;
  };

  const [seats] = useState(generateSeats());

  return (
    <PageLayout>
      <div className="dashboard-container">
        <h1>Driver Dashboard</h1>
        <p>Welcome to the driver dashboard. Here you can manage your trips and view assigned vehicles.</p>

        {/* Vehicle Details */}
        <section className="vehicle-details">
          <h2>Vehicle Details</h2>
          <ul>
            <li><strong>Registration Number:</strong> {vehicleDetails.registrationNumber}</li>
            <li><strong>Capacity:</strong> {vehicleDetails.capacity} passengers</li>
            <li><strong>Route:</strong> {vehicleDetails.route}</li>
          </ul>
        </section>

        {/* Trips */}
        <section className="trip-management">
          <h2>Upcoming Trips</h2>
          <ul>
            {trips.map((trip) => (
              <li key={trip.id}>
                <strong>{trip.time}</strong> - {trip.destination} ({trip.status})
              </li>
            ))}
          </ul>
        </section>

        {/* Seats */}
        <section className="seat-arrangement">
          <h2>Seat Arrangement</h2>
          <div className="seats-grid">
            {seats.map((seat) => (
              <div
                key={seat.seatNumber}
                className={`seat ${seat.status}`}
                title={
                  seat.status === "unavailable"
                    ? seat.label
                    : `${seat.label || "Seat"} ${seat.seatNumber} - ${seat.status}`
                }
              >
                {seat.label || seat.seatNumber}
              </div>
            ))}
          </div>
        </section>

        {/* Booked List */}
        <section className="passenger-list">
          <h2>Booked Passengers</h2>
          <ul>
            {seats
              .filter((s) => s.status === "booked")
              .map((s) => (
                <li key={s.seatNumber}>
                  {s.label} — Seat {s.seatNumber}
                </li>
              ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
};

export default DriverDashboard;
import React from "react";
import MatatuList from "../components/MatatuList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-white shadow p-6 md:p-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Matatu Manager</h1>
          <p className="text-lg text-gray-600">
            Find, manage, and track your matatus easily. Click on any listing to see details.
          </p>
        </div>
      </section>

      {/* Matatu List */}
      <section className="p-4 md:p-8 max-w-6xl mx-auto">
        <MatatuList />
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

const MatatuList = ({ matatus }) => {
  return (
    <div>
      {matatus.map((matatu) => (
        <div key={matatu._id}>
          <h3>{matatu.name}</h3>
          <p>Capacity: {matatu.capacity}</p>
          <Link to={`/matatu/${matatu._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default MatatuList;
import React, { useEffect, useState } from 'react';
import { getMatatuById, bookSeat } from '../../services/matatuService';

const MatatuDetailPage = ({ match }) => {
  const { id } = match.params;
  const [matatu, setMatatu] = useState(null);

  useEffect(() => {
    const fetchMatatu = async () => {
      const data = await getMatatuById(id);
      setMatatu(data);
    };
    fetchMatatu();
  }, [id]);

  const handleBookSeat = async () => {
    const result = await bookSeat(id);
    alert(result.message);
    setMatatu(result.matatu);
  };

  if (!matatu) return <div>Loading...</div>;

  return (
    <div>
      <h1>{matatu.name}</h1>
      <p>Capacity: {matatu.capacity}</p>
      <p>Seats Available: {matatu.seatsAvailable}</p>
      <button onClick={handleBookSeat}>Book a Seat</button>
    </div>
  );
};

export default MatatuDetailPage;

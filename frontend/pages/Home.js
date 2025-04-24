import React, { useEffect, useState } from 'react';
import { getMatatus } from '../services/matatuService';
import MatatuList from '../components/MatatuList';

const Home = () => {
  const [matatus, setMatatus] = useState([]);

  useEffect(() => {
    const fetchMatatus = async () => {
      const data = await getMatatus();
      setMatatus(data);
    };
    fetchMatatus();
  }, []);

  return (
    <div>
      <h1>Available Matatus</h1>
      <MatatuList matatus={matatus} />
    </div>
  );
};

export default Home;
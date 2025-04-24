import React, { useEffect, useState } from 'react';
import { getMatatus } from '../services/matatuService.js';
import MatatuList from '../components/MatatuList.js';

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
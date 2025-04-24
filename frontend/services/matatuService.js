import axios from 'axios';

const API_URL = 'http://localhost:3001/api/matatus';

export const getMatatus = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMatatuById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const bookSeat = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/book-seat/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
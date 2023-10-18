import axiosRoot from 'axios';

const BASE_URL = 'https://scouts-server.onrender.com/api/';
//const DEV_URL = 'http://localhost:8080/api/';

export const axios = axiosRoot.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': 'true',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

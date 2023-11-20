import axiosRoot from 'axios';

//const BASE_URL = import.meta.env.VITE_SERVER_URL;
const DEV_URL = import.meta.env.VITE_DEV_URL;

export const axios = axiosRoot.create({
  baseURL: DEV_URL,
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

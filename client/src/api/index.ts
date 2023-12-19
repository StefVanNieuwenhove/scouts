import axiosRoot from 'axios';

const PROD_URL = import.meta.env.VITE_PROD_URL;
//const DEV_URL = import.meta.env.VITE_DEV_URL;

export const axios = axiosRoot.create({
  baseURL: PROD_URL,
  headers: {
    'Content-Type': 'application/json',
    /* 'Access-Control-Allow-Credentials': 'true',
    'Acces-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE ',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization', */
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.withCredentials = true;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

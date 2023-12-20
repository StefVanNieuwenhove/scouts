import { axios } from '.';
import { Camp } from '../types';

export const getCamps = async (): Promise<Camp[]> => {
  try {
    const camps = await axios.get('/camp', { withCredentials: true });
    return camps.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCamp = async (id: string): Promise<Camp> => {
  try {
    const camp = await axios.get(`/camp/${id}`, { withCredentials: true });
    return camp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

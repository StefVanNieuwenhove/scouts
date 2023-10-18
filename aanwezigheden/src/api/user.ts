import { axios } from '.';
import { User } from '../types';

export const getUser = async (id: string): Promise<User> => {
  const user = await axios.get(`user/${id}`, { withCredentials: true });
  return user.data;
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const data = await axios.post(
    '/user/login',
    { email, password },
    { withCredentials: true }
  );
  return data.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/user/logout');
};

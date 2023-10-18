import {
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IAuthProvider, User } from '../../types';
import * as userApi from '../../api/user';
import * as api from '../../api';
import { Buffer } from 'buffer';

const TOKEN_KEY = 'scouts-token';

const AuthContext = createContext<IAuthProvider>({
  user: null,
  loading: true,
  error: '',
  token: '',
  login: async () => {
    return { user: null, token: '' };
  },
  logout: async () => {},
  setSession: async () => {},
});

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const payload = Buffer.from(base64Url, 'base64').toString('ascii');
  return JSON.parse(payload);
};

const parseExp = (exp: number) => {
  return new Date(exp * 1000);
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = memo(({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string>(
    localStorage.getItem(TOKEN_KEY) || ''
  );

  const setSession = useCallback(async (token: string, user: User | null) => {
    const { exp, id } = parseJwt(token);
    const expiresAt = parseExp(exp);
    const validToken = expiresAt > new Date();

    if (validToken) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      token = '';
    }

    api.setAuthToken(token);
    setToken(token);

    if (!user && validToken) {
      user = await userApi.getUser(id);
      delete user.password;
    }
    setUser(user);

    /* if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } */
  }, []);

  useEffect(() => {
    setSession(token, null);
  }, [token, setSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError('');
        const { token, user } = await userApi.login(email, password);
        await setSession(token, user);
        return { token, user };
      } catch (error) {
        setError('Error occured when loggin in');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  const logout = useCallback(async () => {
    await userApi.logout();
    await setSession('', null);
  }, [setSession]);

  const value = useMemo(() => {
    return {
      user,
      loading,
      error,
      token,
      login,
      logout,
      setSession,
    };
  }, [user, loading, error, token, login, logout, setSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export default AuthProvider;

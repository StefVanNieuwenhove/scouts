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
import { AuthProvider as AuthProviderType, User } from '../types';
import { login as loginUser, logout as logoutUser } from '../api/user';
import * as api from '../api';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY as string;

const AuthContext = createContext<AuthProviderType>({
  user: null,
  loading: true,
  error: '',
  token: '',
  login: async () => {},
  logout: async () => {},
  setSession: async () => {},
  isAuth: false,
  isSignedIn: () => false,
  hasPermission: () => false,
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
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string>(
    localStorage.getItem(TOKEN_KEY) || ''
  );

  const setSession = useCallback(
    async (token: string) => {
      try {
        setLoading(true);
        if (token) {
          const { exp, user } = parseJwt(token);
          const expiresAt = parseExp(exp);
          const validToken = expiresAt > new Date();

          if (validToken) {
            localStorage.setItem(TOKEN_KEY, token);
            api.setAuthToken(token);
            setToken(token);
            setUser(user);
          } else {
            localStorage.removeItem(TOKEN_KEY);
            token = '';
          }
        }
      } catch (error) {
        setError('Error occured when setting session');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setToken, setLoading]
  );

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError('');
        const { token, user } = await loginUser(email, password);
        setUser(user);
        await setSession(token);
        return navigate(`/dashboard`);
      } catch (error) {
        setError('Error occured when loggin in');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSession, navigate]
  );

  const isAuth = useMemo(() => !!token, [token]);

  const isSignedIn = useCallback(() => {
    try {
      if (!token) return false;
      const { exp } = parseJwt(token);
      return parseExp(exp) > new Date();
    } catch (error) {
      return false;
    }
  }, [token]);

  const logout = useCallback(async () => {
    await logoutUser();
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  }, []);

  const hasPermission = useCallback(
    (route: string) => {
      if (!user) return false;
      const rolePermissions = {
        admin: [
          'dashboard',
          'aanwezigheden',
          'aanwezigheden/kapoen',
          'aanwezigheden/wouter',
          'aanwezigheden/jonggiver',
          'aanwezigheden/giver',
          'aanwezigheden/jin',
          'rvb',
          'rvb/fiscaliteit',
          'admin',
        ],
        parent: ['dashboard'],
        kapoen: ['dashboard', 'aanwezigheden/kapoen'],
        wouter: ['dashboard', 'aanwezigheden/wouter'],
        jonggiver: ['dashboard', 'aanwezigheden/jonggiver'],
        giver: ['dashboard', 'aanwezigheden/giver'],
        jin: ['dashboard', 'aanwezigheden/jin'],
        groepsleiding: [
          'dashboard',
          'aanwezigheden',
          'aanwezigheden/kapoen',
          'aanwezigheden/wouter',
          'aanwezigheden/jonggiver',
          'aanwezigheden/giver',
          'aanwezigheden/jin',
          'rvb/fiscaliteit',
        ],
        board: ['dashboard', 'rvb/fiscaliteit'],
      };
      return user?.role.some((role) => rolePermissions[role]?.includes(route));
    },
    [user]
  );

  /* const hasPermission = useCallback(
    (permission: string) => {
      const rolePermissions = {
        manager: ['read', 'write', 'delete'],
        employee: ['read'],
      };

      if (!user) {
        return false;
      }
      return rolePermissions[user.role].includes(permission);
    },
    [user]
  ); */

  const value = useMemo(() => {
    return {
      user,
      loading,
      error,
      token,
      login,
      logout,
      setSession,
      isAuth,
      isSignedIn,
      hasPermission,
    };
  }, [
    user,
    loading,
    error,
    token,
    login,
    logout,
    setSession,
    isAuth,
    isSignedIn,
    hasPermission,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export default AuthProvider;

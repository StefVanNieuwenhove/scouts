import { ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type Role =
  | 'admin'
  | 'kapoen'
  | 'wouter'
  | 'jonggiver'
  | 'giver'
  | 'jin'
  | 'groepsleiding'
  | 'board'
  | 'parent';

export type AuthProvider = {
  user: User | null;
  login: (
    email: string,
    password: string,
    include_token: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string;
  token: string | null;
  setSession: (token: string, user: User | null) => Promise<void>;
  isAuth: boolean;
  isSignedIn: () => boolean;
  hasPermission: (route: string) => boolean;
};

export type ThemeProvider = {
  theme: string;
  toggleTheme: () => void;
};

export type Link = {
  url: string;
  name: string;
  icon: ReactNode;
  permission: string;
};

export type Camp = {
  id: string;
  name: 'overgangsweekend' | 'paaskamp' | 'zomerkamp_kort' | 'zomerkamp_lang';
  start_date: string;
  end_date: string;
  cost_per_day: number;
  price: number;
  createAt: string;
  updatedAt: string;
};

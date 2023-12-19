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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string;
  token: string | null;
  setSession: (token: string, user: User | null) => Promise<void>;
  isAuth: boolean;
  isSignedIn: () => boolean;
  hasPermission: (route: string) => boolean;
};

export type Link = {
  url: string;
  name: string;
  icon: ReactNode;
  permission: string;
};

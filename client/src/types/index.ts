import { ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role[];
  password?: string;
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

export type Tak = 'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jins';

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
  total_days: number;
  cost_per_day: number;
  price: number;
  createAt: string;
  updatedAt: string;
};

export type Member = {
  id?: string;
  lidnummer: string;
  voornaam: string;
  achternaam: string;
  geboortedatum: string;
  tak: Tak;
  rijksregisternummer: string;
  createdAt?: string;
  updatedAt?: string;
  ouder?: Parent[];
  vergadering?: Activity[];
  kamp?: Camp[];
};

export type Parent = {
  id: string;
};

export type Activity = {
  id: string;
};

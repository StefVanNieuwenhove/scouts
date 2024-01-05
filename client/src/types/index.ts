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

export type MemberInfo = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  parents?: Parent[];
  activities?: Activity[];
  camps?: Camp[];
};

export type MemberForm = {
  member_id: string;
  firstname: string;
  lastname: string;
  date_of_birth: string;
  group: Tak;
  national_number: string;
};

export type Member = MemberForm & MemberInfo;

export type Parent = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  huise_number: string;
  box_number?: string;
  zip_code: string;
  city: string;
  national_number: string;
  createdAt: string;
  updatedAt: string;
  member_id?: string;
};

export type Activity = {
  id: string;
  title: string;
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  //type: 'success' | 'error' | 'warning';
  type: string;
  autoHideDuration?: number;
  position?: 'tl' | 'tr' | 'bl' | 'br';
  onClose: () => void;
  transition?: 'slide' | 'fade';
};

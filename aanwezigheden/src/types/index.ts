export interface IAuthProvider {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; token: string }>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string;
  token: string | null;
  setSession: (token: string, user: User | null) => Promise<void>;
}

export type User = {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  created_at: string;
  updated_at: string;
};

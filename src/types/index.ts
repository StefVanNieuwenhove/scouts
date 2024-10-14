export type NavigationLink = {
  name: string;
  href: string;
};

export type FormResponse = {
  type: 'success' | 'error';
  message: string;
};

export type CreateUserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type NavigationLinks = {
  name: string;
  href: string;
  acces: boolean;
}[];

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

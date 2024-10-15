import { CreateLeidingSchema } from '@/lib/validation';
import { z } from 'zod';

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

export type UpdateLeidingData = {
  data: z.infer<typeof CreateLeidingSchema>;
  id: string;
};

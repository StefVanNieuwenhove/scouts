import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, 'Naam is verplicht'),
    lastName: z.string().min(1, 'Familienaam is verplicht'),
    email: z.string().email('Email is verplicht'),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Wachtwoord moet min 8 karakters lang zijn en bevat een kleine letter, grote letter, getal en een speciale karakter'
      ),
    checkPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{8,}$/,
        'Wachtwoord moet min 8 karakters lang zijn en bevat een kleine letter, grote letter, getal en een speciale karakter'
      ),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['checkPassword'],
  });

export const VerificationCodeSchema = z.object({
  code: z.string().min(6, 'Code moet min 6 cijfers lang zijn'),
});

import { Tak } from '@prisma/client';
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

export const CreateLeidingSchema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  email: z.string().email('Email is verplicht'),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Telefoonnummer heeft niet het juiste formaat'),
  totem: z.string().min(1, 'Totem is verplicht'),
  tak: z
    .enum([Tak.KAPOENEN, Tak.WOUTERS, Tak.JONGGIVERS, Tak.GIVERS, Tak.JINS])
    .default(Tak.KAPOENEN),
  takResponsible: z.boolean().default(false),
  isGroepsleiding: z.boolean().default(false),
  image: z.string().optional(),
});

'use server';

import prisma from '@/lib/prisma';
import { CreateUserData, FormResponse } from '@/types';
import { clerkClient } from '@clerk/nextjs/server';
import { Role } from '@prisma/client';

export const setPublicMetadata = async (id: string): Promise<FormResponse> => {
  'use server';
  try {
    if (!id) {
      return {
        type: 'error',
        message: 'User heeft geen data',
      };
    }

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        roles: [Role.OUDER],
      },
    });

    return {
      type: 'success',
      message: 'Rol toegekend aan gebruiker',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};

export const createUser = async ({
  id,
  firstName,
  lastName,
  email,
}: CreateUserData): Promise<FormResponse> => {
  'use server';
  try {
    if (!id || !firstName || !lastName || !email) {
      return {
        type: 'error',
        message: 'User heeft geen data',
      };
    }

    console.log({ id, firstName, lastName, email });

    const user = await prisma.user.create({
      data: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: [Role.OUDER],
      },
    });
    console.log(user);
    return {
      type: 'success',
      message: 'Gebruiker succesvol aangemaakt',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};

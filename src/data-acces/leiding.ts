'use server';

import prisma from '@/lib/prisma';
import { convertToTak } from '@/lib/utils';
import { CreateLeidingSchema } from '@/lib/validation';
import { FormResponse, UpdateLeidingData } from '@/types';
import { Leiding } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getLeiding = async (): Promise<Leiding[] | null> => {
  try {
    const leiding = await prisma.leiding.findMany();
    return leiding;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGroepsLeiding = async (): Promise<Leiding[] | null> => {
  try {
    const leiding = await prisma.leiding.findMany({
      where: {
        groepsleiding: true,
      },
    });
    return leiding;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLeidingByTak = async (
  tak: string
): Promise<Leiding[] | null> => {
  try {
    const leiding = await prisma.leiding.findMany({
      where: {
        tak: convertToTak(tak),
      },
    });
    return leiding;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createleiding = async (
  data: z.infer<typeof CreateLeidingSchema>
): Promise<FormResponse> => {
  'use server';
  try {
    const {
      name,
      email,
      phone,
      totem,
      tak,
      takResponsible,
      isGroepsleiding,
      image,
    } = data;
    console.log(data);

    const leiding = await prisma.leiding.findUnique({
      where: {
        email: email,
      },
    });

    if (leiding) {
      return {
        type: 'error',
        message: 'Er bestaat al een leiding met dit email adres',
      };
    }

    await prisma.leiding.create({
      data: {
        name,
        email,
        phone,
        totem,
        tak,
        takResponsible,
        groepsleiding: isGroepsleiding,
        image,
      },
    });

    revalidatePath('/edit/leiding');

    return {
      type: 'success',
      message: 'Leiding is succesvol aangemaakt',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};

export const updateLeiding = async ({
  data,
  id,
}: UpdateLeidingData): Promise<FormResponse> => {
  'use server';
  try {
    await prisma.leiding.update({
      where: {
        id: id,
      },

      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        totem: data.totem,
        tak: convertToTak(data.tak),
        takResponsible: data.takResponsible,
        groepsleiding: data.isGroepsleiding,
        image: data.image,
      },
    });

    revalidatePath('/edit/leiding');

    return {
      type: 'success',
      message: 'Leiding succesvol bewerkt',
    };
  } catch (error) {
    return {
      type: 'error',
      message: `${error}`,
    };
  }
};

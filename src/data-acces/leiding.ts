'use server';

import prisma from '@/lib/prisma';
import { convertToTak } from '@/lib/utils';
import { Leiding } from '@prisma/client';

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
        takResponsible: true,
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

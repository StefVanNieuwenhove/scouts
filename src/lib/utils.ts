import { Tak } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToTak = (tak: string): Tak => {
  switch (tak.toLowerCase()) {
    case 'kapoenen':
      return Tak.KAPOENEN;
    case 'wouters':
      return Tak.WOUTERS;
    case 'jonggivers':
      return Tak.JONGGIVERS;
    case 'givers':
      return Tak.GIVERS;
    case 'jins':
      return Tak.JINS;
    default:
      return Tak.KAPOENEN;
  }
};

export const getTakValues = () => {
  return Object.values(Tak);
};

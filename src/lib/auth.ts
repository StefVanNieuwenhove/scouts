import { auth, currentUser } from '@clerk/nextjs/server';
import { Role } from '@prisma/client';

export const getUser = async () => {
  const user = await currentUser();
  return user;
};

export const getRole = async () => {
  const user = await getUser();
  return user?.publicMetadata?.roles as Role[];
};

export const hasAccess = (role: Role[], acces: Role[]) => {
  if (acces.includes(Role.ADMIN) || acces.includes(Role.GROEPSLEIDING))
    return true;

  return role.some((role) => acces.includes(role));
};

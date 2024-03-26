export const hasAccess = (access: string[], userRoles: string[]): boolean => {
  if (access.includes('*')) return true;
  console.log({ access, userRoles });
  return access.some((role) => userRoles.includes(role));
};

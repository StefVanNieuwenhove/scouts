export const accesInschrijvingen = (): boolean => {
  const acces = localStorage.getItem('accesInschrijvingen');
  return acces === 'true';
};

export const updateAccesInschrijvingen = (acces: boolean) => {
  localStorage.setItem('accesInschrijvingen', acces.toString());
};

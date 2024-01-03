import { Attests, Children } from '../containers';

export const links = [
  { name: 'Mijn kind', url: 'child' },
  { name: 'Mijn attesten', url: 'attest' },
];

export const components = [
  { name: 'child', component: <Children /> },
  { name: 'attest', component: <Attests /> },
];

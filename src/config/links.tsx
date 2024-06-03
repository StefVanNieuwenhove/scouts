import { Links as linksType } from '@/types/nav';

export const Links: linksType[] = [
  {
    name: 'Aanwezigheden',
    sublinks: [
      {
        name: 'Kapoenen',
        href: '/aanwezigheden/kapoenen',
        permission: ['admin', 'kapoen'],
      },
      {
        name: 'Wouters',
        href: '/aanwezigheden/wouters',
        permission: ['admin', 'wouter'],
      },
      {
        name: 'Jonggivers',
        href: '/aanwezigheden/jonggivers',
        permission: ['admin', 'jonggiver'],
      },
      {
        name: 'Givers',
        href: '/aanwezigheden/givers',
        permission: ['admin', 'giver'],
      },
      {
        name: 'Jins',
        href: '/aanwezigheden/jins',
        permission: ['admin', 'jin'],
      },
    ],
  },
  {
    name: 'RVB',
    sublinks: [
      {
        name: 'Fiscale attesten',
        href: '/rvb/fiscaal-attest',
        permission: ['admin'],
      },
    ],
  },
];

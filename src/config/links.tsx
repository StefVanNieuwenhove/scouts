import { Links as linksType } from '@/types/nav';

export const Links: linksType[] = [
  {
    name: 'Home',
    authenticaded: false,
    sublinks: [
      {
        name: 'Nieuws',
        href: '/nieuws',
        permission: ['admin'],
      },
      {
        name: 'Maandlijst',
        href: '/maandlijst',
        permission: ['admin'],
      },
      {
        name: 'Leiding',
        href: '/leiding',
        permission: ['admin'],
      },
      {
        name: 'Inschrijvingen',
        href: '/inschrijvingen',
        permission: ['admin'],
      },
      {
        name: 'Contact',
        href: '/contact',
        permission: ['admin'],
      },
    ],
  },
  {
    name: 'Aanwezigheden',
    authenticaded: true,
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
    name: 'Raad Van Bestuur',
    authenticaded: true,
    sublinks: [
      {
        name: 'Fiscale attesten',
        href: '/rvb/fiscaal-attest',
        permission: ['admin'],
      },
      {
        name: 'Kampen',
        href: '/rvb/kampen',
        permission: ['admin'],
      },
    ],
  },
  {
    name: 'Dashboard',
    authenticaded: true,
    sublinks: [
      {
        name: 'Mijn kind',
        href: '/dashboard/kind',
        permission: ['admin'],
      },
      {
        name: 'Fiscale attesten',
        href: '/dashboard/fiscaal-attest',
        permission: ['admin'],
      },
      {
        name: 'Kampen',
        href: '/dashboard/kampen',
        permission: ['admin'],
      },
    ],
  },
  {
    name: 'Admin',
    authenticaded: true,
    sublinks: [
      {
        name: 'Leden',
        href: '/admin/leden',
        permission: ['admin'],
      },
      {
        name: 'Rvb & leiding',
        href: '/admin/users',
        permission: ['admin'],
      },
      {
        name: 'Maandlijst',
        href: '/admin/maandlijst',
        permission: ['admin'],
      },
    ],
  },
  {
    name: 'Account',
    authenticaded: false,
    sublinks: [
      {
        name: 'Profiel',
        href: '/account/profile',
        permission: ['admin'],
      },
      {
        name: 'Settings',
        href: '/account/settings',
        permission: ['admin'],
      },
    ],
  },
];

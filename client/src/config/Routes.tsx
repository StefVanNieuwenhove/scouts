import { Route } from '../types';
import { IoMdHome } from 'react-icons/io';
import {
  MdGroups2,
  MdAdminPanelSettings,
  MdFestival,
  MdAccountCircle,
} from 'react-icons/md';

const Routes: Route[] = [
  {
    name: 'Home',
    icon: <IoMdHome className='text-lg' />,
    access: ['*'],
    items: [
      {
        name: 'Maandlijst',
        access: ['*'],
        url: '/maandlijst',
      },
    ],
  },
  {
    name: 'Aanwezigheden',
    icon: <MdFestival className='text-lg' />,
    items: [
      {
        name: 'Kapoenen',
        access: ['admin', 'groepsleiding', 'kapoenenleiding'],
        url: '/kapoenen',
      },
      {
        name: 'Wouters',
        access: ['admin', 'groepsleiding', 'wouterleiding'],
        url: '/wouters',
      },
      {
        name: 'Jonggivers',
        access: ['admin', 'groepsleiding', 'jonggiverleiding'],
        url: '/jonggivers',
      },
      {
        name: 'Givers',
        access: ['admin', 'groepsleiding', 'giverleiding'],
        url: '/givers',
      },
      {
        name: 'Jins',
        access: ['admin', 'groepsleiding', 'jinleiding'],
        url: '/jins',
      },
    ],
    access: [
      'admin',
      'groepsleiding',
      'kapoenenleiding',
      'wouterleiding',
      'jonggiverleiding',
      'giverleiding',
      'jinleiding',
    ],
  },
  {
    name: 'Raad Van Bestuur',
    icon: <MdGroups2 className='text-lg' />,
    access: ['admin', 'rvb', 'groepsleiding'],
    items: [
      {
        name: 'Kampen',
        access: ['admin', 'rvb', 'groepsleiding'],
        url: '/rvb/kampen',
      },
      {
        name: 'Fiscale attesten',
        access: ['admin', 'rvb', 'groepsleiding'],
        url: '/rvb/fiscaleattesten',
      },
      {
        name: 'Agenda',
        access: ['admin', 'rvb', 'groepsleiding'],
        url: '/rvb/agenda',
      },
    ],
  },
  {
    name: 'Admin',
    icon: <MdAdminPanelSettings className='text-lg' />,
    access: ['admin'],
    items: [
      {
        name: 'Leden',
        access: ['admin'],
        url: '/admin/leden',
      },
      {
        name: 'rvb & leiding',
        access: ['admin'],
        url: '/admin/rvb-leiding',
      },
      {
        name: 'Maandlijst',
        access: ['admin'],
        url: '/admin/maandlijst',
      },
    ],
  },
  {
    name: 'Account',
    icon: <MdAccountCircle className='text-lg' />,
    access: ['*'],
    items: [
      {
        name: 'Profiel',
        access: ['*'],
        url: '/account/profiel',
      },
      {
        name: 'Instellingen',
        access: ['*'],
        url: '/account/instellingen',
      },
      {
        name: 'Logout',
        url: '/logout',
        access: ['*'],
      },
    ],
  },
];

export default Routes;

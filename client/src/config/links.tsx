import {
  MdOutlineLogout,
  MdOutlinePedalBike,
  MdOutlineManageAccounts,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { GiKite, GiJesterHat, GiFootprint } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LuBackpack } from 'react-icons/lu';
import { RiAccountCircleLine, RiParentLine } from 'react-icons/ri';
import { PiCertificate } from 'react-icons/pi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Link } from '../types';

const aanwezighedenLinks: Link[] = [
  {
    url: 'aanwezigheden',
    name: 'Dashboard',
    icon: <MdOutlineSpaceDashboard className='text-white text-lg' />,
    //permission: ['admin', 'groepsleiding', 'board'],
    permission: 'aanwezigheden',
  },
  {
    url: 'aanwezigheden/kapoen',
    name: 'Kapoenen',
    icon: <GiJesterHat className='text-white' />,
    permission: 'aanwezigheden/kapoen',
  },
  {
    url: 'aanwezigheden/wouter',
    name: 'Wouters',
    icon: <GiKite className='text-white' />,
    permission: 'aanwezigheden/wouter',
  },
  {
    url: 'aanwezigheden/jonggiver',
    name: 'Jonggivers',
    icon: <LuBackpack className='text-white' />,
    permission: 'aanwezigheden/jonggiver',
  },
  {
    url: 'aanwezigheden/giver',
    name: 'Givers',
    icon: <MdOutlinePedalBike className='text-white' />,
    permission: 'aanwezigheden/giver',
  },
  {
    url: 'aanwezigheden/Jin',
    name: 'Jins',
    icon: <GiFootprint className='text-white' />,
    permission: 'aanwezigheden/jin',
  },
];

const rvbLinks: Link[] = [
  {
    url: 'rvb/fiscaliteit',
    name: 'Fiscale attesten',
    icon: <PiCertificate className='text-white text-lg' />,
    permission: 'rvb/fiscaliteit',
  },
];

const adminLinks: Link[] = [
  {
    url: 'admin/leden',
    name: 'Leden',
    icon: <HiOutlineUserGroup className='text-white' />,
    permission: 'admin/leden',
  },
  {
    url: 'admin/ouders',
    name: 'Ouders',
    icon: <RiParentLine className='text-white' />,
    permission: 'admin/ouders',
  },
  {
    url: 'admin/management',
    name: 'Leiding & RVB',
    icon: <MdOutlineManageAccounts className='text-white text-lg' />,
    permission: 'admin/leiding',
  },
  {
    url: 'admin/maandlijst',
    name: 'Maandlijst',
    icon: <FaRegCalendarAlt className='text-white' />,
    permission: 'admin/maandlijst',
  },
];

const defaultLinks: Link[] = [
  {
    url: '/logout',
    name: 'Logout',
    icon: <MdOutlineLogout className='text-white' />,
    permission: 'logout',
  },
  {
    url: 'profile',
    name: 'Profile',
    icon: <RiAccountCircleLine className='text-white' />,
    permission: 'profile',
  },
];

export { aanwezighedenLinks, rvbLinks, adminLinks, defaultLinks };

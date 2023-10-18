import { useState, memo } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthProvider';
import { MdOutlineLogout, MdOutlinePedalBike } from 'react-icons/md';
import {
  GiHamburgerMenu,
  GiKite,
  GiJesterHat,
  GiFootprint,
} from 'react-icons/gi';
import { BsJournalCode, BsPersonVcard, BsTree } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { ImStatsDots } from 'react-icons/im';
import { LuBackpack } from 'react-icons/lu';
import { RiAccountCircleLine } from 'react-icons/ri';

const tak = [
  {
    url: '/admin',
    name: 'Dashboard',
    icon: <ImStatsDots className='text-white' />,
  },
  {
    url: '/admin/kapoen',
    name: 'Kapoenen',
    icon: <GiJesterHat className='text-white' />,
  },
  {
    url: '/admin/wouter',
    name: 'Wouters',
    icon: <GiKite className='text-white' />,
  },
  {
    url: '/admin/jonggiver',
    name: 'Jonggiver',
    icon: <LuBackpack className='text-white' />,
  },
  {
    url: '/admin/giver',
    name: 'Givers',
    icon: <MdOutlinePedalBike className='text-white' />,
  },
  {
    url: '/admin/Jin',
    name: 'Jins',
    icon: <GiFootprint className='text-white' />,
  },
];

const admin = [
  {
    url: '/admin/leden',
    name: 'Leden',
    icon: <HiOutlineUserGroup className='text-white' />,
  },
  {
    url: '/admin/vergaderingen',
    name: 'Vergadering',
    icon: <BsJournalCode className='text-white' />,
  },
  {
    url: '/admin/leiding',
    name: 'Leiding',
    icon: <BsTree className='text-white' />,
  },
  {
    url: '/admin/roles',
    name: 'Roles',
    icon: <BsPersonVcard className='text-white' />,
  },
];

const NavAdmin = memo(() => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  if (user?.role !== 'admin') navigate('/login');

  return (
    <>
      <header className='bg-green-600'>
        {!open && (
          <nav className='w-full h-full inline-flex text-white px-3 py-2'>
            <button onClick={() => setOpen(true)} className=''>
              <GiHamburgerMenu className='text-2xl' />
            </button>
            <h1 className='text-3xl underline text-center w-full'>
              Aanwezigheden
            </h1>
          </nav>
        )}
        <aside
          className={
            open
              ? 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform overflow-scroll sm:translate-x-0'
              : 'hidden fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full overflow-scroll sm:translate-x-0'
          }
          onClick={() => setOpen(false)}>
          <div className='bg-green-600 text-white px-3 py-2 flex flex-col gap-2'>
            <h1 className='text-3xl underline'>Aanwezigheden</h1>
            <h2 className='text-sm'>Name: {user?.name}</h2>
            <h3 className='text-sm'>Role: {user?.role}</h3>
          </div>
          <div className='h-full px-3 py-4 overflow-y-auto bg-green-600'>
            <ul className='space-y-2 pt-4 mt-1 font-medium border-t border-white'>
              {tak.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center p-2 text-white border-b group'
                      : 'flex items-center p-2 text-white hover:border-b group'
                  }
                  onClick={() => setOpen(false)}
                  end>
                  <span className='text-white'>{item.icon}</span>
                  <p className='ml-3'>{item.name}</p>
                </NavLink>
              ))}
            </ul>
            <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-white'>
              {admin.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.url}
                  className='flex items-center p-2 text-white hover:border-b group'
                  onClick={() => setOpen(false)}>
                  <span className='text-white'>{item.icon}</span>
                  <p className='ml-3'>{item.name}</p>
                </NavLink>
              ))}
            </ul>
            <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-white'>
              <li className=''>
                <NavLink
                  to='/admin/account'
                  className='flex items-center p-2 text-white hover:border-b group hover:cursor-pointer'>
                  <span className='text-lg'>
                    <RiAccountCircleLine />
                  </span>
                  <p className='ml-3'>Account</p>
                </NavLink>
              </li>
              <li
                onClick={() => logout()}
                className='flex items-center p-2 text-white hover:border-b group hover:cursor-pointer'>
                <MdOutlineLogout className='text-white text-xl' />
                <p className='ml-3'>Logout</p>
              </li>
            </ul>
          </div>
        </aside>
      </header>
      <Outlet />
    </>
  );
});

export default NavAdmin;

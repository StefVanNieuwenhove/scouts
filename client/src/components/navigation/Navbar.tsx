import { memo, useState } from 'react';
import { MdDehaze, MdClear, MdArrowRight } from 'react-icons/md';
import { Route } from '../../types';
import { Routes } from '../../config';
import { hasAccess } from '../../lib/utils';
import { Link, Outlet } from 'react-router-dom';

const ROLE = ['admin'];

const Navbar = memo(() => {
  const [navOpen, setNavOpen] = useState(true);
  const [subNavOpen, setSubNavOpen] = useState({ name: '', open: true });
  const [activeItem, setActiveItem] = useState(Routes[0].name);

  return (
    <>
      <aside
        className={`bg-teal-700 flex flex-col gap-2 h-screen overflow-scroll px-4 py-4 z-10 fixed left-0 top-0 ${
          navOpen ? 'w-64' : 'w-16'
        }`}>
        <header className='w-full py-1'>
          {navOpen ? (
            <div
              className='flex items-center justify-between drop-shadow-md hover:drop-shadow-2xl rounded-md cursor-pointer'
              onClick={() => setNavOpen(false)}>
              <MdClear
                className='text-xl font-bold cursor-pointer text-white '
                onClick={() => setNavOpen(false)}
              />
              <h1 className='text-xl text-white'>Scouts Ter Alwina</h1>
            </div>
          ) : (
            <MdDehaze
              className='text-xl font-bold cursor-pointer text-white w-full text-center'
              onClick={() => setNavOpen(true)}
            />
          )}
        </header>
        <hr className='border border-white' />
        <nav className='h-full flex flex-col gap-4'>
          {Routes.map((item) => (
            <>
              {hasAccess(item.access, ROLE) && (
                <NavItem
                  key={item.name}
                  item={item}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  setSubNavOpen={setSubNavOpen}
                  navOpen={navOpen}
                  subNavOpen={subNavOpen}
                />
              )}
            </>
          ))}
        </nav>
      </aside>
      <Outlet />
    </>
  );
});

export default Navbar;

const NavItem = ({
  item,
  activeItem,
  setActiveItem,
  setSubNavOpen,
  navOpen,
  subNavOpen,
}: {
  item: Route;
  activeItem: string;
  setActiveItem: (name: string) => void;
  setSubNavOpen: (subNav: { name: string; open: boolean }) => void;
  navOpen: boolean;
  subNavOpen: { name: string; open: boolean };
}) => {
  return (
    <div key={item.name}>
      <button
        className={`w-full flex items-center justify-between gap-4 text-white hover:bg-teal-600 p-2 rounded-t-md ${
          activeItem === item.name ? 'bg-teal-600 border-b border-white' : ''
        }`}
        onClick={() => {
          setActiveItem(item.name);
          setSubNavOpen({ name: item.name, open: true });
        }}>
        <div className='flex items-center gap-4'>
          <span>{item.icon}</span>
          {navOpen && <span>{item.name}</span>}
        </div>
      </button>
      <ul>
        {navOpen &&
          subNavOpen.open &&
          subNavOpen.name === item.name &&
          item.items?.map((subItem) => (
            <>
              {hasAccess(subItem.access, ROLE) && (
                <Link to={subItem.url}>
                  <li
                    key={subItem.name}
                    className='flex items-center gap-2 bg-teal-600 text-white py-1 px-2 last:rounded-b-md first:py-2 hover:cursor-pointer hover:underline'>
                    <span>
                      <MdArrowRight />
                    </span>
                    <p>{subItem.name}</p>
                  </li>
                </Link>
              )}
            </>
          ))}
      </ul>
    </div>
  );
};

{
  /* <div key={item.name}>
            <button
              className={`w-full flex items-center justify-between gap-4 text-white hover:bg-teal-600 p-2 rounded-t-md ${
                activeItem === item.name
                  ? 'bg-teal-600 border-b border-white'
                  : ''
              }`}
              onClick={() => {
                setActiveItem(item.name);
                setSubNavOpen({ name: item.name, open: true });
              }}>
              <div className='flex items-center gap-4'>
                <span>{item.icon}</span>
                {navOpen && <span>{item.name}</span>}
              </div>
            </button>
            <ul>
              {navOpen &&
                subNavOpen.open &&
                subNavOpen.name === item.name &&
                item.items?.map((subItem) => (
                  <li
                    key={subItem}
                    className='flex items-center gap-2 bg-teal-600 text-white py-1 px-2 last:rounded-b-md first:py-2 hover:cursor-pointer hover:underline'>
                    <span>
                      <MdArrowRight />
                    </span>
                    <p>{subItem}</p>
                  </li>
                ))}
            </ul>
          </div> */
}

{
  /* <NavItem
            key={item.name}
            item={item}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setSubNavOpen={setSubNavOpen}
            navOpen={navOpen}
            subNavOpen={subNavOpen}
          /> */
}

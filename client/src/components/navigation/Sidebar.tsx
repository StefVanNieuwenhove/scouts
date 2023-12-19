import { useState, memo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import { PiArrowLineLeftBold, PiArrowLineRightBold } from 'react-icons/pi';
import {
  aanwezighedenLinks,
  rvbLinks,
  adminLinks,
  defaultLinks,
} from '../../config/links';
import { Link as LinkType } from '../../types';

const Sidebar = memo(() => {
  const { hasPermission, user } = useAuth();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [active, setActive] = useState<string>('home');

  return (
    <>
      <header>
        <aside
          className={` bg-teal-700 text-white
            ${
              expanded
                ? 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform overflow-scroll sm:translate-x-0'
                : 'fixed top-0 left-0 z-40 w-max px-4 py-6 flex flex-col justify-between items-center h-screen transition-transform -translate-x-full overflow-scroll sm:translate-x-0'
            }`}>
          <div className='flex flex-col gap-2 items-center'>
            <div
              className={`flex items-center justify-around transition-all ${
                expanded ? 'w-full' : 'w-0'
              }`}>
              <div
                className={`flex flex-col gap-2 justify-between overflow-hidden transition-all ${
                  expanded ? 'w-36' : 'w-0'
                }`}>
                <h1 className='text-lg text-white font-bold overflow-wrap'>
                  {/* line-clamp-1 */}
                  <Link to='/dashboard'>Scouts Ter Alwina</Link>
                </h1>
                {expanded && (
                  <div>
                    <p className='text-sm line-clamp-1'>Name: {user?.name}</p>
                    <p className='text-sm line-clamp-1'>Role: {user?.role}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className='p-1.5 text-gray-100 rounded-lg bg-accent-light hover:bg-accent-lighter'>
                {expanded ? (
                  <PiArrowLineLeftBold className='text-xl' />
                ) : (
                  <PiArrowLineRightBold className='text-xl' />
                )}
              </button>
            </div>
            <span className='w-full border'></span>
            {/* aanwezigheden routes */}
            <ul className='py-2 border-b border-white '>
              <p className='text-white font-bold text-center text-lg'>
                {expanded && 'Aanwezigheden'}
              </p>
              {aanwezighedenLinks.map(
                (link: LinkType) =>
                  hasPermission(link.permission) && (
                    <Link to={link.url} key={link.permission}>
                      <li
                        className={`flex p-3 my-1 items-center gap-3 text-gray-100 font-medium rounded-md cursor-pointer hover:bg-teal-800 transition-all
                ${expanded ? 'w-56' : 'w-auto'}
                ${active === link.name ? 'bg-teal-600 hover:bg-teal-800' : ''}
            `}
                        onClick={() => setActive(link.name)}>
                        {link.icon}
                        <span
                          className={`${
                            expanded ? 'block' : 'hidden'
                          } transition-all`}>
                          {link.name}
                        </span>
                      </li>
                    </Link>
                  )
              )}
            </ul>
            {/* RVB routes */}
            <ul className='py-2 border-b border-white '>
              <p className='text-white font-bold text-center text-lg'>
                {expanded && 'RVB'}
              </p>
              {rvbLinks.map(
                (link: LinkType) =>
                  hasPermission(link.permission) && (
                    <Link to={link.url} key={link.permission}>
                      <li
                        className={`flex p-3 my-1 items-center gap-3 text-gray-100 font-medium rounded-md cursor-pointer hover:bg-teal-800 transition-all
                ${expanded ? 'w-56' : 'w-auto'}
                ${active === link.name ? 'bg-teal-600 hover:bg-teal-800' : ''}
            `}
                        onClick={() => setActive(link.name)}>
                        {link.icon}
                        <span
                          className={`${
                            expanded ? 'block' : 'hidden'
                          } transition-all`}>
                          {link.name}
                        </span>
                      </li>
                    </Link>
                  )
              )}
            </ul>
            {/* admin routes */}
            {hasPermission('admin') && (
              <ul className='py-2 border-b border-white'>
                <p className='text-white font-bold text-center text-lg'>
                  {expanded && 'Admin'}
                </p>

                {adminLinks.map((link: LinkType) => (
                  <Link to={link.url} key={link.permission}>
                    <li
                      className={`flex p-3 my-1 items-center gap-3 text-gray-100 font-medium rounded-md cursor-pointer hover:bg-teal-800 transition-all
                ${expanded ? 'w-56' : 'w-auto'}
                ${active === link.name ? 'bg-teal-600 hover:bg-teal-800' : ''}
            `}
                      onClick={() => setActive(link.name)}>
                      {link.icon}
                      <span
                        className={`${
                          expanded ? 'block' : 'hidden'
                        } transition-all`}>
                        {link.name}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            {/* default routes */}
            <ul>
              {defaultLinks.map((link: LinkType) => (
                <Link to={link.url} key={link.permission}>
                  <li
                    className={`flex p-3 my-1 items-center gap-3 text-gray-100 font-medium rounded-md cursor-pointer hover:bg-teal-800 transition-all
                ${expanded ? 'w-56' : 'w-auto'}
                ${active === link.name ? 'bg-teal-600 hover:bg-teal-800' : ''}
            `}
                    onClick={() => setActive(link.name)}>
                    {link.icon}
                    <span
                      className={`${
                        expanded ? 'block' : 'hidden'
                      } transition-all`}>
                      {link.name}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </aside>
      </header>
      <main className='pl-24 pt-2'>
        <Outlet />
      </main>
    </>
  );
});

export default Sidebar;

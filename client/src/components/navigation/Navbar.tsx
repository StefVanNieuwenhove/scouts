import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className='w-full h-max px-3 py-5 bg-teal-700'>
        <nav className=' w-full '>
          <ul className='w-full flex items-center justify-evenly'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;

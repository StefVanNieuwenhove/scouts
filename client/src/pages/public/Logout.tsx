import React, { useEffect } from 'react';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);
  return (
    <>
      <main className='w-full h-screen flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-xl font-semibold'>Logging out...</h1>
        <button className='bg-teal-700 px-4 py-3 rounded-md text-white hover:underline'>
          <Link to='/'>Go back</Link>
        </button>
      </main>
    </>
  );
};

export default Logout;

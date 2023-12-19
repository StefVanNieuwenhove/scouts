import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className='w-full '>
      Root
      <Outlet />
    </div>
  );
};

export default Root;

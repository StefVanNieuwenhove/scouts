import { ReactNode } from 'react';

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className='text-center text-2xl underline uppercase my-2'>
      {children}
    </h1>
  );
};

export default Title;

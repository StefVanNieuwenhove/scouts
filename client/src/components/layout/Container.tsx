import { ReactNode } from 'react';

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full h-max flex justify-center ${className}`}>
      {children}
    </div>
  );
};

export default Container;

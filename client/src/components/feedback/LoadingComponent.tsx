import { ReactNode, Suspense } from 'react';
import { Spinner } from '.';

const LoadingComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </>
  );
};

export default LoadingComponent;

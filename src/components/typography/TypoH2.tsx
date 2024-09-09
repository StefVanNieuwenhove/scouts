import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypoH2Props = PropsWithChildren<{
  className?: string;
}>;

const TypoH2 = ({ children, className }: TypoH2Props) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}>
      {children}
    </h2>
  );
};

export default TypoH2;

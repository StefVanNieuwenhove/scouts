import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypoH3Props = PropsWithChildren<{
  className?: string;
}>;

const TypoH3 = ({ children, className }: TypoH3Props) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}>
      {children}
    </h3>
  );
};

export default TypoH3;

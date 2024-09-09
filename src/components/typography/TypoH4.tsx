import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypoH4Props = PropsWithChildren<{
  className?: string;
}>;

const TypoH4 = ({ children, className }: TypoH4Props) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}>
      {children}
    </h4>
  );
};

export default TypoH4;

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypoH1Props = PropsWithChildren<{
  className?: string;
}>;

const TypoH1 = ({ children, className }: TypoH1Props) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}>
      {children}
    </h1>
  );
};

export default TypoH1;

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TypoSmallProps = PropsWithChildren<{
  className?: string;
}>;

const TypoSmall = ({ children, className }: TypoSmallProps) => {
  return (
    <small
      className={cn(
        'text-sm font-medium leading-none text-muted-foreground',
        className
      )}>
      {children}
    </small>
  );
};

export default TypoSmall;

'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

type NavLinkProps = {
  className?: string;
  name: string;
  href: string;
};

const NavLink = ({ className, name, href }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      className={cn(`w-full ${isActive && 'underline'}`, className)}>
      <Link href={href}>{name}</Link>
    </Button>
  );
};

export default NavLink;

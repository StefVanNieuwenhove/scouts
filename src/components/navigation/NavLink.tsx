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
    <Link href={href} className={className}>
      <Button
        variant={isActive ? 'default' : 'outline'}
        className={`w-full ${isActive && 'underline'}`}>
        {name}
      </Button>
    </Link>
  );
};

export default NavLink;

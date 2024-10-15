'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

type NavLinkProps = {
  className?: string;
  name: string;
  href: string;
  onClose?: () => void;
};

const NavLink = ({ className, name, href, onClose }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname.split('/')[1] === href.split('/')[1];

  return (
    <Link href={href} className={className}>
      <Button
        variant={isActive ? 'default' : 'outline'}
        className={`w-full ${isActive && 'underline'}`}
        onClick={onClose}>
        {name}
      </Button>
    </Link>
  );
};

export default NavLink;

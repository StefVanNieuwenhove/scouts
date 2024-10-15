'use client';

import { PropsWithChildren, useState } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { NavigationLink } from '@/types';
import Link from 'next/link';

type NavProps = PropsWithChildren & {
  variant: ButtonProps['variant'];
  links: NavigationLink[];
  activeVariant?: ButtonProps['variant'];
  fullWidth?: boolean;
};

const Nav = ({
  children,
  variant,
  links,
  activeVariant = 'link',
  fullWidth = false,
}: NavProps) => {
  const [active, setActive] = useState(links[0]);
  return (
    <>
      <nav className={`flex flex-wrap gap-2 ${fullWidth && 'w-full'}`}>
        {links.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={active.href === link.href ? activeVariant : variant}
            onClick={() => setActive(link)}
            className={active.href === link.href ? 'underline' : ''}>
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </nav>
    </>
  );
};

export default Nav;

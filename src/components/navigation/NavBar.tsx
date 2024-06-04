'use client';

import React, { useState } from 'react';
import { ThemeToggle } from '../ui/theme-toggle';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, MenuIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Links } from '@/config/links';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Links as linksType } from '@/types/nav';
import { usePathname } from 'next/navigation';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs';
import { Sign } from 'crypto';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className='w-full py-2 px-4 flex items-center justify-between'>
        <h1 className='hidden lg:block'>
          <Link href='/'>Scouts Ter Alwina</Link>
        </h1>
        <NavigationMenu className='bg-transparent hidden lg:flex'>
          {Links.map((link) => (
            <NavigationMenuList
              key={link.name}
              className={`px-2 ${link.authenticaded && 'hidden'}`}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='w-[800px] p-4 flex items-center justify-evenly'>
                    {link.sublinks.map((sub) => (
                      <Button
                        key={sub.href}
                        variant={'link'}
                        className={`select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                          !sub.permission.includes('admin') && 'hidden'
                        } ${pathname === sub.href && 'underline'}`}>
                        <Link href={sub.href}>{sub.name}</Link>
                      </Button>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          ))}
        </NavigationMenu>
        <span className='block lg:hidden'>
          <Sheet open={open} onOpenChange={() => setOpen(!open)}>
            <SheetTrigger asChild>
              <Button variant={'ghost'} onClick={() => setOpen(true)}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetHeader className='flex items-start'>
                <SheetTitle>Scouts Ter Alwina</SheetTitle>
                <SheetDescription>Gebruiker: test</SheetDescription>
                <Separator />
              </SheetHeader>
              <div className='mt-5 space-y-2'>
                {Links.map((link) => (
                  <NavLink
                    key={link.name}
                    link={link}
                    onClose={() => setOpen(false)}
                    pathname={pathname}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </span>
        <div className='flex items-center justify-end space-x-4'>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </header>
      <Separator />
    </>
  );
};

export default NavBar;

const NavLink = ({
  link,
  onClose,
  pathname,
}: {
  link: linksType;
  onClose: () => void;
  pathname: string;
}) => {
  const [open, setOpen] = useState(false);
  const role = 'admin';
  console.log(pathname.split('/')[1]);
  return (
    <div className='bg-secondary rounded'>
      <Button variant={'link'} onClick={() => setOpen(!open)}>
        <span>
          {open ? (
            <ChevronUp className='text-xs ease-in duration-300' />
          ) : (
            <ChevronDown className='text-xs ease-in duration-300' />
          )}
        </span>
        <p
          className={` ${
            pathname.split('/')[1] === link.name.toLowerCase() && 'underline'
          }`}>
          {link.name}
        </p>
      </Button>
      {open && link.sublinks.length > 0 && (
        <nav className={`flex flex-col items-start pl-7`}>
          {link.sublinks.map((subLink) => (
            <Button
              key={subLink.href}
              variant={'link'}
              onClick={onClose}
              className={`${!subLink.permission.includes(role) && 'hidden'} ${
                pathname === subLink.href && 'underline'
              }`}>
              <Link href={subLink.href}>{subLink.name}</Link>
            </Button>
          ))}
        </nav>
      )}
    </div>
  );
};

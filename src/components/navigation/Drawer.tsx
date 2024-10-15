import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  LogIn,
  LogOut,
  Menu,
  Settings,
  UserRoundCog,
  UserRoundPlus,
} from 'lucide-react';
import { H1, Small } from '../typography';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import NavLink from './NavLink';
import { Separator } from '../ui/separator';
import { getUser } from '@/lib/auth';
import { publicNavigation } from '@/data-acces/navigation';
import { Role } from '@prisma/client';

const Drawer = async () => {
  const user = await getUser();
  const roles = user?.publicMetadata?.roles as Role[];
  return (
    <>
      <header className='flex items-center justify-between py-3 px-6 sticky top-0 z-50 bg-base-100 backdrop-saturate-180 backdrop-blur-xl border border-b'>
        <Sheet>
          <SheetTrigger>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side={'left'} className='space-y-1'>
            <SignedIn>
              <SheetTitle>
                Welkom {user?.firstName} {user?.lastName}
              </SheetTitle>
              <Small className='lowercase'>
                Role: {roles.map((role) => role).join(' | ')}
              </Small>
            </SignedIn>
            <SignedOut>
              <SheetTitle>Welkom bij Scouts Ter Alwina</SheetTitle>
              <Small>Log in of registreer</Small>
            </SignedOut>
            <Separator />
            <SheetDescription className='flex flex-col gap-2'>
              {publicNavigation.map((item) => (
                <NavLink key={item.name} name={item.name} href={item.href} />
              ))}
              <span
                className={
                  'shrink-0 bg-slate-200 dark:bg-slate-800 h-[1px] w-full'
                }
              />
              {/* <Separator className='my-2' /> */}
            </SheetDescription>
          </SheetContent>
        </Sheet>
        <H1>Scouts Ter Alwina</H1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings className='h-6 w-6' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center gap-2'>
              <UserRoundCog className='h-4 w-4' />
              <Link href={'/user-profile'}>Profiel</Link>
            </DropdownMenuItem>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SignedOut>
              <DropdownMenuItem className='flex items-center gap-2'>
                <UserRoundPlus className='h-4 w-4' />
                <Link href={'/sign-up'}>Sign up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <LogIn className='h-4 w-4' />
                <Link href={'/sign-in'}>Sign in</Link>
              </DropdownMenuItem>
            </SignedOut>
            <SignedIn>
              <DropdownMenuItem className='flex items-center gap-2'>
                <LogOut className='h-4 w-4' />
                <SignOutButton redirectUrl='sign-in' />
              </DropdownMenuItem>
            </SignedIn>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default Drawer;

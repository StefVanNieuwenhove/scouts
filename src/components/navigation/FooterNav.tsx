import React from 'react';
import { H3 } from '../typography';
import { Mail, MapPin } from 'lucide-react';
import NavLink from './NavLink';

const FooterNav = () => {
  return (
    <footer className='w-full py-3 px-6 bg-base-100 backdrop-saturate-180 backdrop-blur-xl border border-t grid md:grid-cols-3 grid-cols-1 gap-4 md:gap-8'>
      <div>
        <H3 className='underline'>Links</H3>
        <nav className='space-y-1 flex flex-col'>
          <NavLink name='Home' href='/' />
        </nav>
      </div>
      <div>
        <H3 className='underline'>Contact information</H3>
        <ul className='space-y-1'>
          <li className='flex items-center gap-2'>
            <MapPin className='h-4 w-4' />
            <p className='text-sm text-base-content/70'>
              Driesstraat 7a, 1790 Affligem
            </p>
          </li>
          <li className='flex items-center gap-2'>
            <Mail className='h-4 w-4' />
            <p className='text-sm text-base-content/70'>
              scoutsteralwina.info@gmail.com
            </p>
          </li>
        </ul>
      </div>
      <div>
        <H3 className='underline'>Documents</H3>
        <ul className='space-y-1'>
          <li className='flex items-center gap-2'>
            <a
              href='/files/privacyverklaring_groepen.pdf'
              download='privacyverklaring_groepen.pdf'>
              Privacy policy
            </a>
          </li>
          <li className='flex items-center gap-2'>
            <a href='#'>CM</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterNav;

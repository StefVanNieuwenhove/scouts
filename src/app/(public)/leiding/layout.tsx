import { Nav, NavLink } from '@/components/navigation';
import { H2 } from '@/components/typography';
import React from 'react';

type LeidingLayoutProps = {
  children: React.ReactNode;
};

const LeidingLayout = ({ children }: LeidingLayoutProps) => {
  return (
    <main className='container mx-auto h-screen w-full my-5'>
      <H2 className='underline'>Leidingsploeg</H2>
      <article className='prose prose-invert max-w-none my-2 space-y-2'>
        <p>
          Als leider of leidster van een tak neem je verantwoordelijkheid op om
          een groep jongeren te begeleiden.
          <br /> Op takraden worden de activiteiten in elkaar gebokst om samen
          met de kinderen veel plezier te maken.
        </p>
        <Nav
          variant={'outline'}
          activeVariant={'default'}
          links={[
            {
              name: 'Groepsleiding',
              href: '/',
            },
            {
              name: 'Kapoenen',
              href: '/leiding/kapoenen',
            },
            {
              name: 'Wouters',
              href: '/leiding/wouters',
            },
            {
              name: 'Jonggivers',
              href: '/leiding/jonggivers',
            },
            {
              name: 'Givers',
              href: '/leiding/givers',
            },
            {
              name: 'Jins',
              href: '/leiding/jins',
            },
          ]}
        />

        {/* <nav className='flex flex-wrap gap-2 w-full'>
          <NavLink name='Groepsleiding' href='/leiding' />
          <NavLink name='Kapoenen' href='/leiding/kapoenen' />
          <NavLink name='Wouters' href='/leiding/wouters' />
          <NavLink name='Jonggivers' href='/leiding/jonggivers' />
          <NavLink name='Givers' href='/leiding/givers' />
          <NavLink name='Jins' href='/leiding/jins' />
        </nav> */}
      </article>
      {children}
    </main>
  );
};

export default LeidingLayout;

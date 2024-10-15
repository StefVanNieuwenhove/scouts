import { IconLink, Nav } from '@/components/navigation';
import { H2 } from '@/components/typography';
import { leidingNavigation } from '@/data-acces/navigation';
import { Edit } from 'lucide-react';
import React from 'react';

type LeidingLayoutProps = {
  children: React.ReactNode;
};

const LeidingLayout = async ({ children }: LeidingLayoutProps) => {
  return (
    <main className='container mx-auto h-screen w-full my-5'>
      <div className='flex items-center justify-between'>
        <H2 className='underline'>Leidingsploeg</H2>
        <IconLink href={'/edit/leiding'} variant={'outline'}>
          <Edit className='h-4 w-4' />
        </IconLink>
      </div>
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
          links={leidingNavigation}
        />
      </article>
      {children}
    </main>
  );
};

export default LeidingLayout;

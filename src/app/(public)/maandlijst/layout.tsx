import { IconLink, Nav, NavLink } from '@/components/navigation';
import { H2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { maandlijstNavigation } from '@/data-acces/navigation';
import { Edit } from 'lucide-react';

type MaandlijstLayoutProps = {
  children: React.ReactNode;
};

const MaandlijstLayout = ({ children }: MaandlijstLayoutProps) => {
  return (
    <>
      <main className='container mx-auto h-screen w-full my-5'>
        <div className='flex items-center justify-between'>
          <H2 className='underline'>Maandlijst</H2>
          <IconLink href={'/edit/maandlijst'} variant={'outline'}>
            <Edit className='h-4 w-4' />
          </IconLink>
        </div>
        <article className='flex items-center justify-between flex-wrap gap-2 prose prose-invert max-w-none my-2 space-y-2'>
          <Nav
            variant={'outline'}
            activeVariant={'default'}
            links={maandlijstNavigation}
          />
          <Button variant={'link'} className='underline'>
            Download maandlijst
          </Button>
        </article>
        {children}
      </main>
    </>
  );
};

export default MaandlijstLayout;

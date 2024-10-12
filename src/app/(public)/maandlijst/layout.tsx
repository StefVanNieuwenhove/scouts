import { NavLink } from '@/components/navigation';
import { H2 } from '@/components/typography';
import { Button } from '@/components/ui/button';

type MaandlijstLayoutProps = {
  children: React.ReactNode;
};

const MaandlijstLayout = ({ children }: MaandlijstLayoutProps) => {
  return (
    <>
      <main className='container mx-auto h-screen w-full my-5'>
        <H2 className='underline'>Maandlijst</H2>
        <article className='flex items-center justify-between flex-wrap gap-2 prose prose-invert max-w-none my-2 space-y-2'>
          <nav className='flex flex-wrap gap-2 w-max my-2'>
            <NavLink name='Volledige maandlijst' href='/maandlijst' />
            <NavLink name='Kapoenen' href='/maandlijst/kapoenen' />
            <NavLink name='Wouters' href='/maandlijst/wouters' />
            <NavLink name='Jonggivers' href='/maandlijst/jonggivers' />
            <NavLink name='Givers' href='/maandlijst/givers' />
            <NavLink name='Jins' href='/maandlijst/jins' />
          </nav>
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

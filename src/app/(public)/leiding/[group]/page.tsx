import { LeidingCard } from '@/components/cards';
import { Small } from '@/components/typography';
import { getLeidingByTak } from '@/data-acces/leiding';

type LeidingTakPageProps = {
  params: {
    group: string;
  };
};

const LeidingTakPage = async ({ params }: LeidingTakPageProps) => {
  const leiding = await getLeidingByTak(params.group);
  return (
    <>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {leiding?.length ? (
          leiding.map((item) => <LeidingCard key={item.id} leiding={item} />)
        ) : (
          <Small>Geen leidingen gevonden</Small>
        )}
      </section>
    </>
  );
};

export default LeidingTakPage;

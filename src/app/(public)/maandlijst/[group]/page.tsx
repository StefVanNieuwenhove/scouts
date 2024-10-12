type MaandlijstGroupPageProps = {
  params: {
    group: string;
  };
};

const MaandlijstGroupPage = ({ params }: MaandlijstGroupPageProps) => {
  return (
    <>
      <article className='prose prose-invert max-w-none my-2 space-y-2'></article>
    </>
  );
};

export default MaandlijstGroupPage;

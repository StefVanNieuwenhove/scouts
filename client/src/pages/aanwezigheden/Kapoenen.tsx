import { useParams } from 'react-router-dom';
import { Main, Tabs } from '../../components';

const Kapoenen = () => {
  const { group } = useParams();

  //TODO data provider - use group param to fetch the data

  //TODO secure this with the correct roles of the users
  if (
    !['kapoenen', 'wouters', 'jonggivers', 'givers', 'jins'].some((x) =>
      group?.includes(x)
    )
  )
    return <Main>404 - Not Found</Main>;

  return (
    <Main>
      <h1 className='text-center text-xl py-1 uppercase underline font-bold'>
        {group}
      </h1>
      <Tabs
        storageKey={'aanwezigheden'}
        pages={[
          { name: 'overview', component: <p>Overview</p> },
          { name: 'create', component: <p>Create</p> },
          { name: 'update', component: <p>Update</p> },
          { name: 'stats', component: <p>Stats</p> },
        ]}
      />
    </Main>
  );
};

export default Kapoenen;

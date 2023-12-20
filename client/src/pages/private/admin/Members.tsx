import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Members';

const Members = () => {
  return (
    <>
      <Title>Leden</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Members;

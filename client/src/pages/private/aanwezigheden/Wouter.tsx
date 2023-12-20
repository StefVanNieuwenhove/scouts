import { Tabs, Title } from '../../../components';
import { links, components } from '../../../config/Wouters';

const Wouter = () => {
  return (
    <>
      <Title>Wouter</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Wouter;

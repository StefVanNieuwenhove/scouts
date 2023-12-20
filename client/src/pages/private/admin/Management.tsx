import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Management';

const Management = () => {
  return (
    <>
      <Title>Leiding & Raad Van Bestuur</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Management;

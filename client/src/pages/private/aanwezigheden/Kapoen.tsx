import { Tabs, Title } from '../../../components';
import { links, components } from '../../../config/Kapoenen';

const Kapoen = () => {
  return (
    <>
      <Title>Kapoenen</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Kapoen;

import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Jonggivers';

const Jonggiver = () => {
  return (
    <>
      <Title>jonggivers</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Jonggiver;

import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Jins';
const Jin = () => {
  return (
    <>
      <Title>jins</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Jin;

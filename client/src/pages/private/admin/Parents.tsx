import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Parents';

const Parents = () => {
  return (
    <>
      <Title>Ouders</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Parents;

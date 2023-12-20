import { Tabs, Title } from '../../../components';
import { components, links } from '../../../config/Givers';
const Giver = () => {
  return (
    <>
      <Title>givers</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Giver;

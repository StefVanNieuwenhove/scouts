import { links, components } from '../../../config/Taxation';
import { Tabs, Title } from '../../../components';

const Taxation = () => {
  //const [value, setValue] = useState(links[0].url);
  return (
    <>
      <Title>Fiscale attesten</Title>
      <Tabs links={links} components={components} />
    </>
  );
};

export default Taxation;

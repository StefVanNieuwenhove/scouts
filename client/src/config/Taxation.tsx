import { CampInfo, GenerateAttest, MembersTaxation } from '../containers';

const links = [
  {
    name: 'Attest toekennen aan lid',
    url: 'lid',
  },
  {
    name: 'Genereer attest',
    url: 'attest',
  },
  {
    name: 'Kamp info',
    url: 'kamp',
  },
];

const components = [
  {
    name: 'lid',
    component: <MembersTaxation />,
  },
  {
    name: 'attest',
    component: <GenerateAttest />,
  },
  {
    name: 'kamp',
    component: <CampInfo />,
  },
];

export { links, components };

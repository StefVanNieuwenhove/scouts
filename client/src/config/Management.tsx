import { AddManager, OverviewManagement } from '../containers';

export const links = [
  { name: 'Nieuwe leiding of rvb toevoegen', url: 'overview' },
  { name: 'Overzicht leiding/rvb', url: 'add' },
];

export const components = [
  { name: 'overview', component: <OverviewManagement /> },
  { name: 'add', component: <AddManager /> },
];

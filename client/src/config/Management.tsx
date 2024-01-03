import { AddManager, AssignRoutes, OverviewManagement } from '../containers';

export const links = [
  { name: 'Nieuwe leiding of rvb toevoegen', url: 'add' },
  { name: 'Overzicht leiding/rvb', url: 'overview' },
  { name: 'Routes toekennen', url: 'routes' },
];

export const components = [
  { name: 'overview', component: <OverviewManagement /> },
  { name: 'add', component: <AddManager /> },
  { name: 'routes', component: <AssignRoutes /> },
];

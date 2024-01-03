import { File, Form, OverviewMembers } from '../containers';

export const links = [
  { name: 'Overview', url: 'overview' },
  { name: 'Form', url: 'form' },
  { name: 'File', url: 'file' },
];

export const components = [
  { name: 'overview', component: <OverviewMembers /> },
  { name: 'form', component: <Form /> },
  { name: 'file', component: <File /> },
];

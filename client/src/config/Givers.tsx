import {
  CreateActivity,
  OverviewActivities,
  UpdateActivity,
} from '../containers';

export const links = [
  { name: 'Overzicht', url: 'overview' },
  { name: 'Vergadering toevoegen', url: 'add' },
  { name: 'Vergadering wijzigen', url: 'edit' },
];

export const components = [
  { name: 'overview', component: <OverviewActivities group='giver' /> },
  { name: 'add', component: <CreateActivity group='giver' /> },
  { name: 'edit', component: <UpdateActivity group='giver' /> },
];

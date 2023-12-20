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
  { name: 'overview', component: <OverviewActivities group='jin' /> },
  { name: 'add', component: <CreateActivity group='jin' /> },
  { name: 'edit', component: <UpdateActivity group='jin' /> },
];

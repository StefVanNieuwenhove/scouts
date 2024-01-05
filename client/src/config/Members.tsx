import { lazy } from 'react';
import { LoadingComponent } from '../components';

/* eslint-disable react-refresh/only-export-components */
const File = lazy(() => import('../containers/members/File'));
const Form = lazy(() => import('../containers/members/Form'));
const OverviewMembers = lazy(() => import('../containers/members/Overview'));

export const links = [
  { name: 'Overview', url: 'overview' },
  { name: 'Form', url: 'form' },
  { name: 'File', url: 'file' },
];

export const components = [
  {
    name: 'overview',
    component: (
      <LoadingComponent>
        <OverviewMembers />
      </LoadingComponent>
    ),
  },
  {
    name: 'form',
    component: (
      <LoadingComponent>
        <Form />
      </LoadingComponent>
    ),
  },
  {
    name: 'file',
    component: (
      <LoadingComponent>
        <File />
      </LoadingComponent>
    ),
  },
];

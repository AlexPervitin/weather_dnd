import Login from 'pages/Login';
import DragAndDrop from 'pages/DragAndDrop';
import Weather from 'pages/Weather';
import { ACCESS, PATHS } from './constants';

export const routes = [
  {
    path: PATHS.login,
    component: Login,
    access: ACCESS.public,
  },
  {
    path: PATHS.weather,
    component: Weather,
    access: ACCESS.private,
    name: 'Weather App',
    isMenu: true,
  },
  {
    path: PATHS.dnd,
    component: DragAndDrop,
    access: ACCESS.private,
    name: 'Drag-and-Drop table',
    isMenu: true,
  },
];

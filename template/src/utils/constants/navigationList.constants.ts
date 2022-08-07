import { Home } from '../../screens';

import { NavigationObj } from '../types/navigation.types';
import { homePath, defaultNavOptions } from './navigation.constants';

const config = {
  screens: {
    [homePath]: '/',
  },
};

const deepLinking = {
  prefixes: ['http://app.example.com'],
  config,
};

const navigations: NavigationObj[] = [
  {
    name: homePath,
    options: defaultNavOptions,
    component: Home,
    hideOnAuth: true,
  },
];

export { deepLinking, defaultNavOptions };

export default navigations;

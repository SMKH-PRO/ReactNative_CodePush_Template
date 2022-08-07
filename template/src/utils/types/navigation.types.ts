import type { ComponentType } from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { homePath } from '../constants/navigation.constants';

type RootStackParamList = {
  [homePath]: undefined;
};

type NavigationObj = {
  // cant import this from ../types/navigation.types.ts because it causes import cycle as constant file is also imported in types.ts file.
  name: keyof RootStackParamList;
  options?: NativeStackNavigationOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  authRequired?: boolean;
  hideOnAuth?: boolean;
};

export type { RootStackParamList, NavigationObj };

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-promise-executor-return */

import RNBootSplash from 'react-native-bootsplash';
import { IS_DEV } from '../constants/index';
import { AnyObject } from '../types';
import type { NavigationObj } from '../types/navigation.types';
import type { RootState } from '../../redux/index';

const devFunction = (func: () => void) => {
  if (IS_DEV && typeof func === 'function') {
    func();
  }
};
const prodFunction = (func: () => void) => {
  if (!IS_DEV && typeof func === 'function') {
    func();
  }
};

const devLog = {
  error: (...args: any) => devFunction(() => console.error(...args)),
  warn: (...args: any) => devFunction(() => console.warn(...args)),
  log: (...args: any) => devFunction(() => console.log(...args)),
};

const delay = (time = 1000) =>
  new Promise(resolve => setTimeout(resolve, time));

type ArrayToKeyPair = <T extends AnyObject>(
  array: T[],
  key: string,
) => Record<string | number, T>;

const arrayObjIntoKeyValuePairs: ArrayToKeyPair = (array, key) =>
  array.reduce((acc: AnyObject, curr: AnyObject) => {
    acc[curr?.[key] as string | number] = curr;
    return acc;
  }, {});

const hideSplash = async () => {
  try {
    await RNBootSplash.hide({ fade: true });
  } catch (e) {
    devLog.error(e);
  }
};

type ShouldRenderNavParams = {
  nav: NavigationObj;
  user: RootState['user']['data'];
  isTabNav?: boolean;
};
type ShouldRenderNav = (params: ShouldRenderNavParams) => boolean;

const shouldRenderNav: ShouldRenderNav = ({ nav, user }) => {
  if (nav.authRequired && !user?.userId) return false;
  if (nav.hideOnAuth && user?.userId) return false;

  return true;
};

export {
  delay,
  devLog,
  hideSplash,
  devFunction,
  prodFunction,
  arrayObjIntoKeyValuePairs,
  shouldRenderNav,
};

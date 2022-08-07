import { Dimensions, Platform } from 'react-native';

const MYREWARDS_ASSETS_DOMAIN = `${process.env.MYREWARDS_ASSETS_DOMAIN || ''}`;

const MYREWARDS_ASSETS_PATH = `https://${MYREWARDS_ASSETS_DOMAIN}`;
const REWARDS_SLIDER_ASSET_PATH = `${MYREWARDS_ASSETS_PATH}/myrewards/rewards-slider`;
const REWARDS_ASSETS_PATH = `${MYREWARDS_ASSETS_PATH}/myrewards`;

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const IS_DEV = __DEV__;

const IS_APPLE = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';

const WAIT_B4_LINK_RESEND = 60; // seconds

const BOOKMARK_AUTH_REQUIRED = true;

const ICON_MAPPING: Record<string, string> = {
  1: 'shopping-outline',
  21: 'home-outline',
  3: 'food',
  20: 'medical-bag',
  31: 'office-building-outline',
  28: 'fan',
  27: 'airplane',
  24: 'dog',
  19: 'car',
};

export {
  IS_DEV,
  IS_APPLE,
  IS_ANDROID,
  ICON_MAPPING,
  WINDOW_WIDTH,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOW_HEIGHT,
  WAIT_B4_LINK_RESEND,
  REWARDS_ASSETS_PATH,
  BOOKMARK_AUTH_REQUIRED,
  REWARDS_SLIDER_ASSET_PATH,
};

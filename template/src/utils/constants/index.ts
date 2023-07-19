import { Dimensions, Platform } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const IS_DEV = __DEV__;

const IS_APPLE = Platform.OS === 'ios';
const IS_ANDROID = Platform.OS === 'android';
const VERY_SMALL_DEVICE = WINDOW_WIDTH < 350;

export {
  IS_DEV,
  IS_APPLE,
  IS_ANDROID,
  WINDOW_WIDTH,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  WINDOW_HEIGHT,
  VERY_SMALL_DEVICE,
};

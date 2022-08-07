import { DefaultTheme } from '@react-navigation/native';
import { ThemeState } from '../../redux/types/theme.type';
import { wp } from '../helpers/responsive.helpers';

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,

  elevation: 9,
};

const disabledBgColor = 'gray';

const defaultTheme: ThemeState = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#246EE9',
    secondary: '#1d83bc',
    primaryLite: '#FFE3D7',
    background: '#fff',
    backgroundLite: '#f6f8f9', // "#f5f5f5",
    text: '#5d697b',
    textOnPrimaryBg: '#fff', // Color of text where background is primary
    disabledBgColor,
  },

  layout: {
    spacing: wp('3.5%'),
  },
  shadow,
  dark: null,
};
export { disabledBgColor, defaultTheme };

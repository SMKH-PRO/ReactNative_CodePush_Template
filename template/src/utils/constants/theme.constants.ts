import { DefaultTheme } from '@react-navigation/native';
import { wp } from '../helpers/responsive.helpers';
import { ThemeState } from '../types/redux/theme.type';

const disabledBgColor = 'gray';

const defaultTheme: ThemeState = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1D83BC',
    secondary: 'rgb(254,115,51)',
    primaryLite: '#FFE3D7',
    background: '#F2F7FD',
    danger: 'red',
    backgroundLite: '#FFF', // "#f5f5f5",
    text: '#5D697B',
    textOnPrimaryBg: '#fff', // Color of text where background is primary
    disabledBgColor,
  },

  layout: {
    spacing: wp('3.5%'),
  },
  dark: null,
};
export { disabledBgColor, defaultTheme };

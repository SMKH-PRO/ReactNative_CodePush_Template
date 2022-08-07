/* eslint-disable @typescript-eslint/default-param-last */
import { defaultTheme } from '../../utils/constants/theme.constants';
import { ThemeReducer } from '../../utils/enums/reducers.enums';
import type { Action } from '../types/theme.type';

export default (state = defaultTheme, action: Action) => {
  switch (action.type) {
    case ThemeReducer.DARK_MODE:
      return { ...state, dark: action?.payload?.dark };
    case ThemeReducer.SET_THEME:
      return action?.payload;

    default:
      return state;
  }
};

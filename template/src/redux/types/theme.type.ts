import { ThemeReducer } from '../../utils/enums/reducers.enums';

type Shadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;

  elevation: number;
};
export interface ThemeState {
  dark: boolean | null;
  colors: {
    disabledBgColor: string;
    secondary: string;
    primary: string;
    primaryLite: string;
    background: string;
    backgroundLite: string;
    card: string;
    text: string;
    textOnPrimaryBg: string;
    border: string;
    notification: string;
  };
  layout: {
    spacing: number;
  };
  shadow: Shadow;
}

export type DarkModePayload = {
  dark: boolean;
};

export type SwitchDarkModeAction = {
  type: ThemeReducer.DARK_MODE;
  payload: DarkModePayload;
};

export type SetThemeAction = {
  type: ThemeReducer.SET_THEME;
  payload: ThemeState;
};

export type Action = SwitchDarkModeAction | SetThemeAction;

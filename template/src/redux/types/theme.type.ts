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

type PossibleTypes = ThemeReducer.DARK_MODE | ThemeReducer.SET_THEME;

export type PossiblePayloads = DarkModePayload | ThemeState;
export type Action = { type: PossibleTypes; payload: PossiblePayloads };

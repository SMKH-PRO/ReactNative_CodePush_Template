import { AppConfigReducer } from '../../enums/reducers.enums';

export type AppConfigState = {
  lang?: string;
};

export type Action = {
  type: AppConfigReducer.SET_LANG;
  payload: AppConfigState['lang'];
};

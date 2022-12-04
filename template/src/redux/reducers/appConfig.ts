/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from '@reduxjs/toolkit';
import { AppConfigReducer } from '../../utils/enums/reducers.enums';
import {
  AppConfigState,
  Action,
} from '../../utils/types/redux/appConfig.types';

const initialState: AppConfigState = {
  lang: '',
};

const appConfigReducer: Reducer<AppConfigState, Action> = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case AppConfigReducer.SET_LANG:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
export default appConfigReducer;

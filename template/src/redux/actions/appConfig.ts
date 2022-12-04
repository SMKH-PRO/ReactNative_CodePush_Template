import { AppConfigReducer } from '../../utils/enums/reducers.enums';

import {
  AppConfigState,
  Action,
} from '../../utils/types/redux/appConfig.types';

const setLanguage = (data: AppConfigState['lang']): Action => ({
  type: AppConfigReducer.SET_LANG,
  payload: data,
});

export { setLanguage };

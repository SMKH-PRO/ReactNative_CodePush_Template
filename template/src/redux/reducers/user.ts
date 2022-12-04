/* eslint-disable @typescript-eslint/default-param-last */
import { UserReducer } from '../../utils/enums/reducers.enums';

import type { UserState, Action } from '../../utils/types/redux/user.types';

const initialState: UserState = {
  data: undefined,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case UserReducer.SET_USER:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};

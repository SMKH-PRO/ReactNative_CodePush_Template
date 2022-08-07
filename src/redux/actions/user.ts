import { UserReducer } from '../../utils/enums/reducers.enums';

import type { Action, UserState } from '../types/user.type';

const setUser = (data: UserState['data']): Action => ({
  type: UserReducer.SET_USER,
  payload: data,
});

export { setUser };

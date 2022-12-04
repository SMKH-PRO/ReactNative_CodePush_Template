import { UserReducer } from '../../utils/enums/reducers.enums';

import type { Action, UserState } from '../../utils/types/redux/user.types';

const setUser = (data: UserState['data']): Action => ({
  type: UserReducer.SET_USER,
  payload: data,
});

export { setUser };

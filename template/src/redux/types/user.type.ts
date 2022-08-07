import { UserReducer } from '../../utils/enums/reducers.enums';

export type User = {
  expiration: string;
  userId: number;
  userEmail: string;
  userName: string;
  iat: number;
};
export type UserState = {
  data?: User | undefined;
};

export type Action = {
  type: UserReducer.SET_USER;
  payload: UserState['data'];
};

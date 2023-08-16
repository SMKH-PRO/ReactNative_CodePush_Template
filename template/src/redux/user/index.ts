import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../utils/types/redux/user.type';

const initialState: UserState = {
  data: undefined,
};
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state: typeof initialState,
      { payload }: PayloadAction<UserState['data']>,
    ) => {
      state.data = payload;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;

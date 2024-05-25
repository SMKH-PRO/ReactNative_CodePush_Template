import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTheme } from '../../utils/constants/theme.constants';
import { ThemeState } from '../../utils/types/redux/theme.type';

const initialState = {
  ...defaultTheme,
};
const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchDarkMode: (
      state: typeof initialState,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.dark = payload;
    },
    setTheme: (
      state: typeof initialState,
      { payload }: PayloadAction<ThemeState>,
    ) => payload,
  },
});

export const { switchDarkMode, setTheme } = theme.actions;

export default theme.reducer;

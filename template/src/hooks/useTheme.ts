import { useSelector } from 'react-redux';
import { ThemeState } from '../utils/types/redux/theme.type';

const useTheme = () => {
  const theme: ThemeState = useSelector(
    (state: { theme: ThemeState }) => state.theme,
  );

  return theme;
};

export default useTheme;

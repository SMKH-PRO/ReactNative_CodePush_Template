import { useSelector } from 'react-redux';
import { ThemeState } from '../redux/types/theme.type';

const useTheme = () => {
  const theme: ThemeState = useSelector(
    (state: { theme: ThemeState }) => state.theme,
  );

  return theme;
};

export default useTheme;

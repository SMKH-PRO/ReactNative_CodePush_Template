import {
  TypedUseSelectorHook,
  useSelector as useSelectorReal,
} from 'react-redux';
import type { RootState } from '../redux';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorReal;

export default useSelector;

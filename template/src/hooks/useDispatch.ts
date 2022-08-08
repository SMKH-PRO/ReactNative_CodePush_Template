import { useDispatch as useDispatchReal } from 'react-redux';
import type { AppDispatch } from '../redux';

const useDispatch: () => AppDispatch = useDispatchReal;
export default useDispatch;

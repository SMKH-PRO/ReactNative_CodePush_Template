import Toast from 'react-native-simple-toast';

const ToastShort = (msg: string) => Toast.show(msg, Toast.SHORT);
const ToastLong = (msg: string) => Toast.show(msg, Toast.LONG);

export { ToastShort, ToastLong };

export default Toast;

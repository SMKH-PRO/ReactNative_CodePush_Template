import { StyleSheet } from 'react-native';
import { IS_TABLET } from '../../../utils/constants';

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Manrope',
    marginVertical: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...(IS_TABLET ? { height: 61 } : {}),
  },
  label: {
    color: 'white',
    ...(IS_TABLET ? { fontSize: 19 } : { fontSize: 16 }),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    marginRight: 15,
    marginLeft: -35,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default styles;

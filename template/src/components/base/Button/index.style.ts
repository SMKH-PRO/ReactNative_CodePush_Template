import { StyleSheet } from 'react-native';
import { wp } from '../../../utils/helpers/responsive.helpers';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: wp('2%', 10),
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 35,
  },
  label: {
    color: 'white',
    // fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    marginLeft: -35,
    marginRight: 15,
  },

  shadow: {
    elevation: wp('0.8%'),
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,

    shadowRadius: 5,
  },
});

export default styles;

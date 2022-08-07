import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  round: {
    borderRadius: 100,
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    margin: 5,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

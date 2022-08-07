import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    margin: 0.5,
    borderRadius: 3,
    borderWidth: 0.6,
    borderColor: 'rgba(170,170,170,0.3)',
    minHeight: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  leftContainerShow: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainerStyle: {
    padding: 8,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    position: 'absolute',
    paddingRight: 5,
    paddingBottom: 0,
  },
  inputStyle: {
    marginTop: 2,
    paddingTop: 20,
    flex: 1,
    paddingBottom: 8,
  },
  textCont: { flex: 1, justifyContent: 'center' },
});

export default styles;

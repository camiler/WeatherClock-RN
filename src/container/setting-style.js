import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  picker: {
    width: 100,
  },
  textInput: {
    height: 40,
    borderBottomColor: 'gray',
    borderWidth: 1,
    width: 300,
    textAlign: 'center',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
  },
  btnPos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  setBtnTouch: {
    backgroundColor: '#009966',
  },
  pickView: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  item: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  itemLast: {
    marginBottom: 0,
  },
  itemFirst: {
    marginTop: 20,
  },
});

export default styles;

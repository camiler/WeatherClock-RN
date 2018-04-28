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
    height: 60,
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
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  item: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  itemLast: {
    marginBottom: 0,
  },
  itemFirst: {
    marginTop: 20,
  },
  iosAlertText: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    padding: 20,
    textAlign: 'left',
    marginTop: 20,
  }
});

export default styles;

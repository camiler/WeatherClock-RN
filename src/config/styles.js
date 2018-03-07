import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F5FCFF',
  errorText: '#FA3256',
  headerText: '#444444',
  buttonBackground: '#39BD98',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputDivider: '#E4E2E5',
  maskBackground: 'rgba(0, 0, 0, .4)',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  textCenter: {
    textAlign: 'center',
  },
  font20: {
    fontSize: 20,
  },
  font18: {
    fontSize: 18,
  },
  font16: {
    fontSize: 16,
  },
  font14: {
    fontSize: 14,
  }
});

export default {
  colors,
  commonStyles
}

import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F5FCFF',
  errorText: '#FA3256',
  headerText: '#444444',
  buttonBackground: '#39BD98',
  buttonText: '#FFFFFF',
  inputBackground: '#FFFFFF',
  inputDivider: '#E4E2E5',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default {
  colors,
  commonStyles
}

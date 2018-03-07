import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';

const Button = (props) => {
  const { text, onPress, btnTouchStyle, textStyle } = props;
  return (
    <TouchableOpacity style={[styles.button, btnTouchStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  btnTouchStyle: PropTypes.number,
  textStyle: PropTypes.number,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  text: '按钮',
  // eslint-disable-next-line no-console
  onPress: () => console.log('Button Pressed'),
};

export default Button;

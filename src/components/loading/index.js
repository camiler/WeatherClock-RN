import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import {commonStyles} from '../../config/styles';

const Loading = (props) => {
  return (
    <View style={commonStyles.container}>
      <ActivityIndicator
        animating
        size={props.size}
        {...props}
      />
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
};

export default Loading;

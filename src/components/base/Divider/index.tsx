import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './index.styles';

const Divider = ({ style }: { style?: ViewStyle }) => (
  <View
    style={[
      styles.divider,
      {
        borderColor: style?.borderColor || 'rgba(170,170,170,.1)',
        borderWidth: style?.borderWidth || 0.3,
        marginVertical: style?.marginVertical || 15,
      },
      style,
    ]}
  />
);
Divider.defaultProps = {
  style: {},
};

export default Divider;

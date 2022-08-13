import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import styles from './index.styles';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
}
const Divider = ({ style }: DividerProps) => {
  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);
  return (
    <View
      style={[
        styles.divider,
        {
          borderColor: styleProp?.borderColor || 'rgba(170,170,170,.1)',
          borderWidth: styleProp?.borderWidth || 0.3,
          marginVertical: styleProp?.marginVertical || 15,
        },
        styleProp,
      ]}
    />
  );
};
Divider.defaultProps = {
  style: {},
};

export default Divider;

import React, { useMemo } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme';
import styles from './index.styles';

const Container = ({ children, style, ...props }: ViewProps) => {
  const safeArea = useSafeAreaInsets();
  const theme = useTheme();

  const styleProp = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  return (
    <View
      style={[
        styles.container,

        {
          paddingHorizontal: theme?.layout?.spacing,
          paddingTop: safeArea?.top,
        },
        styleProp,
      ]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </View>
  );
};

export default Container;

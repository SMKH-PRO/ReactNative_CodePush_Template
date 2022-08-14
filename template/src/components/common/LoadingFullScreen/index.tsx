import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './index.styles';
import useTheme from '../../../hooks/useTheme';

const LoadingFullScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme?.colors?.primary} size="large" />
    </View>
  );
};

export default LoadingFullScreen;

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './index.styles';
import useTheme from '../../../hooks/useTheme';

const LoadingBlankScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme?.colors?.primary} size="large" />
    </View>
  );
};

export default LoadingBlankScreen;

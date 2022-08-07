import React, { useEffect } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import { FallbackProps } from 'react-error-boundary';
import styles from './index.styles';
import { hideSplash } from '../../utils/helpers';

/**
 * Please try using native/built-in components and try avoiding in-app components or thirdparty UI components on this screen.
 *
 */
type ComponentT = React.ComponentType<FallbackProps>;

const ErrorScreen: ComponentT = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  const hideSplashScreen = async () => {
    await hideSplash();
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    hideSplashScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        loop
        autoPlay
        // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment
        source={require('../../assets/animations/404.json')}
        style={{ height: Dimensions.get('window').height / 2 }}
      />
      {!!error && (
        <Text style={styles.errText}>
          Error: {error?.message?.toString?.()}
        </Text>
      )}
      <View style={styles.resetBtnCont}>
        <Button
          title="Try Again!"
          onPress={() => {
            if (typeof resetErrorBoundary === 'function') {
              resetErrorBoundary();
            }
          }}
        />
      </View>
    </View>
  );
};

export default ErrorScreen;

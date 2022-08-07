/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  setJSExceptionHandler,
  JSExceptionHandler,
  setNativeExceptionHandler,
  NativeExceptionHandler,
} from 'react-native-exception-handler';
import FlashMessage from 'react-native-flash-message';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';

import Providers from './Providers';
import Navigation from './src/navigation/index';
import { ErrorScreen } from './src/screens';

import { devLog, prodFunction } from './src/utils/helpers';
import { IS_DEV } from './src/utils/constants';
import './src/translations';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

if (!IS_DEV) {
  codePush
    .getUpdateMetadata()
    .then(update => {
      if (update) {
        Sentry.init({
          dsn: 'https://a13f12a6c6274fd9a22a2759135e5ce5@o1305163.ingest.sentry.io/6629304',
          tracesSampleRate: 0.2,
          integrations: [
            new Sentry.ReactNativeTracing({
              // Pass instrumentation to be used as `routingInstrumentation`
              routingInstrumentation,
              // ...
            }),
          ],
          release: `${update.appVersion}+codepush:${update.label}`,
          dist: update.label,
        });
      }
    })
    .catch(devLog.error);
}

const errorHandler: JSExceptionHandler = (e, isFatal) => {
  devLog.log('ERROR HANDLER 123');
  devLog.error(e);
  prodFunction(() =>
    Sentry.captureException(e, {
      level: isFatal ? 'error' : 'log',
      extra: { isFatal, isNative: false },
    }),
  );
};
const nativeErrorHandler: NativeExceptionHandler = errorString => {
  prodFunction(() =>
    Sentry.captureException(errorString, {
      level: 'error',
      extra: { isFatal: true, isNative: true },
    }),
  );
};

setNativeExceptionHandler(nativeErrorHandler, false, true);
setJSExceptionHandler(errorHandler);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <Providers>
      <>
        <Navigation
          routingInstrumentation={!IS_DEV ? routingInstrumentation : null}
        />
        <FlashMessage position="top" />
      </>
    </Providers>
  </ErrorBoundary>
);

export default codePush(IS_DEV ? App : Sentry.wrap(App));

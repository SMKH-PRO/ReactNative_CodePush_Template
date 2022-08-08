import React, { useEffect, useRef } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useColorScheme } from 'react-native';
import { ReactNavigationInstrumentation } from '@sentry/react-native';
import { setTheme } from '../redux/actions/theme';
import navigationList, {
  deepLinking,
} from '../utils/constants/navigationList.constants';
import type { RootStackParamList } from '../utils/types/navigation.types';
import { hideSplash, shouldRenderNav } from '../utils/helpers';
import { defaultTheme } from '../utils/constants/theme.constants';

import LoadingBlankScreen from '../components/common/LoadingBlankScreen/index';
import useDispatch from '../hooks/useDispatch';
import useSelector from '../hooks/useSelector';

const Stack = createNativeStackNavigator<RootStackParamList>();
type NavigationProps = {
  routingInstrumentation?: ReactNavigationInstrumentation | null;
};

const Navigation = ({ routingInstrumentation }: NavigationProps) => {
  const navigation = useRef(null);
  const theme = useSelector(state => state?.theme);
  const user = useSelector(state => state?.user?.data);

  const dispatch = useDispatch();
  const scheme = useColorScheme();

  const isDarkMode = scheme === 'dark';
  const myTheme: Theme = {
    dark: isDarkMode,
    colors: theme?.colors?.primary ? theme?.colors : defaultTheme.colors,
  };

  useEffect(() => {
    dispatch(
      setTheme({
        ...defaultTheme,
        dark: theme.dark == null ? isDarkMode : theme.dark,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const loadInitialData = () => {
    // await loadDataHere()
    // setAuthToken();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    hideSplash();
  };

  useEffect(() => {
    // Update Data when user state changes, please remove this dependency if data is not based on auth state.
    loadInitialData();
  }, [user]);

  return (
    <NavigationContainer
      linking={deepLinking}
      fallback={<LoadingBlankScreen />}
      onReady={() => {
        // Register the navigation container with the instrumentation
        if (routingInstrumentation)
          routingInstrumentation.registerNavigationContainer(navigation);
      }}
      ref={navigation}
      theme={myTheme}>
      <Stack.Navigator>
        {navigationList
          ?.filter(nav => shouldRenderNav({ nav, user }))
          .map(nav => (
            <Stack.Screen
              key={`${nav?.name}_navigation`}
              options={nav?.options}
              name={nav?.name}
              component={nav.component}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

Navigation.defaultProps = {
  routingInstrumentation: null,
};
export default Navigation;

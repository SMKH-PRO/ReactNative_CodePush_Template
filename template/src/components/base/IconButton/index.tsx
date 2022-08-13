import React, { ReactNode, useMemo } from 'react';
import {
  Pressable,
  PressableProps,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { devLog } from '../../../utils/helpers';
import styles from './index.styles';
import useTheme from '../../../hooks/useTheme';

export interface IconButtonProps extends PressableProps {
  name?: string;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  styleOnPress?: StyleProp<ViewStyle>;
  styleOnLeave?: StyleProp<ViewStyle>;
  loading?: boolean;
  onPress?: PressableProps['onPress'];
  round?: boolean;
  icon?: ReactNode;
  size?: number;
  color?: string;
  loadingColor?: string;
  noShadow?: boolean;
  noBg?: boolean;
}
const IconButton = (props: IconButtonProps) => {
  const {
    name,
    size,
    icon,
    color,
    loadingColor,
    style,
    styleOnPress,
    styleOnLeave,
    activeOpacity,
    loading,
    noShadow,
    onPress,
    disabled,
    round,
    noBg,
    ...otherProps
  } = props;
  const theme = useTheme();
  const givenOpacity = loading ? 1 : activeOpacity;

  const dontPressOnLoading: PressableProps['onPress'] = e => {
    if (typeof onPress === 'function' && !loading) onPress(e);
  };

  const FinalIcon = name ? (
    <Icon name={name} size={size} color={color} />
  ) : (
    icon
  );

  const bgColor =
    loading || disabled
      ? theme?.colors?.disabledBgColor
      : theme?.colors?.backgroundLite;

  const backgroundColor = noBg ? 'transparent' : bgColor;

  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);
  const styleOnPressProp = useMemo(
    () => StyleSheet.flatten(styleOnPress),
    [styleOnPress],
  );
  const styleOnLeaveProp = useMemo(
    () => StyleSheet.flatten(styleOnLeave),
    [styleOnLeave],
  );
  return (
    <Pressable
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      disabled={loading || disabled}
      onPress={dontPressOnLoading}
      android_ripple={{ color: theme?.colors?.background, radius: 20 }}
      style={({ pressed }) => ({
        backgroundColor,
        opacity: pressed ? givenOpacity : 1,
        ...styles.button,
        ...(noShadow ? {} : styles.shadowStyle),
        ...(round ? styles.round : {}),
        ...styleProp,
        ...(pressed ? styleOnPressProp : styleOnLeaveProp),
      })}>
      {loading ? <ActivityIndicator color={loadingColor} /> : FinalIcon}
    </Pressable>
  );
};

IconButton.defaultProps = {
  icon: null,
  loadingColor: 'gray',
  color: 'gray',
  styleOnPress: {},
  style: {},
  activeOpacity: 0.7,
  loading: false,
  noShadow: true,
  styleOnLeave: {},
  name: null,
  size: 20,
  noBg: true,
  round: false,
  onPress: () => devLog.warn("Missing prop 'onPress' in Button Component."),
};

export default IconButton;

import React, { useMemo } from 'react';
import {
  View,
  Pressable,
  Text,
  TextStyle,
  PressableProps,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { IS_APPLE } from '../../../utils/constants';
import { devLog } from '../../../utils/helpers';
import styles from './index.style';
import useTheme from '../../../hooks/useTheme';

interface ButtonProps extends PressableProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  styleOnPress?: StyleProp<ViewStyle>;
  styleOnLeave?: StyleProp<ViewStyle>;
  loading?: boolean;
  onPress?: PressableProps['onPress'];
  shadow?: boolean;
  right?: JSX.Element;
  variant?: 'text' | 'contained';
  textColor?: string;
  androidRipple?: PressableProps['android_ripple'];
}

const Button = (props: ButtonProps) => {
  const {
    style,
    styleOnPress,
    styleOnLeave,
    titleStyle,
    activeOpacity,
    title,
    loading,
    textColor,
    onPress,
    right,
    shadow,
    disabled,
    variant,
    androidRipple,
    ...otherProps
  } = props;

  const theme = useTheme();
  const primaryColor = theme?.colors?.primary;
  const givenOpacity = loading ? 1 : activeOpacity;
  const androidActiveOpacity = variant === 'text' ? givenOpacity : 0.9;
  const onPressOpacity = IS_APPLE ? givenOpacity : androidActiveOpacity;

  const dontPressOnLoading: PressableProps['onPress'] = e => {
    if (typeof onPress === 'function' && !loading) onPress(e);
  };

  const containedBg =
    loading || disabled ? theme?.colors?.disabledBgColor : primaryColor;
  const textBg = 'transparent';

  const bgColor = variant === 'text' ? textBg : containedBg;

  const textTxtColor =
    loading || disabled
      ? theme?.colors?.disabledBgColor
      : textColor || theme?.colors?.primary;

  const containedTxtColor = textColor || theme?.colors?.textOnPrimaryBg;

  const txtColor = variant === 'text' ? textTxtColor : containedTxtColor;

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
      android_ripple={{ color: containedTxtColor, ...(androidRipple || {}) }}
      style={({ pressed }) => ({
        backgroundColor: bgColor,
        opacity: pressed ? onPressOpacity : 1,
        ...styles.button,
        ...(!loading ? { padding: 15 } : { padding: 13.5 }),
        ...(pressed ? styleOnPressProp : styleOnLeaveProp),
        ...(shadow ? styles.shadowStyle : {}),
        ...styleProp,
      })}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={txtColor} />
        </View>
      )}
      <Text style={[styles.label, { color: txtColor }, titleStyle]}>
        {title}
      </Text>

      {!!right && right}
    </Pressable>
  );
};
Button.defaultProps = {
  right: null,
  titleStyle: {},
  styleOnPress: {},
  style: {},
  activeOpacity: 0.7,
  loading: false,
  styleOnLeave: {},
  onPress: () => devLog.warn("Missing prop 'onPress' in Button Component."),
  shadow: false,
  variant: 'contianed',
  textColor: null,
  androidRipple: null,
};
export default Button;

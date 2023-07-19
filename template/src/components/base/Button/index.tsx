import React, { useMemo } from 'react';
import {
  View,
  Pressable,
  TextStyle,
  PressableProps,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { IS_APPLE, VERY_SMALL_DEVICE } from '../../../utils/constants';
import { devLog } from '../../../utils/helpers';
import styles from './index.style';
import useTheme from '../../../hooks/useTheme';
import Text from '../Text/index';
import { wp } from '../../../utils/helpers/responsive.helpers';

export interface ButtonProps extends PressableProps {
  title: string;
  titleStyle?: TextStyle;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  styleOnPress?: ViewStyle;
  styleOnLeave?: ViewStyle;
  loading?: boolean;
  onPress?: PressableProps['onPress'];
  shadow?: boolean;
  right?: JSX.Element;
  variant?: 'text' | 'contained' | 'outlined';
  textColor?: string;
  androidRipple?: PressableProps['android_ripple'];
  checkInternet?: boolean;
}

const paddingWhenNotLoading = VERY_SMALL_DEVICE ? wp('2.5%', 10) : wp('4%', 18);
const paddingWhenLoading = VERY_SMALL_DEVICE ? wp('2.3%', 9) : wp('3.8%', 17);

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
    checkInternet,
    ...otherProps
  } = props;
  const theme = useTheme();
  const primaryColor = theme?.colors?.primary;
  const givenOpacity = loading ? 1 : activeOpacity;
  const androidActiveOpacity = variant === 'text' ? givenOpacity : 0.9;
  const onPressOpacity = IS_APPLE ? givenOpacity : androidActiveOpacity;

  const press: PressableProps['onPress'] = e => {
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

  const outlinedTxtColor =
    loading || disabled
      ? theme?.colors?.disabledBgColor
      : textColor || theme?.colors?.primary;

  const containedTxtColor = textColor || theme?.colors?.backgroundLite;

  const textColorOutlinedOrContained =
    variant === 'outlined' ? outlinedTxtColor : containedTxtColor;

  const txtColor =
    variant === 'text' ? textTxtColor : textColorOutlinedOrContained;
  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);
  return (
    <Pressable
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      disabled={loading || disabled}
      onPress={press}
      android_ripple={{ color: containedTxtColor, ...(androidRipple || {}) }}
      style={({ pressed }) => ({
        backgroundColor: bgColor,
        opacity: pressed ? onPressOpacity : 1,
        ...styles.button,
        ...(!loading
          ? { padding: paddingWhenNotLoading }
          : { padding: paddingWhenLoading }),
        ...(pressed ? styleOnPress : styleOnLeave),
        ...(shadow ? styles.shadow : {}),
        ...(variant === 'outlined'
          ? {
              borderWidth: 1,
              borderColor: txtColor,
              backgroundColor: theme?.colors?.backgroundLite,
            }
          : {}),
        ...styleProp,
      })}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={txtColor} />
        </View>
      ) : null}
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
  checkInternet: false,
};
export default Button;

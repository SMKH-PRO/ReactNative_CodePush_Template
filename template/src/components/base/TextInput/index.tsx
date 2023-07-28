import React, { useState, useEffect, useMemo } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  TextInput as Input,
  Animated,
  TextInputProps as InputProps,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
  StyleSheet,
} from "react-native";
import styles from "./index.styles";
import { devLog } from "../../../utils/helpers";
import useTheme from "../../../hooks/useTheme";
import Text from "../Text";
import { IS_APPLE, MAX_FONT_SIZE_MULTIPLIER } from "../../../utils/constants";

const topSpaceBeforeFocus = styles.inputStyle.minHeight / 3.1;
const beforeFocusFontSize =
  styles.inputStyle.minHeight / Number(IS_APPLE ? 3.15 : 3.5);

const afterFocusFontSize =
  styles.inputStyle.minHeight / Number(IS_APPLE ? 4.5 : 5);
export interface TextInputProps extends InputProps {
  label?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: InputProps["style"];
  fontSizeBeforeFocus?: number;
  fontSizeAfterFocus?: number;
  topBeforeFocus?: number;
  topAfterFocus?: number;
  animationDuration?: number;
  colorBeforeFocus?: string;
  colorAfterFocus?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  leftContainerStyle?: StyleProp<ViewStyle>;
  right?: JSX.Element;
  error?: string | boolean;
  left?: JSX.Element;
  height?: number;
  prefix?: string;
  prefixStyle?: StyleProp<TextStyle>;
  onChange?: InputProps["onChange"];
  onChangeText?: InputProps["onChangeText"];
  testId?: string;
  outline?: boolean;
  shadow?: boolean;
}
const TextInput = (props: TextInputProps) => {
  const {
    label,
    onChange,
    onChangeText,
    value,
    left,
    right,
    style,
    containerStyle,
    leftContainerStyle,
    labelStyle,
    animationDuration,
    colorBeforeFocus,
    colorAfterFocus,
    topBeforeFocus,
    topAfterFocus,
    fontSizeBeforeFocus,
    fontSizeAfterFocus,
    inputStyle,
    height,
    error,
    multiline,
    secureTextEntry,
    testId,
    outline,
    shadow,
    prefix,
    prefixStyle,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(secureTextEntry);
  // eslint-disable-next-line react/hook-use-state
  const [Animation] = useState(new Animated.Value(value?.length ? 1 : 0));
  const theme = useTheme();
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  const top = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [topBeforeFocus || topSpaceBeforeFocus, topAfterFocus || 7],
  });
  const fontSize = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      fontSizeBeforeFocus || beforeFocusFontSize,
      fontSizeAfterFocus || afterFocusFontSize,
    ],
  });
  const color = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? theme?.colors?.danger : colorBeforeFocus || "#aaa",
      error ? theme?.colors?.danger : colorAfterFocus || theme?.colors?.primary,
    ],
  });

  useEffect(() => {
    Animated.timing(Animation, {
      toValue: isFocused || value?.length ? 1 : 0,
      duration: animationDuration || 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, Animation, animationDuration]);
  const showPassword = () => setShowPass(!showPass);
  const hasLeft = Boolean(left);
  const hasRight = Boolean(right);

  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);
  const leftContainerStyleProp = useMemo(
    () => StyleSheet.flatten(leftContainerStyle),
    [leftContainerStyle]
  );
  const labelStyleProp = useMemo(
    () => StyleSheet.flatten(labelStyle),
    [labelStyle]
  );

  const inputStyleProp = useMemo(
    () => StyleSheet.flatten(inputStyle),
    [inputStyle]
  );

  return (
    <>
      <View
        style={[
          styles.containerStyle,
          containerStyle,
          styleProp,
          error ? { borderColor: theme?.colors?.danger } : null,
          { backgroundColor: theme?.colors?.backgroundLite },
          outline
            ? {
                borderColor: theme?.colors?.primary,
                ...styles.border,
              }
            : null,

          shadow ? styles.shadow : null,
          height ? { height } : null,
        ]}
      >
        {hasLeft ? (
          <View style={[styles.leftContainerStyle, leftContainerStyleProp]}>
            {left}
          </View>
        ) : null}
        <View style={styles.textCont}>
          {label ? (
            <Animated.Text
              numberOfLines={1}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
              style={[
                styles.labelStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                { left: hasLeft ? 0 : 10 },
                labelStyleProp,
                {
                  // transform: [{ translateY: top }],

                  top,
                  fontSize,
                  color,
                },
              ]}
            >
              {label}
            </Animated.Text>
          ) : null}
          <View style={styles.inputContainer}>
            {(isFocused || value?.length) && prefix ? (
              <Text style={prefixStyle}>{prefix}</Text>
            ) : null}
            <Input
              style={[
                styles.inputStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  paddingLeft: hasLeft ? 4 : 11,
                  ...(multiline ? {} : { maxHeight: height || 55 }),
                },
                height ? { height } : null,
                inputStyleProp,
              ]}
              onChange={(e) => typeof onChange === "function" && onChange(e)}
              onChangeText={(txt) =>
                typeof onChangeText === "function" && onChangeText(txt)
              }
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              multiline={multiline}
              autoCapitalize="none"
              secureTextEntry={showPass}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...otherProps}
              testID={testId || "textInput"}
              maxFontSizeMultiplier={
                props?.maxFontSizeMultiplier ?? MAX_FONT_SIZE_MULTIPLIER
              }
            />
          </View>
        </View>
        {!secureTextEntry ? (
          hasRight && (
            <View style={[styles.leftContainerStyle, leftContainerStyleProp]}>
              {right}
            </View>
          )
        ) : (
          <View style={[styles.leftContainerShow, leftContainerStyleProp]}>
            <TouchableOpacity onPress={showPassword}>
              <Icon
                size={20}
                color={theme?.colors?.primary}
                name={!showPass ? "eye-off" : "eye"}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error && typeof error === "string" ? (
        <Text style={[{ color: theme?.colors?.danger }, styles.error]}>
          {error}
        </Text>
      ) : null}
    </>
  );
};

TextInput.defaultProps = {
  label: "Label",
  onChange: undefined,
  onChangeText: () =>
    devLog.warn(`Missing Prop 'onChange' in TextInput Component.`),
  value: "",
  secureTextEntry: false,
  style: null,
  containerStyle: null,
  labelStyle: null,
  inputStyle: null,
  fontSizeBeforeFocus: beforeFocusFontSize,
  fontSizeAfterFocus: afterFocusFontSize,
  topBeforeFocus: topSpaceBeforeFocus,
  topAfterFocus: 4,
  animationDuration: 150,
  colorBeforeFocus: "#aaa",
  colorAfterFocus: null,
  error: null,
  multiline: false,
  leftContainerStyle: null,
  right: null,
  left: null,
  testId: null,
  height: null,
  outline: null,
  shadow: null,
  prefix: null,
  prefixStyle: null,
};

export default TextInput;

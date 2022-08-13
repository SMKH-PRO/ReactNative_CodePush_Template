import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from 'react-native';
import styles from './index.styles';
import { devLog } from '../../../utils/helpers';
import useTheme from '../../../hooks/useTheme';

export interface TextInputProps extends InputProps {
  label?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: InputProps['style'];
  fontSizeBeforeFocus?: number;
  fontSizeAfterFocus?: number;
  topBeforeFocus?: number;
  topAfterFocus?: number;
  animationDuration?: number;
  colorBeforeFocus?: string;
  colorAfterFocus?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  right?: JSX.Element;
  left?: JSX.Element;
  height?: number;
  onChange?: InputProps['onChange'];
  onChangeText?: InputProps['onChangeText'];
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
    rightContainerStyle,
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
    multiline,
    secureTextEntry,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(secureTextEntry);
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
    outputRange: [topBeforeFocus || 14, topAfterFocus || 5],
  });
  const fontSize = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [fontSizeBeforeFocus || 16, fontSizeAfterFocus || 10],
  });
  const color = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colorBeforeFocus || '#aaa',
      colorAfterFocus || theme?.colors?.text,
    ],
  });

  useEffect(() => {
    Animated.timing(Animation, {
      toValue: isFocused || value?.length ? 1 : 0,
      duration: animationDuration || 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, Animation, animationDuration]);

  const hasLeft = Boolean(left);
  const hasRight = Boolean(right);

  // containerStyle?: StyleProp<ViewStyle>;
  // labelStyle?: StyleProp<TextStyle>;
  // rightContainerStyle?: StyleProp<ViewStyle>;
  // inputStyle?: InputProps['style'];

  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);

  const containerStyleProp = useMemo(
    () => StyleSheet.flatten(containerStyle),
    [containerStyle],
  );

  const labelStyleProp = useMemo(
    () => StyleSheet.flatten(labelStyle),
    [labelStyle],
  );
  const leftContainerStyleProp = useMemo(
    () => StyleSheet.flatten(rightContainerStyle),
    [rightContainerStyle],
  );
  const inputStyleProp = useMemo(
    () => StyleSheet.flatten(inputStyle),
    [inputStyle],
  );
  return (
    <View style={[styles.containerStyle, containerStyleProp, styleProp]}>
      {hasLeft && (
        <View style={[styles.leftContainerStyle, leftContainerStyleProp]}>
          {left}
        </View>
      )}
      <View style={styles.textCont}>
        {label && (
          <Animated.Text
            numberOfLines={1}
            adjustsFontSizeToFit
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
            ]}>
            {label}
          </Animated.Text>
        )}
        <Input
          style={[
            styles?.inputStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              paddingLeft: hasLeft ? 4 : 11,
              color: theme?.colors?.text,
              ...(multiline ? {} : { maxHeight: height || 50 }),
            },
            inputStyleProp,
          ]}
          onChange={e => typeof onChange === 'function' && onChange(e)}
          onChangeText={txt =>
            typeof onChangeText === 'function' && onChangeText(txt)
          }
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          multiline={multiline}
          autoCapitalize="none"
          secureTextEntry={showPass}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      </View>
      {!secureTextEntry ? (
        hasRight && (
          <View style={[styles.leftContainerStyle, leftContainerStyleProp]}>
            {right}
          </View>
        )
      ) : (
        <View style={[styles.leftContainerShow, leftContainerStyleProp]}>
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Icon
              size={20}
              color={theme?.colors?.primary}
              name={!showPass ? 'eye-off' : 'eye'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

TextInput.defaultProps = {
  label: 'Label',
  onChange: () =>
    devLog.warn(`Missing Prop 'onChange' in TextInput Component.`),
  onChangeText: () =>
    devLog.warn(`Missing Prop 'onChange' in TextInput Component.`),
  value: '',
  secureTextEntry: false,

  style: null,
  containerStyle: null,
  labelStyle: null,
  inputStyle: null,
  fontSizeBeforeFocus: 16,
  fontSizeAfterFocus: 10,
  topBeforeFocus: 14,
  topAfterFocus: 5,
  animationDuration: 150,
  colorBeforeFocus: '#aaa',
  colorAfterFocus: null,
  multiline: false,
  rightContainerStyle: null,
  right: null,
  left: null,
  height: null,
};

export default TextInput;

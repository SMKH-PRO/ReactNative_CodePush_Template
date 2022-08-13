import React, { useMemo } from 'react';
import {
  TextProps as RealTextProps,
  Text as RealText,
  TextStyle,
  StyleSheet,
} from 'react-native';
import useTheme from '../../../hooks/useTheme';

interface TextProps extends RealTextProps {
  opacity?: TextStyle['opacity'];
  fontWeight?: TextStyle['fontWeight'];
  textTransform?: TextStyle['textTransform'];
  fontSize?: TextStyle['fontSize'];
  color?: TextStyle['color'];
  letterSpacing?: TextStyle['letterSpacing'];
}
const Text = ({
  style,
  opacity,
  children,
  fontWeight,
  textTransform,
  fontSize,
  color,
  letterSpacing,
  ...props
}: TextProps) => {
  const theme = useTheme();

  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);

  return (
    <RealText
      style={[
        {
          color: theme?.colors?.text,
          opacity,
          ...(fontWeight ? { fontWeight } : {}),
          ...(textTransform ? { textTransform } : {}),
          ...(fontSize ? { fontSize } : {}),
          ...(color ? { color } : {}),
          ...(letterSpacing ? { letterSpacing } : {}),
        },
        styleProp,
      ]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </RealText>
  );
};

Text.defaultProps = {
  opacity: 1,
  fontWeight: null,
  textTransform: null,
  fontSize: null,
  color: null,
  letterSpacing: null,
};
export default Text;

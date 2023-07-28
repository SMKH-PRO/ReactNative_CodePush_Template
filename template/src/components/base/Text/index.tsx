import React, { useMemo } from "react";
import { StyleSheet, Text as RealText, TextProps } from "react-native";
import styles from "./index.styles";
import { MAX_FONT_SIZE_MULTIPLIER } from "../../../utils/constants";

const Text = ({ style, children, ...props }: TextProps) => {
  const styleProp = useMemo(() => StyleSheet.flatten(style), [style]);
  return (
    <RealText
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
      style={[styles.default, styleProp]}
    >
      {children}
    </RealText>
  );
};

export default Text;

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';
import useTheme from '../../hooks/useTheme';

type ChartIconProps = {
  color?: string;
  style?: ViewStyle;
};
const ChartIcon = ({ color, style }: ChartIconProps) => {
  const theme = useTheme();
  return (
    <Svg style={style} width="85" height="85" viewBox="0 0 85 85" fill="none">
      <Path
        d="M46.4973 57.9849C43.9207 60.5789 40.413 62.0343 36.7568 62.027V85C46.5108 85.0264 55.8693 81.1497 62.7472 74.2337L46.4973 57.9838V57.9849Z"
        fill={color || theme?.colors?.primary}
        fillOpacity="0.66"
      />
      <Path
        d="M62.7472 74.2336C69.6632 67.3558 73.5399 57.9972 73.5135 48.2432H50.5405C50.5478 51.9001 49.0918 55.4071 46.4973 57.9837L62.7472 74.2336Z"
        fill={color || theme?.colors?.primary}
      />
      <Path
        d="M36.7568 62.0271C29.1442 62.0271 22.973 55.8559 22.973 48.2433C22.973 40.6307 29.1442 34.4595 36.7568 34.4595V11.4865C16.4563 11.4865 0 27.9428 0 48.2433C0 68.5437 16.4563 85 36.7568 85V62.0271Z"
        fill={color || theme?.colors?.primary}
      />
      <Path
        d="M38.7669 0V34.603C45.3716 34.603 50.4688 40.9206 50.4688 46.2331H85C84.9704 20.7116 64.2884 0.0296293 38.7669 0Z"
        fill={color || theme?.colors?.primary}
        fillOpacity="0.2"
      />
    </Svg>
  );
};

ChartIcon.defaultProps = {
  color: null,
  style: null,
};

export default ChartIcon;

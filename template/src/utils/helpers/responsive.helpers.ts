import { PixelRatio } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../constants';

type WidthPercentageToDP = (
  widthPercent: string | number,
  max?: number,
) => number;
type HeightPercentageToDP = (
  heightPercent: string | number,
  max?: number,
) => number;

const wp: WidthPercentageToDP = (widthPercent, max) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  const finalValue = PixelRatio.roundToNearestPixel(
    (WINDOW_WIDTH * elemWidth) / 100,
  );
  if (max) return finalValue <= max ? finalValue : max;
  return finalValue;
};

const hp: HeightPercentageToDP = (heightPercent, max) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  const finalValue = PixelRatio.roundToNearestPixel(
    (WINDOW_HEIGHT * elemHeight) / 100,
  );
  if (max) return finalValue <= max ? finalValue : max;
  return finalValue;
};

export { wp, hp };

import { createImageProgress } from 'react-native-image-progress';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const Image = createImageProgress(FastImage);

export type ImageProps = FastImageProps;
export default Image;

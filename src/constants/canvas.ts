import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const CANVAS_CONFIG = {
  MIN_SCALE: 1,
  MAX_SCALE: 3,
  WIDTH: screenWidth * 0.8,
  HEIGHT: screenHeight * 0.6,
} as const;

export const SCREEN_DIMENSIONS = {
  WIDTH: screenWidth,
  HEIGHT: screenHeight,
} as const;

export const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo' as const,
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
};

export const BOTTOM_SHEET_CONFIG = {
  SNAP_POINTS: ['25%'],
} as const;

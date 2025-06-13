'use worklet';

import {CANVAS_CONFIG} from '../constants/canvas';

export const clampScale = (value: number): number => {
  'worklet';
  return Math.max(
    CANVAS_CONFIG.MIN_SCALE,
    Math.min(CANVAS_CONFIG.MAX_SCALE, value),
  );
};

export const clampTranslateX = (
  value: number,
  currentScale: number,
): number => {
  'worklet';
  if (currentScale <= 1) return 0;

  const maxTranslate = (CANVAS_CONFIG.WIDTH * (currentScale - 1)) / 2;
  return Math.max(-maxTranslate, Math.min(maxTranslate, value));
};

export const clampTranslateY = (
  value: number,
  currentScale: number,
): number => {
  'worklet';
  if (currentScale <= 1) return 0;

  const maxTranslate = (CANVAS_CONFIG.HEIGHT * (currentScale - 1)) / 2;
  return Math.max(-maxTranslate, Math.min(maxTranslate, value));
};

export const shouldResetTranslate = (scale: number): boolean => {
  'worklet';
  return scale <= 1;
};

export const isScaleOutOfBounds = (scale: number): boolean => {
  'worklet';
  return scale < CANVAS_CONFIG.MIN_SCALE || scale > CANVAS_CONFIG.MAX_SCALE;
};

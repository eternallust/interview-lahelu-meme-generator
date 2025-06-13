import {useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {withSpring} from 'react-native-reanimated';
import {
  clampScale,
  clampTranslateX,
  clampTranslateY,
  shouldResetTranslate,
  isScaleOutOfBounds,
} from '../utils/canvasConstraints';
import {DIMENSIONS} from '../constants';

export const useCanvasGestures = () => {
  const scale = useSharedValue(DIMENSIONS.DEFAULT_SCALE);
  const savedScale = useSharedValue(DIMENSIONS.DEFAULT_SCALE);
  const translateX = useSharedValue(DIMENSIONS.DEFAULT_POSITION);
  const translateY = useSharedValue(DIMENSIONS.DEFAULT_POSITION);
  const savedTranslateX = useSharedValue(DIMENSIONS.DEFAULT_POSITION);
  const savedTranslateY = useSharedValue(DIMENSIONS.DEFAULT_POSITION);

  const resetCanvasTransform = () => {
    scale.value = withSpring(DIMENSIONS.DEFAULT_SCALE);
    translateX.value = withSpring(DIMENSIONS.DEFAULT_POSITION);
    translateY.value = withSpring(DIMENSIONS.DEFAULT_POSITION);
    savedScale.value = DIMENSIONS.DEFAULT_SCALE;
    savedTranslateX.value = DIMENSIONS.DEFAULT_POSITION;
    savedTranslateY.value = DIMENSIONS.DEFAULT_POSITION;
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      const newScale: number = savedScale.value * event.scale;
      scale.value = clampScale(newScale);

      translateX.value = clampTranslateX(savedTranslateX.value, scale.value);
      translateY.value = clampTranslateY(savedTranslateY.value, scale.value);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      if (isScaleOutOfBounds(scale.value)) {
        scale.value = withSpring(clampScale(scale.value));
        savedScale.value = clampScale(scale.value);
      }

      if (shouldResetTranslate(scale.value)) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (savedScale.value > 1) {
        const newTranslateX: number =
          savedTranslateX.value + event.translationX;
        const newTranslateY: number =
          savedTranslateY.value + event.translationY;

        translateX.value = clampTranslateX(newTranslateX, savedScale.value);
        translateY.value = clampTranslateY(newTranslateY, savedScale.value);
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      const clampedX: number = clampTranslateX(
        translateX.value,
        savedScale.value,
      );
      const clampedY: number = clampTranslateY(
        translateY.value,
        savedScale.value,
      );

      if (translateX.value !== clampedX) {
        translateX.value = withSpring(clampedX);
        savedTranslateX.value = clampedX;
      }

      if (translateY.value !== clampedY) {
        translateY.value = withSpring(clampedY);
        savedTranslateY.value = clampedY;
      }
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  return {
    scale,
    translateX,
    translateY,
    composedGesture,
    resetCanvasTransform,
  };
};

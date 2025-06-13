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

export const useCanvasGestures = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const resetCanvasTransform = () => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      const newScale = savedScale.value * event.scale;
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
        const newTranslateX = savedTranslateX.value + event.translationX;
        const newTranslateY = savedTranslateY.value + event.translationY;

        translateX.value = clampTranslateX(newTranslateX, savedScale.value);
        translateY.value = clampTranslateY(newTranslateY, savedScale.value);
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      const clampedX = clampTranslateX(translateX.value, savedScale.value);
      const clampedY = clampTranslateY(translateY.value, savedScale.value);

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

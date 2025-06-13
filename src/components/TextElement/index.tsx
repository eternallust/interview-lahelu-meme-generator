import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {TextElement as TextElementType} from '../../types';
import {styles} from './styles';

interface TextElementProps {
  element: TextElementType;
  onUpdate: (id: string, updates: Partial<TextElementType>) => void;
  onSelect: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TextElement: React.FC<TextElementProps> = ({
  element,
  onUpdate,
  onSelect,
  onCopy,
  onDelete,
}) => {
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);
  const rotation = useSharedValue(element.rotation);
  const scale = useSharedValue(element.scale);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = element.x + event.translationX;
      translateY.value = element.y + event.translationY;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(element.id, {
        x: translateX.value,
        y: translateY.value,
      });
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = element.rotation + event.rotation;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(element.id, {
        rotation: rotation.value,
      });
    });

  const composedGesture = Gesture.Simultaneous(panGesture, rotationGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {rotate: `${rotation.value}rad`},
      {scale: scale.value},
    ],
  }));

  const topLeftStyle = useAnimatedStyle(() => ({
    top: -8 * scale.value,
    left: -8 * scale.value,
    transform: [{scale: 1 / scale.value}],
  }));

  const topRightStyle = useAnimatedStyle(() => ({
    top: -8 * scale.value,
    right: -8 * scale.value,
    transform: [{scale: 1 / scale.value}],
  }));

  const bottomLeftStyle = useAnimatedStyle(() => ({
    bottom: -8 * scale.value,
    left: -8 * scale.value,
    transform: [{scale: 1 / scale.value}],
  }));

  const bottomRightStyle = useAnimatedStyle(() => ({
    bottom: -8 * scale.value,
    right: -8 * scale.value,
    transform: [{scale: 1 / scale.value}],
  }));

  const actionButtonStyle = useAnimatedStyle(() => ({
    bottom: scale.value - 40,
    transform: [{scale: 1 / scale.value}],
  }));

  const rotateButtonStyle = useAnimatedStyle(() => ({
    top: scale.value - 40,
    left: '50%',
    marginLeft: -15,
    transform: [{scale: 1 / scale.value}],
  }));

  const handleTextPress = () => {
    onSelect(element.id);
  };

  const createRotateGesture = () => {
    return Gesture.Pan()
      .onUpdate(event => {
        const rotationChange = (event.translationX + event.translationY) / 100;
        rotation.value = element.rotation + rotationChange;
      })
      .onEnd(() => {
        runOnJS(onUpdate)(element.id, {
          rotation: rotation.value,
        });
      });
  };

  const createCornerGesture = (
    corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
  ) => {
    return Gesture.Pan()
      .onUpdate(event => {
        let scaleChange = 0;

        switch (corner) {
          case 'bottomRight':
            scaleChange =
              ((event.translationX + event.translationY) / 20) * 0.15;
            break;
          case 'topLeft':
            scaleChange =
              (-(event.translationX + event.translationY) / 20) * 0.15;
            break;
          case 'topRight':
            scaleChange =
              ((event.translationX - event.translationY) / 20) * 0.15;
            break;
          case 'bottomLeft':
            scaleChange =
              ((-event.translationX + event.translationY) / 20) * 0.15;
            break;
        }

        const newScale = element.scale + scaleChange;
        scale.value = Math.max(0.5, Math.min(3, newScale));
      })
      .onEnd(() => {
        runOnJS(onUpdate)(element.id, {
          scale: scale.value,
        });
      });
  };

  const renderResizeCorner = (
    corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
  ) => {
    const cornerGesture = createCornerGesture(corner);
    let cornerStyle;

    switch (corner) {
      case 'topLeft':
        cornerStyle = topLeftStyle;
        break;
      case 'topRight':
        cornerStyle = topRightStyle;
        break;
      case 'bottomLeft':
        cornerStyle = bottomLeftStyle;
        break;
      case 'bottomRight':
        cornerStyle = bottomRightStyle;
        break;
    }

    return (
      <GestureDetector key={corner} gesture={cornerGesture}>
        <Animated.View style={[styles.resizeCorner, cornerStyle]} />
      </GestureDetector>
    );
  };

  const renderControls = () => {
    if (!element.isSelected) return null;

    return (
      <>
        {renderResizeCorner('topLeft')}
        {renderResizeCorner('topRight')}
        {renderResizeCorner('bottomLeft')}
        {renderResizeCorner('bottomRight')}

        <GestureDetector gesture={createRotateGesture()}>
          <Animated.View style={[styles.rotateButton, rotateButtonStyle]}>
            <Animated.View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🔄</Text>
            </Animated.View>
          </Animated.View>
        </GestureDetector>

        <Animated.View style={[styles.actionButtons, actionButtonStyle]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onCopy(element.id)}>
            <Text style={styles.actionButtonText}>📋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(element.id)}>
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  };

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {element.isSelected && <Animated.View style={styles.selectionBorder} />}

        <TouchableOpacity onPress={handleTextPress} activeOpacity={0.8}>
          <Text
            style={[
              styles.text,
              {
                fontSize: element.fontSize,
                color: element.color,
                fontWeight: element.fontWeight,
              },
            ]}>
            {element.text}
          </Text>
        </TouchableOpacity>

        {renderControls()}
      </Animated.View>
    </GestureDetector>
  );
};

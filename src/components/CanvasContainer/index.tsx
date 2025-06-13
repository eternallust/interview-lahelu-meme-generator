import React from 'react';
import {View, Image, Text} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {styles} from './styles';

interface CanvasContainerProps {
  selectedImage: string | null;
  gesture: any;
  scale: any;
  translateX: any;
  translateY: any;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  selectedImage,
  gesture,
  scale,
  translateX,
  translateY,
}) => {
  const animatedCanvasStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const renderCanvasContent = () => {
    if (selectedImage) {
      return (
        <Image
          source={{uri: selectedImage}}
          style={styles.canvasImage}
          resizeMode="contain"
        />
      );
    }

    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Tap Tools to add image</Text>
      </View>
    );
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.canvasContainer, animatedCanvasStyle]}>
        <View style={styles.canvas}>{renderCanvasContent()}</View>
      </Animated.View>
    </GestureDetector>
  );
};

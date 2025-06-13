import React from 'react';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TextElement} from '../TextElement';
import {TextElement as TextElementType} from '../../types';
import {styles} from './styles';

interface CanvasContainerProps {
  selectedImage: string | null;
  gesture: any;
  scale: any;
  translateX: any;
  translateY: any;
  textElements: TextElementType[];
  onUpdateText: (id: string, updates: Partial<TextElementType>) => void;
  onSelectText: (id: string | null) => void;
  onCopyText: (id: string) => void;
  onDeleteText: (id: string) => void;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  selectedImage,
  gesture,
  scale,
  translateX,
  translateY,
  textElements,
  onUpdateText,
  onSelectText,
  onCopyText,
  onDeleteText,
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

  const handleCanvasPress = () => {
    onSelectText(null);
  };

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

  const renderTextElements = () => {
    return textElements.map(textElement => (
      <TextElement
        key={textElement.id}
        element={textElement}
        onUpdate={onUpdateText}
        onSelect={onSelectText}
        onCopy={onCopyText}
        onDelete={onDeleteText}
      />
    ));
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.canvasContainer, animatedCanvasStyle]}>
        <TouchableWithoutFeedback onPress={handleCanvasPress}>
          <View style={styles.canvas}>
            {renderCanvasContent()}

            <View style={styles.textOverlay}>{renderTextElements()}</View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </GestureDetector>
  );
};

import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {TextElement} from '../TextElement';
import {TextElement as TextElementType} from '../../types';
import {styles} from './styles';
import {CANVAS_CONFIG} from '../../constants/canvas';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface CanvasContainerProps {
  selectedImage: string | null;
  imageDimensions: {width: number; height: number} | null;
  gesture: any;
  scale: any;
  translateX: any;
  translateY: any;
  textElements: TextElementType[];
  onUpdateText: (id: string, updates: Partial<TextElementType>) => void;
  onSelectText: (id: string | null) => void;
  onCopyText: (id: string) => void;
  onDeleteText: (id: string) => void;
  onEditText: (id: string) => void;
}

// Function to calculate canvas dimensions based on image dimensions
const calculateCanvasDimensions = (
  imageDimensions: {width: number; height: number} | null,
) => {
  if (!imageDimensions) {
    return {
      width: CANVAS_CONFIG.WIDTH,
      height: CANVAS_CONFIG.HEIGHT,
    };
  }

  const maxWidth = screenWidth * 0.9;
  const maxHeight = screenHeight * 0.7;
  const imageAspectRatio = imageDimensions.width / imageDimensions.height;

  let canvasWidth = imageDimensions.width;
  let canvasHeight = imageDimensions.height;

  // Scale down if image is too large for screen
  if (canvasWidth > maxWidth) {
    canvasWidth = maxWidth;
    canvasHeight = canvasWidth / imageAspectRatio;
  }

  if (canvasHeight > maxHeight) {
    canvasHeight = maxHeight;
    canvasWidth = canvasHeight * imageAspectRatio;
  }

  return {
    width: canvasWidth,
    height: canvasHeight,
  };
};

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  selectedImage,
  imageDimensions,
  gesture,
  scale,
  translateX,
  translateY,
  textElements,
  onUpdateText,
  onSelectText,
  onCopyText,
  onDeleteText,
  onEditText,
}) => {
  const canvasDimensions = calculateCanvasDimensions(imageDimensions);

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
        onEdit={onEditText}
      />
    ));
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.canvasContainer,
          {
            width: canvasDimensions.width,
            height: canvasDimensions.height,
          },
          animatedCanvasStyle,
        ]}>
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

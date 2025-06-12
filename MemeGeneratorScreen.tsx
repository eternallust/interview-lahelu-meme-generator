import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {styles} from './styles';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Constants untuk zoom dan pan constraints
const MIN_SCALE = 1;
const MAX_SCALE = 3;
const CANVAS_WIDTH = screenWidth * 0.8;
const CANVAS_HEIGHT = screenHeight * 0.6;

interface MemeGeneratorScreenProps {}

const MemeGeneratorScreen: React.FC<MemeGeneratorScreenProps> = () => {
  // State untuk selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['25%'], []);

  // Shared values untuk animasi
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Helper functions untuk clamping values
  const clampScale = (value: number): number => {
    'worklet';
    return Math.max(MIN_SCALE, Math.min(MAX_SCALE, value));
  };

  const clampTranslateX = (value: number, currentScale: number): number => {
    'worklet';
    if (currentScale <= 1) return 0;
    const maxTranslate = (CANVAS_WIDTH * (currentScale - 1)) / 2;
    return Math.max(-maxTranslate, Math.min(maxTranslate, value));
  };

  const clampTranslateY = (value: number, currentScale: number): number => {
    'worklet';
    if (currentScale <= 1) return 0;
    const maxTranslate = (CANVAS_HEIGHT * (currentScale - 1)) / 2;
    return Math.max(-maxTranslate, Math.min(maxTranslate, value));
  };

  // Function untuk handle tools button press
  const handleToolsPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // Function untuk handle image picker
  const handleImagePicker = useCallback(() => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Gagal memilih gambar');
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setSelectedImage(imageUri);
          // Reset zoom dan pan ketika image baru dipilih
          scale.value = withSpring(1);
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
          savedScale.value = 1;
          savedTranslateX.value = 0;
          savedTranslateY.value = 0;
        }
      }
      // Close bottom sheet setelah pilih image
      bottomSheetRef.current?.close();
    });
  }, [
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
  ]);

  // Pinch gesture untuk zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      const newScale = savedScale.value * event.scale;
      scale.value = clampScale(newScale);

      // Adjust translate values ketika scale berubah
      translateX.value = clampTranslateX(savedTranslateX.value, scale.value);
      translateY.value = clampTranslateY(savedTranslateY.value, scale.value);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      // Smooth animation untuk scale yang invalid
      if (scale.value < MIN_SCALE || scale.value > MAX_SCALE) {
        scale.value = withSpring(clampScale(scale.value));
        savedScale.value = clampScale(scale.value);
      }

      // Reset translate jika scale kembali ke 1
      if (scale.value <= 1) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      }
    });

  // Pan gesture untuk menggeser canvas
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      // Hanya allow pan jika canvas ter-zoom
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

      // Smooth animation untuk boundary constraints
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

  // Combine gestures - pinch dan pan bisa dilakukan bersamaan
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Animated styles untuk canvas
  const animatedCanvasStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.screenContainer}>
        {/* Tools Button */}
        <TouchableOpacity style={styles.toolsButton} onPress={handleToolsPress}>
          <Text style={styles.toolsButtonText}>🛠️ Tools</Text>
        </TouchableOpacity>

        {/* Canvas with Gesture Detection */}
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.canvasContainer, animatedCanvasStyle]}>
            <View style={styles.canvas}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={styles.canvasImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>
                    Tap Tools to add image
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>
        </GestureDetector>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Tools</Text>

            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleImagePicker}>
              <Text style={styles.bottomSheetOptionIcon}>📷</Text>
              <Text style={styles.bottomSheetOptionText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default MemeGeneratorScreen;

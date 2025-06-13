import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {useCanvasGestures} from '../../hooks/useCanvasGestures';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useTextElements} from '../../hooks/useTextElements';
import {BottomBar, ToolsBottomSheet, CanvasContainer} from '../../components';

import {styles} from './styles';

interface MemeGeneratorScreenProps {}

export const MemeGeneratorScreen: React.FC<MemeGeneratorScreenProps> = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {selectedImage, selectImage} = useImagePicker();
  const {scale, translateX, translateY, composedGesture, resetCanvasTransform} =
    useCanvasGestures();

  const {textElements, addText, updateText, selectText, deleteText, copyText} =
    useTextElements();

  const handleUploadImagePress = useCallback(async () => {
    const success = await selectImage();

    if (success) {
      resetCanvasTransform();
    }
  }, [selectImage, resetCanvasTransform]);

  const handleAddTextPress = useCallback(() => {
    addText('Sample Text');
  }, [addText]);

  const handleImagePickerPress = useCallback(async () => {
    const success = await selectImage();

    if (success) {
      resetCanvasTransform();
    }

    bottomSheetRef.current?.close();
  }, [selectImage, resetCanvasTransform]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.screenContainer}>
        <CanvasContainer
          selectedImage={selectedImage}
          gesture={composedGesture}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          textElements={textElements}
          onUpdateText={updateText}
          onSelectText={selectText}
          onCopyText={copyText}
          onDeleteText={deleteText}
        />

        <BottomBar
          onUploadImagePress={handleUploadImagePress}
          onAddTextPress={handleAddTextPress}
        />

        <ToolsBottomSheet
          bottomSheetRef={bottomSheetRef}
          onImagePickerPress={handleImagePickerPress}
        />
      </View>
    </GestureHandlerRootView>
  );
};

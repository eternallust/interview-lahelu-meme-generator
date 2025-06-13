import React, {useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {useCanvasGestures} from '../../hooks/useCanvasGestures';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useTextElements} from '../../hooks/useTextElements';
import {
  BottomBar,
  ToolsBottomSheet,
  CanvasContainer,
  TextEditBottomSheet,
} from '../../components';

import {styles} from './styles';

interface MemeGeneratorScreenProps {}

export const MemeGeneratorScreen: React.FC<MemeGeneratorScreenProps> = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textEditBottomSheetRef = useRef<BottomSheet>(null);

  const {selectedImage, imageDimensions, selectImage} = useImagePicker();
  const {scale, translateX, translateY, composedGesture, resetCanvasTransform} =
    useCanvasGestures();

  const {
    textElements,
    addText,
    updateText,
    selectText,
    deleteText,
    copyText,
    editText,
    editingTextElement,
    setEditingTextElement,
  } = useTextElements();

  const handleEditText = useCallback(
    (id: string) => {
      editText(id);
      textEditBottomSheetRef.current?.expand();
    },
    [editText],
  );

  const handleSelectText = useCallback(
    (id: string | null) => {
      // Jika ada editing text yang aktif dan user tap text lain, switch editing ke text baru
      if (editingTextElement && id && id !== editingTextElement.id) {
        editText(id);
      } else {
        selectText(id);
      }
    },
    [selectText, editText, editingTextElement],
  );

  useEffect(() => {
    if (editingTextElement) {
      textEditBottomSheetRef.current?.expand();
    }
  }, [editingTextElement]);

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
          imageDimensions={imageDimensions}
          gesture={composedGesture}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          textElements={textElements}
          onUpdateText={updateText}
          onSelectText={handleSelectText}
          onCopyText={copyText}
          onDeleteText={deleteText}
          onEditText={handleEditText}
        />

        <BottomBar
          onUploadImagePress={handleUploadImagePress}
          onAddTextPress={handleAddTextPress}
        />

        <ToolsBottomSheet
          bottomSheetRef={bottomSheetRef}
          onImagePickerPress={handleImagePickerPress}
        />

        <TextEditBottomSheet
          bottomSheetRef={textEditBottomSheetRef}
          textElement={editingTextElement}
          onUpdateText={updateText}
          onClose={() => setEditingTextElement(null)}
        />
      </View>
    </GestureHandlerRootView>
  );
};

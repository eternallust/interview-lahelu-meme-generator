import React, {RefObject, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {TextElement} from '../../types';
import {styles} from './styles';

interface TextEditBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  textElement: TextElement | null;
  onUpdateText: (id: string, updates: Partial<TextElement>) => void;
  onClose?: () => void;
}

const COLOR_OPTIONS = [
  '#FFFFFF', // White
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
];

export const TextEditBottomSheet: React.FC<TextEditBottomSheetProps> = ({
  bottomSheetRef,
  textElement,
  onUpdateText,
  onClose,
}) => {
  const [editedText, setEditedText] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('#FFFFFF');
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState('transparent');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    if (textElement) {
      setEditedText(textElement.text);
      setSelectedTextColor(textElement.color);
      setSelectedBackgroundColor(textElement.backgroundColor || 'transparent');
    }
  }, [textElement]);

  useEffect(() => {
    if (textElement && editedText.trim()) {
      onUpdateText(textElement.id, {
        text: editedText.trim(),
      });
    }
  }, [editedText, textElement, onUpdateText]);

  useEffect(() => {
    if (textElement) {
      onUpdateText(textElement.id, {
        color: selectedTextColor,
      });
    }
  }, [selectedTextColor, textElement, onUpdateText]);

  useEffect(() => {
    if (textElement) {
      onUpdateText(textElement.id, {
        backgroundColor: selectedBackgroundColor,
      });
    }
  }, [selectedBackgroundColor, textElement, onUpdateText]);

  const renderColorPicker = (
    title: string,
    selectedColor: string,
    onColorSelect: (color: string) => void,
    includeTransparent: boolean = false,
  ) => {
    return (
      <View style={styles.colorSection}>
        <Text style={styles.colorSectionTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.colorRow}>
            {includeTransparent && (
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  styles.transparentOption,
                  selectedColor === 'transparent' && styles.selectedColor,
                ]}
                onPress={() => onColorSelect('transparent')}>
                <Text style={styles.transparentText}>None</Text>
              </TouchableOpacity>
            )}
            {COLOR_OPTIONS.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  {backgroundColor: color},
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => onColorSelect(color)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%']}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onChange={index => {
        setIsBottomSheetOpen(index > -1);
        if (index === -1 && onClose) {
          onClose();
        }
      }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Edit Text</Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Text</Text>
            <TextInput
              style={styles.textInput}
              value={editedText}
              onChangeText={setEditedText}
              placeholder="Masukkan text..."
              placeholderTextColor="#999999"
              multiline
              autoFocus={isBottomSheetOpen}
            />
          </View>

          {renderColorPicker(
            'Warna Text',
            selectedTextColor,
            setSelectedTextColor,
          )}

          {renderColorPicker(
            'Warna Background',
            selectedBackgroundColor,
            setSelectedBackgroundColor,
            true,
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

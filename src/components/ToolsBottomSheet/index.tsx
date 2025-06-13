import React, {RefObject} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {styles} from './styles';
import {BOTTOM_SHEET_CONFIG} from '../../constants/canvas';

interface ToolsBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  onImagePickerPress: () => void;
}

export const ToolsBottomSheet: React.FC<ToolsBottomSheetProps> = ({
  bottomSheetRef,
  onImagePickerPress,
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={BOTTOM_SHEET_CONFIG.SNAP_POINTS}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}>
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetTitle}>Tools</Text>
        <TouchableOpacity
          style={styles.bottomSheetOption}
          onPress={onImagePickerPress}>
          <Text style={styles.bottomSheetOptionIcon}>📷</Text>
          <Text style={styles.bottomSheetOptionText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

import React, {RefObject} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Button} from '../Button';
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
        <Button
          variant="secondary"
          icon="CAMERA"
          title="Upload Image"
          onPress={onImagePickerPress}
        />
      </View>
    </BottomSheet>
  );
};

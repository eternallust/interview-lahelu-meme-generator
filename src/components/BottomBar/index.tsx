import React from 'react';
import {View} from 'react-native';
import {Button} from '../Button';
import {styles} from './styles';

interface BottomBarProps {
  onUploadImagePress: () => void;
  onAddTextPress: () => void;
  onTemplatePress: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onUploadImagePress,
  onAddTextPress,
  onTemplatePress,
}) => {
  return (
    <View style={styles.bottomBar}>
      <Button
        variant="action"
        icon="TEMPLATE"
        title="Templates"
        onPress={onTemplatePress}
      />

      <Button
        variant="action"
        icon="CAMERA"
        title="Upload"
        onPress={onUploadImagePress}
      />

      <Button
        variant="action"
        icon="TEXT"
        title="Add Text"
        onPress={onAddTextPress}
      />
    </View>
  );
};

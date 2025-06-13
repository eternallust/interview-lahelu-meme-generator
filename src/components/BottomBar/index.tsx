import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';

interface BottomBarProps {
  onUploadImagePress: () => void;
  onAddTextPress: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onUploadImagePress,
  onAddTextPress,
}) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onUploadImagePress}>
        <Text style={styles.actionButtonIcon}>📷</Text>
        <Text style={styles.actionButtonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onAddTextPress}>
        <Text style={styles.actionButtonIcon}>📝</Text>
        <Text style={styles.actionButtonText}>Add Text</Text>
      </TouchableOpacity>
    </View>
  );
};

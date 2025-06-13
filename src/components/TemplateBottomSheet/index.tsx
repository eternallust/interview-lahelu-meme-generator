import React, {RefObject} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {TemplateItem, MEME_TEMPLATES} from '../../assets/templates';
import {styles} from './styles';

interface TemplateBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheet | null>;
  onTemplateSelect: (template: TemplateItem) => void;
}

export const TemplateBottomSheet: React.FC<TemplateBottomSheetProps> = ({
  bottomSheetRef,
  onTemplateSelect,
}) => {
  // Handle template selection and close bottom sheet
  const handleTemplatePress = (template: TemplateItem) => {
    onTemplateSelect(template);
    bottomSheetRef.current?.close();
  };

  // Render individual template item
  const renderTemplateItem = ({item}: {item: TemplateItem}) => (
    <TouchableOpacity
      style={styles.templateItem}
      onPress={() => handleTemplatePress(item)}
      activeOpacity={0.7}>
      <Image
        source={item.thumbnail}
        style={styles.templateImage}
        resizeMode="cover"
      />
      <Text style={styles.templateName} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['70%']}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pilih Template Meme</Text>
        </View>

        {/* Templates Grid - removed category filters */}
        <FlatList
          data={MEME_TEMPLATES}
          renderItem={renderTemplateItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.templatesGrid}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BottomSheet>
  );
};

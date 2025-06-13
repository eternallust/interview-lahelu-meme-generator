import {StyleSheet, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = (screenWidth - 60) / 2; // 2 columns with padding

export const styles = StyleSheet.create({
  // Bottom sheet styles
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  handleIndicator: {
    backgroundColor: '#CCCCCC',
    width: 40,
  },

  // Container and layout
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },

  // Templates grid styles
  templatesGrid: {
    paddingBottom: 20,
  },

  templateItem: {
    width: itemWidth,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  templateImage: {
    width: '100%',
    height: itemWidth * 0.8, // Maintain aspect ratio
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F5F5F5',
  },

  templateName: {
    padding: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 18,
  },
});

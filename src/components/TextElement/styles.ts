import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: 50,
    minHeight: 30,
  },
  selectionBorder: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    padding: 4,
  },
  resizeCorner: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  topLeft: {
    top: -8,
    left: -8,
  },
  topRight: {
    top: -8,
    right: -8,
  },
  bottomLeft: {
    bottom: -8,
    left: -8,
  },
  bottomRight: {
    bottom: -8,
    right: -8,
  },
  actionButtons: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  rotateButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  actionButton: {
    width: 28,
    height: 28,
    backgroundColor: '#4A90E2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    fontSize: 12,
  },
});

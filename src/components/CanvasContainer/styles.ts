import {StyleSheet} from 'react-native';
import {CANVAS_CONFIG} from '../../constants/canvas';

export const styles = StyleSheet.create({
  canvasContainer: {
    width: CANVAS_CONFIG.WIDTH,
    height: CANVAS_CONFIG.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  canvasImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

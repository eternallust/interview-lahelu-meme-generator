import {SharedValue} from 'react-native-reanimated';

export interface CanvasGestureValues {
  scale: SharedValue<number>;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  composedGesture: any;
  resetCanvasTransform: () => void;
}

export interface ImagePickerState {
  selectedImage: string | null;
  selectImage: () => Promise<boolean>;
  clearImage: () => void;
}

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  fontWeight: 'normal' | 'bold';
  isSelected: boolean;
}

export interface TextElementsState {
  textElements: TextElement[];
  selectedTextId: string | null;
  addText: (text: string) => void;
  updateText: (id: string, updates: Partial<TextElement>) => void;
  selectText: (id: string | null) => void;
  deleteText: (id: string) => void;
  copyText: (id: string) => void;
  editText: (id: string) => void;
}

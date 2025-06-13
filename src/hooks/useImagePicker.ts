import {useState, useCallback} from 'react';
import {pickImageFromLibrary} from '../services/imagePickerService';

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const selectImage = useCallback(async (): Promise<boolean> => {
    const result = await pickImageFromLibrary();

    if (result.success && result.imageUri) {
      setSelectedImage(result.imageUri);
      return true;
    }

    return false;
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return {
    selectedImage,
    selectImage,
    clearImage,
  };
};

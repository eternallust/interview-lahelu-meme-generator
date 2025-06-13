import {useState, useCallback} from 'react';
import {pickImageFromLibrary} from '../services/imagePickerService';

interface ImageData {
  uri: string;
  width: number;
  height: number;
}

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const selectImage = useCallback(async (): Promise<boolean> => {
    const result = await pickImageFromLibrary();

    if (result.success && result.imageUri && result.width && result.height) {
      setSelectedImage(result.imageUri);
      setImageDimensions({width: result.width, height: result.height});
      return true;
    }

    return false;
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImageDimensions(null);
  }, []);

  return {
    selectedImage,
    imageDimensions,
    selectImage,
    clearImage,
  };
};

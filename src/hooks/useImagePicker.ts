import {useState, useCallback} from 'react';
import {ImageSourcePropType} from 'react-native';
import {pickImageFromLibrary} from '../services/imagePickerService';
import {TemplateItem} from '../assets/templates';

// Support both string URIs (from gallery) and require() results (from assets)
type ImageSource = string | ImageSourcePropType | null;

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSource>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Select image from device gallery
  const selectImage = useCallback(async (): Promise<boolean> => {
    const result = await pickImageFromLibrary();

    if (result.success && result.imageUri && result.width && result.height) {
      setSelectedImage(result.imageUri);
      setImageDimensions({width: result.width, height: result.height});
      return true;
    }

    return false;
  }, []);

  // Select template from assets - returns the require() asset source
  const selectTemplate = useCallback((template: TemplateItem): boolean => {
    setSelectedImage(template.thumbnail);
    setImageDimensions({width: template.width, height: template.height});
    return true;
  }, []);

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setImageDimensions(null);
  }, []);

  return {
    selectedImage,
    imageDimensions,
    selectImage,
    selectTemplate,
    clearImage,
  };
};

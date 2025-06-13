import {Alert} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {IMAGE_PICKER_OPTIONS} from '../constants/canvas';

export interface ImagePickerResult {
  success: boolean;
  imageUri?: string;
  error?: string;
}

export const pickImageFromLibrary = (): Promise<ImagePickerResult> => {
  return new Promise(resolve => {
    launchImageLibrary(
      IMAGE_PICKER_OPTIONS,
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          resolve({success: false, error: 'User cancelled image picker'});
          return;
        }

        if (response.errorMessage) {
          Alert.alert('Error', 'Gagal memilih gambar');
          resolve({success: false, error: response.errorMessage});
          return;
        }

        const imageUri = response.assets?.[0]?.uri;
        if (imageUri) {
          resolve({success: true, imageUri});
        } else {
          resolve({success: false, error: 'No image selected'});
        }
      },
    );
  });
};

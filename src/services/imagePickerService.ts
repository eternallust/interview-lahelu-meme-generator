import {Alert} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {IMAGE_PICKER_OPTIONS} from '../constants/canvas';

export interface ImagePickerResult {
  success: boolean;
  imageUri?: string;
  width?: number;
  height?: number;
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

        const asset = response.assets?.[0];
        const imageUri: string | undefined = asset?.uri;
        const width: number | undefined = asset?.width;
        const height: number | undefined = asset?.height;

        if (imageUri && width && height) {
          resolve({success: true, imageUri, width, height});
        } else {
          resolve({
            success: false,
            error: 'No image selected or missing dimensions',
          });
        }
      },
    );
  });
};

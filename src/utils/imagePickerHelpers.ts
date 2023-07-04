import {PERMISSIONS} from 'react-native-permissions';
import ImageCropPicker, {Options} from 'react-native-image-crop-picker';
import DocumentPicker, {
  DocumentPickerOptions,
} from 'react-native-document-picker';
import {askMultipleAndroidPermissions} from './helper';

/**
 * Opens the picker (Camera / Gallery) to select image
 *
 * @param {boolean} camera
 */
export const openPicker = async (
  gallery: string,
  includeBase64 = true,
  multiple = false,
  cropping = true,
  type = 'photo',
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  const config: Options = {
    width: 400,
    height: 400,
    cropping,
    includeBase64,
    mediaType: type === 'video' ? 'video' : 'photo',
    freeStyleCropEnabled: true,
    compressImageMaxHeight: 400,
    compressImageMaxWidth: 400,
    cropperCircleOverlay: false,
    multiple,
  };
  let result = null;
  try {
    if (gallery === 'file') {
      console.log('file');
      result = await ImageCropPicker.openPicker(config);
    } else {
      console.log('camera');
      result = await ImageCropPicker.openCamera(config);
    }
  } catch (error: any) {
    result = null;
  }
  return result;
};

export const extractFileNameFromUri = (uri: string) => {
  const uriArr = uri.split('/');
  return uriArr[uriArr.length - 1];
};

export const extractExtFromName = (name: string) => {
  const uriArr = name.split('.');
  return uriArr[uriArr.length - 1];
};

export const uploadDocument = async (
  options: DocumentPickerOptions<'android' | 'ios' | 'windows'> = {
    type: [DocumentPicker.types.images],
  },
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  try {
    const res = await DocumentPicker.pick({
      ...options,
      copyTo: 'documentDirectory',
    });
    return res;
  } catch (err: any) {
    if (!DocumentPicker.isCancel(err)) {
      throw err;
    }
  }
};

export const uploadMultipleDocuments = async (
  options: DocumentPickerOptions<'android' | 'ios' | 'windows'>,
) => {
  await askMultipleAndroidPermissions([
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ]);
  try {
    const res = await DocumentPicker.pickSingle({
      ...options,
      copyTo: 'documentDirectory',
    });

    return res;
  } catch (err: any) {
    if (!DocumentPicker.isCancel(err)) {
      throw err;
    }
  }
};

import React, {useRef} from 'react';
import {Platform, Pressable, Text, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../utils/colors';
import {
  extractExtFromName,
  extractFileNameFromUri,
  openPicker,
  uploadDocument,
  uploadMultipleDocuments,
} from '../utils/imagePickerHelpers';
import {contentCenter} from '../utils/styles';
import Snackbar from 'react-native-snackbar';
import {ImagePickerProps} from '../types/propsTypes';

export default function ImagePicker(props: ImagePickerProps) {
  const modalRef = useRef<Modal>(null);

  const {
    isOpen,
    onClose,
    title,
    multiple,
    onSaveImage,
    type,
    fileTypes = {
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    },
    videoTypes = {
      type: [DocumentPicker.types.video],
    },
    size = 10000000,
    position = 'bottom',
  } = props;

  const options = [
    {
      title: 'Camera',
      icon: 'camera',
      onPress: () => openGalleryOrCamera(true),
    },
    {
      title: 'Files',
      icon: 'image-multiple',
      onPress: () => openGalleryOrCamera(false),
    },
  ];

  function validatateExtension(name: string) {
    const exts = name.match(/\.(.+)$/);

    if (exts && exts.length > 0) {
      const ext = exts[1];

      // Reject if ext still contain a dot (which is implemented as part of the double extension prevention)
      if (ext.indexOf('.') !== -1) {
        return false;
      }

      return true;
    }

    return true;
  }

  async function openGalleryOrCamera(camera: boolean = false) {
    let result = [];
    try {
      let res: any = null;
      let fileError: string | undefined;
      if (camera) {
        res = await openPicker(camera, false, multiple, false, type);

        if (res) {
          if (
            !validatateExtension(
              res.filename || extractFileNameFromUri(res.path),
            )
          ) {
            fileError = 'File type is invalid';
          } else if (
            extractExtFromName(
              res.filename || extractFileNameFromUri(res.path),
            ) === 'svg'
          ) {
            fileError = 'SVG is not valid file type!';
          } else if (res.size > size) {
            // File should not be greater than 10MB
            // 10MB = 1,00,00,000 Bytes
            fileError = 'File size cannot be more than 10 MB';
          } else {
            console.log('====>', res);

            result.push({
              name: res.filename || extractFileNameFromUri(res.path),
              size: res.size,
              type: res.mime,
              uri: res.path,
            });
          }
        }
      } else {
        console.log('andarrrr');
        console.log(fileTypes);

        res = await (multiple
          ? uploadMultipleDocuments(fileTypes)
          : uploadDocument(type === 'video' ? videoTypes : fileTypes));

        if (res) {
          console.log(res);
          // If documents are multiple
          if (Array.isArray(res)) {
            res.map(async el => {
              el.fileCopyUri =
                (Platform.OS === 'android' ? 'file://' : '') + el.fileCopyUri;
              console.log(el);
              if (!validatateExtension(el.name || res.filename)) {
                fileError = 'File type is invalid';
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path),
                ) === 'svg'
              ) {
                fileError = 'SVG is not valid file type!';
              } else if (
                extractExtFromName(
                  el.name || res.filename || extractFileNameFromUri(el.path),
                ) === 'gif'
              ) {
                fileError = 'Gif is not valid file type!';
              } else if (el.size > size) {
                // File should not be greater than 10MB
                // 10MB = 1,00,00,000 Bytes
                fileError = 'File size cannot be more than 10 MB';
              } else {
                result.push({
                  name: el.name || extractFileNameFromUri(el.fileCopyUri),
                  size: el.size || 0,
                  type: el.type || '',
                  uri: el.fileCopyUri,
                });
              }
            });
          } else {
            if (!validatateExtension(extractExtFromName(res.filename))) {
              fileError = 'File type is invalid';
            } else if (extractExtFromName(res.filename)) {
              fileError = 'SVG is not valid file type!';
            } else if (res.size <= size) {
              // File should not be greater than 10MB
              // 10MB = 1,00,00,000 Bytes

              res.fileCopyUri = 'file://' + res.fileCopyUri;
              console.log('==>', res);

              result.push({
                name: res.name || extractFileNameFromUri(res.fileCopyUri),
                size: res.size,
                type: res.type,
                uri: res.fileCopyUri,
              });
            } else {
              fileError = 'File size cannot be more than 10 MB';
            }
          }

          fileError &&
            Snackbar.show({
              text: fileError,
              backgroundColor: 'red',
              duration: Snackbar.LENGTH_SHORT,
            });
        }
      }
    } catch (error) {
    } finally {
      onSaveImage(result);
      modalRef.current?.close();
    }
  }

  return (
    <Modal
      backButtonClose={true}
      ref={modalRef}
      swipeToClose={false}
      backdrop={true}
      position={position}
      isOpen={isOpen}
      onClosed={onClose}
      style={styles.container}>
      <View style={styles.dialog}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          {options.map((el, i) => {
            return (
              <Pressable
                onPress={() => el.onPress()}
                key={i}
                style={styles.option}>
                <View style={styles.icon}>
                  <Icon color="white" size={20} name={el.icon} />
                </View>
                <Text>{el.title}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = EStyleSheet.create({
  container: {
    height: 'auto',
  },
  dialog: {
    backgroundColor: '#FFF',
    borderTopRightRadius: '0.8rem',
    borderTopLeftRadius: '0.8rem',
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.8rem',
    fontFamily: 'Roboto-Medium',
    marginBottom: '1rem',
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '1rem',
  },
  option: {
    ...contentCenter,
    padding: '1rem',
    paddingHorizontal: '3rem',
    marginRight: '1rem',
  },
  icon: {
    backgroundColor: colors.primary,
    padding: '1rem',
    borderRadius: '10rem',
    marginBottom: '1rem',
  },
});

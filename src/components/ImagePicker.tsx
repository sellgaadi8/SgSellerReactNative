import React, {useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import {
  extractExtFromName,
  extractFileNameFromUri,
  openPicker,
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
    // fileTypes = {
    //   type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    // },
    // videoTypes = {
    //   type: [DocumentPicker.types.video],
    // },
    size = 20000000,
    position = 'bottom',
  } = props;

  const options = [
    {
      title: 'Camera',
      icon: 'camera',
      onPress: () => openGalleryOrCamera('camera'),
    },
    {
      title: 'Files',
      icon: 'image-multiple',
      onPress: () => openGalleryOrCamera('file'),
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

  async function openGalleryOrCamera(gallery: string) {
    let result = [];
    try {
      let res: any = null;
      let fileError: string | undefined;
      res = await openPicker(gallery, false, multiple, false, type);
      if (res) {
        if (
          !validatateExtension(res.filename || extractFileNameFromUri(res.path))
        ) {
          fileError = 'File type is invalid';
        } else if (
          extractExtFromName(
            res.filename || extractFileNameFromUri(res.path),
          ) === 'svg'
        ) {
          fileError = 'SVG is not valid file type!';
        } else if (
          extractExtFromName(
            res.filename || extractFileNameFromUri(res.path),
          ) === 'gif'
        ) {
          fileError = 'SVG is not valid file type!';
        } else if (res.size > size) {
          // File should not be greater than 10MB
          // 10MB = 1,00,00,000 Bytes
          fileError = 'File size cannot be more than 10 MB';
        } else {
          result.push({
            name: res.filename || extractFileNameFromUri(res.path).trim(),
            size: res.size,
            type: res.mime,
            uri: res.path,
          });
        }
      }
      fileError &&
        Snackbar.show({
          text: fileError,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
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

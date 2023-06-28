import {Image, Pressable} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TyresImagesProps} from '../types/propsTypes';
import Video from 'react-native-video';

export default function PopulateImageWithData({
  title,
  value,
  image,
  video,
  onPressImage,
}: TyresImagesProps) {
  return (
    <Box style={value && styles.title}>
      {value && (
        <>
          <Box style={!image && styles.row}>
            <CustomText style={styles.dataValue}>{title}</CustomText>
            <CustomText style={styles.value}>{value}</CustomText>
          </Box>
          {!image?.includes('mp4') ? (
            <Pressable onPress={onPressImage}>
              {image && <Image source={{uri: image}} style={styles.image} />}
            </Pressable>
          ) : (
            <Pressable onPress={onPressImage}>
              <Video
                source={{
                  uri: 'https://sellgaadi.s3.ap-south-1.amazonaws.com/engine-images/1687978780SampleVideo_1280x720_1mb.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDZS7NNQ755OGW5Z%2F20230628%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230628T190005Z&X-Amz-SignedHeaders=host&X-Amz-Expires=172800&X-Amz-Signature=a6f8d3b57f49632f9ac0277b7812a04f2fbb4c9b58b9dc03e0787600d67ac80e',
                }}
                style={styles.images}
                resizeMode="cover"
                paused={false}
                repeat={true}
              />
            </Pressable>
          )}
          {/* {video && (
            <Pressable onPress={onPressImage} style={{borderWidth: 1}}>
              <Video
                source={{uri: video}}
                style={styles.images}
                resizeMode="cover"
                paused={false}
                repeat={true}
              />
            </Pressable>
          )} */}
        </>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: '3%',
  },
  dataValue: {
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    lineHeight: 22,
    fontSize: 15,
  },
  value: {
    fontFamily: 'Roboto-Bold',
    color: '#34A02C',
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  image: {height: 50, width: 50},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: '2%',
    alignSelf: 'center',
  },
});

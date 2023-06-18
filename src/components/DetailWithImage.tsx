import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {DetailWithImageProps} from '../types/propsTypes';

export default function DetailWithImage({
  title,
  image,
  value,
}: DetailWithImageProps) {
  return (
    <Box style={styles.title}>
      <CustomText style={image ? styles.value : styles.dataValue}>
        {title}
      </CustomText>

      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      ) : (
        <CustomText style={styles.value}>{value}</CustomText>
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
});

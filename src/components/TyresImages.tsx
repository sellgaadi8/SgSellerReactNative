import {Image} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TyresImagesProps} from '../types/propsTypes';

export default function TyresImages({title, value, image}: TyresImagesProps) {
  return (
    <Box style={value && styles.title}>
      {value && (
        <>
          <Box>
            <CustomText style={styles.dataValue}>{title}</CustomText>
            <CustomText style={styles.value}>{value}</CustomText>
          </Box>
          {image && <Image source={{uri: image}} style={styles.image} />}
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
});

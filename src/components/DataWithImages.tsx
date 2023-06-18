import {Image} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {DataWithImagesProps} from '../types/propsTypes';

export default function DataWithImages({
  okValues,
  notokValues,
}: DataWithImagesProps) {
  return (
    <Box>
      <CustomText style={styles.vehicleHeading}>Exterior</CustomText>
      <CustomText style={styles.value}>
        {okValues &&
          Object.keys(okValues)
            .map(el => {
              return el
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            })
            .join(', ')}
      </CustomText>
      {notokValues &&
        Object.entries(notokValues).map((el, index) => {
          return (
            <Box style={styles.title} key={index.toString()}>
              <Box>
                {
                  <CustomText style={styles.dataValue} key={index.toString()}>
                    {el[0]
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </CustomText>
                }
              </Box>
              {!el[1]?.includes('https') && (
                <CustomText style={styles.value}>{el[1]}</CustomText>
              )}
              {el[1]?.includes('https') && (
                <Image source={{uri: el[1]}} style={styles.image} />
              )}
            </Box>
          );
        })}
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
  vehicleHeading: {
    color: '#B92864',
    fontFamily: 'Roboto-Bold',
    lineHeight: 26,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
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

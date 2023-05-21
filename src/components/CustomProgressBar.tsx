/* eslint-disable react-native/no-inline-styles */
import {Image, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Box from './Box';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CustomProgressBarProps} from '../types/propsTypes';

export default function CustomProgressBar({progress}: CustomProgressBarProps) {
  const n = 11;
  return (
    <Box>
      <View
        style={[
          styles.percentage,
          {
            width: `${progress < 6 ? 5 : progress}%`,
          },
        ]}>
        <Image source={require('../assets/Shape.png')} style={styles.shape} />

        <Text
          style={[
            styles.percentageCount,
            {left: progress < 6 ? 2 : progress === 100 ? 8 : 5},
          ]}>
          {progress}%
        </Text>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      </View>

      <Box style={styles.container}>
        <View style={[styles.progress, {width: `${progress}%`}]}>
          {Array(n).fill(
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    progress !== 0 && progress !== 100
                      ? '#111111'
                      : 'transparent',
                },
              ]}
            />,
          )}
        </View>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    height: '0.4rem',
    width: '100%',
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
    borderRadius: 10,
    marginTop: 20,
  },
  progress: {
    height: '0.4rem',
    backgroundColor: '#EFC24F',
    borderRadius: 10,
    flexDirection: 'row',
  },
  dot: {
    height: '0.26rem',
    width: '0.26rem',
    borderRadius: '1rem',
    backgroundColor: '#49454F',
    marginHorizontal: wp('4.2%'),
    right: 16,
    top: 1,
  },
  percentage: {
    // position: 'absolute',
    bottom: 20,
    left: 0,
  },
  shape: {
    alignSelf: 'flex-end',
    top: 32,
    left: 10,
    height: 42,
    width: 35,
  },
  percentageCount: {
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 16,
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    // left: 5,
  },
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    position: 'absolute',
    top: 87,
    right: -5,
    alignSelf: 'flex-end',
    backgroundColor: '#EFC24F',
  },
  innerCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(103, 80, 164, 0.08)',
  },
});

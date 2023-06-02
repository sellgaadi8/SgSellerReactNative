import {Text, Pressable} from 'react-native';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';

import {AddVehicleCardProps} from '../types/propsTypes';

export default function AddVehicleCard({
  fill,
  title,
  desc,
  onComplete,
  isStep1Complete,
}: AddVehicleCardProps) {
  return (
    <Box style={styles.card}>
      <Box width={'80%'}>
        <CustomText
          fontFamily="Roboto-Bold"
          fontSize={16}
          lineHeight={24}
          color="#1C1B1F">
          {title}
        </CustomText>
        {desc.length !== 0 && (
          <CustomText
            fontFamily="Roboto-Regular"
            fontSize={14}
            lineHeight={20}
            color="#49454F">
            {desc}
          </CustomText>
        )}
        <Pressable
          style={styles.textButton}
          onPress={onComplete}
          disabled={isStep1Complete}>
          <CustomText
            fontFamily="Roboto-Medium"
            fontSize={14}
            lineHeight={20}
            color="#EFC24F">
            Complete now
          </CustomText>
        </Pressable>
      </Box>
      <AnimatedCircularProgress
        size={45}
        width={7}
        fill={fill}
        tintColor="#EFC24F">
        {fills => <Text style={styles.fillText}>{fills}%</Text>}
      </AnimatedCircularProgress>
    </Box>
  );
}

const styles = EStyleSheet.create({
  card: {
    marginTop: '3rem',
    padding: '2.5rem',
    backgroundColor: '#F5F5F5',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    marginTop: 10,
  },
  progress: {
    margin: 10,
  },
  fillText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#49454F',
    fontFamily: 'Roboto-Regular',
  },
});

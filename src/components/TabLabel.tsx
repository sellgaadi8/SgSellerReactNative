/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TabLabelProps} from '../types/propsTypes';
import colors from '../utils/colors';
import CustomText from './CustomText';

export default function TabLabel({value, focused}: TabLabelProps) {
  return (
    <CustomText
      fontSize={12}
      lineHieght={16}
      //   fontFamily="Roboto-Regular"
      color={focused ? '#000000' : 'rgba(157, 157, 157, 0.8)'}
      style={[{top: -5, marginBottom: 5}, focused && styles.active]}>
      {value}
    </CustomText>
  );
}

const styles = EStyleSheet.create({
  active: {color: colors.primary},
});

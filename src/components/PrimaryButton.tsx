import {Pressable} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import CustomText from './CustomText';
import {PrimaryButtonProps} from '../types/propsTypes';

export default function PrimaryButton({label, onPress}: PrimaryButtonProps) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <CustomText
        fontSize={14}
        color="Black"
        fontFamily="Roboto-Bold"
        lineHeight={20}
        style={styles.label}>
        {label}
      </CustomText>
    </Pressable>
  );
}

const styles = EStyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    backgroundColor: colors.secondary,
    width: '100%',
    padding: '1rem',
    borderRadius: '2rem',
    ...contentCenter,
  },
  label: {
    textTransform: 'uppercase',
  },
});

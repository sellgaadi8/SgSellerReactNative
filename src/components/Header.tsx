import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import {HeaderProps} from '../types/propsTypes';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';

export default function Header({title}: HeaderProps) {
  return (
    <Box style={styles.container}>
      <CustomText
        color="White"
        fontSize={22}
        lineHeight={28}
        fontFamily="Roboto-Bold">
        {title}
      </CustomText>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: '2rem',
    ...contentCenter,
  },
});

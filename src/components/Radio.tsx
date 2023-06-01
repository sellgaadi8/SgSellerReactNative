/* eslint-disable react-native/no-inline-styles */
import {Pressable} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioProps} from '../types/propsTypes';
import Box from './Box';

export default function Radio({
  title,
  handleOptionSelect,
  selectedOption,
}: RadioProps) {
  const renderRadioButton = (option: string) => (
    <Pressable
      style={styles.optionButton}
      onPress={() => handleOptionSelect(option)}>
      <Icon
        name={selectedOption === option ? 'radiobox-marked' : 'radiobox-blank'}
        size={20}
        color={selectedOption === option ? colors.secondary : '#7F747C'}
        style={{marginRight: 5}}
      />
      <CustomText style={styles.radiotext}>{option}</CustomText>
    </Pressable>
  );
  return (
    <Box pv={'2%'}>
      <CustomText
        fontSize={14}
        lineHeight={28}
        fontFamily="Roboto-Medium"
        color="#111111">
        {title}
      </CustomText>
      <Box flexDirection="row">
        {renderRadioButton('Yes')}
        {renderRadioButton('No')}
      </Box>
    </Box>
  );
}
const styles = EStyleSheet.create({
  optionButton: {
    marginTop: '0.5rem',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '2rem',
  },
});

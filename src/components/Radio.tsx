/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, Text} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioProps} from '../types/propsTypes';
import Box from './Box';
import {contentCenter} from '../utils/styles';

export default function Radio({
  title,
  handleOptionSelect,
  selectedOption,
  isMandatory,
  selectPhoto,
  onPressCamera,
  isImage = false,
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
        {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </CustomText>
      <Box flexDirection="row">
        {renderRadioButton('Yes')}
        {renderRadioButton('No')}
        {isImage && selectedOption === 'Yes' && (
          <Pressable style={[styles.upload]} onPress={onPressCamera}>
            {selectPhoto && selectPhoto.length !== 0 ? (
              <Image
                source={{uri: selectPhoto}}
                style={{height: 50, width: 105, borderRadius: 8}}
                resizeMode="cover"
              />
            ) : (
              <>
                <Box flexDirection="row">
                  <Icon name="camera" size={20} color="#111111" />
                  {isMandatory && (
                    <Text
                      style={{
                        color: 'red',
                        position: 'absolute',
                        right: -12,
                        top: -10,
                      }}>
                      *
                    </Text>
                  )}
                </Box>
              </>
            )}
          </Pressable>
        )}
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
  upload: {
    borderRadius: 4,
    top: 2,
    ...contentCenter,
    padding: 3,
    backgroundColor: colors.secondary,
    marginLeft: 5,
  },
});

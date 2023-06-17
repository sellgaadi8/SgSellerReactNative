/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {RadioButtonsProps} from '../types/propsTypes';
import Box from './Box';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import Video from 'react-native-video';

export default function RadioButtons({
  data,
  onSelect,
  label,
  isMandatory,
  isImage = false,
  selectPhoto,
  onPressCamera,
  selectValue,
  error,
}: RadioButtonsProps) {
  const [userOption, setUserOption] = useState('');

  useEffect(() => {
    setUserOption(selectValue);
  }, [selectValue]);

  const selectHandler = (label: string, value: string) => {
    onSelect(label, value);
    setUserOption(value);
  };
  return (
    <Box pv={'4%'}>
      <CustomText
        fontSize={15}
        lineHeight={18}
        color="#111111"
        fontFamily="Roboto-Medium">
        {label} {isMandatory && <Text style={{color: 'red'}}>*</Text>}
      </CustomText>
      <Box flexDirection="row">
        {data.map(item => {
          return (
            <Pressable
              style={styles.body}
              onPress={() => selectHandler(item.label, item.value)}>
              <Icon
                name={
                  item.value === userOption
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={20}
                color={item.value === userOption ? colors.secondary : '#7F747C'}
                style={{marginRight: 3}}
              />
              <CustomText
                fontSize={13}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {item.label}
              </CustomText>
            </Pressable>
          );
        })}
        {isImage && userOption === 'yes' && (
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
        {isImage && userOption === 'leakage' && (
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
        {isImage && userOption === 'not_ok' && (
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

        {isImage && userOption === 'major_sound' && (
          <Pressable style={[styles.upload]} onPress={onPressCamera}>
            {selectPhoto && selectPhoto.length !== 0 ? (
              // <Image
              //   source={{uri: selectPhoto}}
              //   style={{height: 50, width: 105, borderRadius: 8}}
              //   resizeMode="cover"
              // />
              <Video
                source={{uri: selectPhoto}}
                paused={false}
                style={{height: 50, width: 105, borderRadius: 8}}
                repeat={true}
              />
            ) : (
              <>
                <Box flexDirection="row">
                  <Icon name="video" size={20} color="#111111" />
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
      {isImage &&
        (userOption === 'black_smoke' || userOption === 'white_smoke') && (
          <Pressable
            style={[styles.upload, {width: 110, right: 5, top: 10}]}
            onPress={onPressCamera}>
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
      {error && (
        <CustomText fontSize={12} style={[styles.error]}>
          {error}
        </CustomText>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  body: {
    marginTop: '1rem',
    flexDirection: 'row',
    marginRight: 10,
    ...contentCenter,
  },
  upload: {
    borderRadius: 4,
    top: 5,
    ...contentCenter,
    padding: 3,
    backgroundColor: colors.secondary,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    top: 5,
  },
});

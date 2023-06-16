/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  ActionSheetIOS,
  Appearance,
  Image,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomText from './CustomText';
import Box from './Box';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {contentCenter} from '../utils/styles';

type BasePickerProps = {
  selectedValue?: any;
  onValueChange?: (itemValue: any, itemIndex: any) => void;
  data: {label: string; value: string; enabled?: boolean}[];
  enabled?: boolean;
  title: string;
  onPressCamera?: () => void;
  selectPhoto?: string;
};

export default function BasePicker({
  onValueChange,
  selectedValue,
  data,
  enabled = true,
  title,
  onPressCamera,
  selectPhoto,
}: BasePickerProps) {
  function onOpenSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...data.map(el => el.label)],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: Appearance.getColorScheme() || 'light',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          return;
        }
        onValueChange &&
          onValueChange(data[buttonIndex - 1].value, buttonIndex - 1);
      },
    );
  }

  return (
    <Box pv={'2%'}>
      <CustomText
        fontSize={14}
        lineHeight={28}
        fontFamily="Roboto-Medium"
        color="#111111">
        {title}
      </CustomText>
      <Box flexDirection="row" alignItems="center">
        <Box
          style={[
            styles.pickerContainer,
            {
              width:
                selectedValue !== ''
                  ? selectedValue !== 'Ok'
                    ? '65%'
                    : '100%'
                  : '100%',
            },
          ]}>
          {Platform.OS === 'ios' ? (
            <TouchableOpacity disabled={!enabled} onPress={onOpenSheet}>
              <View style={styles.container}>
                <CustomText color={enabled ? undefined : '#5D5D5D'}>
                  {isNaN(Number(selectedValue))
                    ? selectedValue
                    : data[selectedValue].label}
                </CustomText>
              </View>
            </TouchableOpacity>
          ) : (
            <Picker
              enabled={enabled}
              style={styles.picker}
              onValueChange={onValueChange}
              selectedValue={selectedValue}>
              {/* <Picker.Item value="" label="Select" /> */}
              {data.map((el, index) => {
                return (
                  <Picker.Item
                    style={styles.item}
                    key={index}
                    label={el.label}
                    value={el.value}
                    enabled={el.enabled === undefined ? true : el.enabled}
                  />
                );
              })}
            </Picker>
          )}
        </Box>
        {selectedValue !== 'Ok' &&
          selectedValue !== '' &&
          selectedValue !== null && (
            <Pressable
              style={[
                styles.upload,
                {
                  borderWidth:
                    selectPhoto && selectPhoto.length !== 0 ? 0 : 0.5,
                },
              ]}
              onPress={onPressCamera}>
              {selectPhoto && selectPhoto.length !== 0 ? (
                <Image
                  source={{uri: selectPhoto}}
                  style={{height: 50, width: 105, borderRadius: 8}}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Icon name="camera" size={20} color="#CACACA" />
                  <CustomText
                    fontSize={10}
                    fontFamily="Roboto-Regular"
                    color="#111111"
                    style={{textAlign: 'center'}}>
                    Upload {selectedValue} {'\n'} Image
                  </CustomText>
                </>
              )}
            </Pressable>
          )}
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {padding: '1rem'},
  picker: {width: '100%'},
  item: {fontSize: '1.4rem'},
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ACACAC',
    marginTop: 5,
  },
  upload: {
    paddingHorizontal: 10,
    width: '30%',
    left: 10,
    ...contentCenter,
    borderRadius: 8,
    paddingVertical: 2,
    top: 2,
  },
});

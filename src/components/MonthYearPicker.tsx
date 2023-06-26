import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Picker} from '@react-native-picker/picker';
import colors from '../utils/colors';
import {MonthYearPickerProps} from '../types/propsTypes';

export default function MonthYearPicker({
  onMonthChange,
  selectedMonth,
  onYearChange,
  selectedYear,
  months,
  years,
  onSubmitMonthYear,
  showYear = false,
}: MonthYearPickerProps) {
  console.log('componnet', years);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {!showYear && (
          <View>
            <Text style={styles.title}>Month</Text>
            <View style={styles.picker}>
              <Picker
                mode="dropdown"
                style={styles.pickerItemStyle}
                onValueChange={onMonthChange}
                selectedValue={selectedMonth}>
                {months.map((el, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      style={[styles.pickerItemStyle]}
                      label={el.label}
                      value={el.value}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        )}
        <View>
          <Text style={styles.title}>Year</Text>
          <View style={styles.picker}>
            <Picker
              mode="dropdown"
              style={styles.pickerItemStyle}
              onValueChange={onYearChange}
              selectedValue={selectedYear}>
              {years.map((el, index) => {
                return (
                  <Picker.Item
                    key={index}
                    style={[styles.pickerItemStyle]}
                    label={el}
                    value={el}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={onSubmitMonthYear}
        style={styles.button}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <View style={styles.button}>
        <PrimaryButton title="Submit" onPress={onSubmitMonthYear} />
      </View> */}
    </View>
  );
}

const styles = EStyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '3rem',
  },
  picker: {
    backgroundColor: '#EEEEEE',
    borderColor: '#CCCCCC',
    borderWidth: 2,
    borderRadius: '0.3rem',
    width: '13rem',
    height: '4rem',
    justifyContent: 'center',
  },
  // button: {
  //   marginTop: '2rem',
  //   marginBottom: '1rem',
  // },
  title: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
    fontSize: '1.6rem',
    lineHeight: '3rem',
  },
  button: {
    backgroundColor: colors.primary,
    padding: '1rem',
    paddingHorizontal: '1.5rem',
    borderRadius: '0.5rem',
    bottom: 0,
    alignSelf: 'center',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    color: colors.White,
  },
});

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {container} from '../../utils/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ProfileInput from '../../components/ProfileInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';
import {Pressable} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import PrimaryButton from '../../components/PrimaryButton';
import {DisplayInfoProps} from '../../types/propsTypes';

export default function DisplayInfo({navigation}: DisplayInfoProps) {
  const [make, setMake] = useState('');
  const [modal, setModal] = useState('');
  const [varaint, setVariant] = useState('');
  const [year, setYear] = useState('');
  const [run, setRun] = useState('');
  const [owners, setOwners] = useState('');

  const [fuelType, setFuelType] = useState([
    {id: 1, title: 'Petrol', selected: false},
    {id: 2, title: 'Diesel', selected: false},
    {id: 3, title: 'CNG', selected: false},
  ]);

  function onPressCheckbox(id: number) {
    setFuelType(prevState =>
      prevState.map(fuelType =>
        fuelType.id === id
          ? {...fuelType, selected: !fuelType.selected}
          : fuelType,
      ),
    );
  }

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 1: Display info
        </CustomText>
        <Box pv={'5%'}>
          <ProfileInput label="Make" value={make} onChangeText={setMake} />
          <ProfileInput label="Model" value={modal} onChangeText={setModal} />
          <ProfileInput
            label="Variant"
            value={varaint}
            onChangeText={setVariant}
          />
          <ProfileInput
            label="Year of manufacture"
            value={year}
            onChangeText={setYear}
          />
          <Box style={styles.checkbox}>
            <CustomText
              fontSize={14}
              lineHeight={28}
              color="#111111"
              fontFamily="Roboto-Medium">
              Fuel Type
            </CustomText>
            <Box style={[styles.checkboxWrap]}>
              {fuelType.map((el, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    style={[styles.checkboxPress]}
                    onPress={() => onPressCheckbox(el.id)}>
                    <Icon
                      name={
                        el.selected
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
                      size={20}
                      color={el.selected ? colors.secondary : '#111111'}
                    />
                    <CustomText
                      color="#1C1B1F"
                      fontFamily="Roboto-Regular"
                      fontSize={16}
                      lineHeight={24}
                      style={{left: 10}}>
                      {el.title}
                    </CustomText>
                  </Pressable>
                );
              })}
            </Box>
          </Box>

          <ProfileInput label="Run in km" value={run} onChangeText={setRun} />
          <ProfileInput
            label="No. of owners"
            value={owners}
            onChangeText={setOwners}
          />
        </Box>
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Discard"
              onPress={() => navigation.goBack()}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton label="Save" onPress={() => console.log('test')} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  onScroll: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  checkbox: {
    marginTop: -5,
    marginBottom: 20,
  },
  checkboxImg: {
    height: pixelSizeVertical(40),
    width: pixelSizeHorizontal(40),
  },
  checkboxCon: {
    height: pixelSizeVertical(18),
    width: pixelSizeHorizontal(18),
  },
  checkboxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    top: -5,
  },
  checkboxPress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
  },
});

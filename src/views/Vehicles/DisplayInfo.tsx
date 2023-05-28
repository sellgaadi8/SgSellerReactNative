/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {createDisplayForm} from '../../redux/ducks/createDisplayInfo';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {getDisplayInfo} from '../../redux/ducks/editDisplayInfo';
import Loader from '../../components/Loader';

export default function DisplayInfo({navigation}: DisplayInfoProps) {
  const [make, setMake] = useState('');
  const [modal, setModal] = useState('');
  const [varaint, setVariant] = useState('');
  const [year, setYear] = useState('');
  const [run, setRun] = useState('');
  const [owners, setOwners] = useState('');
  const [registration, setRegistration] = useState('');
  const [transmission, setTransmission] = useState('');
  const [color, setColor] = useState('');
  const [fuel, setFeul] = useState('');
  const [errors, setErrors] = useState<DisplayErrors>();
  const selectCreateDisplay = useAppSelector(state => state.createDisplayInfo);
  const selectGetDisplay = useAppSelector(state => state.editDisplayInfo);
  const [from, setFrom] = useState('Add');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<any>();

  const [fuelType, setFuelType] = useState([
    {id: 'petrol', title: 'Petrol', selected: false},
    {id: 'diesel', title: 'Diesel', selected: false},
    {id: 'cng', title: 'CNG', selected: false},
  ]);

  const [transmissionType, setTransmissionType] = useState([
    {id: 'MT', title: 'MT', selected: false},
    {id: 'AT', title: 'AT', selected: false},
    {id: 'CVT', title: 'CVT', selected: false},
    {id: 'DSG', title: 'DSG', selected: false},
  ]);

  function onPressCheckbox(id: string) {
    setFeul(id);
    const updatedFuelType = fuelType.map(type => ({
      ...type,
      selected: type.id === id,
    }));

    setFuelType(updatedFuelType);
  }

  function onPressTransmissionCheckBox(id: string) {
    setTransmission(id);
    const updatedTransmissionType = transmissionType.map(type => ({
      ...type,
      selected: type.id === id,
    }));

    setTransmissionType(updatedTransmissionType);
  }

  useEffect(() => {
    if (from === 'Edit') {
      setLoading(true);
      dispatch(getDisplayInfo('526adc07-78d8-4504-b793-d7582e3ced3a'));
    }
  }, []);

  function validateInputs() {
    const tempErrors: DisplayErrors = {};

    if (make.length === 0) {
      tempErrors.make = 'The make field is required.';
    }
    if (modal.length === 0) {
      tempErrors.modal = 'The modal field is required.';
    }
    if (varaint.length === 0) {
      tempErrors.varaint = 'The variant field is required.';
    }
    if (year.length === 0) {
      tempErrors.year = 'The year field is required.';
    }
    if (run.length === 0) {
      tempErrors.run = 'The run field is required.';
    }
    if (owners.length === 0) {
      tempErrors.owners = 'The owners field is required.';
    }
    if (registration.length === 0) {
      tempErrors.registration = 'The registration field is required.';
    }
    if (transmission.length === 0) {
      tempErrors.transmission = 'The transmission field is required.';
    }
    if (color.length === 0) {
      tempErrors.color = 'The color field is required.';
    }

    if (fuel.length === 0) {
      Snackbar.show({
        text: 'Select fuel type',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function submit() {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(
        createDisplayForm(
          make,
          modal,
          varaint,
          year,
          registration,
          transmission,
          color,
          fuel,
          run,
          owners,
        ),
      );
    }
  }

  useEffect(() => {
    if (selectCreateDisplay.called) {
      setLoading(false);
      const {message, success} = selectCreateDisplay;
      if (success && message) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetDisplay.called) {
      setLoading(false);
      const {data, error} = selectGetDisplay;
      if (!error && data) {
        setMake(data.make);
        setModal(data.model);
        setVariant(data.variant);
        setYear(data.mfg_year);
        setRegistration(data.reg_date);
        setTransmission(data.transmission);
        const updatedTransmissionType = transmissionType.map(type => ({
          ...type,
          selected: type.id === data.transmission,
        }));

        setTransmissionType(updatedTransmissionType);
        setColor(data.color);
        setFeul(data.fuel_type);
        setRun(data.no_of_kms);
        setOwners(data.no_of_owners);
        const updatedFuelType = fuelType.map(type => ({
          ...type,
          selected: type.id === data.fuel_type,
        }));

        setFuelType(updatedFuelType);
      }
    }
  }, [selectCreateDisplay, selectGetDisplay]);

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 1: Display info
        </CustomText>
        <Box pv={'5%'}>
          <ProfileInput
            label="Make"
            value={make}
            onChangeText={setMake}
            error={errors?.make}
            noMargin
          />
          <ProfileInput
            label="Model"
            value={modal}
            onChangeText={setModal}
            error={errors?.modal}
            noMargin
          />
          <ProfileInput
            label="Variant"
            value={varaint}
            onChangeText={setVariant}
            error={errors?.varaint}
            noMargin
          />
          <ProfileInput
            label="Year of manufacture"
            value={year}
            onChangeText={setYear}
            error={errors?.year}
            noMargin
            // endIcon="calendar-month"F
          />
          <ProfileInput
            label="Registration date"
            value={registration}
            onChangeText={setRegistration}
            error={errors?.registration}
            noMargin
            // endIcon="calendar-month"
          />
          <Box style={styles.checkbox}>
            <CustomText
              fontSize={14}
              lineHeight={28}
              color="#111111"
              fontFamily="Roboto-Regular">
              Transmission
            </CustomText>
            <Box style={[styles.checkboxWrap]}>
              {transmissionType.map((el, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    style={[styles.checkboxPress]}
                    onPress={() => onPressTransmissionCheckBox(el.id)}>
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
          <ProfileInput
            label="Color"
            value={color}
            onChangeText={setColor}
            error={errors?.color}
            noMargin
          />
          <Box style={styles.checkbox}>
            <CustomText
              fontSize={14}
              lineHeight={28}
              color="#111111"
              fontFamily="Roboto-Regular">
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

          <ProfileInput
            label="Run in km"
            value={run}
            onChangeText={setRun}
            error={errors?.run}
            noMargin
          />
          <ProfileInput
            label="No. of owners"
            value={owners}
            onChangeText={setOwners}
            error={errors?.owners}
            noMargin
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
            <PrimaryButton label="Save" onPress={submit} />
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

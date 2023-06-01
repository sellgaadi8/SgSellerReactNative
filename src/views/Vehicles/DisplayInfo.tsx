/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
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
import {Dimensions, Pressable} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import PrimaryButton from '../../components/PrimaryButton';
import {DisplayInfoProps, ModalType} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {createDisplayForm} from '../../redux/ducks/createDisplayInfo';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {getDisplayInfo} from '../../redux/ducks/editDisplayInfo';
import Loader from '../../components/Loader';
import GlobalContext from '../../contexts/GlobalContext';
import {getMakeList} from '../../redux/ducks/getMake';
import Modal from 'react-native-modalbox';
import SearchModal from '../../components/SearchModal';
import {getModelList} from '../../redux/ducks/getModel';
import {getVariantList} from '../../redux/ducks/getVariant';
import {updateDisplayForm} from '../../redux/ducks/updateDisplayInfo';
const {height, width} = Dimensions.get('window');

export default function DisplayInfo({navigation, route}: DisplayInfoProps) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [varaint, setVariant] = useState('');
  const [year, setYear] = useState('');
  const [run, setRun] = useState('');
  const [owners, setOwners] = useState('');
  const [registration, setRegistration] = useState('');
  const [transmission, setTransmission] = useState('');
  const [color, setColor] = useState('');
  const [fuel, setFeul] = useState('');
  const [errors, setErrors] = useState<DisplayErrors>();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const {setVehicleId, vehicleId} = useContext(GlobalContext);
  const selectCreateDisplay = useAppSelector(state => state.createDisplayInfo);
  const selectGetDisplay = useAppSelector(state => state.editDisplayInfo);
  const selectMake = useAppSelector(state => state.getMake);
  const selectModel = useAppSelector(state => state.getModel);
  const selectVariant = useAppSelector(state => state.getVariant);
  const selectUpdateDisplay = useAppSelector(state => state.updateDisplayInfo);
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const [makeData, setMakeData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [variantData, setVariantData] = useState<string[]>([]);
  const [dataType, setDataType] = useState<ModalType>('Make');
  const [searchQuery, setSearchQuery] = useState('');

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
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(getDisplayInfo(vehicleId));
    }
    dispatch(getMakeList());
  }, []);

  function validateInputs() {
    const tempErrors: DisplayErrors = {};

    if (make.length === 0) {
      tempErrors.make = 'The make field is required.';
    }
    if (model.length === 0) {
      tempErrors.model = 'The model field is required.';
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
      if (route.params.from === 'add') {
        dispatch(
          createDisplayForm(
            make,
            model,
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
      } else {
        dispatch(
          updateDisplayForm(
            vehicleId,
            make,
            model,
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
  }

  useEffect(() => {
    if (selectCreateDisplay.called) {
      setLoading(false);
      const {message, success, uuid} = selectCreateDisplay;
      if (success && message && uuid) {
        setVehicleId(uuid);
        // navigation.navigate('AddVehicle', {from: 'edit'});
        navigation.goBack();
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
        setModel(data.model);
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
    if (selectMake.called) {
      const {error, data} = selectMake;
      if (!error && data) {
        setMakeData(data);
      }
    }
    if (selectModel.called) {
      const {error, data} = selectModel;
      if (!error && data) {
        setModelData(data);
      }
    }
    if (selectVariant.called) {
      const {error, data} = selectVariant;
      if (!error && data) {
        setVariantData(data);
      }
    }
    if (selectUpdateDisplay.called) {
      const {error, message} = selectUpdateDisplay;
      if (!error) {
        // navigation.navigate('AddVehicle', {from: 'edit'});
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [
    selectCreateDisplay,
    selectGetDisplay,
    selectMake,
    selectModel,
    selectVariant,
    selectUpdateDisplay,
  ]);

  function onCloseMakeModal() {
    setShowModal(false);
  }

  function onPressSelecteItem(data: string, modalType: ModalType) {
    switch (modalType) {
      case 'Make':
        setMake(data);
        dispatch(getModelList(data));
        setModel('');
        setVariant('');
        break;
      case 'Model':
        setModel(data);
        setVariant('');
        dispatch(getVariantList(make, data));
        break;
      case 'Variant':
        setVariant(data);
        break;
    }
    setShowModal(false);
  }

  function onOpenModal(modalType: ModalType) {
    switch (modalType) {
      case 'Make':
        setModalPlaceholder('Search Make...');
        setModalData(makeData);
        setDataType('Make');
        break;
      case 'Model':
        setModalPlaceholder('Search Model...');
        setModalData(modelData);
        setDataType('Model');
        break;
      case 'Variant':
        setModalPlaceholder('Search Variant...');
        setModalData(variantData);
        setDataType('Variant');
        break;
    }
    setShowModal(true);
  }

  function onPressDone() {
    switch (dataType) {
      case 'Make':
        setMake(searchQuery);
        setSearchQuery('');
        break;
      case 'Model':
        setModel(searchQuery);
        setSearchQuery('');
        break;
      case 'Variant':
        setVariant(searchQuery);
        break;
    }
    onCloseMakeModal();
  }

  function onChangeQuery(value: string) {
    const lowerCaseQuery = value.toLowerCase();

    let filteredModalData = modalData.filter(el => {
      const lowerCaseEl = el.toLowerCase();
      return lowerCaseEl.includes(lowerCaseQuery);
    });

    if (lowerCaseQuery === '' && dataType) {
      switch (dataType) {
        case 'Make':
          filteredModalData = makeData;
          break;
        case 'Model':
          filteredModalData = modelData;
          break;
        case 'Variant':
          filteredModalData = variantData;
          break;
        default:
          filteredModalData = modalData;
          break;
      }
    }

    setModalData(filteredModalData);
    setSearchQuery(value);
  }

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
          <Pressable onPress={() => onOpenModal('Make')}>
            <ProfileInput
              label="Make"
              value={make}
              onChangeText={setMake}
              error={errors?.make}
              noMargin
              editable={false}
            />
          </Pressable>
          <Pressable onPress={() => onOpenModal('Model')}>
            <ProfileInput
              label="Model"
              value={model}
              onChangeText={setModel}
              error={errors?.model}
              noMargin
              editable={false}
            />
          </Pressable>
          <Pressable onPress={() => onOpenModal('Variant')}>
            <ProfileInput
              label="Variant"
              value={varaint}
              onChangeText={setVariant}
              error={errors?.varaint}
              noMargin
              editable={false}
            />
          </Pressable>
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
            <PrimaryButton
              label={route.params.from === 'add' ? 'Save' : 'Update'}
              onPress={submit}
            />
          </Box>
        </Box>
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClosed={onCloseMakeModal}
        style={styles.modal}
        backButtonClose={true}
        backdrop={true}>
        <SearchModal
          placeholder={modalPlaceholder}
          data={modalData}
          onPressSelecteItem={onPressSelecteItem}
          dataType={dataType}
          query={searchQuery}
          onChangeText={onChangeQuery}
          onPressDone={onPressDone}
        />
      </Modal>
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
  modal: {
    backgroundColor: colors.primary,
    height: height * 0.7,
    width,
    paddingHorizontal: 0.3,
    borderRadius: '0.3rem',
    zIndex: 10,
  },
});

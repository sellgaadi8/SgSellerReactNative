/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../components/Box';

import colors from '../../utils/colors';
import {container, contentCenter} from '../../utils/styles';
import {useDispatch} from 'react-redux';
import {ModalType, VehiclesProps} from '../../types/propsTypes';
import VehicleCard from '../../components/VehicleCard';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import {useAppSelector} from '../../utils/hooks';
import CustomText from '../../components/CustomText';
import GlobalContext from '../../contexts/GlobalContext';
import Loader from '../../components/Loader';
import Modal from 'react-native-modalbox';
import ProfileInput from '../../components/ProfileInput';
import Calendar from '../../components/Calendar';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {formatDate} from '../../utils/helper';
import SearchModal from '../../components/SearchModal';
import {getModelList} from '../../redux/ducks/getModel';
import {getMakeList} from '../../redux/ducks/getMake';
import PrimaryButton from '../../components/PrimaryButton';
import CustomDropdown from '../../components/CustomDropDown';
import {StatusList} from '../../utils/constant';
import {onUpdateStatus} from '../../redux/ducks/updateStatus';
import Snackbar from 'react-native-snackbar';
import {isNameValid} from '../../utils/regex';
const {width, height} = Dimensions.get('window');

export default function Vehicles({navigation}: VehiclesProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vehicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const [showFilter, setShowFilter] = useState(false);
  const {setVehicleId} = useContext(GlobalContext);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calType, setCalType] = useState<'from' | 'to'>('from');
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [makeData, setMakeData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [modalData, setModalData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const selectModel = useAppSelector(state => state.getModel);
  const [dataType, setDataType] = useState<ModalType>('Make');
  const [showStatus, setShowStatus] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState('');
  const selectMake = useAppSelector(state => state.getMake);
  const [status, setStatus] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDropDownStatus, setSelectedDropDownStatus] = useState('');
  const Status = [
    {
      label: 'Select Staus',
      value: '-1',
    },
    {label: 'In auction', value: 'in_auction'},
    {label: 'One click buy', value: 'one_click_buy'},
  ];
  const [ocblow, setOcbLow] = useState('');
  const [ocbhigh, setOcbHigh] = useState('');
  const [loading, setLoading] = useState(false);
  const [askingPrice, setAskingPrice] = useState('');
  const {vehicleId} = useContext(GlobalContext);
  const [errors, setErrors] = useState<StatusErrors>();
  const selectVehicleStatus = useAppSelector(state => state.updateStatus);

  useEffect(() => {
    navigation.addListener('focus', onFocus);
  }, []);

  function onFocus() {
    setLoading(true);
    dispatch(onGetVehicleList(status, model, from, to, make));
    dispatch(getMakeList());
  }

  useEffect(() => {
    if (selectVehicleList.called) {
      setLoading(false);
      setRefreshing(false);
      const {data, error} = selectVehicleList;
      if (!error && data) {
        if (data.vehicle_list) {
          setVehicleData(data.vehicle_list);
        } else {
          setVehicleData([]);
        }
      }
    }
    if (selectModel.called) {
      setLoading(false);
      const {error, data} = selectModel;
      if (!error && data) {
        setModelData(data);
      }
    }
    if (selectMake.called) {
      setLoading(false);
      const {error, data} = selectMake;
      if (!error && data) {
        setMakeData(data);
      }
    }
    if (selectVehicleStatus.called) {
      setLoading(false);
      const {error, success, message} = selectVehicleStatus;
      if (!error && success) {
        onCloseStatusModal();
        dispatch(onGetVehicleList(status, model, from, to, make));
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectVehicleList, selectModel, selectMake, selectVehicleStatus]);

  function onClickEdit(id: string) {
    setVehicleId(id);
    navigation.navigate('AddVehicle', {from: 'edit'});
  }

  function onShowStatus(value: string, id: string) {
    setShowStatus(true);
    setVehicleId(id);
  }

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPressEdit={() => onClickEdit(item.uuid)}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model,
            vehicleId: item.uuid,
          })
        }
        onPressStatus={(value: string) => onShowStatus(value, item.uuid)}
      />
    );
  }

  function selectVehicleType() {
    navigation.navigate('AddVehicle', {from: 'add'});
    setVehicleId('');
  }

  function onClosedFilter() {
    setShowFilter(false);
  }

  function onPressCalend(type: 'from' | 'to') {
    setShowCalendar(true);
    switch (type) {
      case 'from':
        setCalType('from');
        break;
      case 'to':
        setCalType('to');
        break;
    }
  }

  function onChangeDate(event: Event | DateTimePickerEvent, date?: Date) {
    setShowCalendar(false);
    if (date) {
      switch (calType) {
        case 'from':
          setFrom(formatDate(date, false, 'YYYY-MM-DD'));
          break;
        case 'to':
          if (date < new Date(from)) {
            Snackbar.show({
              text: 'Please select proper date range',
              backgroundColor: 'red',
              duration: Snackbar.LENGTH_SHORT,
            });
            setTo('');
          } else {
            setTo(formatDate(date, false, 'YYYY-MM-DD'));
          }
          break;
      }
    }
  }

  function closeCalendar() {
    setShowCalendar(false);
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
    }
    setShowModal(true);
  }

  function onCloseMakeModal() {
    setShowModal(false);
  }

  function onPressSelecteItem(data: string, modalType: ModalType) {
    switch (modalType) {
      case 'Make':
        setMake(data);
        setLoading(true);
        dispatch(getModelList(data));
        setModel('');
        break;
      case 'Model':
        setModel(data);
        break;
    }
    setShowModal(false);
  }

  function onChangeQuery(value: string) {
    const lowerCaseQuery = value.toLowerCase();

    let filteredModalData = modalData.filter(el => {
      const lowerCaseEl = el.toLowerCase();
      return lowerCaseEl.includes(lowerCaseQuery);
    });

    if (lowerCaseQuery === '') {
      filteredModalData = modelData;
    }
    setModalData(filteredModalData);
    setSearchQuery(value);
  }

  function onPressDone() {
    ToastAndroid.show('Select Model', ToastAndroid.LONG);
  }

  function submit() {
    setLoading(true);
    setShowFilter(false);
    dispatch(onGetVehicleList(status, model, from, to, make));
  }

  function discardFilter() {
    setShowFilter(false);
    setModel('');
    setMake('');
    setFrom('');
    setTo('');
    setStatus('');
    setLoading(true);
    dispatch(onGetVehicleList('', '', '', '', ''));
  }

  function onStatusChange(value: string) {
    setStatus(value);
  }

  function onCloseStatusModal() {
    setShowStatus(false);
  }

  function validateInputs() {
    const tempErrors: StatusErrors = {};
    if (selectedDropDownStatus === 'in_auction') {
      if (askingPrice.length === 0) {
        tempErrors.askingPrice = 'Value is required';
      } else if (isNameValid(askingPrice)) {
        tempErrors.askingPrice = 'Enter valid data';
      }
    }
    if (selectedDropDownStatus === 'one_click_buy') {
      if (ocblow.length === 0) {
        tempErrors.ocblow = 'Value is required';
      } else if (isNameValid(ocblow)) {
        tempErrors.ocblow = 'Enter valid data';
      } else if (ocblow >= ocbhigh) {
        tempErrors.ocblow = 'Enter value less then OCB high price';
      }
      if (ocbhigh.length === 0) {
        tempErrors.ocbhigh = 'Value is required';
      } else if (isNameValid(ocbhigh)) {
        tempErrors.ocblow = 'Enter valid data';
      } else if (ocbhigh <= ocblow) {
        tempErrors.ocblow = 'Enter value greater then OCB low price';
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }
  console.log(errors, '===>');

  function onSubmit() {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(
        onUpdateStatus(vehicleId, selectedDropDownStatus, ocblow, ocbhigh),
      );
    }
  }

  function onRefresh() {
    setRefreshing(true);
    dispatch(onGetVehicleList(status, model, from, to, make));
  }
  function onRemove(title: string) {
    if (title === 'date') {
      setFrom('');
      setTo('');
      dispatch(onGetVehicleList(status, model, '', '', make));
    }
    if (title === 'make') {
      setMake('');
      dispatch(onGetVehicleList(status, model, from, to, ''));
    }
    if (title === 'model') {
      setModel('');
      dispatch(onGetVehicleList(status, '', from, to, make));
    }
    if (title === 'status') {
      setStatus('');
      dispatch(onGetVehicleList('', model, from, to, make));
    }
  }

  return (
    <Box style={styles.container}>
      <Pressable
        style={styles.filter}
        onPress={() => setShowFilter(!showFilter)}>
        <CustomText
          fontFamily="Roboto-Medium"
          color="#201A1B"
          fontSize={14}
          lineHeight={16}>
          Filters
        </CustomText>
        <Icon
          name="filter-variant"
          size={20}
          color="#201A1B"
          style={{marginLeft: 5}}
        />
      </Pressable>
      {!showFilter && (
        <Box flexDirection="row" ph={'5%'}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {from && to && (
              <Box style={styles.filterBox}>
                <Pressable onPress={() => onRemove('date')}>
                  <Icon
                    name="close"
                    size={12}
                    color={'#FFFFFF'}
                    style={{right: 5, top: 1}}
                  />
                </Pressable>
                <CustomText
                  fontFamily="Roboto-Medium"
                  color="#FFFFFF"
                  fontSize={12}
                  lineHeight={18}>
                  {from + ' - ' + to}
                </CustomText>
              </Box>
            )}
            {make && (
              <Box style={styles.filterBox}>
                <Pressable onPress={() => onRemove('make')}>
                  <Icon
                    name="close"
                    size={12}
                    color={'#FFFFFF'}
                    style={{right: 5, top: 1}}
                  />
                </Pressable>
                <CustomText
                  fontFamily="Roboto-Medium"
                  color="#FFFFFF"
                  fontSize={12}
                  lineHeight={18}>
                  {make.replace('_', ' ')}
                </CustomText>
              </Box>
            )}
            {model && (
              <Box style={styles.filterBox}>
                <Pressable onPress={() => onRemove('model')}>
                  <Icon
                    name="close"
                    size={12}
                    color={'#FFFFFF'}
                    style={{right: 5, top: 1}}
                  />
                </Pressable>
                <CustomText
                  fontFamily="Roboto-Medium"
                  color="#FFFFFF"
                  fontSize={12}
                  lineHeight={18}>
                  {model.replace('_', ' ')}
                </CustomText>
              </Box>
            )}
            {status && (
              <Box style={styles.filterBox}>
                <Pressable onPress={() => onRemove('status')}>
                  <Icon
                    name="close"
                    size={12}
                    color={'#FFFFFF'}
                    style={{right: 5, top: 1}}
                  />
                </Pressable>
                <CustomText
                  fontFamily="Roboto-Medium"
                  color="#FFFFFF"
                  fontSize={12}
                  lineHeight={18}>
                  {status.replace('_', ' ')}
                </CustomText>
              </Box>
            )}
          </ScrollView>
        </Box>
      )}
      {vehicleData?.length !== 0 ? (
        <>
          {loading && <Loader />}

          <Box style={styles.flat}>
            <FlatList
              data={vehicleData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatList}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </Box>
        </>
      ) : (
        <Box style={styles.noData}>
          <CustomText
            fontFamily="Roboto-Medium"
            color="#111111"
            fontSize={20}
            lineHeight={28}>
            No Vehicle Found!
          </CustomText>
        </Box>
      )}

      <Pressable style={styles.addCar} onPress={selectVehicleType}>
        <Icon name="pencil-outline" size={25} color="#000000" />
      </Pressable>
      <Calendar
        value={new Date()}
        isOpen={showCalendar}
        onChange={onChangeDate}
        onClosed={closeCalendar}
        maximumDate={new Date()}
        // minimumDate={calType === 'to' ? new Date(from) : new Date()}
      />
      {showFilter && (
        <Modal
          isOpen={showFilter}
          onClosed={onClosedFilter}
          style={styles.modal}>
          <Box>
            <Box alignItems="center" justifyContent="center" pv={'3%'}>
              <CustomText
                fontFamily="Roboto-Bold"
                color="#111111"
                fontSize={22}
                lineHeight={28}>
                Filter
              </CustomText>
              <Pressable style={styles.close} onPress={onClosedFilter}>
                <Icon name="close" size={25} color="#201A1B" />
              </Pressable>
            </Box>
            <Box style={styles.inputContainer}>
              <Pressable
                style={styles.input}
                onPress={() => onPressCalend('from')}>
                <ProfileInput
                  pointerEvents="none"
                  label="Start date"
                  value={from}
                  onChangeText={setFrom}
                  renderEndIcon={() => (
                    <Pressable
                      style={styles.endIcon}
                      onPress={() => onPressCalend('from')}>
                      <Icon
                        name="calendar-month"
                        size={20}
                        color={colors.primary}
                      />
                    </Pressable>
                  )}
                  editable={false}
                  noMargin
                />
              </Pressable>
              <Pressable
                style={styles.input}
                onPress={() => onPressCalend('to')}
                disabled={from.length !== 0 ? false : true}>
                <ProfileInput
                  pointerEvents="none"
                  label="End date"
                  value={to}
                  onChangeText={setTo}
                  renderEndIcon={() => (
                    <Pressable
                      style={styles.endIcon}
                      onPress={() => onPressCalend('to')}
                      disabled={from.length !== 0 ? false : true}>
                      <Icon
                        name="calendar-month"
                        size={20}
                        color={colors.primary}
                      />
                    </Pressable>
                  )}
                  editable={false}
                  noMargin
                />
              </Pressable>
            </Box>
            <Pressable
              onPress={() => onOpenModal('Make')}
              style={styles.makeInput}>
              <ProfileInput
                label="Make"
                value={make}
                onChangeText={setMake}
                noMargin
                editable={false}
              />
            </Pressable>
            {make.length !== 0 && (
              <Pressable
                onPress={() => onOpenModal('Model')}
                style={styles.makeInput}>
                <ProfileInput
                  label="Model"
                  value={model}
                  onChangeText={setModel}
                  noMargin
                  editable={false}
                />
              </Pressable>
            )}
            <Box ph={'4%'}>
              <CustomDropdown
                values={StatusList}
                onValueChange={onStatusChange}
                selectedValue={status}
              />
            </Box>

            <Box style={styles.buttonContainer}>
              <Box width={'45%'}>
                <PrimaryButton
                  label="Discard"
                  onPress={discardFilter}
                  varient="Secondary"
                />
              </Box>
              <Box width={'45%'}>
                <PrimaryButton label="Apply" onPress={submit} />
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      <Modal
        isOpen={showModal}
        onClosed={onCloseMakeModal}
        style={styles.modelData}
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
      <Modal
        position="top"
        isOpen={showStatus}
        onClosed={onCloseStatusModal}
        style={styles.statusModal}
        backButtonClose={true}
        backdrop={true}>
        <Box ph={'4%'} pv={'5%'}>
          {loading && <Loader />}
          <CustomText
            fontFamily="Roboto-Medium"
            color="#111111"
            fontSize={18}
            lineHeight={30}
            style={{textAlign: 'center'}}>
            Status
          </CustomText>
          <Box pv={'2%'}>
            <CustomDropdown
              values={Status}
              onValueChange={setSelectedDropDownStatus}
              selectedValue={selectedDropDownStatus}
            />
          </Box>
          {selectedDropDownStatus === 'in_auction' && (
            <>
              <ProfileInput
                label="Asking Price"
                value={askingPrice}
                onChangeText={setAskingPrice}
                keyboardType="numeric"
                error={errors?.askingPrice}
                noMargin
              />
            </>
          )}
          {selectedDropDownStatus === 'one_click_buy' && (
            <>
              <ProfileInput
                label="OCB High Price"
                value={ocbhigh}
                onChangeText={setOcbHigh}
                keyboardType="numeric"
                error={errors?.ocblow}
                noMargin
              />
              <ProfileInput
                label="OCB Low Price"
                value={ocblow}
                onChangeText={setOcbLow}
                keyboardType="numeric"
                error={errors?.ocbhigh}
                noMargin
              />
            </>
          )}
          <Box>
            <PrimaryButton
              label="Submit"
              onPress={onSubmit}
              disabled={
                selectedDropDownStatus !== 'in_auction' &&
                selectedDropDownStatus !== 'one_click_buy'
                  ? true
                  : false
              }
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  addCar: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: '10rem',
    padding: '1.5rem',
    right: '3rem',
    borderRadius: '1.5rem',
  },
  modal: {
    height: 'auto',
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    borderRadius: 8,
  },
  flatList: {
    padding: '2rem',
  },
  filter: {
    marginLeft: 'auto',
    marginRight: 25,
    marginTop: 10,
    flexDirection: 'row',
    ...contentCenter,
  },
  flat: {
    marginBottom: '7.5rem',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '1rem',
  },
  input: {
    width: '47%',
    paddingHorizontal: 4,
  },
  endIcon: {
    backgroundColor: colors.secondaryLight,
    padding: 5,
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modelData: {
    backgroundColor: colors.primary,
    height: height * 0.7,
    width,
    paddingHorizontal: 0.3,
    borderRadius: '0.3rem',
    zIndex: 10,
  },
  makeInput: {paddingHorizontal: 15},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '2rem',
    marginLeft: '2rem',
    marginBottom: '2rem',
  },
  statusModal: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: '0.6rem',
  },
  filterBox: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#111111',
    ...contentCenter,
    marginTop: 10,
    paddingHorizontal: '1.5rem',
    marginRight: '1rem',
    flexDirection: 'row',
  },
});

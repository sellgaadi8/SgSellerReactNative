import React, {useContext, useEffect, useState} from 'react';
import Box from './Box';
import CustomDropdown from './CustomDropDown';
import PrimaryButton from './PrimaryButton';
import CustomText from './CustomText';
import ProfileInput from './ProfileInput';
import {useDispatch} from 'react-redux';
import {onUpdateStatus} from '../redux/ducks/updateStatus';
import GlobalContext from '../contexts/GlobalContext';
import {useAppSelector} from '../utils/hooks';
import Snackbar from 'react-native-snackbar';
import Loader from './Loader';

type StatusInputProps = {
  status: string;
};

export default function StatusInput({status}: StatusInputProps) {
  const Status = [
    {
      label: 'Select Staus',
      value: '-1',
    },
    {label: 'In auction', value: 'in_auction'},
    {label: 'One click buy', value: 'one_click_buy'},
  ];
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ocblow, setOcbLow] = useState('');
  const [ocbhigh, setOcbHigh] = useState('');
  const [loading, setLoading] = useState(false);
  const {vehicleId} = useContext(GlobalContext);
  const selectVehicleStatus = useAppSelector(state => state.updateStatus);

  const dispatch = useDispatch<any>();

  function onSubmit() {
    setLoading(true);
    dispatch(onUpdateStatus(vehicleId, selectedStatus, ocblow, ocbhigh));
  }

  useEffect(() => {
    if (selectVehicleStatus.called) {
      setLoading(false);
      const {error, success, message} = selectVehicleStatus;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectVehicleStatus]);

  return (
    <Box ph={'4%'} pv={'5%'}>
      {loading && <Loader />}
      <CustomText
        fontFamily="Roboto-Medium"
        color="#111111"
        fontSize={18}
        lineHeight={30}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{textAlign: 'center'}}>
        Status
      </CustomText>
      <Box pv={'2%'}>
        <CustomDropdown
          values={Status}
          onValueChange={setSelectedStatus}
          selectedValue={selectedStatus}
        />
      </Box>
      {selectedStatus === 'in_auction' && (
        <>
          <ProfileInput
            label="Asking Price"
            value={ocblow}
            onChangeText={setOcbLow}
            keyboardType="numeric"
          />
        </>
      )}
      {selectedStatus === 'one_click_buy' && (
        <>
          <ProfileInput
            label="OCB High Price"
            value={ocblow}
            onChangeText={setOcbLow}
            keyboardType="numeric"
          />
          <ProfileInput
            label="OCB Low Price"
            value={ocbhigh}
            onChangeText={setOcbHigh}
            keyboardType="numeric"
          />
        </>
      )}
      <Box>
        <PrimaryButton
          label="Submit"
          onPress={onSubmit}
          disabled={
            selectedStatus !== 'in_auction' &&
            selectedStatus !== 'one_click_buy'
              ? true
              : false
          }
        />
      </Box>
    </Box>
  );
}

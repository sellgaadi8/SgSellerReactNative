/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ProfileDetailsProps} from '../../types/propsTypes';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Box from '../../components/Box';
import ProfileInput from '../../components/ProfileInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import {Keyboard, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {onUpdateProfile} from '../../redux/ducks/updateProfile';
import {onGetProfile} from '../../redux/ducks/getProfile';
import {useAppSelector} from '../../utils/hooks';
import Loader from '../../components/Loader';
import Snackbar from 'react-native-snackbar';

export default function ProfileDetails({navigation}: ProfileDetailsProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltmobile] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const selectGetProfile = useAppSelector(state => state.getProfile);
  const selectUpdateProfile = useAppSelector(state => state.updateProfile);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetProfile());
  }, []);

  function update() {
    Keyboard.dismiss();
    setLoading(true);
    dispatch(onUpdateProfile(address1));
  }

  useEffect(() => {
    if (selectGetProfile.called) {
      setLoading(false);
      const {data, success} = selectGetProfile;
      if (success && data) {
        setName(data.dealership_name);
        setAddress1(data.dealership_address);
        setMobile(data.mobile);
        setAltmobile(data.alternate_mobile);
        if (data.gst_no) {
          setGst(data?.gst_no);
        }
        setPan(data.business_pan);
        if (data.aadhar_no) {
          setAdhar(data.aadhar_no);
        }
      }
    }
    if (selectUpdateProfile.called) {
      setLoading(false);
      const {success, message} = selectUpdateProfile;
      if (success && message) {
        dispatch(onGetProfile());
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectGetProfile, selectUpdateProfile]);

  return (
    <Box style={styles.container}>
      {loading && <Loader status="Loading..." />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.onScroll}>
        <ProfileInput
          label="Dealership name"
          value={name}
          onChangeText={setName}
        />

        <ProfileInput
          label="Dealership address Line 1"
          value={address1}
          onChangeText={setAddress1}
        />

        <ProfileInput
          label="Dealership address line 2"
          value={address2}
          onChangeText={setAddress2}
        />

        <ProfileInput label="Mobile" value={mobile} onChangeText={setMobile} />

        <ProfileInput
          label="Alternate mobile"
          value={altMobile}
          onChangeText={setAltmobile}
        />

        <ProfileInput label="GST number" value={gst} onChangeText={setGst} />

        <ProfileInput label="Business pan" value={pan} onChangeText={setPan} />

        <ProfileInput
          label="Aadhar number"
          value={adhar}
          onChangeText={setAdhar}
        />

        <PrimaryButton label="Update" onPress={update} />
      </ScrollView>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  onScroll: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  button: {
    marginBottom: '4rem',
  },
});

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
import {
  isEmailValid,
  isNameValid,
  validateAadhar,
  validateGst,
  validatePAN,
} from '../../utils/regex';

export default function ProfileDetails({navigation}: ProfileDetailsProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const selectGetProfile = useAppSelector(state => state.getProfile);
  const selectUpdateProfile = useAppSelector(state => state.updateProfile);
  const [errors, setErrors] = useState<EditProfileErrors>();

  useEffect(() => {
    setLoading(true);
    dispatch(onGetProfile());
  }, []);

  function validateInputs() {
    const tempErrors: EditProfileErrors = {};

    if (name.length < 3) {
      tempErrors.name = 'Enter a valid full name';
    } else if (!isNameValid(name)) {
      tempErrors.name = 'Enter a valid full name';
    }
    if (!isEmailValid(email)) {
      tempErrors.email = 'Enter a valid email address';
    }
    if (address1.length === 0) {
      tempErrors.address = 'Enter address';
    }
    if (!validateGst(gst)) {
      tempErrors.gst = 'Enter valid GST number';
    }
    if (!validatePAN(pan)) {
      tempErrors.pan = 'Enter valid PAN number';
    }
    if (adhar.length === 0) {
      tempErrors.aadhar = 'Enter Adhar number';
    } else if (!validateAadhar(adhar)) {
      tempErrors.aadhar = 'Enter valid Adhar number';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function update() {
    const isValid = validateInputs();
    Keyboard.dismiss();
    if (isValid) {
      setLoading(true);
      dispatch(onUpdateProfile(name, gst, pan, adhar, email, address1));
    }
  }

  useEffect(() => {
    if (selectGetProfile.called) {
      setLoading(false);
      const {data, success} = selectGetProfile;
      if (success && data) {
        setName(data.dealership_name);
        if (data.dealership_address) {
          setAddress1(data.dealership_address);
        }

        setMobile(data.mobile);
        if (data.gst_no) {
          setGst(data?.gst_no);
        }
        if (data.business_pan) {
          setPan(data.business_pan);
        }
        if (data.aadhar_no) {
          setAdhar(data.aadhar_no);
        }
        if (data.email) {
          setEmail(data.email);
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

  const handlePanNumberChange = (text: string) => {
    // Convert the input to uppercase
    text = text.toUpperCase();
    setPan(text);
  };

  const handleGstChange = (text: string) => {
    // Convert the input to uppercase
    text = text.toUpperCase();
    setGst(text);
  };

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
          error={errors?.name}
          noMargin
        />

        <ProfileInput
          label="Dealership address"
          value={address1}
          onChangeText={setAddress1}
          error={errors?.address}
          noMargin
        />

        <ProfileInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors?.email}
          noMargin
        />

        <ProfileInput
          label="Mobile"
          value={mobile}
          onChangeText={setMobile}
          editable={false}
        />

        <ProfileInput
          label="GST number"
          value={gst}
          onChangeText={handleGstChange}
          maxLength={15}
          error={errors?.gst}
          noMargin
        />

        <ProfileInput
          label="Business pan"
          value={pan}
          onChangeText={handlePanNumberChange}
          maxLength={10}
          error={errors?.pan}
          noMargin
        />

        <ProfileInput
          label="Aadhar number"
          value={adhar}
          onChangeText={setAdhar}
          maxLength={12}
          keyboardType="numeric"
          error={errors?.aadhar}
          noMargin
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

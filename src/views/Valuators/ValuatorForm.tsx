/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ValuatorFormProps} from '../../types/propsTypes';
import ProfileInput from '../../components/ProfileInput';
import EStyleSheet from 'react-native-extended-stylesheet';
import Box from '../../components/Box';
import PrimaryButton from '../../components/PrimaryButton';
import {container} from '../../utils/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {onUpdateValuator} from '../../redux/ducks/updateValuator';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';

export default function ValuatorForm({route, navigation}: ValuatorFormProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dealId, setDealId] = useState('');
  const [adhar, setAdhar] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const selectUpdateValuator = useAppSelector(state => state.updateValuator);

  function update() {
    setLoading(true);
    dispatch(
      onUpdateValuator(
        name,
        email,
        mobile,
        adhar,
        address1,
        dealId,
        route.params.list.valuator_uuid,
      ),
    );
  }

  useEffect(() => {
    setName(route.params.list.valuator_name);
    setMobile(route.params.list.valuator_phone_no);
    setAddress1(route.params.list.valuator_address);
    setAddress2(route.params.list.valuator_address);
    setEmail(route.params.list.valuator_email);
    setAdhar(route.params.list.valuator_aadhar_no);
    setDealId(route.params.list.valuator_dealership_id);
  }, []);

  useEffect(() => {
    if (selectUpdateValuator.called) {
      setLoading(false);
      const {error, message} = selectUpdateValuator;
      if (!error && message) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectUpdateValuator]);

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box pv={'5%'}>
          <ProfileInput label="Name" value={name} onChangeText={setName} />
          <ProfileInput
            label="Mobile"
            value={mobile}
            onChangeText={setMobile}
          />
          <ProfileInput
            label="Dealership ID"
            value={dealId}
            onChangeText={setDealId}
          />

          <ProfileInput
            label="Address Line 1"
            value={address1}
            onChangeText={setAddress1}
          />

          <ProfileInput
            label="Address line 2"
            value={address2}
            onChangeText={setAddress2}
          />

          <ProfileInput label="Email" value={email} onChangeText={setEmail} />

          <ProfileInput
            label="Aadhar number"
            value={adhar}
            onChangeText={setAdhar}
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
            <PrimaryButton label="Save Edits" onPress={update} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

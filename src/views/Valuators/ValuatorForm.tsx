import {ScrollView} from 'react-native';
import React, {useState} from 'react';
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

export default function ValuatorForm({navigation}: ValuatorFormProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dealId, setDealId] = useState('');
  const [adhar, setAdhar] = useState('');

  function update() {
    console.log('test');
  }

  return (
    <Box style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
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
            <PrimaryButton label="Close" onPress={update} varient="Secondary" />
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

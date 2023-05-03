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
import {ScrollView} from 'react-native';

export default function ProfileDetails({navigation}: ProfileDetailsProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltmobile] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');

  useEffect(() => {
    navigation.setParams({
      title: 'Rishabh Jain',
    });
  }, []);

  function update() {
    console.log('test');
  }

  return (
    <Box style={styles.container}>
      <ScrollView>
        <Box>
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

          <ProfileInput
            label="Mobile"
            value={mobile}
            onChangeText={setMobile}
          />

          <ProfileInput
            label="Alternate mobile"
            value={altMobile}
            onChangeText={setAltmobile}
          />

          <ProfileInput label="GST number" value={gst} onChangeText={setGst} />

          <ProfileInput
            label="Business pan"
            value={pan}
            onChangeText={setPan}
          />

          <ProfileInput
            label="Aadhar number"
            value={adhar}
            onChangeText={setAdhar}
          />
        </Box>
        <Box>
          <PrimaryButton label="Update" onPress={update} />
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
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
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
          <ProfileInput label="Dealership name" />

          <ProfileInput label="Dealership address Line 1" />

          <ProfileInput label="Dealership address line 2" />

          <ProfileInput label="Mobile" />

          <ProfileInput label="Alternate mobile" />

          <ProfileInput label="GST number" />

          <ProfileInput label="Business pan" />

          <ProfileInput label="Aadhar number" />
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

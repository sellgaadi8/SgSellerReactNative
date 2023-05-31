/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {container} from '../../utils/styles';
import Radio from '../../components/Radio';
import colors from '../../utils/colors';
import ProfileInput from '../../components/ProfileInput';
import PrimaryButton from '../../components/PrimaryButton';

export default function CarDocuments() {
  const [insuranceType, setInsuranceType] = useState([
    {id: 'comprehensive', title: 'COMPREHENSIVE', selected: false},
    {id: 'thirdparty', title: 'THIRDPARTY', selected: false},
    {id: 'zero_dep', title: 'ZERO DEP', selected: false},
  ]);

  function onPressCheckbox(id: string) {
    const updatedFuelType = insuranceType.map(type => ({
      ...type,
      selected: type.id === id,
    }));

    setInsuranceType(updatedFuelType);
  }

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 3: Car Documents
        </CustomText>
        <Box pv={'3%'}>
          <ProfileInput label="RTO*" />
          <ProfileInput label="Fitness Upto*" />
          <ProfileInput label="Permit Upto*" />
          <Box style={{marginTop: -10}}>
            <Radio title="RC availability*" />
            <Radio title="RTO noc issued" />
            <Radio title="Mismatch in RC" />
          </Box>

          <Box pv={'2%'}>
            <CustomText
              fontSize={14}
              lineHeight={28}
              fontFamily="Roboto-Medium"
              color="#111111">
              Insurance - type*
            </CustomText>
            <Box style={[styles.checkboxWrap]}>
              {insuranceType.map((el, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    style={[styles.checkboxPress]}
                    onPress={() => onPressCheckbox(el.id)}>
                    <Icon
                      name={el.selected ? 'radiobox-marked' : 'radiobox-blank'}
                      size={20}
                      color={el.selected ? colors.secondary : '#111111'}
                    />
                    <CustomText
                      color="#1C1B1F"
                      fontFamily="Roboto-Regular"
                      fontSize={14}
                      lineHeight={18}
                      style={{left: 2}}>
                      {el.title}
                    </CustomText>
                  </Pressable>
                );
              })}
            </Box>
          </Box>
          <Radio title="Under Hypothication" />
          <Radio title="Road tax paid" />
          <Radio title="Partipeshi Request" />
          <Radio title="Duplicate Key" />
          <Radio title="Chessis Number embossing ( Tracable/Nor tracable)" />
          <Radio title="CNG/LPG fitment*" />
          <Radio title="CNG/LPG fitment endorsed on RC*" />
        </Box>
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Close"
              onPress={() => console.log('mc')}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton
              label="Save Edits"
              onPress={() => console.log('mc')}
            />
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
  option: {
    flexDirection: 'row',
  },
  checkboxPress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  checkboxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: '3rem',
  },
});

import {View, Text} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

export default function VehicleCard() {
  return (
    <Box style={styles.container}>
      {/* <Box></Box> */}
      <CustomText>Make of vehicle(Year)</CustomText>
      <CustomText>Model</CustomText>
      <Box flexDirection="row" justifyContent="space-around" pv={'5%'}>
        <Box flexDirection="row">
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText>Fuel Type</CustomText>
        </Box>
        <Box flexDirection="row">
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText>Run (Km)</CustomText>
        </Box>
        <Box flexDirection="row">
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText>Variant</CustomText>
        </Box>
      </Box>
      <View style={styles.line} />
      <Box flexDirection="row" pv={'2%'} ph={'5%'}>
        <Box flexDirection="row">
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText>No. of owners</CustomText>
        </Box>
        <Box flexDirection="row" ph={'5%'}>
          <Ionicons
            name="car-outline"
            size={20}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText>Color</CustomText>
        </Box>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
  },
  line: {
    backgroundColor: colors.primary,
    height: '0.15rem',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '1rem',
  },
});

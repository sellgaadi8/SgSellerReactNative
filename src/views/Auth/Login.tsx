import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import colors from '../../utils/colors';
import Input from '../../components/Input';
// import {useEffect} from 'react';
// import {LoginProps} from '../../types/propsTypes';

export default function Login() {
  return (
    <Box style={styles.container}>
      <Box>
        <Image
          source={require('../../assets/loginCircle.png')}
          style={styles.headerBg}
        />
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </Box>
      <Box style={styles.body}>
        <CustomText
          color="White"
          fontFamily="Roboto-Bold"
          fontSize={22}
          lineHeight={28}>
          Sign Up
        </CustomText>
        <Input label="Mobile Number" />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  headerBg: {
    height: pixelSizeVertical(287),
    width: pixelSizeHorizontal(352),
  },
  logo: {
    height: pixelSizeVertical(110),
    width: pixelSizeHorizontal(105),
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  body: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('5%'),
  },
});

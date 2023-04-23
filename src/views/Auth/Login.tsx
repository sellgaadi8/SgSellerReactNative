import {Image, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import colors from '../../utils/colors';
import Input from '../../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import PrimaryButton from '../../components/PrimaryButton';
import {LoginProps} from '../../types/propsTypes';
import TextButton from '../../components/TextButton';

export default function Login({navigation}: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>();

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    // if (isValid) {
    navigation.navigate('HomeStack');
    // }
  }

  function validateInputs() {
    const tempErrors: LoginErrors = {};

    if (mobile.length < 10) {
      tempErrors.mobile = 'Enter a valid number';
    }
    if (password.length === 0) {
      tempErrors.password = 'Enter a valid Otp';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

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
          Signup
        </CustomText>
        <Box style={styles.inputContainer}>
          <Input
            label="Mobile Number"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
            error={errors?.mobile}
            maxLength={10}
            noMargin
          />
          <Input
            label="Password"
            showTextButton={true}
            value={password}
            onChangeText={setPassword}
            error={errors?.password}
            noMargin
            textButton={{
              label: 'Login with OTP',
              containerStyles: styles.link,
              onPress: () => console.log('test'),
              labelStyles: styles.labelButton,
            }}
          />
        </Box>
        <Box width={'40%'} alignSelf="center" mv={10}>
          <PrimaryButton label="Submit" onPress={onSubmit} />
        </Box>
      </Box>
      <Box alignItems="center" mv={'7.5%'}>
        <TextButton
          label="Forgot password?"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
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
  inputContainer: {
    marginTop: '4rem',
  },
});

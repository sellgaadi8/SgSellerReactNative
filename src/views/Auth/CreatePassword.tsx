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
import {CreatePasswordProps} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onChangePassword} from '../../redux/ducks/changePassword';
// import {useEffect} from 'react';

export default function CreatePassword({navigation}: CreatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<PasswordErrors>();
  const dispatch = useDispatch<any>();

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    dispatch(onChangePassword('7021483690', password, confirmPassword));
    // if (isValid) {
    // navigation.navigate('Login');
    // }
  }

  function validateInputs() {
    const tempErrors: PasswordErrors = {};

    if (password.length === 0) {
      tempErrors.password = 'Enter a Password';
    }
    if (confirmPassword.length === 0) {
      tempErrors.confirmPassword = 'Enter a Confirm Password';
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Password does not match';
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
          Set password
        </CustomText>
        <Box style={styles.inputContainer}>
          <Input
            label="Enter new password"
            value={password}
            onChangeText={setPassword}
            error={errors?.password}
            noMargin
          />
          <Input
            label="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors?.confirmPassword}
            noMargin
          />
        </Box>
        <Box width={'40%'} alignSelf="center" mv={10}>
          <PrimaryButton label="Submit" onPress={onSubmit} />
        </Box>
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

/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {onSendOtp} from '../../redux/ducks/sendOtp';
import Snackbar from 'react-native-snackbar';
import {useAppSelector} from '../../utils/hooks';
import {onLogin} from '../../redux/ducks/login';
import GlobalContext from '../../contexts/GlobalContext';
import {View} from 'react-native';

export default function Login({navigation}: LoginProps) {
  const [mobile, setMobile] = useState('9004041284');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>();
  const [showOtp, setShowOtp] = useState(false);

  const selectOtp = useAppSelector(state => state.sendOtp);
  const selectLogin = useAppSelector(state => state.login);
  const dispatch = useDispatch();
  const {setAuthenticated, setName} = useContext(GlobalContext);

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      if (!showOtp) {
        setLoading(true);
        dispatch(onSendOtp(mobile));
      } else {
        setLoading(true);
        dispatch(onLogin(mobile, true, password));
      }
    }
  }

  function validateInputs() {
    const tempErrors: LoginErrors = {};

    if (mobile.length < 10) {
      tempErrors.mobile = 'Enter a valid number';
    }
    if (showOtp && password.length === 0) {
      tempErrors.password = 'Enter a valid Otp';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  useEffect(() => {
    if (selectOtp.called) {
      setLoading(false);
      const {success, message} = selectOtp;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        setShowOtp(true);
      } else {
        console.log('mss', message);

        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectLogin.called) {
      setLoading(false);
      const {message, success, token, name} = selectLogin;
      if (success && token && name) {
        setAuthenticated(true);
        setName(name);
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOtp, selectLogin]);

  return (
    <Box style={styles.container}>
      {loading && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      )}
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box>
            <Image
              source={require('../../assets/loginCircle.png')}
              style={styles.headerBg}
            />
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
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
                editable={!showOtp}
              />
              {showOtp && (
                <Input
                  label="Otp"
                  showTextButton={true}
                  value={password}
                  onChangeText={setPassword}
                  error={errors?.password}
                  noMargin
                  // textButton={{
                  //   label: 'Login with OTP',
                  //   containerStyles: styles.link,
                  //   onPress: () => console.log('test'),
                  //   labelStyles: styles.labelButton,
                  // }}
                />
              )}
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
        </ScrollView>
      </KeyboardAvoidingView>
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

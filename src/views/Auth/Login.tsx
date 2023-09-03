/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
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
import {useDispatch} from 'react-redux';
import {onSendOtp} from '../../redux/ducks/sendOtp';
import Snackbar from 'react-native-snackbar';
import {useAppSelector} from '../../utils/hooks';
import {onLogin} from '../../redux/ducks/login';
import GlobalContext from '../../contexts/GlobalContext';
import Loader from '../../components/Loader';
import {saveVehicleType} from '../../utils/localStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login({navigation}: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>();
  const [showOtp, setShowOtp] = useState(false);

  const selectOtp = useAppSelector(state => state.sendOtp);
  const selectLogin = useAppSelector(state => state.login);
  const dispatch = useDispatch<any>();
  const {setAuthenticated, setName, setVehicleType} = useContext(GlobalContext);

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
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectLogin.called) {
      setLoading(false);
      const {message, success, name, seller_type} = selectLogin;
      if (success && name && seller_type) {
        setAuthenticated(true);
        setName(name);
        setVehicleType(seller_type);
        saveVehicleType(seller_type);
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOtp, selectLogin]);

  function onEdit() {
    setShowOtp(false);
    setPassword('');
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box>
            <Image
              source={require('../../assets/loginCircle.png')}
              style={styles.headerBg}
              // resizeMode=''
            />
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
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
                renderEndIcon={
                  showOtp
                    ? () => {
                        return (
                          <Pressable onPress={onEdit} style={styles.eye}>
                            <Icon name="pencil" size={18} color="#FFFFFF" />
                          </Pressable>
                        );
                      }
                    : undefined
                }
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
            <Box alignSelf="center" pv={'5%'}>
              <PrimaryButton label="Submit" onPress={onSubmit} />
            </Box>

            <Box flexDirection="row" justifyContent="center" pv={'2%'}>
              <CustomText
                color="White"
                fontFamily="Roboto-Regular"
                fontSize={14}
                lineHeight={22}>
                Don't Have Account?{'  '}
              </CustomText>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <CustomText
                  color="White"
                  fontFamily="Roboto-Medium"
                  fontSize={14}
                  lineHeight={20}
                  style={{textDecorationLine: 'underline'}}>
                  Register
                </CustomText>
              </Pressable>
            </Box>
          </Box>
          {/* <Box alignItems="center" mv={'7.5%'}>
            <TextButton
              label="Forgot password?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </Box> */}
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
    height: pixelSizeVertical(335),
    width: pixelSizeHorizontal(375),
  },
  logo: {
    height: pixelSizeVertical(135),
    width: pixelSizeHorizontal(125),
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  body: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('5%'),
  },
  inputContainer: {
    marginTop: '4rem',
  },
  eye: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
});

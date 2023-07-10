/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {RegisterProps} from '../../types/propsTypes';
import TextButton from '../../components/TextButton';
import {useDispatch} from 'react-redux';
// import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';
import {onRegister} from '../../redux/ducks/register';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {getCityList} from '../../redux/ducks/getCity';
import Modal from 'react-native-modalbox';

export default function Register({navigation}: RegisterProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sellerType, setSellerType] = useState('');

  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<City[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>();
  const selectRegister = useAppSelector(state => state.register);
  const selectCity = useAppSelector(state => state.getCity);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCityList());
  }, []);

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(onRegister(name, phone, city, email, sellerType));
    }
  }

  function validateInputs() {
    const tempErrors: RegisterErrors = {};

    if (name.length === 0) {
      tempErrors.city = 'Enter a valid name';
    }
    if (email.length === 0) {
      tempErrors.email = 'Enter a valid email';
    }
    if (phone.length < 10) {
      tempErrors.email = 'Enter a valid phone';
    }
    if (city.length === 0) {
      tempErrors.city = 'Select city';
    }
    if (sellerType.length === 0) {
      tempErrors.sellerType = 'Select seller type';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  useEffect(() => {
    if (selectRegister.called) {
      const {message, success} = selectRegister;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectCity.called) {
      const {error, data} = selectCity;
      if (!error && data) {
        setCityData(data);
      }
    }
  }, [selectRegister]);

  function onOpenModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
  }

  function onPressSelecteItem(item: City) {
    setCity(item.id);
    setShowModal(false);
  }

  function renderItem({item}: ListRenderItemInfo<City>) {
    return (
      <Pressable style={styles.body} onPress={() => onPressSelecteItem(item)}>
        <CustomText color="White">{item.city}</CustomText>
      </Pressable>
    );
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
                label="Name"
                value={name}
                onChangeText={setName}
                error={errors?.name}
                maxLength={10}
                noMargin
              />
              <Input
                label="Email"
                showTextButton={true}
                value={email}
                onChangeText={setEmail}
                error={errors?.email}
                noMargin
              />
              <Input
                label="Phone"
                showTextButton={true}
                value={phone}
                onChangeText={setPhone}
                error={errors?.phone}
                noMargin
              />
              <Pressable onPress={onOpenModal}>
                <Input
                  label="City"
                  showTextButton={true}
                  value={city}
                  onChangeText={setCity}
                  error={errors?.city}
                  noMargin
                  editable={false}
                />
              </Pressable>
              <Input
                label="Seller Type"
                showTextButton={true}
                value={sellerType}
                onChangeText={setSellerType}
                error={errors?.sellerType}
                noMargin
              />
            </Box>
            <Box width={'40%'} alignSelf="center" mv={10} flexDirection="row">
              <PrimaryButton label="Submit" onPress={onSubmit} />
            </Box>
            <Box flexDirection="row" justifyContent="center" pv={'2%'}>
              <CustomText
                color="White"
                fontFamily="Roboto-Regular"
                fontSize={14}
                lineHeight={22}>
                Already Have Accout?{'  '}
              </CustomText>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <CustomText
                  color="White"
                  fontFamily="Roboto-Medium"
                  fontSize={14}
                  lineHeight={20}
                  style={{textDecorationLine: 'underline'}}>
                  Login
                </CustomText>
              </Pressable>
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
      <Modal
        isOpen={showModal}
        onClosed={onCloseModal}
        style={styles.modal}
        backButtonClose={true}
        backdrop={true}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          data={cityData}
        />
      </Modal>
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
    height: pixelSizeVertical(316),
    width: pixelSizeHorizontal(380),
  },
  logo: {
    height: pixelSizeVertical(130),
    width: pixelSizeHorizontal(120),
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

//name , phone, city, email, sellertype : two three four

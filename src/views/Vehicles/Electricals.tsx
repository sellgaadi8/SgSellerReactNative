import {ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import RadioButtons from '../../components/RadioButtons';
import PrimaryButton from '../../components/PrimaryButton';
import {ElectricalsProps} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onAddElectrical} from '../../redux/ducks/addElectrical';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onUpdateElectrical} from '../../redux/ducks/updateElectrical';
import {onGetElectricalDetails} from '../../redux/ducks/getElectrical';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {onUploadImage} from '../../redux/ducks/uploadImage';

export default function Electricals({navigation, route}: ElectricalsProps) {
  const [powerWindows, setPowerWindows] = useState('');
  const [music, setMusic] = useState('');
  const [electrical, setElectrical] = useState('');
  const [parking, setParking] = useState('');
  const [overall, setOverall] = useState('');
  const [jackTool, setJackTool] = useState('');
  const [lightsCrack, setLightsCrack] = useState('');
  const [lightsCrackImage, setLightsCrackImage] = useState('');
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddElectrical = useAppSelector(state => state.addElectrical);
  const selectUpdateElectrical = useAppSelector(
    state => state.updateElectrical,
  );
  const selectGetElectrical = useAppSelector(state => state.getElectrical);

  useEffect(() => {
    if (route.params.from === 'edit') {
      dispatch(onGetElectricalDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveImage(image: any) {
    setLightsCrackImage(image[0].uri);
    dispatch(onUploadImage(image[0], 'electricals-images'));
  }

  function submit() {
    if (route.params.from === 'add') {
      dispatch(
        onAddElectrical(
          vehicleId,
          powerWindows,
          music,
          electrical,
          parking,
          overall,
          jackTool,
          lightsCrack,
        ),
      );
    } else {
      dispatch(
        onUpdateElectrical(
          vehicleId,
          powerWindows,
          music,
          electrical,
          parking,
          overall,
          jackTool,
          lightsCrack,
        ),
      );
    }
  }

  useEffect(() => {
    if (selectAddElectrical.called) {
      const {error, success, message} = selectAddElectrical;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectUpdateElectrical.called) {
      const {error, success, message} = selectUpdateElectrical;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetElectrical.called) {
      const {data, error} = selectGetElectrical;
      if (!error && data) {
        setPowerWindows(data.power_windows);
        setMusic(data.music_system);
        setElectrical(data.electrical_odomoter);
        setParking(data.parking_sensor);
        setOverall(data.overall);
        setJackTool(data.jack_tool_box);
        setLightsCrack(data.lights_crack_broken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddElectrical, selectUpdateElectrical, selectGetElectrical]);

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 8: Electricals
        </CustomText>
        <Box>
          <RadioButtons
            label="4 power windows"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setPowerWindows(value)}
          />
          <RadioButtons
            label="Music system"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setMusic(value)}
          />
          <RadioButtons
            label="Eletrical odomoter"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setElectrical(value)}
          />
          <RadioButtons
            label="Parking sensor"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setParking(value)}
          />
          <RadioButtons
            label="Overall"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setOverall(value)}
          />
          <RadioButtons
            label="Jack and Tool box"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setJackTool(value)}
          />
          <RadioButtons
            label="Lights crack broken"
            data={[
              {label: 'YES', value: 'yes'},
              {label: 'NO', value: 'no'},
            ]}
            onSelect={(label, value) => setLightsCrack(value)}
            isImage
            onPressCamera={() => setOpenImagePicker(true)}
            selectPhoto={lightsCrackImage}
          />
        </Box>
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Discard"
              onPress={() => navigation.goBack()}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton
              label={route.params.from === 'add' ? 'Save' : 'Update'}
              onPress={submit}
            />
          </Box>
        </Box>
      </ScrollView>
      <ImagePicker
        isOpen={openImagePicker}
        onClose={() => setOpenImagePicker(false)}
        multiple={false}
        onSaveImage={onSaveImage}
        title="Select Image"
        fileTypes={{
          allowMultiSelection: false,
          type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        }}
      />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
    marginTop: '2rem',
  },
});

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
import {onUploadImage} from '../../redux/ducks/uploadImage_video';
import Loader from '../../components/Loader';
import Rating from '../../components/Rating';

type ElectType =
  | 'powerWindows'
  | 'music'
  | 'electrical'
  | 'parking'
  | 'overall'
  | 'jackTool'
  | 'lightsCrack';

export default function Electricals({navigation, route}: ElectricalsProps) {
  const [electricalType, setElectricalType] = useState([
    {id: 'powerWindows', url: ''},
    {id: 'music', url: ''},
    {id: 'electrical', url: ''},
    {id: 'parking', url: ''},
    {id: 'overall', url: ''},
    {id: 'jackTool', url: ''},
    {id: 'lightsCrack', url: ''},
  ]);

  const [powerWindows, setPowerWindows] = useState('');
  const [music, setMusic] = useState('');
  const [electrical, setElectrical] = useState('');
  const [parking, setParking] = useState('');
  const [overall, setOverall] = useState('');
  const [jackTool, setJackTool] = useState('');
  const [lightsCrack, setLightsCrack] = useState('');
  const [powerWindowsImage, setPowerWindowsImage] = useState('');
  const [musicImage, setMusicImage] = useState('');
  const [electricalImage, setElectricalImage] = useState('');
  const [parkingImage, setParkingImage] = useState('');
  const [overallImage, setOverallImage] = useState('');
  const [jackToolImage, setJackToolImage] = useState('');
  const [lightsCrackImage, setLightsCrackImage] = useState('');
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const [rating, setRating] = useState(0);

  const selectAddElectrical = useAppSelector(state => state.addElectrical);
  const selectUpdateElectrical = useAppSelector(
    state => state.updateElectrical,
  );
  const selectGetElectrical = useAppSelector(state => state.getElectrical);
  const selectUploadImage = useAppSelector(state => state.uploadImage);

  const [type, setType] = useState<ElectType>();

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetElectricalDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveImage(image: any) {
    if (image.length !== 0) {
      dispatch(onUploadImage(image[0], 'electricals-images'));
    }
  }

  function submit() {
    if (route.params.from === 'add') {
      setLoading(true);
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
          powerWindowsImage,
          musicImage,
          electricalImage,
          parkingImage,
          overallImage,
          jackToolImage,
          lightsCrackImage,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          rating,
        ),
      );
    } else {
      setLoading(true);
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
          powerWindowsImage,
          musicImage,
          electricalImage,
          parkingImage,
          overallImage,
          jackToolImage,
          lightsCrackImage,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          rating,
        ),
      );
    }
  }

  function onOpenImagePicker(imageType: ElectType) {
    setOpenImagePicker(true);
    switch (imageType) {
      case 'powerWindows':
        setType('powerWindows');
        break;
      case 'electrical':
        setType('electrical');
        break;
      case 'jackTool':
        setType('jackTool');
        break;
      case 'lightsCrack':
        setType('lightsCrack');
        break;
      case 'music':
        setType('music');
        break;
      case 'overall':
        setType('overall');
        break;
      case 'parking':
        setType('parking');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (selectAddElectrical.called) {
      setLoading(false);
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
      setLoading(false);
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
      setLoading(false);
      const {data, error} = selectGetElectrical;
      if (!error && data) {
        if (data.power_windows) {
          setPowerWindows(data.power_windows);
        }
        if (data.music_system) {
          setMusic(data.music_system);
        }
        if (data.electrical_odomoter) {
          setElectrical(data.electrical_odomoter);
        }
        if (data.parking_sensor) {
          setParking(data.parking_sensor);
        }
        if (data.overall) {
          setOverall(data.overall);
        }
        if (data.jack_tool_box) {
          setJackTool(data.jack_tool_box);
        }
        if (data.lights_crack_broken) {
          setLightsCrack(data.lights_crack_broken);
        }
        let temp = [...electricalType];

        if (data.power_windows_image) {
          setPowerWindowsImage(data.power_windows_image.file);
          temp[0].url = data.power_windows_image.url;
        }
        if (data.music_system_image) {
          setMusicImage(data.music_system_image.file);
          temp[1].url = data.music_system_image.url;
        }
        if (data.electrical_odomoter_image) {
          setElectricalImage(data.electrical_odomoter_image.file);
          temp[2].url = data.electrical_odomoter_image.url;
        }
        if (data.parking_sensor_image) {
          setParkingImage(data.parking_sensor_image.file);
          temp[3].url = data.parking_sensor_image.url;
        }
        if (data.overall_image) {
          setOverallImage(data.overall_image.file);
          temp[4].url = data.overall_image.url;
        }
        if (data.jack_tool_box_image) {
          setJackToolImage(data.jack_tool_box_image.file);
          temp[5].url = data.jack_tool_box_image.url;
        }
        if (data.lights_crack_broken_image) {
          setLightsCrackImage(data.lights_crack_broken_image.file);
          temp[6].url = data.lights_crack_broken_image.url;
        }
        if (data.overall_rating) {
          setRating(data.overall_rating);
        }
        setElectricalType([...temp]);
      }
    }
    if (selectUploadImage.called) {
      const {error, image, success} = selectUploadImage;
      if (!error && success && image) {
        let temp = [...electricalType];
        switch (type) {
          case 'powerWindows':
            temp[0].url = image.url;
            setPowerWindowsImage(image.file);
            break;
          case 'music':
            temp[1].url = image.url;
            setMusicImage(image.file);
            break;
          case 'electrical':
            temp[2].url = image.url;
            setElectricalImage(image.file);
            break;
          case 'parking':
            temp[3].url = image.url;
            setParkingImage(image.file);
            break;
          case 'overall':
            temp[4].url = image.url;
            setOverallImage(image.file);
            break;
          case 'jackTool':
            temp[5].url = image.url;
            setJackToolImage(image.file);
            break;
          case 'lightsCrack':
            temp[6].url = image.url;
            setLightsCrackImage(image.file);
            break;
        }
        setElectricalType([...temp]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectAddElectrical,
    selectUpdateElectrical,
    selectGetElectrical,
    selectUploadImage,
  ]);

  const updateRating = (key: number) => {
    setRating(key);
  };

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
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
            selectValue={powerWindows}
            isImage
            onPressCamera={() => onOpenImagePicker('powerWindows')}
            selectPhoto={electricalType[0].url}
          />
          <RadioButtons
            label="Music system"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setMusic(value)}
            selectValue={music}
            isImage
            onPressCamera={() => onOpenImagePicker('music')}
            selectPhoto={electricalType[1].url}
          />
          <RadioButtons
            label="Eletrical odomoter"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setElectrical(value)}
            selectValue={electrical}
            isImage
            onPressCamera={() => onOpenImagePicker('electrical')}
            selectPhoto={electricalType[2].url}
          />
          <RadioButtons
            label="Parking sensor"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setParking(value)}
            selectValue={parking}
            isImage
            onPressCamera={() => onOpenImagePicker('parking')}
            selectPhoto={electricalType[3].url}
          />
          <RadioButtons
            label="Overall"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setOverall(value)}
            selectValue={overall}
            isImage
            onPressCamera={() => onOpenImagePicker('overall')}
            selectPhoto={electricalType[4].url}
          />
          <RadioButtons
            label="Jack and Tool box"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setJackTool(value)}
            selectValue={jackTool}
            isImage
            onPressCamera={() => onOpenImagePicker('jackTool')}
            selectPhoto={electricalType[5].url}
          />
          <RadioButtons
            label="Lights crack broken"
            data={[
              {label: 'YES', value: 'yes'},
              {label: 'NO', value: 'no'},
            ]}
            onSelect={(label, value) => setLightsCrack(value)}
            selectValue={lightsCrack}
            isImage
            onPressCamera={() => onOpenImagePicker('lightsCrack')}
            selectPhoto={electricalType[6].url}
          />
        </Box>
        <Box pv={'2%'}>
          <Rating
            onPress={value => updateRating(value)}
            defaultRating={rating}
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
    marginTop: '1rem',
  },
});

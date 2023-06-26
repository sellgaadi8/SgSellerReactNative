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
import {TwoWheelerElectricalsProps} from '../../types/propsTypes';
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
import Loader from '../../components/Loader';

type ElectType =
  | 'headlight'
  | 'tailLight'
  | 'brakeLight'
  | 'front_turn_indicator'
  | 'rear_turn_indicator'
  | 'ignition_switch'
  | 'indicator_switch'
  | 'horn'
  | 'headlight_switch'
  | 'passing_light_switch'
  | 'self_starter_switch'
  | 'high_low_beam_switch'
  | 'instrument_cluster'
  | 'battery'
  | 'lockset';

export default function TwoWheelerElectrical({
  navigation,
  route,
}: TwoWheelerElectricalsProps) {
  const {vehicleId, vehicleType} = useContext(GlobalContext);
  const [electricalType, setElectricalType] = useState(
    vehicleType === 'two_wheeler'
      ? [
          {title: 'Headlight', id: 'headlight', url: '', selectedValue: ''},
          {title: 'Tail Light', id: 'tailLight', url: '', selectedValue: ''},
          {title: 'Brake Light', id: 'brakeLight', url: '', selectedValue: ''},
          {
            title: 'Front Turn Indicator',
            id: 'front_turn_indicator',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Rear Turn Indicator',
            id: 'rear_turn_indicator',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Ignition Switch',
            id: 'ignition_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Indicator Switch',
            id: 'indicator_switch',
            url: '',
            selectedValue: '',
          },
          {title: 'Horn', id: 'horn', url: '', selectedValue: ''},
          {
            title: 'Headlight Switch',
            id: 'headlight_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Passing Light Switch',
            id: 'passing_light_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Self Starter Switch',
            id: 'self_starter_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'High & Low Beam Switch',
            id: 'high_low_beam_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Instrument Cluster',
            id: 'instrument_cluster',
            url: '',
            selectedValue: '',
          },
          {title: 'Battery', id: 'battery', url: '', selectedValue: ''},
          {title: 'Lockset', id: 'lockset', url: '', selectedValue: ''},
        ]
      : [
          {title: 'Headlight', id: 'headlight', url: '', selectedValue: ''},
          {title: 'Tail Light', id: 'tailLight', url: '', selectedValue: ''},
          {title: 'Brake Light', id: 'brakeLight', url: '', selectedValue: ''},
          {
            title: 'Front Turn Indicator',
            id: 'front_turn_indicator',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Rear Turn Indicator',
            id: 'rear_turn_indicator',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Ignition Switch',
            id: 'ignition_switch',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Indicator Switch',
            id: 'indicator_switch',
            url: '',
            selectedValue: '',
          },
        ],
  );

  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [item3, setItem3] = useState('');
  const [item4, setItem4] = useState('');
  const [item5, setItem5] = useState('');
  const [item6, setItem6] = useState('');
  const [item7, setItem7] = useState('');
  const [item8, setItem8] = useState('');
  const [item9, setItem9] = useState('');
  const [item10, setItem10] = useState('');
  const [item11, setItem11] = useState('');
  const [item12, setItem12] = useState('');
  const [item13, setItem13] = useState('');
  const [item14, setItem14] = useState('');
  const [item15, setItem15] = useState('');

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [image7, setImage7] = useState('');
  const [image8, setImage8] = useState('');
  const [image9, setImage9] = useState('');
  const [image10, setImage10] = useState('');
  const [image11, setImage11] = useState('');
  const [image12, setImage12] = useState('');
  const [image13, setImage13] = useState('');
  const [image14, setImage14] = useState('');
  const [image15, setImage15] = useState('');

  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

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
    if (image) {
      dispatch(onUploadImage(image[0], 'electricals-images'));
    }
  }

  function submit() {
    if (route.params.from === 'add') {
      setLoading(true);
      dispatch(
        onAddElectrical(
          vehicleId,
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
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          item7,
          item8,
          item9,
          item10,
          item11,
          item12,
          item13,
          item14,
          item15,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          image11,
          image12,
          image13,
          image14,
          image15,
        ),
      );
    } else {
      setLoading(true);
      dispatch(
        onUpdateElectrical(
          vehicleId,
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
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          item7,
          item8,
          item9,
          item10,
          item11,
          item12,
          item13,
          item14,
          item15,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          image8,
          image9,
          image10,
          image11,
          image12,
          image13,
          image14,
          image15,
        ),
      );
    }
  }

  function onOpenImagePicker(imageType: string) {
    setOpenImagePicker(true);
    switch (imageType) {
      case 'headlight':
        setType('headlight');
        break;
      case 'tailLight':
        setType('tailLight');
        break;
      case 'brakeLight':
        setType('brakeLight');
        break;
      case 'front_turn_indicator':
        setType('front_turn_indicator');
        break;
      case 'rear_turn_indicator':
        setType('rear_turn_indicator');
        break;
      case 'ignition_switch':
        setType('ignition_switch');
        break;
      case 'indicator_switch':
        setType('indicator_switch');
        break;
      case 'horn':
        setType('horn');
        break;
      case 'headlight_switch':
        setType('headlight_switch');
        break;
      case 'passing_light_switch':
        setType('passing_light_switch');
        break;
      case 'self_starter_switch':
        setType('self_starter_switch');
        break;
      case 'high_low_beam_switch':
        setType('high_low_beam_switch');
        break;
      case 'instrument_cluster':
        setType('instrument_cluster');
        break;
      case 'battery':
        setType('battery');
        break;
      case 'lockset':
        setType('lockset');
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
    // if (selectGetElectrical.called) {
    //   setLoading(false);
    //   const {data, error} = selectGetElectrical;
    //   if (!error && data) {
    //     setPowerWindows(data.power_windows);
    //     setMusic(data.music_system);
    //     setElectrical(data.electrical_odomoter);
    //     setParking(data.parking_sensor);
    //     setOverall(data.overall);
    //     setJackTool(data.jack_tool_box);
    //     setLightsCrack(data.lights_crack_broken);
    //     let temp = [...electricalType];

    //     if (data.power_windows_image) {
    //       setPowerWindowsImage(data.power_windows_image.file);
    //       temp[0].url = data.power_windows_image.url;
    //     }
    //     if (data.music_system_image) {
    //       setMusicImage(data.music_system_image.file);
    //       temp[1].url = data.music_system_image.url;
    //     }
    //     if (data.electrical_odomoter_image) {
    //       setElectricalImage(data.electrical_odomoter_image.file);
    //       temp[2].url = data.electrical_odomoter_image.url;
    //     }
    //     if (data.parking_sensor_image) {
    //       setParkingImage(data.parking_sensor_image.file);
    //       temp[3].url = data.parking_sensor_image.url;
    //     }
    //     if (data.overall_image) {
    //       setOverallImage(data.overall_image.file);
    //       temp[4].url = data.overall_image.url;
    //     }
    //     if (data.jack_tool_box_image) {
    //       setJackToolImage(data.jack_tool_box_image.file);
    //       temp[5].url = data.jack_tool_box_image.url;
    //     }
    //     if (data.lights_crack_broken_image) {
    //       setLightsCrackImage(data.lights_crack_broken_image.file);
    //       temp[6].url = data.lights_crack_broken_image.url;
    //     }
    //     setElectricalType([...temp]);
    //   }
    // }
    if (selectUploadImage.called) {
      const {error, image, success} = selectUploadImage;
      if (!error && success && image) {
        let temp = [...electricalType];
        switch (type) {
          case 'headlight':
            temp[0].url = image.url;
            setImage1(image.file);
            break;
          case 'tailLight':
            temp[1].url = image.url;
            setImage2(image.file);
            break;
          case 'brakeLight':
            temp[2].url = image.url;
            setImage3(image.file);
            break;
          case 'front_turn_indicator':
            temp[3].url = image.url;
            setImage4(image.file);
            break;
          case 'rear_turn_indicator':
            temp[4].url = image.url;
            setImage5(image.file);
            break;
          case 'ignition_switch':
            temp[5].url = image.url;
            setImage6(image.file);
            break;
          case 'indicator_switch':
            temp[6].url = image.url;
            setImage7(image.file);
            break;
          case 'horn':
            temp[7].url = image.url;
            setImage8(image.file);
            break;
          case 'headlight_switch':
            temp[8].url = image.url;
            setImage9(image.file);
            break;
          case 'passing_light_switch':
            temp[9].url = image.url;
            setImage10(image.file);
            break;
          case 'self_starter_switch':
            temp[10].url = image.url;
            setImage11(image.file);
            break;
          case 'high_low_beam_switch':
            temp[11].url = image.url;
            setImage12(image.file);
            break;
          case 'instrument_cluster':
            temp[12].url = image.url;
            setImage13(image.file);
            break;
          case 'battery':
            temp[13].url = image.url;
            setImage14(image.file);
            break;
          case 'lockset':
            temp[14].url = image.url;
            setImage15(image.file);
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

  function onChangeValue(label: string, value: string, index: number) {
    let temp = [...electricalType];
    switch (index) {
      case 0:
        setItem1(value);
        temp[0].selectedValue = value;
        break;
      case 1:
        setItem2(value);
        temp[1].selectedValue = value;
        break;
      case 2:
        setItem3(value);
        temp[2].selectedValue = value;
        break;
      case 3:
        setItem4(value);
        temp[3].selectedValue = value;
        break;
      case 4:
        setItem5(value);
        temp[4].selectedValue = value;
        break;
      case 5:
        setItem6(value);
        temp[5].selectedValue = value;
        break;
      case 6:
        setItem7(value);
        temp[6].selectedValue = value;
        break;
      case 7:
        setItem8(value);
        temp[7].selectedValue = value;
        break;
      case 8:
        setItem9(value);
        temp[8].selectedValue = value;
        break;
      case 9:
        setItem10(value);
        temp[9].selectedValue = value;
        break;
      case 10:
        setItem11(value);
        temp[10].selectedValue = value;
        break;
      case 11:
        setItem12(value);
        temp[11].selectedValue = value;
        break;
      case 12:
        setItem13(value);
        temp[12].selectedValue = value;
        break;
      case 13:
        setItem14(value);
        temp[13].selectedValue = value;
        break;
      case 14:
        setItem15(value);
        temp[14].selectedValue = value;
        break;
      default:
        break;
    }
    setElectricalType([...temp]);
  }

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
          {electricalType.map((el, index) => {
            return (
              <RadioButtons
                label={el.title}
                data={[
                  {label: 'OK', value: 'ok'},
                  {label: 'NOT OK', value: 'not_ok'},
                ]}
                onSelect={(label, value) => onChangeValue(label, value, index)}
                selectValue={el.selectedValue}
                isImage
                onPressCamera={() => onOpenImagePicker(el.id)}
                selectPhoto={el.url}
              />
            );
          })}
          {/* <RadioButtons
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
          /> */}
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

import {ScrollView, ToastAndroid} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container, contentCenter} from '../../utils/styles';
import PrimaryButton from '../../components/PrimaryButton';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../utils/hooks';
import ImagePicker from '../../components/ImagePicker';
import {onAddExterior} from '../../redux/ducks/addExterior';
import GlobalContext from '../../contexts/GlobalContext';
import Snackbar from 'react-native-snackbar';
import {ExteriorProps, ImageType} from '../../types/propsTypes';
import {onGetExteriorData} from '../../redux/ducks/getExterior';
import {onUpdateExterior} from '../../redux/ducks/updateExterior';
import Loader from '../../components/Loader';
import BasePicker from '../../components/BasePicker';
import {onUploadImage} from '../../redux/ducks/uploadImage';
import Rating from '../../components/Rating';
const list = [
  {label: 'Ok', value: 'ok'},
  {label: 'Scratched', value: 'scratched'},
  {label: 'Dented', value: 'dented'},
  {label: 'Repainted', value: 'repainted'},
];

export default function TwoWheelerExterior({navigation, route}: ExteriorProps) {
  const [twoWheelerType, setTwoWheelerType] = useState([
    {
      id: 'headlight_visor',
      name: 'Headlight Visor',
      url: '',
      selectedValue: '',
    },
    {id: 'front_panel', name: 'Front Panel', url: '', selectedValue: ''},
    {id: 'mudguard_front', name: 'Mudguard Front', url: '', selectedValue: ''},
    {id: 'fuel_tank', name: 'Fuel Tank', url: '', selectedValue: ''},
    {
      id: 'front_panel_left',
      name: 'Front Panel - Left Side',
      url: '',
      selectedValue: '',
    },
    {
      id: 'middle_panel',
      name: 'Middle Panel - Left Side',
      url: '',
      selectedValue: '',
    },
    {id: 'chassis', name: 'Chassis', url: '', selectedValue: ''},
    {
      id: 'engine_guard_left',
      name: 'Engine Guard - Left Side',
      url: '',
      selectedValue: '',
    },
    {
      id: 'pillion_footrest',
      name: 'Pillion Footrest',
      url: '',
      selectedValue: '',
    },
    {
      id: 'rear_panel_left',
      name: 'Rear Panel - Left Side',
      url: '',
      selectedValue: '',
    },
    {id: 'mudguard_rear', name: 'Mudguard Rear', url: '', selectedValue: ''},
    {
      id: 'silencer_assembly',
      name: 'Silencer Assembly',
      url: '',
      selectedValue: '',
    },
    {
      id: 'rear_panel_right',
      name: 'Rear Panel - Right Side',
      url: '',
      selectedValue: '',
    },
    {
      id: 'middle_panel_right',
      name: 'Middle Panel - Right Side',
      url: '',
      selectedValue: '',
    },
    {
      id: 'engine_guard_right',
      name: 'Engine Guard - Right Side',
      url: '',
      selectedValue: '',
    },
    {
      id: 'front_panel_right',
      name: 'Front Panel - Right Side',
      url: '',
      selectedValue: '',
    },
  ]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
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
  const [image16, setImage16] = useState('');

  const [item1, setItem1] = useState('ok');
  const [item2, setItem2] = useState('ok');
  const [item3, setItem3] = useState('ok');
  const [item4, setItem4] = useState('ok');
  const [item5, setItem5] = useState('ok');
  const [item6, setItem6] = useState('ok');
  const [item7, setItem7] = useState('ok');
  const [item8, setItem8] = useState('ok');
  const [item9, setItem9] = useState('ok');
  const [item10, setItem10] = useState('ok');
  const [item11, setItem11] = useState('ok');
  const [item12, setItem12] = useState('ok');
  const [item13, setItem13] = useState('ok');
  const [item14, setItem14] = useState('ok');
  const [item15, setItem15] = useState('ok');
  const [item16, setItem16] = useState('ok');
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const [uploadType, setUploadType] =
    useState<TwoWheelerExteriorDocumentType>('headlight_visor');
  const dispatch = useDispatch<any>();
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const selectUploadExteriorImage = useAppSelector(state => state.addExterior);
  const selectGetExteriorData = useAppSelector(state => state.getExterior);
  const selectUpdateExteriorData = useAppSelector(
    state => state.updateExterior,
  );
  const {vehicleId, setVehicleId} = useContext(GlobalContext);

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetExteriorData(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveImage(image: ImageType[]) {
    if (image) {
      dispatch(onUploadImage(image, 'exterior-images'));
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {success, message, image} = selectUploadImage;
      let temp = [...twoWheelerType];

      if (success && image) {
        switch (uploadType) {
          case 'headlight_visor':
            setImage1(image.file);
            temp[0].url = image.url;
            break;
          case 'front_panel':
            setImage2(image.file);
            temp[1].url = image.url;
            break;
          case 'mudguard_front':
            setImage3(image.file);
            temp[2].url = image.url;
            break;
          case 'fuel_tank':
            setImage4(image.file);
            temp[3].url = image.url;
            break;
          case 'front_panel_left':
            setImage5(image.file);
            temp[4].url = image.url;
            break;
          case 'middle_panel':
            setImage6(image.file);
            temp[5].url = image.url;
            break;
          case 'chassis':
            setImage7(image.file);
            temp[6].url = image.url;
            break;
          case 'engine_guard_left':
            setImage8(image.file);
            temp[7].url = image.url;
            break;
          case 'pillion_footrest':
            setImage9(image.file);
            temp[8].url = image.url;
            break;
          case 'rear_panel_left':
            setImage10(image.file);
            temp[9].url = image.url;
            break;
          case 'mudguard_rear':
            setImage11(image.file);
            temp[10].url = image.url;
            break;
          case 'silencer_assembly':
            setImage12(image.file);
            temp[11].url = image.url;
            break;
          case 'rear_panel_right':
            setImage13(image.file);
            temp[12].url = image.url;
            break;
          case 'middle_panel_right':
            setImage14(image.file);
            temp[13].url = image.url;
            break;
          case 'engine_guard_right':
            setImage15(image.file);
            temp[14].url = image.url;
            break;
          case 'front_panel_right':
            setImage16(image.file);
            temp[15].url = image.url;
            break;
          default:
            break;
        }
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }

      setTwoWheelerType([...temp]);
    }
    if (selectUploadExteriorImage.called) {
      setLoading(false);
      const {error, success, message, uuid} = selectUploadExteriorImage;
      if (!error && success) {
        navigation.navigate('AddVehicle', {from: 'edit'});
        setVehicleId(uuid);
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetExteriorData.called) {
      setLoading(false);
      const {error, data} = selectGetExteriorData;
      if (!error && data) {
        let temp = [...twoWheelerType];
        setItem1(data.headlight_visor.toLowerCase());
        temp[0].selectedValue = data.headlight_visor.toLowerCase();
        setItem2(data.front_panel.toLowerCase());
        temp[1].selectedValue = data.front_panel.toLowerCase();
        setItem3(data.mudguard_front.toLowerCase());
        temp[2].selectedValue = data.mudguard_front.toLowerCase();
        setItem4(data.fuel_tank.toLowerCase());
        temp[3].selectedValue = data.fuel_tank.toLowerCase();
        setItem5(data.front_panel_left.toLowerCase());
        temp[4].selectedValue = data.front_panel_left.toLowerCase();
        setItem6(data.middle_panel.toLowerCase());
        temp[5].selectedValue = data.middle_panel.toLowerCase();
        setItem7(data.chassis.toLowerCase());
        temp[6].selectedValue = data.chassis.toLowerCase();
        setItem8(data.engine_guard_left.toLowerCase());
        temp[7].selectedValue = data.engine_guard_left.toLowerCase();
        setItem9(data.pillion_footrest.toLowerCase());
        temp[8].selectedValue = data.pillion_footrest.toLowerCase();
        setItem10(data.rear_panel_left.toLowerCase());
        temp[9].selectedValue = data.rear_panel_left.toLowerCase();
        setItem11(data.mudguard_rear.toLowerCase());
        temp[10].selectedValue = data.mudguard_rear.toLowerCase();
        setItem12(data.silencer_assembly.toLowerCase());
        temp[11].selectedValue = data.silencer_assembly.toLowerCase();
        setItem13(data.rear_panel_right.toLowerCase());
        temp[12].selectedValue = data.rear_panel_right.toLowerCase();
        setItem14(data.middle_panel_right.toLowerCase());
        temp[13].selectedValue = data.middle_panel_right.toLowerCase();
        setItem15(data.engine_guard_right.toLowerCase());
        temp[14].selectedValue = data.engine_guard_right.toLowerCase();
        setItem16(data.front_panel_right.toLowerCase());
        temp[15].selectedValue = data.front_panel_right.toLowerCase();

        if (data.headlight_visor_image) {
          temp[0].url = data.headlight_visor_image.url;
          setImage1(data.headlight_visor_image.file);
        }
        if (data.front_panel_image) {
          temp[1].url = data.front_panel_image.url;
          setImage2(data.front_panel_image.file);
        }
        if (data.mudguard_front_image) {
          temp[2].url = data.mudguard_front_image.url;
          setImage3(data.mudguard_front_image.file);
        }
        if (data.fuel_tank_image) {
          temp[3].url = data.fuel_tank_image.url;
          setImage4(data.fuel_tank_image.file);
        }
        if (data.front_panel_left_image) {
          temp[4].url = data.front_panel_left_image.url;
          setImage5(data.front_panel_left_image.file);
        }
        if (data.middle_panel_image) {
          temp[5].url = data.middle_panel_image.url;
          setImage6(data.middle_panel_image.file);
        }
        if (data.chassis_image) {
          temp[6].url = data.chassis_image.url;
          setImage7(data.chassis_image.file);
        }
        if (data.engine_guard_left_image) {
          temp[7].url = data.engine_guard_left_image.url;
          setImage8(data.engine_guard_left_image.file);
        }
        if (data.pillion_footrest_image) {
          temp[8].url = data.pillion_footrest_image.url;
          setImage9(data.pillion_footrest_image.file);
        }
        if (data.rear_panel_left_image) {
          temp[9].url = data.rear_panel_left_image.url;
          setImage10(data.rear_panel_left_image.file);
        }
        if (data.mudguard_rear_image) {
          temp[10].url = data.mudguard_rear_image.url;
          setImage11(data.mudguard_rear_image.file);
        }
        if (data.silencer_assembly_image) {
          temp[11].url = data.silencer_assembly_image.url;
          setImage12(data.silencer_assembly_image.file);
        }
        if (data.rear_panel_right_image) {
          temp[12].url = data.rear_panel_right_image.url;
          setImage13(data.rear_panel_right_image.file);
        }
        if (data.middle_panel_right_image) {
          temp[13].url = data.middle_panel_right_image.url;
          setImage14(data.middle_panel_right_image.file);
        }
        if (data.engine_guard_right_image) {
          temp[14].url = data.engine_guard_right_image.url;
          setImage15(data.engine_guard_right_image.file);
        }
        if (data.front_panel_right_image) {
          temp[15].url = data.front_panel_right_image.url;
          setImage16(data.front_panel_right_image.file);
        }
        if (data.overall_rating) {
          setRating(data.overall_rating);
        }
        setTwoWheelerType([...temp]);
      }
    }
    if (selectUpdateExteriorData.called) {
      setLoading(false);
      const {error, success, message} = selectUpdateExteriorData;
      if (!error && success) {
        navigation.navigate('AddVehicle', {from: 'edit'});
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectUploadImage,
    selectUploadExteriorImage,
    selectGetExteriorData,
    selectUpdateExteriorData,
  ]);

  function onSubmit() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onAddExterior(
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
          item16,
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
          image16,
          rating,
        ),
      );
    } else {
      dispatch(
        onUpdateExterior(
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
          item16,
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
          image16,
          rating,
        ),
      );
    }
  }

  function onOpenPicker(type: string) {
    setOpenImagePicker(true);
    switch (type) {
      case 'headlight_visor':
        setUploadType('headlight_visor');
        break;
      case 'chassis':
        setUploadType('chassis');
        break;
      case 'engine_guard_left':
        setUploadType('engine_guard_left');
        break;
      case 'engine_guard_right':
        setUploadType('engine_guard_right');
        break;
      case 'front_panel_left':
        setUploadType('front_panel_left');
        break;
      case 'front_panel':
        setUploadType('front_panel');
        break;
      case 'front_panel_right':
        setUploadType('front_panel_right');
        break;
      case 'fuel_tank':
        setUploadType('fuel_tank');
        break;
      case 'middle_panel':
        setUploadType('middle_panel');
        break;
      case 'middle_panel_right':
        setUploadType('middle_panel_right');
        break;
      case 'mudguard_front':
        setUploadType('mudguard_front');
        break;
      case 'mudguard_rear':
        setUploadType('mudguard_rear');
        break;
      case 'pillion_footrest':
        setUploadType('pillion_footrest');
        break;
      case 'rear_panel_left':
        setUploadType('rear_panel_left');
        break;
      case 'rear_panel_right':
        setUploadType('rear_panel_right');
        break;
      case 'silencer_assembly':
        setUploadType('silencer_assembly');
        break;
    }
  }

  function onChangeValue(value: string, index: number) {
    let temp = [...twoWheelerType];
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
      case 15:
        setItem16(value);
        temp[15].selectedValue = value;
        break;
      default:
        break;
    }
    setTwoWheelerType([...temp]);
  }

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
          Step 4: Exterior
        </CustomText>
        <Box pv={'2%'}>
          {twoWheelerType.map((el, index) => {
            return (
              <BasePicker
                key={index.toString()}
                data={list}
                title={el.name}
                onValueChange={value => onChangeValue(value, index)}
                selectedValue={el.selectedValue}
                onPressCamera={() => onOpenPicker(el.id)}
                selectPhoto={el.url}
              />
            );
          })}
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
              onPress={() => console.log('')}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton
              label={route.params.from === 'add' ? 'Save' : 'Update'}
              onPress={onSubmit}
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
  card: {
    borderWidth: 1,
    ...contentCenter,
    padding: '1rem',
    borderColor: '#79747E',
    borderRadius: 4,
    marginBottom: '3rem',
  },
  image: {
    height: pixelSizeVertical(170),
    width: pixelSizeHorizontal(320),
  },
  content: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFFFFF',
    left: 20,
    paddingHorizontal: '0.5rem',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1rem',
    marginBottom: '3rem',
  },
});

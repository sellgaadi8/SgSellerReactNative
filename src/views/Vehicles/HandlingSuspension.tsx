import {ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BasePicker from '../../components/BasePicker';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import ImagePicker from '../../components/ImagePicker';
import Loader from '../../components/Loader';
import PrimaryButton from '../../components/PrimaryButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {pixelSizeVertical, pixelSizeHorizontal} from '../../utils/responsive';
import {container, contentCenter} from '../../utils/styles';
import DocumentPicker from 'react-native-document-picker';
import {HandlingSuspensionProps, ImageType} from '../../types/propsTypes';
import {useAppSelector} from '../../utils/hooks';
import {useDispatch} from 'react-redux';
import {onUploadImage} from '../../redux/ducks/uploadImage';
import {onAddSuspension} from '../../redux/ducks/addSuspensionData';
import {onUpdateSuspension} from '../../redux/ducks/updateSuspensionData';
import GlobalContext from '../../contexts/GlobalContext';
import Snackbar from 'react-native-snackbar';
import {onGetSuspensionDetails} from '../../redux/ducks/getSuspensionData';
import Rating from '../../components/Rating';

const list = [
  {label: 'Ok', value: 'ok'},
  {label: 'Scratched', value: 'scratched'},
  {label: 'Dented', value: 'dented'},
  {label: 'Repainted', value: 'repainted'},
];

export default function HandlingSuspension({
  route,
  navigation,
}: HandlingSuspensionProps) {
  const [handlingSusp, setHandlingSusp] = useState([
    {id: 'handle', name: 'Handle', url: '', selectedValue: ''},
    {
      id: 'front_shock_absorber',
      name: 'Front Shock Absorber',
      url: '',
      selectedValue: '',
    },
    {
      id: 'rear_shock_absorber',
      name: 'Rear Shock Absorber',
      url: '',
      selectedValue: '',
    },
    {
      id: 'front_brake_condition',
      name: 'Front Brake Condition',
      url: '',
      selectedValue: '',
    },
    {
      id: 'rear_brake_condition',
      name: 'Rear Brake Condition',
      url: '',
      selectedValue: '',
    },
  ]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [item1, setItem1] = useState('ok');
  const [item2, setItem2] = useState('ok');
  const [item3, setItem3] = useState('ok');
  const [item4, setItem4] = useState('ok');
  const [item5, setItem5] = useState('ok');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<HandleSusType>('handle');
  const dispatch = useDispatch<any>();
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const selectAddSuspension = useAppSelector(state => state.addSuspensionData);
  const selectUpdateSuspension = useAppSelector(
    state => state.updateSuspensionData,
  );
  const selectGetSuspension = useAppSelector(state => state.getSuspensionData);
  const {vehicleId} = useContext(GlobalContext);

  useEffect(() => {
    navigation.setParams({
      title: route.params.from === 'add' ? 'Add Vehicle' : 'Edit Vehicle',
    });
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetSuspensionDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onOpenPicker(type: string) {
    setOpenImagePicker(true);
    switch (type) {
      case 'handle':
        setUploadType('handle');
        break;
      case 'front_brake_condition':
        setUploadType('front_brake_condition');
        break;
      case 'front_shock_absorber':
        setUploadType('front_shock_absorber');
        break;
      case 'rear_brake_condition':
        setUploadType('rear_brake_condition');
        break;
      case 'rear_shock_absorber':
        setUploadType('rear_shock_absorber');
        break;
    }
  }

  function onChangeValue(value: string, index: number) {
    let temp = [...handlingSusp];
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
    }
    setHandlingSusp([...temp]);
  }

  function onSaveImage(image: ImageType[]) {
    if (image) {
      dispatch(onUploadImage(image[0], 'exterior-images'));
    }
  }

  function onSubmit() {
    setLoading(true);
    if (route.params.from === 'add') {
      setLoading(true);
      dispatch(
        onAddSuspension(
          vehicleId,
          item1,
          item2,
          item3,
          item4,
          item5,
          image1,
          image2,
          image3,
          image4,
          image5,
          rating,
        ),
      );
    } else {
      setLoading(true);
      dispatch(
        onUpdateSuspension(
          vehicleId,
          item1,
          item2,
          item3,
          item4,
          item5,
          image1,
          image2,
          image3,
          image4,
          image5,
          rating,
        ),
      );
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {success, image, message} = selectUploadImage;
      let temp = [...handlingSusp];

      if (success && image) {
        switch (uploadType) {
          case 'handle':
            setImage1(image.file);
            temp[0].url = image.url;
            break;
          case 'front_shock_absorber':
            setImage2(image.file);
            temp[1].url = image.url;
            break;
          case 'rear_shock_absorber':
            setImage3(image.file);
            temp[2].url = image.url;
            break;
          case 'front_brake_condition':
            setImage4(image.file);
            temp[3].url = image.url;
            break;
          case 'rear_brake_condition':
            setImage5(image.file);
            temp[4].url = image.url;
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

      setHandlingSusp([...temp]);
    }

    if (selectAddSuspension.called) {
      setLoading(false);
      const {error, success, message} = selectAddSuspension;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectUpdateSuspension.called) {
      setLoading(false);
      const {error, success, message} = selectUpdateSuspension;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetSuspension.called) {
      setLoading(false);
      const {error, data} = selectGetSuspension;
      if (!error && data) {
        let temp = [...handlingSusp];
        setItem1(data.handle);
        temp[0].selectedValue = data.handle;
        setItem2(data.front_shock_absorber);
        temp[1].selectedValue = data.front_shock_absorber;
        setItem3(data.rear_shock_absorber);
        temp[2].selectedValue = data.rear_shock_absorber;
        setItem4(data.front_brake_condition);
        temp[3].selectedValue = data.front_brake_condition;
        setItem5(data.rear_brake_condition);
        temp[4].selectedValue = data.rear_brake_condition;
        if (data.handle_image) {
          setImage1(data.handle_image.file);
          temp[0].url = data.handle_image.url;
        }
        if (data.front_shock_absorber_image) {
          setImage2(data.front_shock_absorber_image.file);
          temp[0].url = data.front_shock_absorber_image.url;
        }
        if (data.rear_shock_absorber_image) {
          setImage3(data.rear_shock_absorber_image.file);
          temp[0].url = data.rear_shock_absorber_image.url;
        }
        if (data.front_brake_condition_image) {
          setImage4(data.front_brake_condition_image.file);
          temp[0].url = data.front_brake_condition_image.url;
        }
        if (data.rear_brake_condition_image) {
          setImage5(data.rear_brake_condition_image.file);
          temp[0].url = data.rear_brake_condition_image.url;
        }
        if (data.overall_rating) {
          setRating(data.overall_rating);
        }
        setHandlingSusp([...temp]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectUploadImage,
    selectAddSuspension,
    selectUpdateSuspension,
    selectGetSuspension,
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
          Step 5: Handling and Suspension
        </CustomText>
        <Box pv={'2%'}>
          {handlingSusp.map((el, index) => {
            console.log('el', el.selectedValue);

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
              onPress={() => navigation.goBack()}
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

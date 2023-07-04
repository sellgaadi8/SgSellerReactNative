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
import PrimaryButton from '../../components/PrimaryButton';
import {TyresProps, TyresType} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onAddTyres} from '../../redux/ducks/addTyres';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onUpdateTyres} from '../../redux/ducks/updateTyres';
import {onGetTyresDetails} from '../../redux/ducks/getTyres';
import Loader from '../../components/Loader';
import BasePicker from '../../components/BasePicker';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {onUploadImage} from '../../redux/ducks/uploadImage_video';
import Rating from '../../components/Rating';

const list = [
  {label: 'Select', value: ''},
  {label: '0-20%', value: '0-20'},
  {label: '21-40%', value: '21-40'},
  {label: '41-60%', value: '41-60'},
  {label: '61-80%', value: '61-80'},
  {label: '81-100%', value: '81-100'},
];

export default function Tyres({navigation, route}: TyresProps) {
  const {vehicleId, vehicleType} = useContext(GlobalContext);
  const [tyresImage, setTyresImage] = useState(
    vehicleType === 'two_wheeler'
      ? [
          {
            title: 'Front Wheel Condition',
            id: 'front_wheel_condition',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Rear Wheel Condition',
            id: 'rear_wheel_condition',
            url: '',
            selectedValue: '',
          },
        ]
      : [
          {
            title: 'LHS front tyre ( % / damaged )',
            id: 'lhs_front_type',
            url: '',
            selectedValue: '',
          },
          {
            title: 'RHS front tyre ( % / damaged )',
            id: 'rhs_front_type',
            url: '',
            selectedValue: '',
          },
          {
            title: 'LHS Back tyre ( % / damaged )',
            id: 'lhs_back_type',
            url: '',
            selectedValue: '',
          },
          {
            title: 'RHS back tyre ( % / damaged )',
            id: 'rhs_back_type',
            url: '',
            selectedValue: '',
          },
          {
            title: 'Spare tyre (%, damaged )',
            id: 'spare_type',
            url: '',
            selectedValue: '',
          },
        ],
  );

  const [lhsfront, setLhsFront] = useState('');
  const [rhsfront, setRhsFront] = useState('');
  const [lhsback, setLhsBack] = useState('');
  const [rhsback, setRhsBack] = useState('');
  const [spare, setSpare] = useState('');
  const [lhsfrontImage, setLhsFrontImage] = useState('');
  const [rhsfrontImage, setRhsFrontImage] = useState('');
  const [lhsbackImage, setLhsBackImage] = useState('');
  const [rhsbackImage, setRhsBackImage] = useState('');
  const [spareImage, setSpareImage] = useState('');

  const [frontWheel, setFrontWheel] = useState('');
  const [rearWheel, setRearWheel] = useState('');
  const [frontWheelImage, setFrontWheelImage] = useState('');
  const [rearWheelImage, setRearWheelImage] = useState('');
  const [rating, setRating] = useState(0);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const selectAddTyres = useAppSelector(state => state.addTyres);
  const selectUpdateTyres = useAppSelector(state => state.updateTyres);
  const selectGetTyres = useAppSelector(state => state.getTyres);
  const [tyreType, setTyreType] = useState<TyresType>('lhs_front_type');
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const [errors, setErrors] = useState<TyresImageError>();

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetTyresDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveImage(image: any) {
    if (image.length !== 0) {
      dispatch(onUploadImage(image[0], 'tyres-images'));
    }
  }

  function validateInputs() {
    const tempErrors: TyresImageError = {};
    if (vehicleType === 'two_wheeler') {
      if (frontWheel.length === 0) {
        tempErrors.frontWheel = 'Front Wheel Condition field required';
        Snackbar.show({
          text: 'Front Wheel Condition field required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (rearWheel.length === 0) {
        tempErrors.rearWheel = 'Rear Wheel Condition field required';
        Snackbar.show({
          text: 'Rear Wheel Condition field required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }

      if (frontWheelImage.length === 0 || rearWheelImage.length === 0) {
        Snackbar.show({
          text: 'Kindly upload all images and select all fields',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      if (lhsfront.length === 0) {
        tempErrors.lhsfront = 'LHS front tyre ( % / damaged ) required';
        Snackbar.show({
          text: 'LHS front tyre ( % / damaged ) required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (rhsfront.length === 0) {
        tempErrors.rhsfront = 'RHS front tyre ( % / damaged ) required';
        Snackbar.show({
          text: 'RHS front tyre ( % / damaged ) required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (lhsback.length === 0) {
        tempErrors.lhsback = 'LHS Back tyre ( % / damaged ) required';
        Snackbar.show({
          text: 'LHS Back tyre ( % / damaged ) required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (rhsback.length === 0) {
        tempErrors.rhsback = 'RHS Back tyre ( % / damaged ) required';
        Snackbar.show({
          text: 'RHS Back tyre ( % / damaged ) required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (spare.length === 0) {
        tempErrors.spare = 'Spare tyre (%, damaged ) required';
        Snackbar.show({
          text: 'Spare tyre (%, damaged ) required',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      if (
        lhsfrontImage.length === 0 ||
        rhsfrontImage.length === 0 ||
        lhsbackImage.length === 0 ||
        rhsbackImage.length === 0 ||
        spareImage.length === 0
      ) {
        Snackbar.show({
          text: 'Kindly upload all images and select all fields',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function submit() {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      if (route.params.from === 'add') {
        dispatch(
          onAddTyres(
            vehicleId,
            lhsfront,
            rhsfront,
            lhsback,
            rhsback,
            spare,
            lhsfrontImage,
            rhsfrontImage,
            lhsbackImage,
            rhsbackImage,
            spareImage,
            frontWheel,
            rearWheel,
            frontWheelImage,
            rearWheelImage,
            rating,
          ),
        );
      } else {
        dispatch(
          onUpdateTyres(
            vehicleId,
            lhsfront,
            rhsfront,
            lhsback,
            rhsback,
            spare,
            lhsfrontImage,
            rhsfrontImage,
            lhsbackImage,
            rhsbackImage,
            spareImage,
            frontWheel,
            rearWheel,
            frontWheelImage,
            rearWheelImage,
            rating,
          ),
        );
      }
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {error, image} = selectUploadImage;
      let temp = [...tyresImage];

      if (!error && image) {
        if (vehicleType === 'two_wheeler') {
          switch (tyreType) {
            case 'front_wheel_condition':
              setFrontWheelImage(image.file);
              temp[0].url = image.url;
              break;
            case 'rear_wheel_condition':
              setRearWheelImage(image.file);
              temp[1].url = image.url;
              break;
          }
        } else {
          switch (tyreType) {
            case 'lhs_front_type':
              setLhsFrontImage(image.file);
              temp[0].url = image.url;
              break;
            case 'rhs_front_type':
              setRhsFrontImage(image.file);
              temp[1].url = image.url;
              break;
            case 'lhs_back_type':
              setLhsBackImage(image.file);
              temp[2].url = image.url;
              break;
            case 'rhs_back_type':
              setRhsBackImage(image.file);
              temp[3].url = image.url;
              break;
            case 'spare_type':
              setSpareImage(image.file);
              temp[4].url = image.url;
              break;
            default:
              break;
          }
        }
      }

      setTyresImage([...temp]);
    }
    if (selectAddTyres.called) {
      setLoading(false);
      const {error, message, success} = selectAddTyres;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (selectUpdateTyres.called) {
      setLoading(false);
      const {error, message, success} = selectUpdateTyres;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (selectGetTyres.called) {
      setLoading(false);
      const {error, data, success} = selectGetTyres;
      if (!error && success && data) {
        let temp = [...tyresImage];
        if (vehicleType === 'two_wheeler') {
          setFrontWheelImage(data.front_wheel_condition_image.file);
          temp[0].url = data.front_wheel_condition_image.url;

          setRearWheelImage(data.rear_wheel_condition_image.file);
          temp[1].url = data.rear_wheel_condition_image.url;
        } else {
          setLhsFront(data.lhs_front_type);
          setRhsFront(data.rhs_front_type);
          setLhsBack(data.lhs_back_type);
          setRhsBack(data.rhs_back_type);
          setSpare(data.spare_type);
          if (data.lhs_front_image) {
            temp[0].url = data.lhs_front_image.url;
            temp[0].selectedValue = data.lhs_front_type;
            setLhsFrontImage(data.lhs_front_image.file);
          }
          if (data.rhs_front_image) {
            temp[1].url = data.rhs_front_image.url;
            temp[1].selectedValue = data.rhs_front_type;
            setRhsFrontImage(data.rhs_front_image.file);
          }
          if (data.lhs_back_image) {
            temp[2].url = data.lhs_back_image.url;
            temp[2].selectedValue = data.lhs_back_type;
            setLhsBackImage(data.lhs_back_image.file);
          }
          if (data.rhs_back_image) {
            temp[3].url = data.rhs_back_image.url;
            temp[3].selectedValue = data.rhs_back_type;
            setRhsBackImage(data.rhs_back_image.file);
          }
          if (data.spare_image) {
            temp[4].url = data.spare_image.url;
            temp[4].selectedValue = data.spare_type;
            setSpareImage(data.spare_image.file);
          }
        }
        if (data.overall_rating) {
          setRating(data.overall_rating);
        }

        setTyresImage([...temp]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddTyres, selectUpdateTyres, selectGetTyres]);

  function onCameraAction(type: string) {
    setOpenImagePicker(true);
    switch (type) {
      case 'lhs_front_type':
        setTyreType('lhs_front_type');
        break;
      case 'rhs_back_type':
        setTyreType('rhs_back_type');
        break;
      case 'lhs_back_type':
        setTyreType('lhs_back_type');
        break;
      case 'rhs_front_type':
        setTyreType('rhs_front_type');
        break;
      case 'spare_type':
        setTyreType('spare_type');
        break;
      case 'front_tyre_life':
        setTyreType('front_tyre_life');
        break;
      case 'front_wheel_condition':
        setTyreType('front_wheel_condition');
        break;
      case 'rear_wheel_condition':
        setTyreType('rear_wheel_condition');
        break;
    }
  }
  function onChangeValue(value: string, index: number) {
    let temp = [...tyresImage];
    if (vehicleType === 'two_wheeler') {
      switch (index) {
        case 0:
          setFrontWheel(value);
          temp[0].selectedValue = value;
          break;
        case 1:
          setRearWheel(value);
          temp[1].selectedValue = value;
          break;
      }
    } else {
      switch (index) {
        case 0:
          setLhsFront(value);
          temp[0].selectedValue = value;
          break;
        case 1:
          setRhsFront(value);
          temp[1].selectedValue = value;
          break;
        case 2:
          setLhsBack(value);
          temp[2].selectedValue = value;
          break;
        case 3:
          setRhsBack(value);
          temp[3].selectedValue = value;
          break;
        case 4:
          setSpare(value);
          temp[4].selectedValue = value;
          break;
      }
    }

    setTyresImage([...temp]);
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
          Step 6: Tyres
        </CustomText>
        <Box pv={'5%'}>
          {tyresImage.map((el, index) => {
            return (
              <BasePicker
                key={index.toString()}
                data={list}
                title={el.title}
                onValueChange={value => onChangeValue(value, index)}
                selectedValue={el.selectedValue}
                onPressCamera={() => onCameraAction(el.id)}
                selectPhoto={el.url}
                isMandatory
              />
            );
          })}
          {/* <BasePicker
            data={list}
            title="RHS front tyre ( % / damaged )"
            onValueChange={setRhsFront}
            selectedValue={rhsfront}
            onPressCamera={() => onCameraAction('rhs_front_type')}
            selectPhoto={tyresImage[1].url}
            isMandatory
            error={errors?.rhsfront}
          />
          <BasePicker
            data={list}
            title="LHS Back tyre ( % / damaged )"
            onValueChange={setLhsBack}
            selectedValue={lhsback}
            onPressCamera={() => onCameraAction('lhs_back_type')}
            selectPhoto={tyresImage[2].url}
            isMandatory
            error={errors?.lhsback}
          />
          <BasePicker
            data={list}
            title="RHS Back tyre ( % / damaged )"
            onValueChange={setRhsBack}
            selectedValue={rhsback}
            onPressCamera={() => onCameraAction('rhs_back_type')}
            selectPhoto={tyresImage[3].url}
            isMandatory
            error={errors?.rhsback}
          />
          <BasePicker
            data={list}
            title="Spare tyre (%, damaged )"
            onValueChange={setSpare}
            selectedValue={spare}
            onPressCamera={() => onCameraAction('spare_type')}
            selectPhoto={tyresImage[4].url}
            isMandatory
            error={errors?.spare}
          /> */}
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
    marginTop: '1rem',
    marginBottom: '4rem',
  },
});

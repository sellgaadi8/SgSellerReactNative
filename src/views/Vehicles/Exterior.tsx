import {ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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

export default function Exterior({navigation, route}: ExteriorProps) {
  const [exteriorType, setExteriorType] = useState([
    {id: 'left_pillarA', name: 'Left Pillar A', url: ''},
    {id: 'left_pillarB', name: 'Left Pillar B', url: ''},
    {id: 'left_pillarC', name: 'Left Pillar C', url: ''},
    {id: 'right_pillarA', name: 'Right Pillar A', url: ''},
    {id: 'right_pillarB', name: 'Right Pillar B', url: ''},
    {id: 'right_pillarC', name: 'Right Pillar C', url: ''},
    {id: 'left_apron', name: 'Left Apron', url: ''},
    {id: 'left_apron_leg', name: 'Left Apron Leg', url: ''},
    {id: 'right_apron_leg', name: 'Right Apron', url: ''},
    {id: 'right_apron', name: 'Right Apron Leg', url: ''},
    {id: 'boot_floor', name: 'Boot Floor', url: ''},
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
  const [rating, setRating] = useState(0);
  const [leftPA, setLeftPA] = useState('ok');
  const [leftPB, setLeftPB] = useState('ok');
  const [leftPC, setLeftPC] = useState('ok');
  const [rightPA, setRightPA] = useState('ok');
  const [rightPB, setRightPB] = useState('ok');
  const [rightPC, setRightPC] = useState('ok');
  const [leftApron, setLeftApron] = useState('ok');
  const [leftApronLeg, setLeftApronLeg] = useState('ok');
  const [rightApron, setRightApron] = useState('ok');
  const [rightApronLeg, setRightApronLeg] = useState('ok');
  const [boot, setBoot] = useState('ok');

  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] =
    useState<ExteriorDocumentType>('left_pillarA');
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
      dispatch(onUploadImage(image[0], 'exterior-images'));
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {success, image, message} = selectUploadImage;
      let temp = [...exteriorType];

      if (success && image) {
        switch (uploadType) {
          case 'left_pillarA':
            setImage1(image.file);
            temp[0].url = image.url;
            break;
          case 'left_pillarB':
            setImage2(image.file);
            temp[1].url = image.url;
            break;
          case 'left_pillarC':
            setImage3(image.file);
            temp[2].url = image.url;
            break;
          case 'right_pillarA':
            setImage4(image.file);
            temp[3].url = image.url;
            break;
          case 'right_pillarB':
            setImage5(image.file);
            temp[4].url = image.url;
            break;
          case 'right_pillarC':
            setImage6(image.file);
            temp[5].url = image.url;
            break;
          case 'left_apron':
            setImage7(image.file);
            temp[6].url = image.url;
            break;
          case 'left_apron_leg':
            setImage8(image.file);
            temp[7].url = image.url;
            break;
          case 'right_apron_leg':
            setImage9(image.file);
            temp[8].url = image.url;
            break;
          case 'right_apron':
            setImage10(image.file);
            temp[9].url = image.url;
            break;
          case 'boot_floor':
            setImage11(image.file);
            temp[10].url = image.url;
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

      setExteriorType([...temp]);
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
        setLeftPA(data.left_pillarA.toLowerCase());
        setLeftPB(data.left_pillarB.toLowerCase());
        setLeftPC(data.left_pillarC.toLowerCase());
        setRightPA(data.right_pillarA.toLowerCase());
        setRightPB(data.right_pillarB.toLowerCase());
        setRightPC(data.right_pillarC.toLowerCase());
        setLeftApron(data.left_apron.toLowerCase());
        setLeftApronLeg(data.left_apron_leg.toLowerCase());
        setRightApronLeg(data.right_apron_leg.toLowerCase());
        setRightApron(data.right_apron.toLowerCase());
        setBoot(data.boot_floor.toLowerCase());
        let temp = [...exteriorType];
        if (data.left_pillarA_image) {
          temp[0].url = data.left_pillarA_image.url;
          setImage1(data.left_pillarA_image.file);
        }
        if (data.left_pillarB_image) {
          temp[1].url = data.left_pillarB_image.url;
          setImage2(data.left_pillarB_image.file);
        }
        if (data.left_pillarC_image) {
          temp[2].url = data.left_pillarC_image.url;
          setImage3(data.left_pillarC_image.file);
        }
        if (data.right_pillarA_image) {
          temp[3].url = data.right_pillarA_image.url;
          setImage4(data.right_pillarA_image.file);
        }
        if (data.right_pillarB_image) {
          temp[4].url = data.right_pillarB_image.url;
          setImage5(data.right_pillarB_image.file);
        }
        if (data.right_pillarC_image) {
          temp[5].url = data.right_pillarC_image.url;
          setImage6(data.right_pillarC_image.file);
        }
        if (data.left_apron_image) {
          temp[6].url = data.left_apron_image.url;
          setImage7(data.left_apron_image.file);
        }
        if (data.left_apron_leg_image) {
          temp[7].url = data.left_apron_leg_image.url;
          setImage8(data.left_apron_leg_image.file);
        }
        if (data.right_apron_image) {
          temp[8].url = data.right_apron_image.url;
          setImage9(data.right_apron_image.file);
        }
        if (data.right_apron_leg_image) {
          temp[9].url = data.right_apron_leg_image.url;
          setImage10(data.right_apron_leg_image.file);
        }
        if (data.boot_floor_image) {
          temp[10].url = data.boot_floor_image.url;
          setImage11(data.boot_floor_image.file);
        }
        if (data.overall_rating) {
          setRating(data.overall_rating);
        }
        setExteriorType([...temp]);
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
    if (rating !== 0) {
      setLoading(true);
      if (route.params.from === 'add') {
        dispatch(
          onAddExterior(
            vehicleId,
            leftPA,
            leftPB,
            leftPC,
            rightPA,
            rightPB,
            rightPC,
            leftApron,
            leftApronLeg,
            rightApron,
            rightApronLeg,
            boot,
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
            '',
            '',
            rating,
          ),
        );
      } else {
        dispatch(
          onUpdateExterior(
            vehicleId,
            leftPA,
            leftPB,
            leftPC,
            rightPA,
            rightPB,
            rightPC,
            leftApron,
            leftApronLeg,
            rightApron,
            rightApronLeg,
            boot,
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
            '',
            '',
            rating,
          ),
        );
      }
    } else {
      Snackbar.show({
        text: 'Overall Rating is Mandatory',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  function onOpenPicker(type: ExteriorDocumentType) {
    setOpenImagePicker(true);
    switch (type) {
      case 'left_pillarA':
        setUploadType('left_pillarA');
        break;
      case 'left_pillarB':
        setUploadType('left_pillarB');
        break;
      case 'left_pillarC':
        setUploadType('left_pillarC');
        break;
      case 'right_pillarA':
        setUploadType('right_pillarA');
        break;
      case 'right_pillarB':
        setUploadType('right_pillarB');
        break;
      case 'right_pillarC':
        setUploadType('right_pillarC');
        break;
      case 'left_apron':
        setUploadType('left_apron');
        break;
      case 'left_apron_leg':
        setUploadType('left_apron_leg');
        break;
      case 'right_apron':
        setUploadType('right_apron');
        break;
      case 'right_apron_leg':
        setUploadType('right_apron_leg');
        break;
      case 'boot_floor':
        setUploadType('boot_floor');
        break;
    }
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
          <BasePicker
            data={list}
            title="Left Pillar A"
            onValueChange={setLeftPA}
            selectedValue={leftPA}
            onPressCamera={() => onOpenPicker('left_pillarA')}
            selectPhoto={exteriorType[0].url}
          />
          <BasePicker
            data={list}
            title="Left Pillar B"
            onValueChange={setLeftPB}
            selectedValue={leftPB}
            onPressCamera={() => onOpenPicker('left_pillarB')}
            selectPhoto={exteriorType[1].url}
          />
          <BasePicker
            data={list}
            title="Left Pillar C"
            onValueChange={setLeftPC}
            selectedValue={leftPC}
            onPressCamera={() => onOpenPicker('left_pillarC')}
            selectPhoto={exteriorType[2].url}
          />
          <BasePicker
            data={list}
            title="Right Pillar A"
            onValueChange={setRightPA}
            selectedValue={rightPA}
            onPressCamera={() => onOpenPicker('right_pillarA')}
            selectPhoto={exteriorType[3].url}
          />
          <BasePicker
            data={list}
            title="Right Pillar B"
            onValueChange={setRightPB}
            selectedValue={rightPB}
            onPressCamera={() => onOpenPicker('right_pillarB')}
            selectPhoto={exteriorType[4].url}
          />
          <BasePicker
            data={list}
            title="Right Pillar C"
            onValueChange={setRightPC}
            selectedValue={rightPC}
            onPressCamera={() => onOpenPicker('right_pillarC')}
            selectPhoto={exteriorType[5].url}
          />
          <BasePicker
            data={list}
            title="Left Apron"
            onValueChange={setLeftApron}
            selectedValue={leftApron}
            onPressCamera={() => onOpenPicker('left_apron')}
            selectPhoto={exteriorType[6].url}
          />
          <BasePicker
            data={list}
            title="Left Apron Leg"
            onValueChange={setLeftApronLeg}
            selectedValue={leftApronLeg}
            onPressCamera={() => onOpenPicker('left_apron_leg')}
            selectPhoto={exteriorType[7].url}
          />
          <BasePicker
            data={list}
            title="Right Apron Leg"
            onValueChange={setRightApronLeg}
            selectedValue={rightApronLeg}
            onPressCamera={() => onOpenPicker('right_apron_leg')}
            selectPhoto={exteriorType[8].url}
          />
          <BasePicker
            data={list}
            title="Right Apron Leg"
            onValueChange={setRightApron}
            selectedValue={rightApron}
            onPressCamera={() => onOpenPicker('right_apron')}
            selectPhoto={exteriorType[9].url}
          />
          <BasePicker
            data={list}
            title="Boot Floor"
            onValueChange={setBoot}
            selectedValue={boot}
            onPressCamera={() => onOpenPicker('boot_floor')}
            selectPhoto={exteriorType[10].url}
          />
          <Box pv={'2%'}>
            <Rating
              onPress={value => updateRating(value)}
              defaultRating={rating}
            />
          </Box>
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
        // fileTypes={{
        //   allowMultiSelection: false,
        //   type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        // }}
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

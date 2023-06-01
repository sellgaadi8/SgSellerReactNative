import {Image, ScrollView, View} from 'react-native';
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
import {onUploadImage} from '../../redux/ducks/uploadImage';
import {useAppSelector} from '../../utils/hooks';
import ImagePicker from '../../components/ImagePicker';
import {onAddExterior} from '../../redux/ducks/addExterior';
import GlobalContext from '../../contexts/GlobalContext';
import Snackbar from 'react-native-snackbar';
import {ExteriorProps} from '../../types/propsTypes';
import {onGetExteriorData} from '../../redux/ducks/getExterior';
import {onUpdateExterior} from '../../redux/ducks/updateExterior';

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
  const [imageType, setImageType] = useState('');
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
      dispatch(onGetExteriorData(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPressPicker(id: string) {
    setImageType(id);
    setOpenImagePicker(true);
  }

  function onSaveImage(image: any) {
    dispatch(onUploadImage(image[0], 'exterior-images'));
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      const {error, image} = selectUploadImage;
      let temp = [...exteriorType];

      if (!error && image) {
        switch (imageType) {
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
      }

      setExteriorType([...temp]);
    }
    if (selectUploadExteriorImage.called) {
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
      const {error, data} = selectGetExteriorData;
      if (!error && data) {
        setImage1(data.left_pillarA);
        setImage2(data.left_pillarB);
        setImage3(data.left_pillarC);
        setImage4(data.right_pillarA);
        setImage5(data.right_pillarB);
        setImage6(data.right_pillarC);
        setImage7(data.left_apron);
        setImage8(data.left_apron_leg);
        setImage9(data.right_apron_leg);
        setImage10(data.right_apron);
        setImage11(data.boot_floor);
      }
    }
    if (selectUpdateExteriorData.called) {
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
    if (route.params.from === 'add') {
      dispatch(
        onAddExterior(
          vehicleId,
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
        ),
      );
    } else {
      dispatch(
        onUpdateExterior(
          vehicleId,
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
        ),
      );
    }
  }

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 4: Exterior
        </CustomText>
        <Box pv={'7%'}>
          {exteriorType.map((el, index) => {
            return (
              <View style={styles.card} key={index.toString()}>
                <View style={styles.title}>
                  <CustomText
                    fontFamily="Roboto-Regular"
                    fontSize={12}
                    lineHeight={16}
                    color="#1C1B1F"
                    style={styles.text}>
                    {el.name}
                  </CustomText>
                </View>
                {el.url ? (
                  <Image source={{uri: el.url}} style={styles.image} />
                ) : (
                  <Image
                    source={require('../../assets/media.png')}
                    style={styles.image}
                  />
                )}
                <View style={styles.content}>
                  <PrimaryButton
                    label="Choose media"
                    onPress={() => onPressPicker(el.id)}
                    varient="Secondary"
                  />
                  <CustomText
                    fontFamily="Roboto-Bold"
                    fontSize={14}
                    lineHeight={20}
                    color="#201A1B"
                    style={styles.text}>
                    or
                  </CustomText>
                  <CustomText
                    fontFamily="Roboto-Bold"
                    fontSize={14}
                    lineHeight={20}
                    color="#201A1B"
                    style={styles.text}>
                    Browse media
                  </CustomText>
                </View>
              </View>
            );
          })}
        </Box>
        <Box style={styles.buttonContainer}>
          <Box width={'45%'}>
            <PrimaryButton
              label="Close"
              onPress={() => console.log('')}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton label="Save Edits" onPress={onSubmit} />
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
    marginTop: -20,
    marginBottom: '3rem',
  },
});

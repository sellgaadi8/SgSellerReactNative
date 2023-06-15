/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, ScrollView, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import DocumentPicker from 'react-native-document-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container, contentCenter} from '../../utils/styles';
import PrimaryButton from '../../components/PrimaryButton';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import ImagePicker from '../../components/ImagePicker';
import {useDispatch} from 'react-redux';
import {onUploadImage} from '../../redux/ducks/uploadImage';
import {useAppSelector} from '../../utils/hooks';
import {onUploadCarImages} from '../../redux/ducks/uploadCarImages';
import GlobalContext from '../../contexts/GlobalContext';
import {onGetCarImages} from '../../redux/ducks/getCarImage';
import {CarImagesProps, ImageType} from '../../types/propsTypes';
import Snackbar from 'react-native-snackbar';
import {onUpdateCarImages} from '../../redux/ducks/updateCarImages';
import Loader from '../../components/Loader';

export default function CarImages({route, navigation}: CarImagesProps) {
  const [carImageType, setCarImageType] = useState([
    {id: 'left_wheel_corner_front', name: 'LEFT WHEEL CORNER -FRONT', url: ''},
    {id: 'centre_front', name: 'CENTRE FRONT', url: ''},
    {id: 'right_corner_back', name: 'RIGHT CORNER -BACK', url: ''},
    {id: 'centre_back', name: 'CENTRE BACK', url: ''},
    {id: 'engine_hood_open', name: 'ENGINE HOOD OPEN', url: ''},
    {
      id: 'interior_dashboard',
      name: 'INTERIOR DASHBOARD ( view from back seat)',
      url: '',
    },
    {id: 'meter_console', name: 'METER CONSOLE', url: ''},
    {id: 'video', name: 'Video  single ( car 360)', url: ''},
  ]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const dispatch = useDispatch<any>();
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const selectUploadCarImage = useAppSelector(state => state.uploadCarImages);
  const selectGetCarImages = useAppSelector(state => state.getCarImage);
  const selectUpdateCarImages = useAppSelector(state => state.updateCarImages);
  const [imageType, setImageType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [image7, setImage7] = useState('');
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

  const {vehicleId, setVehicleId} = useContext(GlobalContext);

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetCarImages(vehicleId));
    }
  }, []);

  function onPressPicker(id: string) {
    setImageType(id);
    setOpenImagePicker(true);
    if (id === 'video') {
      setMediaType('video');
    } else {
      setMediaType('photo');
    }
  }

  function onSaveImage(image: ImageType[]) {
    console.log(image[0]);

    dispatch(onUploadImage(image[0], 'car-images'));
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {error, image} = selectUploadImage;
      console.log('error', error);

      let temp = [...carImageType];

      if (!error && image) {
        switch (imageType) {
          case 'left_wheel_corner_front':
            setImage1(image.file);
            temp[0].url = image.url;
            break;
          case 'centre_front':
            setImage2(image.file);
            temp[1].url = image.url;
            break;
          case 'right_corner_back':
            setImage3(image.file);
            temp[2].url = image.url;
            break;
          case 'centre_back':
            setImage4(image.file);
            temp[3].url = image.url;
            break;
          case 'engine_hood_open':
            setImage5(image.file);
            temp[4].url = image.url;
            break;
          case 'interior_dashboard':
            setImage6(image.file);
            temp[5].url = image.url;
            break;
          case 'meter_console':
            setImage7(image.file);
            temp[6].url = image.url;
            break;
          case 'video':
            setVideo(image.file);
            temp[7].url = image.url;
            break;
          default:
            break;
        }
      } else if (error) {
        console.log('calleddd');
        Snackbar.show({
          text: 'Something went wrong please try again',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }

      setCarImageType([...temp]);
    }

    if (selectUploadCarImage.called) {
      setLoading(false);
      const {error, success, message, uuid} = selectUploadCarImage;
      if (!error && success) {
        navigation.navigate('AddVehicle', {from: 'add'});
        setVehicleId(uuid);
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetCarImages.called) {
      setLoading(false);
      const {data, error} = selectGetCarImages;
      if (!error && data) {
        setImage1(data.left_wheel_corner_front);
        setImage2(data.centre_front);
        setImage3(data.right_corner_back);
        setImage4(data.centre_back);
        setImage5(data.engine_hood_open);
        setImage6(data.interior_dashboard);
        setImage7(data.meter_console);
        setVideo(data.video);
      }
    }
    if (selectUpdateCarImages.called) {
      setLoading(false);
      const {error, success, message, uuid} = selectUpdateCarImages;
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
  }, [
    selectUploadImage,
    selectUploadCarImage,
    selectGetCarImages,
    selectUpdateCarImages,
  ]);

  function onSubmit() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onUploadCarImages(
          vehicleId,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          video,
        ),
      );
    } else {
      dispatch(
        onUpdateCarImages(
          vehicleId,
          image1,
          image2,
          image3,
          image4,
          image5,
          image6,
          image7,
          video,
        ),
      );
    }
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
          Step 2: Car Images
        </CustomText>
        <Box pv={'7%'}>
          {carImageType.map((el, index) => {
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
                    {el.id !== 'video' && <Text style={{color: 'red'}}>*</Text>}
                  </CustomText>
                </View>
                {el.url.length !== 0 ? (
                  <Image
                    source={{uri: el.url}}
                    style={styles.image}
                    resizeMode="cover"
                  />
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
              onPress={() => console.log('mc')}
              varient="Secondary"
            />
          </Box>
          <Box width={'45%'}>
            <PrimaryButton
              label={
                route.params.from === 'add' ? 'Save Edits' : 'Update Edits'
              }
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
        type={mediaType === 'photo' ? 'photo' : 'video'}
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

import {Image, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const ExteriorType = [
  {id: 'left_wheel_corner_front', name: 'LEFT WHEEL CORNER -FRONT'},
  {id: 'centre_front', name: 'CENTRE FRONT'},
  {id: 'right_corner_back', name: 'RIGHT CORNER -BACK'},
  {id: 'centre_back', name: 'CENTRE BACK'},
  {id: 'engine_hood_open', name: 'ENGINE HOOD OPEN'},
  {id: 'interior_dashboard', name: 'INTERIOR DASHBOARD ( view from back seat)'},
  {id: 'meter_console', name: 'METER CONSOLE'},
  {id: 'video', name: 'Video  single ( car 360)'},
];

export default function CarImages() {
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const dispatch = useDispatch<any>();
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const [imageType, setImageType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [image7, setImage7] = useState('');
  const [video, setVideo] = useState('');

  function onPressPicker(id: string) {
    setImageType(id);
    setOpenImagePicker(true);
  }

  function onSaveImage(image: any) {
    console.log(image);
    dispatch(onUploadImage(image[0], 'car-images'));
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      const {error, image} = selectUploadImage;
      if (!error && image) {
        if (imageType === 'left_wheel_corner_front') {
          setImage1(image.file);
        }
        if (imageType === 'centre_front') {
          setImage2(image.file);
        }
        if (imageType === 'right_corner_back') {
          setImage3(image.file);
        }
        if (imageType === 'left_wheel_corner_front') {
          setImage4(image.file);
        }
        if (imageType === 'engine_hood_open') {
          setImage5(image.file);
        }
        if (imageType === 'interior_dashboard') {
          setImage6(image.file);
        }
        if (imageType === 'meter_console') {
          setImage7(image.file);
        }
        if (imageType === 'video') {
          setVideo(image.file);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectUploadImage]);

  function onSubmit() {
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
  }

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 3: Exterior
        </CustomText>
        <Box pv={'7%'}>
          {ExteriorType.map((el, index) => {
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
                <Image
                  source={require('../../assets/media.png')}
                  style={styles.image}
                />
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
              label="Save Edits"
              onPress={() => console.log('bc')}
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
    marginTop: -20,
    marginBottom: '3rem',
  },
});

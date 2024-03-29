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
import {EngineProps, EngineType, ImageType} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onAddEngine} from '../../redux/ducks/addEngine';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onUpdateEngine} from '../../redux/ducks/updateEngine';
import {onGetEngineDetails} from '../../redux/ducks/getEngine';
import Loader from '../../components/Loader';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {onUploadImage} from '../../redux/ducks/uploadImage';
import Rating from '../../components/Rating';

export default function Engine({navigation, route}: EngineProps) {
  const [engineImageTypes, setEngineImageTypes] = useState([
    {id: 'gear_oil', url: ''},
    {id: 'exhaust_smoke', url: ''},
    {id: 'engine_sound', url: ''},
  ]);
  const [rating, setRating] = useState(0);
  const [oilLeak, setOilLeak] = useState('');
  const [oilLeakImage, setOilLeakImage] = useState('');
  const [smoke, setSmoke] = useState('');
  const [smokeImage, setSmokeImage] = useState('');
  const [permissble, setPermissble] = useState('');
  const [mounting, setMounting] = useState('');
  const [sound, setSound] = useState('');
  const [soundVideo, setSoundVideo] = useState('');
  const [clutch, setClutch] = useState('');
  const [ac, setAc] = useState('');
  const [cooling, setCooling] = useState('');
  const [heater, setHeater] = useState('');
  const [condensor, setCondensor] = useState('');
  const [chain, setChain] = useState('');
  const [engineOilLevel, setEngineOilLevel] = useState('');
  const [coolantLevel, setCoolantLevel] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const dispatch = useDispatch<any>();
  const {vehicleId, vehicleType} = useContext(GlobalContext);
  const [errors, setErrors] = useState<EngineError>();
  const [loading, setLoading] = useState(false);
  const [engineType, setEngineType] = useState<EngineType>();
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const selectAddEngine = useAppSelector(state => state.addEngine);
  const selectUpdateEngine = useAppSelector(state => state.updateEngine);
  const selectGetEngine = useAppSelector(state => state.getEngine);
  const selectUploadImage = useAppSelector(state => state.uploadImage);

  useEffect(() => {
    navigation.setParams({
      title: route.params.from === 'add' ? 'Add Vehicle' : 'Edit Vehicle',
    });
    if (route.params.from === 'edit') {
      dispatch(onGetEngineDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validateInputs() {
    const tempErrors: EngineError = {};
    if (sound && sound.length === 0) {
      tempErrors.sound = 'Engine sound is required';
    }
    if (vehicleType === 'four_wheeler' && cooling.length === 0) {
      tempErrors.cooling = 'Cooling is required';
    }
    if (vehicleType === 'four_wheeler' && heater.length === 0) {
      tempErrors.heater = 'Heater is required';
    }
    if (vehicleType === 'four_wheeler' && condensor.length === 0) {
      tempErrors.condensor = 'Condensor is required';
    }

    if (sound === 'major_sound' && soundVideo.length === 0) {
      Snackbar.show({
        text: 'Engine sound video is required',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
      tempErrors.sound = 'Engine Sound Video is required';
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
          onAddEngine(
            vehicleId,
            oilLeak,
            smoke,
            permissble,
            mounting,
            sound,
            clutch,
            ac,
            cooling,
            heater,
            condensor,
            oilLeakImage,
            smokeImage,
            soundVideo,
            coolantLevel,
            engineOilLevel,
            chain,
            rating,
          ),
        );
      } else {
        dispatch(
          onUpdateEngine(
            vehicleId,
            oilLeak,
            smoke,
            permissble,
            mounting,
            sound,
            clutch,
            ac,
            cooling,
            heater,
            condensor,
            oilLeakImage,
            smokeImage,
            soundVideo,
            coolantLevel,
            engineOilLevel,
            chain,
            rating,
          ),
        );
      }
    }
  }

  useEffect(() => {
    if (selectUploadImage.called) {
      setLoading(false);
      const {success, image, message} = selectUploadImage;
      let temp = [...engineImageTypes];

      if (success && image) {
        switch (engineType) {
          case 'gear_oil':
            setOilLeakImage(image.file);
            temp[0].url = image.url;
            break;
          case 'exhaust_smoke':
            setSmokeImage(image.file);
            temp[1].url = image.url;
            break;
          case 'engine_sound':
            setSoundVideo(image.file);
            temp[2].url = image.url;
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
      setEngineImageTypes([...temp]);
    }
    if (selectAddEngine.called) {
      const {error, message, success} = selectAddEngine;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectUpdateEngine.called) {
      const {error, message, success} = selectUpdateEngine;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetEngine.called) {
      const {error, data} = selectGetEngine;
      let temp = [...engineImageTypes];
      if (!error && data) {
        if (data.gear_oil_leakage !== null) {
          setOilLeak(data.gear_oil_leakage);
        }

        if (data.exhaust_smoke !== null) {
          setSmoke(data.exhaust_smoke);
        }

        if (data.engine_perm_blow_back !== null) {
          setPermissble(data.engine_perm_blow_back);
        }

        if (data.engine_mounting !== null) {
          setMounting(data.engine_mounting);
        }

        if (data.engine_sound !== null) {
          setSound(data.engine_sound);
        }

        if (data.clutch_bearing_sound !== null) {
          setClutch(data.clutch_bearing_sound);
        }

        if (data.ac !== null) {
          setAc(data.ac);
        }

        if (data.cooling !== null) {
          setCooling(data.cooling);
        }

        if (data.heater !== null) {
          setHeater(data.heater);
        }

        if (data.condensor !== null) {
          setCondensor(data.condensor);
        }

        if (data.chain_belt_assembly !== null) {
          setChain(data.chain_belt_assembly);
        }

        if (data.engine_oil_level !== null) {
          setEngineOilLevel(data.engine_oil_level);
        }

        if (data.engine_coolant_level !== null) {
          setCoolantLevel(data.engine_coolant_level);
        }

        if (
          data.gear_oil_leakage_image &&
          data.gear_oil_leakage_image !== null
        ) {
          setOilLeakImage(data.gear_oil_leakage_image.file);
          temp[0].url = data.gear_oil_leakage_image.url;
        }
        if (data.exhaust_smoke_image && data.exhaust_smoke_image !== null) {
          setSmokeImage(data.exhaust_smoke_image.file);
          temp[1].url = data.exhaust_smoke_image.url;
        }

        if (data.engine_sound_video && data.engine_sound_video !== null) {
          setSoundVideo(data.engine_sound_video.file);
          temp[2].url = data.engine_sound_video.url;
          setMediaType('video');
        }
        if (data.overall_rating && data.overall_rating !== null) {
          setRating(data.overall_rating);
        }
      }
      setEngineImageTypes([...temp]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectUploadImage, selectAddEngine, selectUpdateEngine, selectGetEngine]);

  function onCameraAction(type: EngineType) {
    setOpenImagePicker(true);
    switch (type) {
      case 'gear_oil':
        setEngineType('gear_oil');
        break;
      case 'exhaust_smoke':
        setEngineType('exhaust_smoke');
        break;
      case 'engine_sound':
        setEngineType('engine_sound');
        break;
    }
  }

  function onSaveImage(image: ImageType[]) {
    if (image) {
      dispatch(onUploadImage(image[0], 'engine-images'));
    }
  }

  function onPressEngineSound(label: string, value: string) {
    setSound(value);
    setMediaType('video');
  }

  function onPressOilLeak(label: string, value: string) {
    setOilLeak(value);
    setMediaType('photo');
  }

  function onPressSmoke(label: string, value: string) {
    setSmoke(value);
    setMediaType('photo');
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
          Step 7: Engine
        </CustomText>
        <Box style={styles.body}>
          {vehicleType !== 'two_wheeler' && (
            <RadioButtons
              label="Gear Oil leakage"
              data={[
                {label: 'OK', value: 'ok'},
                {label: 'Leakage', value: 'leakage'}, ///image
              ]}
              onSelect={(label, value) => onPressOilLeak(label, value)}
              isImage
              selectValue={oilLeak}
              onPressCamera={() => onCameraAction('gear_oil')}
              selectPhoto={engineImageTypes[0].url}
            />
          )}
          <RadioButtons
            label="Exhaust smoke"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'BLACK SMOKE', value: 'black_smoke'},
              {label: 'WHITE SMOKE', value: 'white_smoke'}, ///image
            ]}
            onSelect={(label, value) => onPressSmoke(label, value)}
            selectValue={smoke}
            onPressCamera={() => onCameraAction('exhaust_smoke')}
            selectPhoto={engineImageTypes[1].url}
            isImage
          />
          <RadioButtons
            label={'Engine permissible blow back'}
            data={[
              {label: 'YES', value: 'yes'},
              {label: 'NO BLOW BACK', value: 'no_blow_back'},
            ]}
            onSelect={(label, value) => setPermissble(value)}
            selectValue={permissble}
          />
          {vehicleType === 'two_wheeler' && (
            <RadioButtons
              label={'Engine Coolant Level'}
              data={[
                {label: 'YES', value: 'yes'},
                {label: 'NO BLOW BACK', value: 'no_blow_back'},
              ]}
              onSelect={(label, value) => setCoolantLevel(value)}
              selectValue={coolantLevel}
            />
          )}
          {vehicleType === 'two_wheeler' && (
            <RadioButtons
              label={'Engine Oil Level'}
              data={[
                {label: 'OK', value: 'ok'},
                {label: 'SOUND', value: 'sound'},
              ]}
              onSelect={(label, value) => setEngineOilLevel(value)}
              selectValue={engineOilLevel}
            />
          )}

          <RadioButtons
            label={'Engine mounting'}
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'SOUND', value: 'sound'},
            ]}
            onSelect={(label, value) => setMounting(value)}
            selectValue={mounting}
          />

          <RadioButtons
            label="Engine sound"
            data={[
              {label: 'MAJOR SOUND', value: 'major_sound'},
              {label: 'NO BLOW BY', value: 'no_blow_by'}, //video
            ]}
            onSelect={(label, value) => onPressEngineSound(label, value)}
            selectValue={sound}
            isMandatory
            isImage
            onPressCamera={() => onCameraAction('engine_sound')}
            error={errors?.sound}
            selectPhoto={engineImageTypes[2].url}
          />
          {vehicleType !== 'two_wheeler' && (
            <RadioButtons
              label="Clutch bearing Noise"
              data={[
                {label: 'YES', value: 'yes'},
                {label: 'NO', value: 'no'},
              ]}
              onSelect={(label, value) => setClutch(value)}
              selectValue={clutch}
            />
          )}
          {vehicleType === 'two_wheeler' && (
            <RadioButtons
              label="Chain & Belt Assembly"
              data={[
                {label: 'OK', value: 'yes'},
                {label: 'NOT OK', value: 'no'},
              ]}
              onSelect={(label, value) => setChain(value)}
              selectValue={chain}
            />
          )}
          {vehicleType === 'four_wheeler' && (
            <>
              <RadioButtons
                label="AC"
                data={[
                  {label: 'OK', value: 'ok'},
                  {label: 'Leakage', value: 'leakage'},
                ]}
                onSelect={(label, value) => setAc(value)}
                selectValue={ac}
              />
              <RadioButtons
                label="Cooling"
                data={[
                  {label: 'OK', value: 'ok'},
                  {label: 'NOT OK', value: 'not_ok'},
                ]}
                onSelect={(label, value) => setCooling(value)}
                isMandatory
                selectValue={cooling}
                error={errors?.cooling}
              />
              <RadioButtons
                label="Heater"
                data={[
                  {label: 'OK', value: 'ok'},
                  {label: 'NOT OK', value: 'not_ok'},
                ]}
                onSelect={(label, value) => setHeater(value)}
                isMandatory
                selectValue={heater}
                error={errors?.heater}
              />
              <RadioButtons
                label="Condensor"
                data={[
                  {label: 'OK', value: 'ok'},
                  {label: 'NOT OK', value: 'not_ok'},
                ]}
                onSelect={(label, value) => setCondensor(value)}
                isMandatory
                selectValue={condensor}
                error={errors?.condensor}
              />
            </>
          )}
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
  body: {
    marginTop: '0.5rem',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
    marginTop: '1rem',
  },
});

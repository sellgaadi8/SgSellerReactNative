/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {container} from '../../utils/styles';
import Radio from '../../components/Radio';
import colors from '../../utils/colors';
import ProfileInput from '../../components/ProfileInput';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch} from 'react-redux';
import {onAddCarDocuments} from '../../redux/ducks/addCarDocument';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {CarDocumentsProps} from '../../types/propsTypes';
import {onGetCarDocuments} from '../../redux/ducks/getCarDocuments';
import {onUpdateCarDocuments} from '../../redux/ducks/updateCarDocument';
import Loader from '../../components/Loader';
import ImagePicker from '../../components/ImagePicker';
import DocumentPicker from 'react-native-document-picker';
import {onUploadImage} from '../../redux/ducks/uploadImage';
import Calendar from '../../components/Calendar';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {formatDate} from '../../utils/helper';

type CarDocumentUploadType = 'rc' | 'road' | 'partpeshi' | 'key' | 'chesis';

export default function CarDocuments({navigation, route}: CarDocumentsProps) {
  const [carDocsType, setCarDocsType] = useState([
    {id: 'rc', url: ''},
    {id: 'road', url: ''},
    {id: 'partpeshi', url: ''},
    {id: 'key', url: ''},
    {id: 'chesis', url: ''},
  ]);
  const [insuranceType, setInsuranceType] = useState([
    {id: 'comprehensive', title: 'COMPREHENSIVE', selected: false},
    {id: 'thirdparty', title: 'THIRDPARTY', selected: false},
    {id: 'zero_dep', title: 'ZERO DEP', selected: false},
  ]);
  const [rto, setRto] = useState('');
  const [fitness, setFitness] = useState('');
  const [permit, setPermit] = useState('');
  const [rcAvail, setRcAvail] = useState('');
  const [rcAvailImage, setRcAvailImage] = useState('');
  const [noc, setNoc] = useState('');
  const [mismatch, setMismatch] = useState('');
  const [insurance, setInsurance] = useState('');
  const [hypo, setHypo] = useState('');
  const [roadTax, setRoadTax] = useState('');
  const [roadTaxImage, setRoadTaxImage] = useState('');
  const [partipeshi, setPartipeshi] = useState('');
  const [partipeshiImage, setPartipeshiImage] = useState('');

  const [key, setKey] = useState('');
  const [keyImage, setKeyImage] = useState('');

  const [chessis, setChessis] = useState('');
  const [chessisImage, setChessisImage] = useState('');
  const [fitment, setFitment] = useState('');
  const [fitmentEndorsed, setFitmentEndorsed] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calType, setCalType] = useState<'fitness' | 'permit'>('fitness');
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddCarDocs = useAppSelector(state => state.addCarDocument);
  const selectUpdateCarDocs = useAppSelector(state => state.updateCarDocument);
  const selectGetCarDocs = useAppSelector(state => state.getCarDocuments);
  const selectUploadImage = useAppSelector(state => state.uploadImage);
  const [loading, setLoading] = useState(false);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [uploadType, setUploadType] = useState<CarDocumentUploadType>('rc');

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetCarDocuments(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRc = (option: string) => {
    if (option) {
      setRcAvail(option);
    }
  };
  const handleNoc = (option: string) => {
    if (option) {
      setNoc(option);
    }
  };

  const handleMismatch = (option: string) => {
    if (option) {
      setMismatch(option);
    }
  };
  const handeHypo = (option: string) => {
    if (option) {
      setHypo(option);
    }
  };
  const handleRoadTax = (option: string) => {
    if (option) {
      setRoadTax(option);
    }
  };
  const handlePartiPeshi = (option: string) => {
    if (option) {
      setPartipeshi(option);
    }
  };
  const handleKey = (option: string) => {
    if (option) {
      setKey(option);
    }
  };
  const handleChessis = (option: string) => {
    if (option) {
      setChessis(option);
    }
  };
  const handleFitment = (option: string) => {
    if (option) {
      setFitment(option);
    }
  };

  const handleEndorsed = (option: string) => {
    if (option) {
      setFitmentEndorsed(option);
    }
  };

  function onPressCheckbox(id: string) {
    setInsurance(id);
    const updatedFuelType = insuranceType.map(type => ({
      ...type,
      selected: type.id === id,
    }));

    setInsuranceType(updatedFuelType);
  }

  function onOpenPicker(type: CarDocumentUploadType) {
    setOpenImagePicker(true);
    switch (type) {
      case 'rc':
        setUploadType('rc');
        break;
      case 'road':
        setUploadType('road');
        break;
      case 'key':
        setUploadType('key');
        break;
      case 'partpeshi':
        setUploadType('partpeshi');
        break;
      case 'chesis':
        setUploadType('chesis');
        break;
    }
  }

  function onSaveDocuments() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onAddCarDocuments(
          vehicleId,
          rcAvail.toLowerCase(),
          rcAvailImage,
          noc.toLowerCase(),
          mismatch.toLowerCase(),
          insurance,
          hypo.toLowerCase(),
          rto,
          fitness.toLowerCase(),
          fitment.toLowerCase(),
          fitmentEndorsed.toLowerCase(),
          roadTax.toLowerCase(),
          partipeshi.toLowerCase(),
          key.toLowerCase(),
          chessis.toLowerCase(),
          roadTaxImage,
          partipeshiImage,
          keyImage,
          chessisImage,
        ),
      );
    } else {
      dispatch(
        onUpdateCarDocuments(
          vehicleId,
          rcAvail.toLowerCase(),
          rcAvailImage,
          noc.toLowerCase(),
          mismatch.toLowerCase(),
          insurance,
          hypo.toLowerCase(),
          rto,
          fitness.toLowerCase(),
          fitment.toLowerCase(),
          fitmentEndorsed.toLowerCase(),
          roadTax.toLowerCase(),
          partipeshi.toLowerCase(),
          key.toLowerCase(),
          chessis.toLowerCase(),
          roadTaxImage,
          partipeshiImage,
          keyImage,
          chessisImage,
        ),
      );
    }
  }

  useEffect(() => {
    if (selectAddCarDocs.called) {
      setLoading(false);
      const {message, error, success} = selectAddCarDocs;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (selectUpdateCarDocs.called) {
      setLoading(false);
      const {message, error, success} = selectUpdateCarDocs;
      if (!error && success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.goBack();
      }
    }
    if (selectGetCarDocs.called) {
      setLoading(false);
      const {data, error} = selectGetCarDocs;
      if (!error && data) {
        setRto(data.rto);
        setNoc(data.rc_noc_issued);
        setFitment(data.cng_lpg_fitment);
        setFitmentEndorsed(data.cng_lpg_fitment_endorsed_on_rc);
        setFitness(data.fitness_upto);
        setChessis(data.chasis_no);
        setHypo(data.under_hypothication);
        setInsurance(data.insurance);
        setKey(data.duplicate_key);
        setMismatch(data.mismatch_in_rc);
        setPartipeshi(data.partipeshi_request);
        setRcAvail(data.rc_availability);
        setRoadTax(data.road_tax_paid);

        // setPermit(data.oer)
      }
    }
    if (selectUploadImage.called) {
      setLoading(false);
      const {error, image} = selectUploadImage;
      let temp = [...carDocsType];
      if (!error && image) {
        switch (uploadType) {
          case 'rc':
            setRcAvailImage(image.file);
            temp[0].url = image.url;
            break;
          case 'road':
            setRoadTaxImage(image.file);
            temp[1].url = image.url;
            break;
          case 'partpeshi':
            setPartipeshiImage(image.file);
            temp[2].url = image.url;
            break;
          case 'key':
            setKeyImage(image.file);
            temp[3].url = image.url;
            break;
          case 'chesis':
            setChessisImage(image.file);
            temp[4].url = image.url;
            break;

          default:
            break;
        }
      }
      setCarDocsType([...temp]);
      // else if (error) {
      //   console.log('calleddd');
      //   Snackbar.show({
      //     text: 'Something went wrong please try again',
      //     backgroundColor: 'green',
      //     duration: Snackbar.LENGTH_SHORT,
      //   });
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddCarDocs, selectUpdateCarDocs, selectGetCarDocs]);

  function onSaveImage(image: any) {
    dispatch(onUploadImage(image[0], 'car-documents'));
  }

  function onPressCalend(type: string) {
    setShowCalendar(true);
    switch (type) {
      case 'fitness':
        setCalType('fitness');
        break;
      case 'permit':
        setCalType('permit');
        break;
    }
  }

  function onChangeDate(event: Event | DateTimePickerEvent, date?: Date) {
    setShowCalendar(false);
    if (date) {
      switch (calType) {
        case 'fitness':
          setFitness(formatDate(date, false, 'DD-MM-YYYY'));
          break;
        case 'permit':
          setPermit(formatDate(date, false, 'DD-MM-YYYY'));
          break;
      }
    }
  }

  function closeCalendar() {
    setShowCalendar(false);
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
          Step 3: Car Documents
        </CustomText>
        <Box pv={'3%'}>
          <ProfileInput
            label="RTO"
            value={rto}
            onChangeText={setRto}
            isMandatory
            placeholder="( Ex MH02 )"
            isPlaceholder={true}
          />
          <Pressable onPress={() => onPressCalend('fitness')}>
            <ProfileInput
              pointerEvents="none"
              label="Fitness Upto"
              value={fitness}
              onChangeText={setFitness}
              isMandatory
              endIcon="calendar-month"
              editable={false}
              onPressEndIcon={() => onPressCalend('fitness')}
            />
          </Pressable>
          <Pressable onPress={() => onPressCalend('permit')}>
            <ProfileInput
              pointerEvents="none"
              label="Permit Upto"
              value={permit}
              onChangeText={setPermit}
              isMandatory
              endIcon="calendar-month"
              editable={false}
              onPressEndIcon={() => onPressCalend('permit')}
            />
          </Pressable>

          <Box style={{marginTop: -10}}>
            <Radio
              title="RC availability"
              selectedOption={rcAvail}
              handleOptionSelect={handleRc}
              isMandatory
              isImage
              onPressCamera={() => onOpenPicker('rc')}
              selectPhoto={carDocsType[0].url}
            />
            <Radio
              title="RTO noc issued"
              selectedOption={noc}
              handleOptionSelect={handleNoc}
            />
            <Radio
              title="Mismatch in RC"
              selectedOption={mismatch}
              handleOptionSelect={handleMismatch}
            />
          </Box>

          <Box pv={'2%'}>
            <CustomText
              fontSize={14}
              lineHeight={28}
              fontFamily="Roboto-Medium"
              color="#111111">
              Insurance - type<Text style={{color: 'red'}}>*</Text>
            </CustomText>
            <Box style={[styles.checkboxWrap]}>
              {insuranceType.map((el, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    style={[styles.checkboxPress]}
                    onPress={() => onPressCheckbox(el.id)}>
                    <Icon
                      name={el.selected ? 'radiobox-marked' : 'radiobox-blank'}
                      size={20}
                      color={el.selected ? colors.secondary : '#111111'}
                    />
                    <CustomText
                      color="#1C1B1F"
                      fontFamily="Roboto-Regular"
                      fontSize={14}
                      lineHeight={18}
                      style={{left: 2}}>
                      {el.title}
                    </CustomText>
                  </Pressable>
                );
              })}
            </Box>
          </Box>
          <Radio
            title="Under Hypothication"
            handleOptionSelect={handeHypo}
            selectedOption={hypo}
          />
          <Radio
            title="Road tax paid"
            handleOptionSelect={handleRoadTax}
            selectedOption={roadTax}
            isImage
            selectPhoto={carDocsType[1].url}
            onPressCamera={() => onOpenPicker('road')}
          />
          <Radio
            title="Partipeshi Request"
            handleOptionSelect={handlePartiPeshi}
            selectedOption={partipeshi}
            isImage
            selectPhoto={carDocsType[2].url}
            onPressCamera={() => onOpenPicker('partpeshi')}
          />
          <Radio
            title="Duplicate Key"
            handleOptionSelect={handleKey}
            selectedOption={key}
            isImage
            selectPhoto={carDocsType[3].url}
            onPressCamera={() => onOpenPicker('key')}
          />
          <Radio
            title="Chessis Number embossing ( Tracable/Nor tracable)"
            handleOptionSelect={handleChessis}
            selectedOption={chessis}
            isImage
            selectPhoto={carDocsType[4].url}
            onPressCamera={() => onOpenPicker('chesis')}
          />
          <Radio
            title="CNG/LPG fitment"
            handleOptionSelect={handleFitment}
            selectedOption={fitment}
            isMandatory
          />
          <Radio
            title="CNG/LPG fitment endorsed on RC"
            handleOptionSelect={handleEndorsed}
            selectedOption={fitmentEndorsed}
            isMandatory
          />
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
            <PrimaryButton label="Save Edits" onPress={onSaveDocuments} />
          </Box>
        </Box>
      </ScrollView>
      <Calendar
        value={new Date()}
        isOpen={showCalendar}
        onChange={onChangeDate}
        onClosed={closeCalendar}
        maximumDate={new Date(12, 2040)}
        minimumDate={new Date()}
      />
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
  option: {
    flexDirection: 'row',
  },
  checkboxPress: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  checkboxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: '3rem',
  },
});

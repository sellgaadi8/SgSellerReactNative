/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView} from 'react-native';
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

export default function CarDocuments({navigation, route}: CarDocumentsProps) {
  const [insuranceType, setInsuranceType] = useState([
    {id: 'comprehensive', title: 'COMPREHENSIVE', selected: false},
    {id: 'thirdparty', title: 'THIRDPARTY', selected: false},
    {id: 'zero_dep', title: 'ZERO DEP', selected: false},
  ]);
  const [rto, setRto] = useState('');
  const [fitness, setFitness] = useState('');
  const [permit, setPermit] = useState('');
  const [rcAvail, setRcAvail] = useState('');
  const [noc, setNoc] = useState('');
  const [mismatch, setMismatch] = useState('');
  const [insurance, setInsurance] = useState('');
  const [hypo, setHypo] = useState('');
  const [roadTax, setRoadTax] = useState('');
  const [partipeshi, setPartipeshi] = useState('');
  const [key, setKey] = useState('');
  const [chessis, setChessis] = useState('');
  const [fitment, setFitment] = useState('');
  const [fitmentEndorsed, setFitmentEndorsed] = useState('');
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddCarDocs = useAppSelector(state => state.addCarDocument);
  const selectUpdateCarDocs = useAppSelector(state => state.updateCarDocument);
  const selectGetCarDocs = useAppSelector(state => state.getCarDocuments);
  const [loading, setLoading] = useState(false);

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

  function onSaveDocuments() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onAddCarDocuments(
          vehicleId,
          rcAvail.toLowerCase(),
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
        ),
      );
    } else {
      dispatch(
        onUpdateCarDocuments(
          vehicleId,
          rcAvail.toLowerCase(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddCarDocs, selectUpdateCarDocs, selectGetCarDocs]);

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
          <ProfileInput label="RTO*" value={rto} onChangeText={setRto} />
          <ProfileInput
            label="Fitness Upto*"
            value={fitness}
            onChangeText={setFitness}
          />
          <ProfileInput
            label="Permit Upto*"
            value={permit}
            onChangeText={setPermit}
          />
          <Box style={{marginTop: -10}}>
            <Radio
              title="RC availability*"
              selectedOption={rcAvail}
              handleOptionSelect={handleRc}
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
              Insurance - type*
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
          />
          <Radio
            title="Partipeshi Request"
            handleOptionSelect={handlePartiPeshi}
            selectedOption={partipeshi}
          />
          <Radio
            title="Duplicate Key"
            handleOptionSelect={handleKey}
            selectedOption={key}
          />
          <Radio
            title="Chessis Number embossing ( Tracable/Nor tracable)"
            handleOptionSelect={handleChessis}
            selectedOption={chessis}
          />
          <Radio
            title="CNG/LPG fitment*"
            handleOptionSelect={handleFitment}
            selectedOption={fitment}
          />
          <Radio
            title="CNG/LPG fitment endorsed on RC*"
            handleOptionSelect={handleEndorsed}
            selectedOption={fitmentEndorsed}
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

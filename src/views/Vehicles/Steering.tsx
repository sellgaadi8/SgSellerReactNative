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
import {SteeringProps} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import GlobalContext from '../../contexts/GlobalContext';
import {onAddSteering} from '../../redux/ducks/addSteering';
import {onUpdateSteering} from '../../redux/ducks/updateSteering';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onGetSteeringDetails} from '../../redux/ducks/getSteering';
import Loader from '../../components/Loader';

export default function Steering({navigation, route}: SteeringProps) {
  const [suspension, setSuspension] = useState('');
  const [steering, setSteering] = useState('');
  const [brake, setBrake] = useState('');
  const [wheel, setWheel] = useState('');
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddSteering = useAppSelector(state => state.addSteering);
  const selectUpdateSteering = useAppSelector(state => state.updateSteering);
  const selectGetSteering = useAppSelector(state => state.getSteering);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetSteeringDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit() {
    setLoading(true);
    if (route.params.from === 'add') {
      setLoading(true);
      dispatch(onAddSteering(vehicleId, suspension, steering, brake, wheel));
    } else {
      setLoading(true);
      dispatch(onUpdateSteering(vehicleId, suspension, steering, brake, wheel));
    }
  }

  useEffect(() => {
    if (selectAddSteering.called) {
      setLoading(false);
      const {error, success, message} = selectAddSteering;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectUpdateSteering.called) {
      setLoading(false);
      const {error, success, message} = selectUpdateSteering;
      if (!error && success) {
        navigation.goBack();
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectGetSteering.called) {
      setLoading(false);
      const {error, data} = selectGetSteering;
      if (!error && data) {
        setSuspension(data.suspension);
        setSteering(data.steering);
        setBrake(data.brake);
        setWheel(data.wheel_bearing_noise);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddSteering, selectUpdateSteering, selectGetSteering]);
  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 9: Steering
        </CustomText>
        <Box>
          <RadioButtons
            label="Suspension"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'WEAK', value: 'weak'},
              {label: 'ABNORMAL NOISE', value: 'abnormal_noise'},
            ]}
            onSelect={(label, value) => setSuspension(value)}
            selectValue={suspension}
          />
          <RadioButtons
            label="Steering"
            data={[
              {label: 'NORMAL', value: 'normal'},
              {label: 'HARD', value: 'hard'},
            ]}
            onSelect={(label, value) => setSteering(value)}
            selectValue={steering}
          />
          <RadioButtons
            label="Brake"
            data={[
              {label: 'NORMAL', value: 'normal'},
              {label: 'WEAK', value: 'weak'},
            ]}
            onSelect={(label, value) => setBrake(value)}
            selectValue={brake}
          />
          <RadioButtons
            label="Wheel bearing noise"
            data={[
              {label: 'NORMAL', value: 'normal'},
              {label: 'ABNORMAL', value: 'abnormal'},
            ]}
            onSelect={(label, value) => setWheel(value)}
            selectValue={wheel}
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
    marginTop: '5rem',
  },
});

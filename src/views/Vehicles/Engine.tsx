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
import {EngineProps} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onAddEngine} from '../../redux/ducks/addEngine';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onUpdateEngine} from '../../redux/ducks/updateEngine';
import {onGetEngineDetails} from '../../redux/ducks/getEngine';

export default function Engine({navigation, route}: EngineProps) {
  const [oilLeak, setOilLeak] = useState('');
  const [smoke, setSmoke] = useState('');
  const [permissble, setPermissble] = useState('');
  const [mounting, setMounting] = useState('');
  const [sound, setSound] = useState('');
  const [clutch, setClutch] = useState('');
  const [ac, setAc] = useState('');
  const [cooling, setCooling] = useState('');
  const [heater, setHeater] = useState('');
  const [condensor, setCondensor] = useState('');
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddEngine = useAppSelector(state => state.addEngine);
  const selectUpdateEngine = useAppSelector(state => state.updateEngine);
  const selectGetEngine = useAppSelector(state => state.getEngine);

  useEffect(() => {
    if (route.params.from === 'edit') {
      dispatch(onGetEngineDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit() {
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
        ),
      );
    }
  }

  useEffect(() => {
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
      if (!error && data) {
        setOilLeak(data.gear_oil_leakage);
        setSmoke(data.exhaust_smoke);
        setPermissble(data.engine_perm_blow_back);
        setMounting(data.engine_mounting);
        setSound(data.engine_sound);
        setClutch(data.clutch_bearing_sound);
        setAc(data.ac);
        setCooling(data.cooling);
        setCondensor(data.condensor);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddEngine, selectUpdateEngine, selectGetEngine]);

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.onScroll}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#201A1B">
          Step 7: Engine
        </CustomText>
        <Box style={styles.body}>
          <RadioButtons
            label="Gear Oil leakage"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'Leakage', value: 'leakage'}, ///image
            ]}
            onSelect={(label, value) => setOilLeak(value)}
            isImage
          />
          <RadioButtons
            label="Exhaust smoke"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'BLACK SMOKE', value: 'black_smoke'},
              {label: 'WHITE SMOKE', value: 'white_smoke'}, ///image
            ]}
            onSelect={(label, value) => setSmoke(value)}
          />
          <RadioButtons
            label="Engine permissible blow back"
            data={[
              {label: 'YES', value: 'yes'},
              {label: 'NO BLOW BACK', value: 'no_blow_back'},
            ]}
            onSelect={(label, value) => setPermissble(value)}
          />
          <RadioButtons
            label="Engine mounting"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'SOUND', value: 'sound'},
            ]}
            onSelect={(label, value) => setMounting(value)}
          />
          <RadioButtons
            label="Engine sound"
            data={[
              {label: 'MAJOR SOUND', value: 'major_sound'},
              {label: 'NO BLOW BY', value: 'no_blow_by'}, //video
            ]}
            onSelect={(label, value) => setSound(value)}
          />
          <RadioButtons
            label="Clutch bearing Noise"
            data={[
              {label: 'YES', value: 'yes'},
              {label: 'NO', value: 'no'},
            ]}
            onSelect={(label, value) => setClutch(value)}
          />
          <RadioButtons
            label="AC"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'Leakage', value: 'leakage'}, //image
            ]}
            onSelect={(label, value) => setAc(value)}
          />
          <RadioButtons
            label="Cooling"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setCooling(value)}
            isMandatory
          />
          <RadioButtons
            label="Heater"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setHeater(value)}
            isMandatory
          />
          <RadioButtons
            label="Condensor"
            data={[
              {label: 'OK', value: 'ok'},
              {label: 'NOT OK', value: 'not_ok'},
            ]}
            onSelect={(label, value) => setCondensor(value)}
            isMandatory
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
  body: {
    marginTop: '0.5rem',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
  },
});

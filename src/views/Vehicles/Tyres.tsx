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
import ProfileInput from '../../components/ProfileInput';
import PrimaryButton from '../../components/PrimaryButton';
import {TyresProps} from '../../types/propsTypes';
import {useDispatch} from 'react-redux';
import {onAddTyres} from '../../redux/ducks/addTyres';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hooks';
import Snackbar from 'react-native-snackbar';
import {onUpdateTyres} from '../../redux/ducks/updateTyres';
import {onGetTyresDetails} from '../../redux/ducks/getTyres';
import Loader from '../../components/Loader';

export default function Tyres({navigation, route}: TyresProps) {
  const [lhsfront, setLhsFront] = useState('');
  const [rhsfront, setRhsFront] = useState('');
  const [lhsback, setLhsBack] = useState('');
  const [rhsback, setRhsBack] = useState('');
  const [spare, setSpare] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const {vehicleId} = useContext(GlobalContext);
  const selectAddTyres = useAppSelector(state => state.addTyres);
  const selectUpdateTyres = useAppSelector(state => state.updateTyres);
  const selectGetTyres = useAppSelector(state => state.getTyres);

  useEffect(() => {
    if (route.params.from === 'edit') {
      setLoading(true);
      dispatch(onGetTyresDetails(vehicleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit() {
    setLoading(true);
    if (route.params.from === 'add') {
      dispatch(
        onAddTyres(vehicleId, lhsfront, rhsfront, lhsback, rhsback, spare),
      );
    } else {
      dispatch(
        onUpdateTyres(vehicleId, lhsfront, rhsfront, lhsback, rhsback, spare),
      );
    }
  }

  useEffect(() => {
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
        setLhsFront(data.lhs_front_type);
        setRhsFront(data.rhs_front_type);
        setLhsBack(data.lhs_back_type);
        setRhsBack(data.rhs_back_type);
        setSpare(data.spare_type);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAddTyres, selectUpdateTyres, selectGetTyres]);

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
          <ProfileInput
            label="LHS front tyre ( % / damaged )"
            value={lhsfront}
            onChangeText={setLhsFront}
          />
          <ProfileInput
            label="RHS front tyre ( % / damaged )"
            value={rhsfront}
            onChangeText={setRhsFront}
          />
          <ProfileInput
            label="LHS Back tyre ( % / damaged )"
            value={lhsback}
            onChangeText={setLhsBack}
          />
          <ProfileInput
            label="RHS Back tyre ( % / damaged )"
            value={rhsback}
            onChangeText={setRhsBack}
          />
          <ProfileInput
            label="Spare tyre (%, damaged )"
            value={spare}
            onChangeText={setSpare}
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
    marginBottom: '4rem',
  },
});

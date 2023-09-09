import React, {useContext, useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomProgressBar from '../../components/CustomProgressBar';
import {ScrollView} from 'react-native';
import AddVehicleCard from '../../components/AddVehicleCard';
import {AddVehicleProps} from '../../types/propsTypes';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch} from 'react-redux';
import {getVehicleForm} from '../../redux/ducks/addVehicleForm';
import {useAppSelector} from '../../utils/hooks';
import Loader from '../../components/Loader';
import GlobalContext from '../../contexts/GlobalContext';

export default function AddVehicle({navigation}: AddVehicleProps) {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<{
    [key: string]: {heading: string; percentage: number; sub_heading: string};
  }>();
  const [loading, setLoading] = useState(false);
  const [isStep1Completed, setIsStep1Completed] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const {vehicleId, vehicleType} = useContext(GlobalContext);
  const selectVehicleForm = useAppSelector(state => state.addVehicleForm);
  const selectUpdateVehicleForm = useAppSelector(
    state => state.updateVehicleForm,
  );

  useEffect(() => {
    navigation.addListener('focus', onFocus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId, navigation]);

  function onFocus() {
    if (vehicleId) {
      setTimeout(() => {
        setLoading(true);
        dispatch(getVehicleForm(vehicleId));
      }, 500);
    } else {
      setLoading(true);
      dispatch(getVehicleForm(''));
    }
  }

  useEffect(() => {
    if (selectVehicleForm.called) {
      setLoading(false);
      const {data, error} = selectVehicleForm;
      if (!error && data) {
        setPercentage(data.total_percentage);
        setForm(data);
        if (data.total_percentage === 0) {
          setIsStep1Completed(false);
        } else {
          setIsStep1Completed(true);
        }
      }
    }
    if (selectUpdateVehicleForm.called) {
      setLoading(false);
      const {data, error} = selectUpdateVehicleForm;
      if (!error && data) {
        setForm(data);
        if (data.total_percentage === 0) {
          setIsStep1Completed(false);
        } else {
          setIsStep1Completed(true);
        }
      }
    }
  }, [selectVehicleForm, selectUpdateVehicleForm]);

  function navigateScreen(index: number, per: number) {
    switch (index) {
      case 0:
        navigation.navigate('DisplayInfo', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      case 1:
        navigation.navigate('CarImages', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      case 2:
        navigation.navigate('CarDocuments', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      case 3:
        navigation.navigate(
          vehicleType === 'two_wheeler' ? 'TwoWheelerExterior' : 'Exterior',
          {
            from: per === 0 ? 'add' : 'edit',
          },
        );
        break;
      case 4:
        navigation.navigate(
          vehicleType === 'two_wheeler'
            ? 'HandlingSuspension'
            : 'ExternelPanel',
          {
            from: per === 0 ? 'add' : 'edit',
          },
        );
        break;
      case 5:
        navigation.navigate('Tyres', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      case 6:
        navigation.navigate('Engine', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      case 7:
        navigation.navigate(
          vehicleType !== 'four_wheeler'
            ? 'TwoWheelerElectrical'
            : 'Electricals',
          {
            from: per === 0 ? 'add' : 'edit',
          },
        );
        break;
      case 8:
        navigation.navigate('Steering', {
          from: per === 0 ? 'add' : 'edit',
        });
        break;
      default:
        break;
    }
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <Box pv={'5%'} ph={'5%'}>
          <CustomText
            fontFamily="Roboto-Bold"
            fontSize={22}
            lineHeight={28}
            color="#201A1B">
            Form progress:
          </CustomText>
        </Box>

        {form && (
          <>
            <Box width="90%" alignSelf="center">
              <CustomProgressBar progress={percentage} />
            </Box>
            <Box style={styles.onScroll}>
              {Object.entries(form).map((el, index) => {
                if (
                  typeof el[1] === 'object' &&
                  el[1].hasOwnProperty('percentage')
                ) {
                  return (
                    <AddVehicleCard
                      key={index.toString()}
                      fill={el[1].percentage}
                      title={el[1].heading}
                      desc={el[1].sub_heading}
                      onComplete={() => navigateScreen(index, el[1].percentage)}
                      isStep1Complete={index !== 0 ? !isStep1Completed : false}
                    />
                  );
                }
              })}
            </Box>

            <Box width={'50%'} alignSelf="center" pv={'5%'}>
              <PrimaryButton
                label="Submit form"
                disabled={!isStep1Completed}
                onPress={() => navigation.navigate('Vehicles')}
              />
            </Box>
          </>
        )}
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
  card: {
    marginTop: '3rem',
    padding: '2.5rem',
    backgroundColor: '#F5F5F5',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    marginTop: 10,
  },
  progress: {
    margin: 10,
  },
  fillText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#49454F',
    fontFamily: 'Roboto-Regular',
  },
});

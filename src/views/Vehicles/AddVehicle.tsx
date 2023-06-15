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

export default function AddVehicle({navigation, route}: AddVehicleProps) {
  const dispatch = useDispatch<any>();
  const [form, setForm] = useState<VehicleForm>();
  const [loading, setLoading] = useState(false);
  const [isStep1Completed, setIsStep1Completed] = useState(false);
  const {vehicleId} = useContext(GlobalContext);
  const selectVehicleForm = useAppSelector(state => state.addVehicleForm);
  const selectUpdateVehicleForm = useAppSelector(
    state => state.updateVehicleForm,
  );

  useEffect(() => {
    setLoading(true);
    navigation.addListener('focus', onFocus);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId, navigation]);

  function onFocus() {
    if (vehicleId) {
      dispatch(getVehicleForm(vehicleId));
    } else {
      dispatch(getVehicleForm(''));
    }
  }

  useEffect(() => {
    if (selectVehicleForm.called) {
      setLoading(false);
      const {data, error} = selectVehicleForm;
      if (!error && data) {
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
              <CustomProgressBar progress={form?.total_percentage} />
            </Box>
            <Box style={styles.onScroll}>
              <AddVehicleCard
                fill={form.display_info.percentage}
                title={form?.display_info.heading}
                desc={form.display_info.sub_heading}
                onComplete={() =>
                  navigation.navigate('DisplayInfo', {
                    from: form.display_info.percentage === 0 ? 'add' : 'edit',
                  })
                }
              />
              <AddVehicleCard
                fill={form.car_images.percentage}
                title={form.car_images.heading}
                desc={form.car_images.sub_heading}
                onComplete={() =>
                  navigation.navigate('CarImages', {
                    from: form.car_images.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.car_docs.percentage}
                title={form.car_docs.heading}
                desc={form.car_docs.sub_heading}
                onComplete={() =>
                  navigation.navigate('CarDocuments', {
                    from: form.car_docs.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.exterior_img.percentage}
                title={form.exterior_img.heading}
                desc={form.exterior_img.sub_heading}
                onComplete={() =>
                  navigation.navigate('Exterior', {
                    from: form.exterior_img.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.external_panel.percentage}
                title={form.external_panel.heading}
                desc={form.external_panel.sub_heading}
                onComplete={() =>
                  navigation.navigate('ExternelPanel', {
                    from: form.external_panel.percentage === 0 ? 'add' : 'edit',
                  })
                }
              />
              <AddVehicleCard
                fill={form.tyres.percentage}
                title={form.tyres.heading}
                desc={form.tyres.sub_heading}
                onComplete={() =>
                  navigation.navigate('Tyres', {
                    from: form.tyres.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.engine.percentage}
                title={form.engine.heading}
                desc={form.engine.sub_heading}
                onComplete={() =>
                  navigation.navigate('Engine', {
                    from: form.engine.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.electricals.percentage}
                title={form.electricals.heading}
                desc={form.electricals.sub_heading}
                onComplete={() =>
                  navigation.navigate('Electricals', {
                    from: form.electricals.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              <AddVehicleCard
                fill={form.steering.percentage}
                title={form.steering.heading}
                desc={form.steering.sub_heading}
                onComplete={() =>
                  navigation.navigate('Steering', {
                    from: form.steering.percentage === 0 ? 'add' : 'edit',
                  })
                }
                isStep1Complete={!isStep1Completed}
              />
              {/* <AddVehicleCard
                fill={form.ac_info.percentage}
                title={form.ac_info.heading}
                desc={form.ac_info.sub_heading}
                onComplete={() => navigation.navigate('Ac')}
              /> */}
            </Box>
            <Box width={'50%'} alignSelf="center" pv={'5%'}>
              <PrimaryButton
                label="Submit form"
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

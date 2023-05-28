import React, {useEffect, useState} from 'react';
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

export default function AddVehicle({navigation}: AddVehicleProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleForm = useAppSelector(state => state.addVehicleForm);
  const [form, setForm] = useState<VehicleForm>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getVehicleForm());
  }, []);

  useEffect(() => {
    if (selectVehicleForm.called) {
      setLoading(false);
      const {data, error} = selectVehicleForm;
      if (!error && data) {
        setForm(data);
      }
    }
  }, [selectVehicleForm]);

  return (
    <Box style={styles.container}>
      <ScrollView>
        {loading && <Loader />}
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
                onComplete={() => navigation.navigate('DisplayInfo')}
              />
              <AddVehicleCard
                fill={form.car_docs.percentage}
                title={form.car_docs.heading}
                desc={form.car_docs.sub_heading}
                onComplete={() => navigation.navigate('CarDocuments')}
              />
              <AddVehicleCard
                fill={form.exterior_img.percentage}
                title={form.exterior_img.heading}
                desc={form.exterior_img.sub_heading}
                onComplete={() => navigation.navigate('Exterior')}
              />
              <AddVehicleCard
                fill={form.external_panel.percentage}
                title={form.external_panel.heading}
                desc={form.external_panel.sub_heading}
                onComplete={() => navigation.navigate('ExternelPanel')}
              />
              <AddVehicleCard
                fill={form.tyres.percentage}
                title={form.tyres.heading}
                desc={form.tyres.sub_heading}
              />
              <AddVehicleCard
                fill={form.engine.percentage}
                title={form.engine.heading}
                desc={form.engine.sub_heading}
              />
              <AddVehicleCard
                fill={form.electricals.percentage}
                title={form.electricals.heading}
                desc={form.electricals.sub_heading}
              />
              <AddVehicleCard
                fill={form.steering.percentage}
                title={form.steering.heading}
                desc={form.steering.sub_heading}
              />
              <AddVehicleCard
                fill={form.ac_info.percentage}
                title={form.ac_info.heading}
                desc={form.ac_info.sub_heading}
              />
            </Box>
            <Box width={'50%'} alignSelf="center" pv={'5%'}>
              <PrimaryButton
                label="Submit form"
                onPress={() => console.log('test')}
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

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {onGetVehicleDetails} from '../../redux/ducks/getVehicleDetails';
import {VehicleDetailProps} from '../../types/propsTypes';
import {container} from '../../utils/styles';
import {useAppSelector} from '../../utils/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions, Image, Pressable, ScrollView} from 'react-native';
import colors from '../../utils/colors';
import {View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const {height, width} = Dimensions.get('window');
const types = [
  'Car documents',
  'Exterior',
  'Externel panel',
  'Tyres',
  'Engine',
  'Ac',
  'Electricals',
  'Steering',
];

export default function VehicleDetail({route}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleDetails = useAppSelector(state => state.getVehicleDetails);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail | null>();
  const [vehicleImage, setVehicleImage] = useState<(string | null)[]>();

  useEffect(() => {
    dispatch(onGetVehicleDetails(route.params.vehicleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectVehicleDetails.called) {
      const {data, success, error} = selectVehicleDetails;
      if (success && !error && data) {
        setVehicleDetails(data);
        if (data.car_images) {
          setVehicleImage(Object.values(data.car_images));
        }
      }
    }
  }, [selectVehicleDetails]);

  return (
    <Box style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true}>
          {vehicleImage &&
            vehicleImage?.map((el, index) => {
              return (
                <Box key={index.toString()} style={{borderWidth: 1}}>
                  {el && <Image source={{uri: el}} style={styles.images} />}
                </Box>
              );
            })}
        </ScrollView>
        <Box pv={'2%'} ph={'5%'}>
          <CustomText
            color="#111111"
            fontFamily="Roboto-Regular"
            fontSize={22}
            lineHeight={32}>
            {vehicleDetails?.display_info.make}(
            {vehicleDetails?.display_info.mfg_year})
          </CustomText>
          <CustomText
            color="#111111"
            fontFamily="Roboto-Regular"
            fontSize={11}
            lineHeight={16}>
            {vehicleDetails?.display_info.model}
          </CustomText>
          <Box flexDirection="row" justifyContent="space-between" pv={'4%'}>
            <Box flexDirection="row">
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.fuel_type}
              </CustomText>
            </Box>
            <Box flexDirection="row">
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.no_of_kms} (Km)
              </CustomText>
            </Box>
            <Box flexDirection="row">
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.variant}
              </CustomText>
            </Box>
          </Box>
          <View style={styles.line} />
          <Box flexDirection="row">
            <Box flexDirection="row">
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.no_of_owners}
              </CustomText>
            </Box>
            <Box flexDirection="row" ph={'28%'}>
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.color}
              </CustomText>
            </Box>
          </Box>
          <ScrollView horizontal contentContainerStyle={styles.tabel}>
            {types.map((el, index) => {
              return (
                <Pressable key={index.toString()} style={styles.headers}>
                  <CustomText
                    color="White"
                    fontFamily="Roboto-Regular"
                    fontSize={14}
                    lineHeight={22}>
                    {el}
                  </CustomText>
                </Pressable>
              );
            })}
          </ScrollView>
          <Box style={styles.body}>
            <CustomText
              color="#111111"
              fontFamily="Roboto-Bold"
              lineHeight={26}
              fontSize={16}>
              Car Documents
            </CustomText>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Chasis No:</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.chasis_no.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Fitness Upto</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.fitness_upto}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>RC Availability:</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.rc_availability.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Road Tax Paid:</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.road_tax_paid.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Insurance</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.insurance.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>RC Noc Issued</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.rc_noc_issued.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Rto</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.rto.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>CNG Fitment</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.cng_lpg_fitment.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>
                CNG Fitment Endorsed
              </CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.cng_lpg_fitment_endorsed_on_rc.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Duplicate Key</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.duplicate_key.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>RC Mismatch</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.mismatch_in_rc.toUpperCase()}
              </CustomText>
            </Box>
            <Box style={styles.title}>
              <CustomText style={styles.dataValue}>Partipeshi</CustomText>
              <CustomText style={styles.value}>
                {vehicleDetails?.car_docs?.partipeshi_request.toUpperCase()}
              </CustomText>
            </Box>
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
  images: {
    height: height * 0.35,
    width: width,
  },
  line: {
    backgroundColor: '#000000',
    height: '0.1rem',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '1rem',
  },
  tabel: {
    backgroundColor: '#000000',
    marginTop: '2rem',
    padding: 10,
  },
  headers: {
    marginRight: '5rem',
  },
  body: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('2%'),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: '1%',
  },
  dataValue: {
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    lineHeight: 22,
    fontSize: 15,
  },
  value: {
    fontFamily: 'Roboto-Bold',
    color: '#34A02C',
    lineHeight: 22,
    fontSize: 14,
  },
});

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
            {vehicleDetails?.car_docs && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
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
                  <CustomText style={styles.dataValue}>
                    RC Availability:
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.car_docs?.rc_availability.toUpperCase()}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Road Tax Paid:
                  </CustomText>
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
                  <CustomText style={styles.dataValue}>
                    RC Noc Issued
                  </CustomText>
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
                  <CustomText style={styles.dataValue}>
                    Duplicate Key
                  </CustomText>
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
            )}
            {vehicleDetails?.exterior && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Exterior</CustomText>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Pillar A
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.left_pillarA}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Pillar B
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.left_pillarB}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Pillar C
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.left_pillarC}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Pillar A
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.right_pillarA}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Pillar B
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.right_pillarB}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Pillar C
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.right_pillarB}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Left Apron</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.left_apron}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Apron Leg
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.left_apron_leg}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Right Apron</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.right_apron}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Apron Leg
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.right_apron_leg}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Boot Floor</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.exterior?.boot_floor}
                  </CustomText>
                </Box>
              </Box>
            )}
            {vehicleDetails?.external_panel && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
                  Externel panel
                </CustomText>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Bonnet Head</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.bonnet_head}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Dickey Door</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.dickey_door}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Door Back
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.left_door_back}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Door Front
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.left_door_front}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Door Back
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.right_door_back}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Door Front
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.right_door_front}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Left Fender</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.left_fender}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Right Fender</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.right_fender}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Left Quater Panel
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.left_quater_panel}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Right Quater Panel
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.external_panel?.right_quater_panel}
                  </CustomText>
                </Box>
              </Box>
            )}
            {vehicleDetails?.tyres && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Tyres</CustomText>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    LHS Back Type
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.tyres?.lhs_back_type}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    RHS Back Type
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.tyres?.rhs_back_type}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    LHS Front Type
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.tyres?.lhs_front_type}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    RHS Front Type
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.tyres?.rhs_front_type}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Spare Type</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.tyres?.spare_type}
                  </CustomText>
                </Box>
              </Box>
            )}
            {vehicleDetails?.engine && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Engine</CustomText>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Engine Sound</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.engine_sound}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Clutch Bearing Sound
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.clutch_bearing_sound}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Engine Mounting
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.engine_mounting}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Exhaust Smoke
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.exhaust_smoke}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Gear Oil Leakage
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.gear_oil_leakage}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Engine Perm Blow Back
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.engine_perm_blow_back}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Heater</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.heater}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>AC</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.ac}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Cooling</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.cooling}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Condensor</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.engine?.condensor}
                  </CustomText>
                </Box>
              </Box>
            )}
            {vehicleDetails?.electricals && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
                  Electricals
                </CustomText>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Electrical Odomoter
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.electrical_odomoter}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Jack Tool Box
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.jack_tool_box}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Lights Crack Broken
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.lights_crack_broken}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Music System</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.music_system}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>Overall</CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.overall}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Parking Sensor
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.parking_sensor}
                  </CustomText>
                </Box>
                <Box style={styles.title}>
                  <CustomText style={styles.dataValue}>
                    Power Windows
                  </CustomText>
                  <CustomText style={styles.value}>
                    {vehicleDetails?.electricals?.power_windows}
                  </CustomText>
                </Box>
              </Box>
            )}
            <Box>
              <CustomText style={styles.vehicleHeading}>Steering</CustomText>
              <Box style={styles.title}>
                <CustomText style={styles.dataValue}>Brake</CustomText>
                <CustomText style={styles.value}>
                  {vehicleDetails?.steering?.brake}
                </CustomText>
              </Box>
              <Box style={styles.title}>
                <CustomText style={styles.dataValue}>Steering</CustomText>
                <CustomText style={styles.value}>
                  {vehicleDetails?.steering?.steering}
                </CustomText>
              </Box>
              <Box style={styles.title}>
                <CustomText style={styles.dataValue}>Suspension</CustomText>
                <CustomText style={styles.value}>
                  {vehicleDetails?.steering?.suspension}
                </CustomText>
              </Box>
              <Box style={styles.title}>
                <CustomText style={styles.dataValue}>
                  Wheel Bearing Noise
                </CustomText>
                <CustomText style={styles.value}>
                  {vehicleDetails?.steering?.wheel_bearing_noise}
                </CustomText>
              </Box>
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
    width: '90%',
    paddingVertical: '3%',
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
    textTransform: 'uppercase',
  },
  vehicleHeading: {
    color: '#B92864',
    fontFamily: 'Roboto-Bold',
    lineHeight: 26,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
});

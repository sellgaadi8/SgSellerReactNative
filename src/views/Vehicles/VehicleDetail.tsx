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
import Video from 'react-native-video';
// import DetailWithImage from '../../components/DetailWithImage';
// import DataWithImages from '../../components/DataWithImages';
import TyresImages from '../../components/TyresImages';
import Loader from '../../components/Loader';
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

export default function VehicleDetail({route, navigation}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleDetails = useAppSelector(state => state.getVehicleDetails);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail | null>();
  const [vehicleImage, setVehicleImage] = useState<(string | null)[]>();
  const [play, setPlay] = useState(false);
  // const [okValues, setOkValues] = useState<ExteriorImage>({});
  // const [notokValues, setNotOkValues] = useState<ExteriorImage>({});
  // const [exterior, setExterior] = useState<ExteriorImage>();

  // const [okValuesExternel, setOkValuesExternel] = useState<ExteriorImage>({});
  // const [notokValuesExternel, setNotOkValuesExternel] = useState<ExteriorImage>(
  //   {},
  // );
  // const [externel, setExternel] = useState<ExteriorImage>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleDetails(route.params.vehicleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectVehicleDetails.called) {
      setLoading(false);
      const {data, success, error} = selectVehicleDetails;
      if (success && !error && data) {
        setVehicleDetails(data);
        if (data.car_images) {
          setVehicleImage(Object.values(data.car_images));
        }
      }
    }
  }, [selectVehicleDetails]);

  // function getExteriorData() {
  //   const okValue: Partial<ExteriorDetails> = {};
  //   const nonOkValues: Partial<ExteriorDetails> = {};

  //   for (const key in exterior) {
  //     if (exterior && exterior.hasOwnProperty(key)) {
  //       if (exterior && exterior[key] === 'ok') {
  //         okValue[key as keyof ExteriorDetails] = exterior[key];
  //       } else if (exterior[key] !== null) {
  //         nonOkValues[key as keyof ExteriorDetails] = exterior[key];
  //       }
  //     }
  //   }
  //   setOkValues(okValue);
  //   setNotOkValues(nonOkValues);
  // }

  // function getExternelData() {
  //   const okValue: Partial<ExteriorImage> = {};
  //   const nonOkValues: Partial<ExteriorImage> = {};

  //   for (const key in externel) {
  //     if (externel && externel.hasOwnProperty(key)) {
  //       if (externel && externel[key] === 'ok') {
  //         okValue[key as keyof ExteriorImage] = externel[key];
  //       } else if (externel[key] !== null) {
  //         nonOkValues[key as keyof ExteriorImage] = externel[key];
  //       }
  //     }
  //   }
  //   setOkValuesExternel(okValue);
  //   setNotOkValuesExternel(nonOkValues);
  // }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <ScrollView horizontal={true}>
          {vehicleImage &&
            vehicleImage?.map((el, index) => {
              return (
                <Box key={index.toString()}>
                  {el && index === 0 ? (
                    <Box>
                      <Video
                        source={{uri: el}}
                        style={styles.images}
                        resizeMode="cover"
                        paused={!play}
                        repeat={true}
                      />
                      <Pressable
                        style={styles.play}
                        onPress={() => setPlay(!play)}>
                        <Ionicons
                          name={!play ? 'play' : 'pause'}
                          color="#FFFFFF"
                          size={30}
                        />
                      </Pressable>
                    </Box>
                  ) : (
                    el && <Image source={{uri: el}} style={styles.images} />
                  )}
                </Box>
              );
            })}
        </ScrollView>

        <Box pv={'2%'} ph={'6%'}>
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
              <CustomText style={styles.display}>
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
              <CustomText style={styles.display}>
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
              <CustomText style={styles.display}>
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
              <CustomText style={styles.display}>
                {vehicleDetails?.display_info.no_of_owners}
              </CustomText>
            </Box>
            <Box flexDirection="row" ph={'20%'}>
              <Ionicons
                name="car-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText style={styles.display}>
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
                    fontSize={16}
                    lineHeight={22}>
                    {el}
                  </CustomText>
                </Pressable>
              );
            })}
          </ScrollView>

          <Box style={styles.body}>
            <ScrollView>
              {vehicleDetails?.car_docs && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>
                    Car Documents
                  </CustomText>

                  <Box style={styles.title}>
                    <CustomText style={styles.dataValue}>
                      Fitness Upto
                    </CustomText>
                    <CustomText style={styles.value}>
                      {vehicleDetails?.car_docs?.fitness_upto}
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
                    <CustomText style={styles.dataValue}>
                      CNG Fitment
                    </CustomText>
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
                      RC Mismatch
                    </CustomText>
                    <CustomText style={styles.value}>
                      {vehicleDetails?.car_docs?.mismatch_in_rc.toUpperCase()}
                    </CustomText>
                  </Box>
                  {/* <DetailWithImage
                    title="Chasis No."
                    image={vehicleDetails.car_docs.chasis_no_image}
                    value={vehicleDetails?.car_docs?.chasis_no.toUpperCase()}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.car_docs?.chasis_no_image
                          ? vehicleDetails?.car_docs?.chasis_no_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <DetailWithImage
                    title="RC Availability:"
                    image={vehicleDetails.car_docs.rc_availability_image}
                    value={vehicleDetails?.car_docs?.rc_availability.toUpperCase()}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.car_docs?.rc_availability_image
                          ? vehicleDetails?.car_docs?.rc_availability_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <DetailWithImage
                    title="Road Tax Paid"
                    image={vehicleDetails.car_docs.road_tax_paid_image}
                    value={vehicleDetails?.car_docs?.road_tax_paid.toUpperCase()}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.car_docs?.road_tax_paid_image
                          ? vehicleDetails?.car_docs?.road_tax_paid_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <DetailWithImage
                    title="Duplicate Key"
                    image={vehicleDetails.car_docs.duplicate_key_image}
                    value={vehicleDetails?.car_docs?.duplicate_key.toUpperCase()}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.car_docs?.duplicate_key_image
                          ? vehicleDetails?.car_docs?.duplicate_key_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <DetailWithImage
                    title="Partipeshi Request"
                    image={vehicleDetails.car_docs.partipeshi_request_image}
                    value={vehicleDetails?.car_docs?.partipeshi_request.toUpperCase()}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.car_docs?.partipeshi_request_image
                          ? vehicleDetails?.car_docs?.partipeshi_request_image
                          : '',
                        index: 0,
                      })
                    }
                  /> */}
                </Box>
              )}

              {vehicleDetails?.exterior_img && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>
                    Exterior
                  </CustomText>
                  {/* <DataWithImages
                    notokValues={notokValues}
                    okValues={okValues}
                    label="Exterior"
                    data={exterior}
                  /> */}
                </Box>
              )}

              {vehicleDetails?.external_panel && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>
                    Externel Panel
                  </CustomText>
                  {/* <DataWithImages
                    notokValues={notokValuesExternel}
                    okValues={okValuesExternel}
                    label="Externel"
                    data={externel}
                  /> */}
                </Box>
              )}
              {vehicleDetails?.tyres && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>Tyres</CustomText>
                  <TyresImages
                    title="LHS Back Type"
                    value={vehicleDetails?.tyres?.lhs_back_type}
                    image={vehicleDetails?.tyres.lhs_back_image}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.tyres?.lhs_back_image
                          ? vehicleDetails?.tyres?.lhs_back_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <TyresImages
                    title="RHS Back Type"
                    value={vehicleDetails?.tyres?.rhs_back_type}
                    image={vehicleDetails?.tyres.rhs_back_image}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.tyres?.rhs_back_image
                          ? vehicleDetails?.tyres?.rhs_back_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <TyresImages
                    title="LHS Front Type"
                    value={vehicleDetails?.tyres?.lhs_front_type}
                    image={vehicleDetails?.tyres.lhs_front_image}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.tyres?.lhs_front_image
                          ? vehicleDetails?.tyres?.lhs_front_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <TyresImages
                    title="RHS Front Type"
                    value={vehicleDetails?.tyres?.rhs_front_type}
                    image={vehicleDetails?.tyres.rhs_front_image}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.tyres?.rhs_front_image
                          ? vehicleDetails?.tyres?.rhs_front_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                  <TyresImages
                    title="Spare Type"
                    value={vehicleDetails?.tyres?.spare_type}
                    image={vehicleDetails?.tyres.spare_image}
                    onPressImage={() =>
                      navigation.navigate('ImageViewerCarousel', {
                        data: vehicleDetails?.tyres?.spare_image
                          ? vehicleDetails?.tyres?.spare_image
                          : '',
                        index: 0,
                      })
                    }
                  />
                </Box>
              )}
              {vehicleDetails?.engine && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>Engine</CustomText>
                  <TyresImages
                    title="Engine Sound"
                    value={vehicleDetails?.engine?.engine_sound}
                    video={vehicleDetails?.engine?.engine_sound_video}
                  />
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
                  {/* <TyresImages
                    title="Exhaust Smoke"
                    value={vehicleDetails?.engine?.exhaust_smoke}
                    image={vehicleDetails?.engine?.exhaust_smoke_image}
                  />
                  <TyresImages
                    title="Gear Oil Leakage"
                    value={vehicleDetails?.engine?.gear_oil_leakage}
                    image={vehicleDetails?.engine?.gear_oil_leakage_image}
                  /> */}
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
                  {/* <TyresImages
                    title="Electrical Odomoter"
                    value={vehicleDetails?.electricals?.electrical_odomoter}
                    image={
                      vehicleDetails?.electricals?.electrical_odomoter_image
                    }
                  />
                  <TyresImages
                    title="Jack Tool Box"
                    value={vehicleDetails?.electricals?.jack_tool_box}
                    image={vehicleDetails?.electricals?.jack_tool_box_image}
                  />

                  <TyresImages
                    title="Lights Crack Broken"
                    value={vehicleDetails?.electricals?.lights_crack_broken}
                    image={
                      vehicleDetails?.electricals?.lights_crack_broken_image
                    }
                  />
                  <TyresImages
                    title="Music System"
                    value={vehicleDetails?.electricals?.music_system}
                    image={vehicleDetails?.electricals?.music_system_image}
                  />
                  <TyresImages
                    title="Overall"
                    value={vehicleDetails?.electricals?.overall}
                    image={vehicleDetails?.electricals?.overall_image}
                  /> */}
                  {/* <TyresImages
                    title="Parking Sensor"
                    value={vehicleDetails?.electricals?.parking_sensor}
                    image={vehicleDetails?.electricals?.parking_sensor_image}
                  />
                  <TyresImages
                    title="Power Windows"
                    value={vehicleDetails?.electricals?.power_windows}
                    image={vehicleDetails?.electricals?.power_windows_image}
                  /> */}
                </Box>
              )}
              {vehicleDetails?.steering && (
                <Box>
                  <CustomText style={styles.vehicleHeading}>
                    Steering
                  </CustomText>
                  {vehicleDetails?.steering?.brake && (
                    <Box style={styles.title}>
                      <CustomText style={styles.dataValue}>Brake</CustomText>
                      <CustomText style={styles.value}>
                        {vehicleDetails?.steering?.brake}
                      </CustomText>
                    </Box>
                  )}
                  {vehicleDetails?.steering?.steering && (
                    <Box style={styles.title}>
                      <CustomText style={styles.dataValue}>Steering</CustomText>
                      <CustomText style={styles.value}>
                        {vehicleDetails?.steering?.steering}
                      </CustomText>
                    </Box>
                  )}
                  {vehicleDetails?.steering?.suspension && (
                    <Box style={styles.title}>
                      <CustomText style={styles.dataValue}>
                        Suspension
                      </CustomText>
                      <CustomText style={styles.value}>
                        {vehicleDetails?.steering?.suspension}
                      </CustomText>
                    </Box>
                  )}
                  {vehicleDetails?.steering?.wheel_bearing_noise && (
                    <Box style={styles.title}>
                      <CustomText style={styles.dataValue}>
                        Wheel Bearing Noise
                      </CustomText>
                      <CustomText style={styles.value}>
                        {vehicleDetails?.steering?.wheel_bearing_noise}
                      </CustomText>
                    </Box>
                  )}
                </Box>
              )}
            </ScrollView>
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
  play: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  display: {
    fontSize: 12,
    lineHeight: 18,
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  },
  image: {
    height: 50,
    width: 50,
  },
});

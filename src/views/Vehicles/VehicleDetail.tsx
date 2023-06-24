import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {onGetVehicleDetails} from '../../redux/ducks/getVehicleDetails';
import {ExteriorImage, VehicleDetailProps} from '../../types/propsTypes';
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
// import PopulateImageWithData from '../../components/PopulateImageWithData';
// import DataWithImages from '../../components/DataWithImages';
import Loader from '../../components/Loader';
import PopulateImageWithData from '../../components/PopulateImageWithData';
import {Animated} from 'react-native';
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
const max_height = 460;
const min_height = 0;
const HEADER_SCROLL_DISTANCE = max_height - min_height;

export default function VehicleDetail({route, navigation}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleDetails = useAppSelector(state => state.getVehicleDetails);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail | null>();
  const [vehicleImage, setVehicleImage] = useState<(string | null)[]>();
  const [images, setImages] = useState<{key: string; value: string}[]>([]);
  const [play, setPlay] = useState(false);
  const scrollY = new Animated.Value(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [max_height, min_height],
    extrapolate: 'clamp',
  });

  const [okValues, setOkValues] = useState<VehicleImageType>();
  const [exterior, setExterior] = useState<VehicleImageType>();

  const [okValuesExternel, setOkValuesExternel] = useState<VehicleImageType>();

  const [externel, setExternel] = useState<VehicleImageType>();
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

        if (data.exterior_img) {
          setExterior(data.exterior_img);
          getExteriorData();
        }
        if (data.external_panel) {
          setExternel(data.external_panel);
          getExternelData();
        }

        const imageArray: {key: string; value: string}[] = [];

        // Push image values with keys into the array
        for (const key in vehicleDetails) {
          const section = vehicleDetails[key];
          if (typeof section === 'object' && section !== null) {
            for (const subKey in section) {
              const subSection = section[subKey];
              if (
                typeof subSection === 'object' &&
                subSection !== null &&
                'image' in subSection
              ) {
                imageArray.push({key: subKey, value: subSection.image});
              }
            }
          }
        }
        setImages(imageArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectVehicleDetails, vehicleDetails]);

  function getExteriorData() {
    const okValue: Partial<VehicleImageType> = {};

    for (const key in exterior) {
      if (exterior && exterior.hasOwnProperty(key)) {
        if (exterior && exterior[key] === 'ok') {
          okValue[key as keyof VehicleImageType] = exterior[key];
        }
      }
    }
    setOkValues(okValue);
  }

  function getExternelData() {
    const okValue: Partial<VehicleImageType> = {};

    for (const key in externel) {
      if (externel && externel.hasOwnProperty(key)) {
        if (externel && externel[key] === 'ok') {
          okValue[key as keyof VehicleImageType] = externel[key];
        }
      }
    }
    setOkValuesExternel(okValue);
  }

  function handleOnScroll(event: any) {
    var abc =
      event.nativeEvent.contentOffset.y / Dimensions.get('window').height;
    setCurrentIndex(abc);
  }

  function onPressImage(index: number) {
    navigation.navigate('ImageViewerCarousel', {
      data: images,
      index: index,
    });
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <Animated.View style={[{height: headerHeight}]}>
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
                    el && (
                      <Image
                        source={{uri: el}}
                        style={styles.images}
                        resizeMode="cover"
                      />
                    )
                  )}
                </Box>
              );
            })}
        </ScrollView>
        <Box ph={'6%'}>
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
        </Box>
      </Animated.View>
      <ScrollView horizontal>
        {types.map((el, index) => {
          return (
            <Animated.View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: '#000000',
                padding: 10,
                height: currentIndex > 0 ? 50 : 300,
                marginTop: currentIndex > 0 ? 0 : 20,
              }}>
              <Pressable key={index.toString()} style={styles.headers}>
                <CustomText
                  color="White"
                  fontFamily="Roboto-Regular"
                  fontSize={16}
                  lineHeight={22}>
                  {el}
                </CustomText>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false, listener: handleOnScroll},
        )}>
        <Box style={styles.body}>
          {vehicleDetails?.car_docs && (
            <Box>
              <CustomText style={styles.vehicleHeading}>
                Car Documents
              </CustomText>

              <Box style={styles.title}>
                <CustomText style={styles.dataValue}>Fitness Upto</CustomText>
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
                <CustomText style={styles.dataValue}>RC Mismatch</CustomText>
                <CustomText style={styles.value}>
                  {vehicleDetails?.car_docs?.mismatch_in_rc.toUpperCase()}
                </CustomText>
              </Box>
              {vehicleDetails?.car_docs?.chasis_no && (
                <PopulateImageWithData
                  title="Chasis No."
                  image={vehicleDetails.car_docs.chasis_no.image}
                  value={vehicleDetails?.car_docs?.chasis_no.value.toUpperCase()}
                  onPressImage={() => onPressImage(0)}
                />
              )}
              {vehicleDetails.car_docs.rc_availability && (
                <PopulateImageWithData
                  title="RC Availability:"
                  image={vehicleDetails.car_docs.rc_availability.image}
                  value={vehicleDetails?.car_docs?.rc_availability.value.toUpperCase()}
                  onPressImage={() => onPressImage(1)}
                />
              )}

              {vehicleDetails.car_docs.road_tax_paid && (
                <PopulateImageWithData
                  title="Road Tax Paid"
                  image={vehicleDetails.car_docs.road_tax_paid.image}
                  value={vehicleDetails?.car_docs?.road_tax_paid.value.toUpperCase()}
                  onPressImage={() => onPressImage(2)}
                />
              )}
              {vehicleDetails?.car_docs?.duplicate_key && (
                <PopulateImageWithData
                  title="Duplicate Key"
                  image={vehicleDetails.car_docs.duplicate_key.image}
                  value={vehicleDetails?.car_docs?.duplicate_key.value.toUpperCase()}
                  onPressImage={() => onPressImage(3)}
                />
              )}
              {vehicleDetails?.car_docs?.partipeshi_request && (
                <PopulateImageWithData
                  title="Partipeshi Request"
                  image={vehicleDetails.car_docs.partipeshi_request.image}
                  value={vehicleDetails?.car_docs?.partipeshi_request.value.toUpperCase()}
                  onPressImage={() => onPressImage(4)}
                />
              )}
            </Box>
          )}

          {vehicleDetails?.exterior_img && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Exterior</CustomText>
              <Box pv={'2%'}>
                <CustomText style={styles.value}>
                  {okValues &&
                    Object.keys(okValues)
                      .map(el => {
                        return el
                          .split('_')
                          .map(
                            word =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(' ');
                      })
                      .join(', ')}
                </CustomText>
              </Box>
              {vehicleDetails.exterior_img &&
                Object.entries(vehicleDetails.exterior_img).map((el, index) => {
                  return (
                    <PopulateImageWithData
                      title={el[0].replace(/_/g, ' ').toUpperCase()}
                      image={el[1] ? el[1].image : ''}
                      value={el[1] ? el[1].value : ''}
                      onPressImage={() => onPressImage(index)}
                    />
                  );
                })}
            </Box>
          )}

          {vehicleDetails?.external_panel && (
            <Box>
              <CustomText style={styles.vehicleHeading}>
                Externel Panel
              </CustomText>
              <Box pv={'2%'}>
                <CustomText style={styles.value}>
                  {okValuesExternel &&
                    Object.keys(okValuesExternel)
                      .map(el => {
                        return el
                          .split('_')
                          .map(
                            word =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(' ');
                      })
                      .join(', ')}
                </CustomText>
              </Box>
              {vehicleDetails.external_panel &&
                Object.entries(vehicleDetails.external_panel).map(
                  (el, index) => {
                    return (
                      <PopulateImageWithData
                        title={el[0].replace(/_/g, ' ').toUpperCase()}
                        image={el[1] ? el[1].image : ''}
                        value={el[1] ? el[1].value : ''}
                        onPressImage={() => onPressImage(index)}
                      />
                    );
                  },
                )}
            </Box>
          )}
          {vehicleDetails?.tyres && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Tyres</CustomText>
              <PopulateImageWithData
                title="LHS Back Type"
                value={vehicleDetails?.tyres?.lhs_back_type}
                image={vehicleDetails?.tyres.lhs_back_image}
                onPressImage={() => onPressImage(5)}
              />
              <PopulateImageWithData
                title="RHS Back Type"
                value={vehicleDetails?.tyres?.rhs_back_type}
                image={vehicleDetails?.tyres.rhs_back_image}
                onPressImage={() => onPressImage(6)}
              />
              <PopulateImageWithData
                title="LHS Front Type"
                value={vehicleDetails?.tyres?.lhs_front_type}
                image={vehicleDetails?.tyres.lhs_front_image}
                onPressImage={() => onPressImage(7)}
              />
              <PopulateImageWithData
                title="RHS Front Type"
                value={vehicleDetails?.tyres?.rhs_front_type}
                image={vehicleDetails?.tyres.rhs_front_image}
                onPressImage={() => onPressImage(8)}
              />
              <PopulateImageWithData
                title="Spare Type"
                value={vehicleDetails?.tyres?.spare_type}
                image={vehicleDetails?.tyres.spare_image}
                onPressImage={() => onPressImage(9)}
              />
            </Box>
          )}
          {vehicleDetails?.engine && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Engine</CustomText>
              <PopulateImageWithData
                title="Engine Sound"
                value={vehicleDetails?.engine?.engine_sound_video.value}
                video={vehicleDetails?.engine?.engine_sound_video.image}
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
              {/* <PopulateImageWithData
                    title="Exhaust Smoke"
                    value={vehicleDetails?.engine?.exhaust_smoke}
                    image={vehicleDetails?.engine?.exhaust_smoke_image}
                  />
                  <PopulateImageWithData
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
              <CustomText style={styles.vehicleHeading}>Electricals</CustomText>
              {vehicleDetails?.electricals?.electrical_odomoter && (
                <PopulateImageWithData
                  title="Electrical Odomoter"
                  value={vehicleDetails?.electricals?.electrical_odomoter.value}
                  image={vehicleDetails?.electricals?.electrical_odomoter.image}
                />
              )}

              {vehicleDetails?.electricals?.jack_tool_box && (
                <PopulateImageWithData
                  title="Jack Tool Box"
                  value={vehicleDetails?.electricals?.jack_tool_box.value}
                  image={vehicleDetails?.electricals?.jack_tool_box.image}
                />
              )}

              {vehicleDetails?.electricals?.lights_crack_broken && (
                <PopulateImageWithData
                  title="Lights Crack Broken"
                  value={vehicleDetails?.electricals?.lights_crack_broken.value}
                  image={vehicleDetails?.electricals?.lights_crack_broken.image}
                />
              )}
              {vehicleDetails?.electricals?.music_system && (
                <PopulateImageWithData
                  title="Music System"
                  value={vehicleDetails?.electricals?.music_system.value}
                  image={vehicleDetails?.electricals?.music_system.image}
                />
              )}

              {vehicleDetails?.electricals?.overall && (
                <PopulateImageWithData
                  title="Overall"
                  value={vehicleDetails?.electricals?.overall.value}
                  image={vehicleDetails?.electricals?.overall.image}
                />
              )}
              {vehicleDetails?.electricals?.parking_sensor && (
                <PopulateImageWithData
                  title="Parking Sensor"
                  value={vehicleDetails?.electricals?.parking_sensor.value}
                  image={vehicleDetails?.electricals?.parking_sensor.image}
                />
              )}
              {vehicleDetails?.electricals?.power_windows && (
                <PopulateImageWithData
                  title="Power Windows"
                  value={vehicleDetails?.electricals?.power_windows.value}
                  image={vehicleDetails?.electricals?.power_windows.image}
                />
              )}
            </Box>
          )}
          {vehicleDetails?.steering && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Steering</CustomText>
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
                  <CustomText style={styles.dataValue}>Suspension</CustomText>
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
    height: height * 0.3,
    width: width,
  },
  line: {
    backgroundColor: '#000000',
    height: '0.1rem',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '1rem',
  },
  tabel: {},
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

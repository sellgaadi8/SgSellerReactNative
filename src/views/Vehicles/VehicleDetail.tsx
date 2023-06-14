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
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(onGetVehicleDetails(route.params.vehicleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectVehicleDetails.called) {
      const {data, success, error} = selectVehicleDetails;
      if (success && !error && data) {
        setVehicleDetails(data);
        if (data.car_images !== null) {
          setVehicleImage(Object.values(data.car_images));
        }
      }
    }
  }, [selectVehicleDetails]);

  function onSelectType(index: number) {
    if (index) {
      setIsActive(true);
    }
  }

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
                <Pressable
                  key={index.toString()}
                  style={styles.headers}
                  onPress={() => onSelectType(index)}>
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
            <CustomText>test</CustomText>
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
    borderWidth: 1,
  },
});

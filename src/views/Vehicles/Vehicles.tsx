import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import VehicleType from '../../components/VehicleType';
import colors from '../../utils/colors';
import {container} from '../../utils/styles';
import Modal from 'react-native-modalbox';
import {useDispatch} from 'react-redux';
import {onGlobalChange} from '../../redux/ducks/global';
import {VehiclesProps} from '../../types/propsTypes';
import VehicleCard from '../../components/VehicleCard';
const {height} = Dimensions.get('window');

export default function Vehicles({navigation}: VehiclesProps) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<any>();

  function selectVehicleType() {
    navigation.navigate('AddVehicle');
  }
  return (
    <Box style={styles.container}>
      <VehicleCard />
      <Pressable style={styles.addCar} onPress={selectVehicleType}>
        <Icon name="pencil-outline" size={25} color="#000000" />
      </Pressable>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  addCar: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: '10rem',
    padding: '1.5rem',
    right: '3rem',
    borderRadius: '1.5rem',
  },
  modal: {
    height: height * 2,
    backgroundColor: '#FFFFFF',
  },
});

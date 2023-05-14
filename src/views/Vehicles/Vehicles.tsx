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
const {height} = Dimensions.get('window');

export default function Vehicles({navigation}: VehiclesProps) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onGlobalChange({showBottomTabs: true}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closModal() {
    setShow(false);
    dispatch(onGlobalChange({showBottomTabs: true}));
  }

  function addCar() {
    dispatch(onGlobalChange({showBottomTabs: false}));
    setShow(true);
  }

  function selectVehicleType(id: number) {
    navigation.navigate('AddVehicle', {id: id});
  }
  return (
    <>
      <Box style={styles.container}>
        <CustomText>Vehicles</CustomText>
        <Pressable style={styles.addCar} onPress={addCar}>
          <Icon name="pencil-outline" size={25} color="#000000" />
        </Pressable>
      </Box>
      <Modal
        isOpen={show}
        onClosed={closModal}
        style={styles.modal}
        backButtonClose>
        <VehicleType onPressClose={closModal} onPressType={selectVehicleType} />
      </Modal>
    </>
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

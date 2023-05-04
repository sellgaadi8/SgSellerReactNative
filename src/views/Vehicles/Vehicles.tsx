import React, {useState} from 'react';
import {Dimensions, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import VehicleType from '../../components/VehicleType';
import colors from '../../utils/colors';
import {container} from '../../utils/styles';
import Modal from 'react-native-modalbox';
const {height} = Dimensions.get('window');

export default function Vehicles() {
  const [show, setShow] = useState(false);

  function closModal() {
    setShow(false);
  }
  return (
    <>
      <Box style={styles.container}>
        <CustomText>Vehicles</CustomText>
        <Pressable style={styles.addCar} onPress={() => setShow(!show)}>
          <Icon name="pencil-outline" size={25} color="#000000" />
        </Pressable>
      </Box>
      <Modal
        isOpen={show}
        onClosed={closModal}
        style={styles.modal}
        backButtonClose>
        <VehicleType />
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
  },
});

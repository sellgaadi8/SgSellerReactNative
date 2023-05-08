/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import {container, contentCenter} from '../../utils/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {ValuatorProps} from '../../types/propsTypes';

export default function Valuator({navigation}: ValuatorProps) {
  const [list, setList] = useState([
    {id: 1, name: 'John Doe', dId: 'Dealership ID', show: false},
    {id: 2, name: 'Rishabh Jain', dId: 'Dealership ID', show: false},
    {id: 3, name: 'Aditya Gogavekar', dId: 'Dealership ID', show: false},
  ]);

  function showModal(id: number) {
    const temp = list.map(item => ({
      ...item,
      show: item.id === id ? !item.show : false,
    }));
    setList(temp);
  }

  return (
    <Box style={styles.container}>
      <CustomText>Valuator</CustomText>
      {/* {list.map((el, index) => {
        return (
          <Box key={index.toString()} style={styles.detail}>
            <Box flexDirection="row" alignItems="center">
              <Image
                source={require('../../assets/profile.png')}
                style={styles.profile}
                resizeMode="contain"
              />
              <Box ph={'10%'}>
                <CustomText
                  fontSize={16}
                  lineHeight={24}
                  color="#111111"
                  fontFamily="Roboto-Regular">
                  {el.name}
                </CustomText>
                <CustomText
                  fontSize={14}
                  lineHeight={20}
                  color="#111111"
                  fontFamily="Roboto-Regular">
                  {el.dId}
                </CustomText>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Pressable style={styles.phone}>
                <Icon name="phone-outline" color="#111111" size={20} />
              </Pressable>
              <Pressable onPress={() => showModal(el.id)}>
                <Icon name="dots-vertical" color="#111111" size={20} />
              </Pressable>
            </Box>
            {el.show && (
              <View style={styles.modal}>
                <Pressable
                  style={styles.update}
                  onPress={() =>
                    navigation.navigate('ValuatorForm', {title: el.name})
                  }>
                  <View style={styles.line} />
                  <Feather
                    name="refresh-ccw"
                    size={15}
                    color="#000000"
                    style={{right: 20}}
                  />
                  <CustomText
                    color="#1C1B1F"
                    fontSize={16}
                    lineHeight={24}
                    fontFamily="Roboto-Regular"
                    style={[styles.marginLeft, {right: 20}]}>
                    Update
                  </CustomText>
                </Pressable>
                <Pressable style={styles.delete}>
                  <Icon name="delete-outline" size={18} color="#000000" />
                  <CustomText
                    color="#1C1B1F"
                    fontSize={16}
                    lineHeight={24}
                    fontFamily="Roboto-Regular"
                    style={styles.marginLeft}>
                    Delete
                  </CustomText>
                </Pressable>
              </View>
            )}
          </Box>
        );
      })} */}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
  },

  profile: {
    height: pixelSizeVertical(15),
    width: pixelSizeHorizontal(15),
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderColor: '#7F747C',
  },
  phone: {
    backgroundColor: '#EFC24F80',
    borderRadius: 20,
    padding: '1rem',
    ...contentCenter,
    marginRight: '1.5rem',
  },
  modal: {
    position: 'absolute',
    backgroundColor: '#FDF4E9',
    elevation: 4,
    // paddingHorizontal: '4rem',
    right: 40,
    bottom: 5,
  },
  update: {
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
    flexDirection: 'row',
    paddingVertical: '1rem',
    alignItems: 'center',
    paddingHorizontal: '4rem',
    marginTop: '1rem',
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '1rem',
    right: 20,
    paddingHorizontal: '4rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  marginLeft: {
    marginLeft: 15,
  },
  line: {
    height: '180%',
    width: 4,
    backgroundColor: '#F8B50A',
    position: 'absolute',
  },
});

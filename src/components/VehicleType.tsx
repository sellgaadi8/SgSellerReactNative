import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Box from './Box';
import CustomText from './CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable} from 'react-native';
import {VehicleTypeProps} from '../types/propsTypes';

export default function VehicleType({
  onPressClose,
  onPressType,
}: VehicleTypeProps) {
  const Types = [
    {
      id: 1,
      name: 'Two-wheeler',
      desc: 'Sell two-wheeler, Bike, moped etc.',
    },
    {
      id: 2,
      name: 'Three-wheeler',
      desc: 'Sell two-wheeler, Auto, Tempo etc.',
    },
    {
      id: 3,
      name: 'Four-wheeler',
      desc: 'Sell four-wheeler, Cars, Truck etc.',
    },
  ];
  return (
    <Box style={styles.container}>
      <Pressable style={styles.close} onPress={onPressClose}>
        <Icon name="close" size={25} color="#4D444C" />
      </Pressable>
      <Box style={styles.body}>
        <CustomText
          fontSize={24}
          lineHeight={32}
          color="#201A1B"
          fontFamily="Roboto-Regular">
          Select vehicle type:
        </CustomText>
        <Box pv={10}>
          {Types.map((el, index) => {
            return (
              <Pressable
                style={styles.types}
                key={index.toString()}
                onPress={() => onPressType(el.id)}>
                <Icon name="radiobox-blank" color="#7F747C" size={20} />
                <Box style={styles.text}>
                  <CustomText
                    fontSize={22}
                    lineHeight={32}
                    color="#201A1B"
                    fontFamily="Roboto-Regular">
                    {el.name}
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    lineHeight={20}
                    color="#201A1B"
                    fontFamily="Roboto-Regular">
                    {el.desc}
                  </CustomText>
                </Box>
              </Pressable>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {},
  body: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('20%'),
  },
  types: {
    padding: '2rem',
    borderWidth: 1,
    marginTop: '2rem',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '2rem',
  },
  text: {
    marginLeft: '2rem',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
});

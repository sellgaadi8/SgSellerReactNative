import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomProgressBar from '../../components/CustomProgressBar';
import {Pressable, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function AddVehicle() {
  const [fill, setFill] = useState(75);
  return (
    <Box style={styles.container}>
      <CustomText
        fontFamily="Roboto-Bold"
        fontSize={22}
        lineHeight={28}
        color="#201A1B">
        Form progress:
      </CustomText>
      <Box pv={'5%'}>
        <CustomProgressBar progress={fill} />
      </Box>
      <Box style={styles.card}>
        <Box>
          <CustomText
            fontFamily="Roboto-Bold"
            fontSize={16}
            lineHeight={24}
            color="#1C1B1F">
            Display info
          </CustomText>
          <CustomText
            fontFamily="Roboto-Regular"
            fontSize={14}
            lineHeight={20}
            color="#49454F">
            Basic information
          </CustomText>
          <Pressable style={styles.textButton}>
            <CustomText
              fontFamily="Roboto-Medium"
              fontSize={14}
              lineHeight={20}
              color="#EFC24F">
              Complete now
            </CustomText>
          </Pressable>
        </Box>
        <AnimatedCircularProgress
          size={45}
          width={7}
          fill={fill}
          tintColor="#EFC24F"
          onAnimationComplete={() => console.log('onAnimationComplete')}>
          {fill => <Text style={styles.fillText}>{fill}%</Text>}
        </AnimatedCircularProgress>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  card: {
    marginTop: '3rem',
    padding: '2.5rem',
    backgroundColor: '#F5F5F5',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    marginTop: 10,
  },
  progress: {
    margin: 10,
  },
  fillText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#49454F',
    fontFamily: 'Roboto-Regular',
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import {VehicleCardProps} from '../types/propsTypes';
import {contentCenter} from '../utils/styles';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('window');

export default function VehicleCard({
  data,
  onPressEdit,
  onPressView,
  onPressStatus,
}: VehicleCardProps) {
  const calculateRemainingTime = (timeDiff: number) => {
    if (timeDiff <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const targetDateString = data.auction_ends_at || ''; // Handle null or undefined target date
  const targetDate = new Date(targetDateString);
  const currentTime = new Date();

  const [remainingTime, setRemainingTime] = useState(
    targetDateString
      ? calculateRemainingTime(targetDate.getTime() - currentTime.getTime())
      : '00:00:00',
  );

  useEffect(() => {
    if (!targetDateString) {
      return;
    }

    const interval = setInterval(() => {
      const updatedNow = new Date();
      const updatedTimeDifference = targetDate.getTime() - updatedNow.getTime();
      setRemainingTime(calculateRemainingTime(updatedTimeDifference));

      if (updatedTimeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime('00:00:00');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return (
    <Box style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.images ? (
          data.images.map((el, index) => {
            return (
              <Box key={index.toString()}>
                {index === data.images.length - 1 && el !== '' ? (
                  <Video
                    source={{uri: el}}
                    style={styles.image}
                    resizeMode="cover"
                    paused={false}
                    muted
                  />
                ) : el !== '' ? (
                  <FastImage
                    source={{
                      uri: el,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : null}
              </Box>
            );
          })
        ) : (
          <Image
            source={require('../assets/NoImage.png')}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </ScrollView>

      <Box style={styles.body}>
        <Box ph={'6%'}>
          <CustomText
            fontSize={22}
            lineHeight={32}
            color="#111111"
            fontFamily="Roboto-Medium">
            {data.make} {data.model}
          </CustomText>
          <Box flexDirection="row">
            <CustomText
              fontSize={14}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {data.variant}
            </CustomText>
            <CustomText
              fontSize={14}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium"
              style={{marginLeft: 5}}>
              ({data.color})
            </CustomText>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          pv={'3%'}
          ph={'5%'}>
          <Box flexDirection="row">
            <MaterialCommunityIcons
              name="gas-station-outline"
              size={20}
              color={colors.primary}
              style={styles.marginRight}
            />
            <CustomText
              fontSize={14}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {data.fuel_type}
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
              fontSize={14}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {data.no_of_kms} (Km)
            </CustomText>
          </Box>
          <Box flexDirection="row">
            <Ionicons
              name="people-outline"
              size={20}
              color={colors.primary}
              style={styles.marginRight}
            />
            <CustomText
              fontSize={14}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {data.no_of_owners}
            </CustomText>
          </Box>
        </Box>
        <View style={styles.line} />

        <Box flexDirection="row" pv={'5%'} justifyContent="space-around">
          <Pressable
            style={styles.statusContain}
            onPress={() => onPressStatus(data.vehicle_status)}
            disabled={
              data.vehicle_status === 'ready_for_auction' ? false : true
            }>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="#111111"
              fontFamily="Roboto-Medium"
              style={{textTransform: 'capitalize'}}>
              {data.vehicle_status.replace(/_/g, ' ')}
            </CustomText>
          </Pressable>
          <Pressable style={styles.view} onPress={onPressView}>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="#111111"
              fontFamily="Roboto-Medium">
              View Details
            </CustomText>
          </Pressable>
          <Pressable style={styles.edit} onPress={onPressEdit}>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="White"
              fontFamily="Roboto-Medium">
              Edit
            </CustomText>
          </Pressable>
        </Box>
        {data.highest_bid !== undefined && (
          <Box style={styles.highestbid}>
            <CustomText
              color="#FFFFFF"
              fontSize={16}
              lineHeight={22}
              fontFamily="Roboto-Medium">
              Highest Bid: Rs.{data.highest_bid}
            </CustomText>
          </Box>
        )}
        {data.vehicle_status === 'one_click_buy' &&
          data.ocb_value &&
          data.ocb_value.length !== 0 && (
            <Box
              style={[styles.customerexpected, {backgroundColor: '#33A02C'}]}>
              <CustomText
                color="#FFFFFF"
                fontSize={14}
                lineHeight={22}
                fontFamily="Roboto-Medium">
                Closing Price: {}Rs.{data.ocb_value}
              </CustomText>
            </Box>
          )}
        {data.vehicle_status === 'in_auction' && (
          <Box style={styles.time}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color="#FF0000"
              style={{marginRight: 5}}
            />
            <CustomText
              color="#FF0000"
              fontSize={18}
              lineHeight={24}
              fontFamily="Roboto-Medium">
              {remainingTime}
            </CustomText>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  line: {
    backgroundColor: '#ACACAC',
    height: '0.18rem',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '1rem',
    top: 5,
  },
  marginRight: {marginRight: 5},
  body: {
    backgroundColor: '#F6F6F6',
    padding: '1rem',
    borderBottomLeftRadius: '1.2rem',
    borderBottomRightRadius: '1.2rem',
  },
  imageContainer: {
    borderTopRightRadius: '1.2rem',
    borderTopLeftRadius: '1.2rem',
    height: height * 0.2,
    width: '100%',
  },
  image: {
    height: height * 0.3,
    width: width * 0.89,
    borderTopRightRadius: '1.2rem',
    borderTopLeftRadius: '1.2rem',
    marginRight: 5,
  },
  statusContain: {
    padding: '0.8rem',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    // width: 80,
    ...contentCenter,
    elevation: 2,
  },
  view: {
    padding: '0.3rem',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 80,
    ...contentCenter,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
  },
  edit: {
    padding: '0.3rem',
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 80,
    ...contentCenter,
    elevation: 2,
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
  time: {
    padding: '0.6rem',
    marginTop: '0.5rem',
    // backgroundColor: '#ECECEC',
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 20,
    // elevation: 1,
    top: 5,
    flexDirection: 'row',
  },
  highestbid: {
    marginTop: '1rem',
    marginLeft: '1rem',
    backgroundColor: '#34A02C',
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
  customerexpected: {
    marginTop: '1.5rem',
    marginLeft: '1rem',
    backgroundColor: colors.secondaryLight,
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
});

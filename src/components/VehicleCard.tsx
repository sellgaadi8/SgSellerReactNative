import {Image, Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import {VehicleCardProps} from '../types/propsTypes';
import {contentCenter} from '../utils/styles';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
const {height} = Dimensions.get('window');

export default function VehicleCard({
  data,
  onPressEdit,
  onPressView,
}: VehicleCardProps) {
  return (
    <Box style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageContainer}>
        {data.images ? (
          data.images.map((el, index) => {
            return (
              <Box key={index.toString()} style={styles.imageContainer}>
                <FastImage
                  source={{
                    uri: el,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
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
            {data.make} ({data.mfg_year})
          </CustomText>
          <CustomText
            fontSize={11}
            lineHeight={18}
            color="#111111"
            fontFamily="Roboto-Medium">
            {data.model}
          </CustomText>
        </Box>
        <Box flexDirection="row" justifyContent="space-around" pv={'3%'}>
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
              fontSize={12}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {data.no_of_kms} (Km)
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
              {data.variant}
            </CustomText>
          </Box>
        </Box>
        <View style={styles.line} />
        <Box flexDirection="row" ph={'8%'}>
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
              {data.no_of_owners}
            </CustomText>
          </Box>
          <Box flexDirection="row" ph={'25%'}>
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
              {data.color}
            </CustomText>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-around" pv={'5%'}>
          <Box style={styles.stock}>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="#111111"
              fontFamily="Roboto-Medium">
              Out of Stock
            </CustomText>
          </Box>
          <Pressable style={styles.edit} onPress={onPressEdit}>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="#111111"
              fontFamily="Roboto-Medium">
              Edit
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
        </Box>
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
    backgroundColor: colors.primary,
    height: '0.15rem',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '1rem',
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
    height: '100%',
    width: '100%',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginRight: 5,
  },
  stock: {
    padding: '0.3rem',
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
    borderRadius: 15,
    width: 80,
    ...contentCenter,
  },
  view: {
    padding: '0.3rem',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 80,
    ...contentCenter,
  },
  edit: {
    padding: '0.3rem',
    backgroundColor: 'rgba(239, 194, 79, 0.6)',
    borderRadius: 15,
    width: 80,
    ...contentCenter,
  },
});

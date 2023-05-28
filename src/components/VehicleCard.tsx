import {Image, Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import {VehicleCardProps} from '../types/propsTypes';
import {contentCenter} from '../utils/styles';

export default function VehicleCard({data, onPressEdit}: VehicleCardProps) {
  return (
    <Box style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.images &&
          data.images.map((el, index) => {
            return (
              <Box key={index.toString()} style={styles.imageContainer}>
                <Image
                  source={{
                    uri: 'https://sellgaadi.s3.ap-south-1.amazonaws.com/car-images/1685197839profile-pic.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDZS7NNQ755OGW5Z%2F20230528%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230528T131919Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=075ba4cc75cf4647c3e2c752b842f5d16ff4323e4e5b70f2764c9ebc9c4c6b18',
                  }}
                  style={styles.image}
                  resizeMode="center"
                />
              </Box>
            );
          })}
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
          <Box style={styles.view}>
            <CustomText
              fontSize={11}
              lineHeight={16}
              color="#111111"
              fontFamily="Roboto-Medium">
              View Details
            </CustomText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
  image: {
    height: 150,
    width: 350,
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

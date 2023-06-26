import {Image, Pressable, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
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
const {height, width} = Dimensions.get('window');

export default function VehicleCard({
  data,
  onPressEdit,
  onPressView,
}: VehicleCardProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [images, setImages] = useState<string[]>([...data.images]);

  function handleOnScroll(event: any) {
    var abc =
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    setScrollIndex(Math.round(abc));
  }

  return (
    <Box style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}>
        {images ? (
          images.map((el, index) => {
            return (
              <Box key={index.toString()}>
                {index === 0 && el !== '' ? (
                  <Video
                    source={{uri: el}}
                    style={styles.image}
                    resizeMode="cover"
                    paused={false}
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
      {/* {data.images && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            padding: 10,
            right: 10,
          }}>
          <Indicator index={scrollIndex} length={data.images.length} />
        </View>
      )} */}

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
    height: height * 0.3,
    width: width * 0.89,
    borderTopRightRadius: '1.2rem',
    borderTopLeftRadius: '1.2rem',
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
  play: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, {useRef, useState} from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

import colors from '../../utils/colors';
import {container, contentCenter} from '../../utils/styles';
import {ImageViewerCarouselProps} from '../../types/propsTypes';
import IconButton from '../../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');

export default function ImageViewerCarousel({route}: ImageViewerCarouselProps) {
  const {data, index: startingIndex} = route.params;

  const [images, setImages] = useState<{key: string; value: string}[]>([
    ...data,
  ]);

  const _caoursel = useRef<Carousel<any>>(null);

  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  function _renderItem(item: any) {
    return (
      <View style={styles.itemContainer}>
        {item.image !== null && (
          <Animated.Image
            resizeMode="contain"
            source={{uri: item.image}}
            style={styles.item}
          />
        )}
        <View
          style={[
            styles.indicatorContainer,
            images.length <= 1 && styles.equalPadding,
          ]}>
          <View style={[styles.row, images.length <= 1 && styles.center]}>
            {images.length > 1 && (
              <Pressable onPress={onPrev}>
                <Icon size={20} name="menu-left" />
              </Pressable>
            )}
            <Text style={styles.indicator}>
              {currentIndex + 1} / {images.length}
            </Text>
            {images.length > 1 && (
              <Pressable onPress={onNext}>
                <Icon onPress={onNext} size={20} name="menu-right" />
              </Pressable>
            )}
          </View>
          <Text style={styles.text}>{item.key.replace(/_/g, ' ')}</Text>
        </View>
      </View>
    );
  }

  function onSnapToItem(index: number) {
    setCurrentIndex(index);
  }

  function onNext() {
    let idx = currentIndex + 1;

    if (currentIndex >= data.length - 1) {
      idx = 0;
    }
    _caoursel.current?.snapToItem(idx, true);
  }

  function onPrev() {
    let idx = currentIndex - 1;
    if (currentIndex <= 0) {
      idx = data.length - 1;
    }
    _caoursel.current?.snapToItem(idx, true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={_caoursel}
          loop={false}
          pagingEnabled={true}
          disableIntervalMomentum={true}
          onSnapToItem={onSnapToItem}
          enableSnap={true}
          slideStyle={styles.container}
          data={images}
          renderItem={({item}) => _renderItem(item)}
          sliderWidth={width}
          sliderHeight={height}
          itemHeight={height}
          firstItem={startingIndex}
          itemWidth={width}
        />
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {...container},
  indicatorContainer: {
    paddingHorizontal: '1rem',
    paddingTop: '1rem',
    marginTop: 'auto',
    backgroundColor: colors.White,
    paddingBottom: '2rem',
    ...contentCenter,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {height: '100%', width: '100%', backgroundColor: 'black'},
  item: {height: '100%', width: '100%'},
  center: {...contentCenter},
  equalPadding: {paddingBottom: '1rem'},
  indicator: {alignSelf: 'center'},
  text: {
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  length: {
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

import React, {useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

import colors from '../../utils/colors';
import {container, contentCenter} from '../../utils/styles';
import {PinchBox} from '../../components/PinchBox';
import {ImageViewerCarouselProps} from '../../types/propsTypes';
import IconButton from '../../components/IconButton';

const {width, height} = Dimensions.get('screen');

export default function ImageViewerCarousel({route}: ImageViewerCarouselProps) {
  const {data, index: startingIndex} = route.params;

  const [images, setImages] = useState([...data]);

  const _caoursel = useRef<Carousel<any>>(null);

  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  function _renderItem(image: any) {
    return (
      <View style={styles.itemContainer}>
        <PinchBox>
          <Animated.Image
            resizeMode="contain"
            source={{uri: image.src}}
            style={styles.item}
          />
        </PinchBox>
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
      <View
        style={[
          styles.indicatorContainer,
          images.length <= 1 && styles.equalPadding,
        ]}>
        <Text style={styles.name}>
          {!images[currentIndex].isApproved && (
            <Text style={styles.warn}>(Under Review)</Text>
          )}
        </Text>
        <View style={[styles.row, images.length <= 1 && styles.center]}>
          {images.length > 1 && (
            <IconButton onPress={onPrev} size={18} icon="left" />
          )}
          <Text style={styles.indicator}>
            {currentIndex + 1} / {images.length}
          </Text>
          {images.length > 1 && (
            <IconButton onPress={onNext} size={18} icon="right" />
          )}
        </View>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    color: '#B32F2D',
    alignSelf: 'center',
  },
  itemContainer: {height: '100%', width: '100%', backgroundColor: 'black'},
  item: {height: '100%', width: '100%'},
  center: {...contentCenter},
  equalPadding: {paddingBottom: '1rem'},
  indicator: {alignSelf: 'center'},
});

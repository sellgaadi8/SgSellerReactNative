import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import {RatingProps} from '../types/propsTypes';

export default function Rating({defaultRating, onPress}: RatingProps) {
  const maxRating = 5;

  const renderRatingBar = () => {
    const ratingBar = [];
    for (let i = 1; i <= maxRating; i++) {
      ratingBar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={() => onPress(i)}>
          <AntDesign
            name={i <= defaultRating ? 'star' : 'staro'}
            size={30}
            color={colors.secondary}
          />
        </TouchableOpacity>,
      );
    }
    return ratingBar;
  };

  return (
    <View>
      <CustomText
        fontSize={14}
        lineHeight={28}
        fontFamily="Roboto-Medium"
        color="#111111">
        Overall Rating
      </CustomText>
      <View style={styles.childView}>{renderRatingBar()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  childView: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly',
  },
  StarImage: {
    marginTop: 10,
    width: 20,
    height: 20,
  },
  textStyle: {
    fontSize: 14,
    color: '#000',
  },
});

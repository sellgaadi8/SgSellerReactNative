import {Pressable} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {DownloadCardProps} from '../types/propsTypes';
import {contentCenter} from '../utils/styles';

export default function DownloadCard({
  count,
  onPress,
  title,
  backgroundColor,
}: DownloadCardProps) {
  return (
    <Box ph={'4%'} pv={'5%'}>
      <Box style={[styles.box, {backgroundColor: backgroundColor}]}>
        <CustomText
          fontSize={34}
          lineHeight={38}
          fontFamily="Roboto-Bold"
          color="#111111">
          {count}
        </CustomText>
        <CustomText
          fontSize={12}
          lineHeight={16}
          fontFamily="Roboto-Medium"
          color="#111111">
          {title}
        </CustomText>
        <Pressable style={styles.button} onPress={onPress}>
          <Icon name="download" color={'#111111'} size={16} />
          <CustomText
            fontSize={13}
            lineHeight={16}
            fontFamily="Roboto-Regular"
            color="#111111"
            style={{marginLeft: 5}}>
            Download
          </CustomText>
        </Pressable>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  box: {
    borderWidth: 1,
    paddingVertical: '1rem',
    paddingHorizontal: '3rem',
    borderRadius: 8,
    borderColor: '#CAC4D0',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    marginTop: '2rem',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    ...contentCenter,
  },
});

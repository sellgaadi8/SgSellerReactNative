import React from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconButtonProps} from '../types/propsTypes';

const IconButton = React.forwardRef((props: IconButtonProps, ref: any) => {
  const {onPress, icon, size = 20, color = '#AAA', style = {}, count} = props;

  return (
    // @ts-ignore
    <Pressable
      android_ripple={{color: 'rgba(0, 0, 0, 0.1)', borderless: true}}
      ref={ref}
      style={[styles.container, {...style}]}
      onPress={onPress}>
      {/* @ts-ignore */}
      <Icon icon={icon} color={color} size={size} />
      {count && <View style={styles.badge} />}
    </Pressable>
  );
});

export default IconButton;

const styles = EStyleSheet.create({
  container: {
    paddingVertical: '0.5rem',
    paddingHorizontal: '0.5rem',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: '1.2rem',
    width: '1.2rem',
    top: '0.2rem',
    right: '0.3rem',
    borderRadius: '1rem',
    borderWidth: 1,
    borderColor: colors.White,
  },
});

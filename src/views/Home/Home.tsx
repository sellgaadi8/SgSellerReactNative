import React, {useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import {Image} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';

export default function Home() {
  const {name} = useContext(GlobalContext);

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Image
          source={require('../../assets/Thumbnail.png')}
          style={styles.thumbnail}
        />
        <Box style={styles.title}>
          <CustomText
            fontFamily="Roboto-Regular"
            fontSize={16}
            lineHeight={20}
            color="#111111">
            Welcome!
          </CustomText>
          <CustomText
            fontFamily="Roboto-Bold"
            fontSize={16}
            lineHeight={24}
            color="#111111">
            Company Name
          </CustomText>
        </Box>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  thumbnail: {
    height: pixelSizeVertical(50),
    width: pixelSizeHorizontal(50),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.2rem',
    borderBottomRightRadius: '2rem',
    borderBottomLeftRadius: '2rem',
    backgroundColor: '#F6F6F6',
    elevation: 2,
  },
  title: {
    marginLeft: '1.5rem',
  },
});

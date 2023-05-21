import React, {useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomProgressBar from '../../components/CustomProgressBar';
import {ScrollView} from 'react-native';
import AddVehicleCard from '../../components/AddVehicleCard';
import {AddVehicleProps} from '../../types/propsTypes';
import PrimaryButton from '../../components/PrimaryButton';

export default function AddVehicle({navigation}: AddVehicleProps) {
  const [fill, setFill] = useState(20);
  return (
    <Box style={styles.container}>
      <ScrollView>
        <Box pv={'5%'} ph={'5%'}>
          <CustomText
            fontFamily="Roboto-Bold"
            fontSize={22}
            lineHeight={28}
            color="#201A1B">
            Form progress:
          </CustomText>
        </Box>

        <Box width="90%" alignSelf="center">
          <CustomProgressBar progress={fill} />
        </Box>
        <Box style={styles.onScroll}>
          <AddVehicleCard
            fill={fill}
            title="Display info"
            desc="Basic information"
            onComplete={() => navigation.navigate('DisplayInfo')}
          />
          <AddVehicleCard
            fill={fill}
            title="Car documents"
            desc="upload documents for verification"
            onComplete={() => navigation.navigate('CarDocuments')}
          />
          <AddVehicleCard
            fill={fill}
            title="EXTERIOR (single image each, comment on image(choose from option(OK,scratched/rusted/repainted)"
            desc=""
            onComplete={() => navigation.navigate('Exterior')}
          />
          <AddVehicleCard
            fill={fill}
            title="EXTERNAL PANEL (Images with comment as option Ok, scratched, dented, rusted)"
            desc=""
          />
          <AddVehicleCard
            fill={fill}
            title="Tyres (images with comments with % and damaged)"
            desc=""
          />
          <AddVehicleCard fill={fill} title="ENGINE" desc="Basic information" />
          <AddVehicleCard
            fill={fill}
            title="ELECTRICALS  images with comments (working/ not working)"
            desc="Basic information"
          />
          <AddVehicleCard
            fill={fill}
            title="STEERING"
            desc="Basic information"
          />
        </Box>
        <Box width={'50%'} alignSelf="center" pv={'5%'}>
          <PrimaryButton
            label="Submit form"
            onPress={() => console.log('test')}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  onScroll: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  card: {
    marginTop: '3rem',
    padding: '2.5rem',
    backgroundColor: '#F5F5F5',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    marginTop: 10,
  },
  progress: {
    margin: 10,
  },
  fillText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#49454F',
    fontFamily: 'Roboto-Regular',
  },
});

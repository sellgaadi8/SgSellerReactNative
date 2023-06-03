import React, {useEffect} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {onGetVehicleDetails} from '../../redux/ducks/getVehicleDetails';
import {VehicleDetailProps} from '../../types/propsTypes';
import {container} from '../../utils/styles';

export default function VehicleDetail({route}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onGetVehicleDetails(route.params.vehicleId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box style={styles.container}>
      <CustomText>test</CustomText>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
});

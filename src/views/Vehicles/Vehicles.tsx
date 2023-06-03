/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../../components/Box';

import colors from '../../utils/colors';
import {container, contentCenter} from '../../utils/styles';
import {useDispatch} from 'react-redux';
import {VehiclesProps} from '../../types/propsTypes';
import VehicleCard from '../../components/VehicleCard';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import {useAppSelector} from '../../utils/hooks';
import CustomText from '../../components/CustomText';
import GlobalContext from '../../contexts/GlobalContext';
const {height} = Dimensions.get('window');

export default function Vehicles({navigation}: VehiclesProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vehicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const {setVehicleId} = useContext(GlobalContext);

  useEffect(() => {
    dispatch(onGetVehicleList());
  }, []);

  useEffect(() => {
    if (selectVehicleList.called) {
      const {data, error} = selectVehicleList;
      if (!error && data) {
        setVehicleData(data);
      }
    }
  }, [selectVehicleList]);

  function onClickEdit(id: string) {
    setVehicleId(id);
    navigation.navigate('AddVehicle', {from: 'edit'});
  }

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPressEdit={() => onClickEdit(item.uuid)}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model + '(' + item.mfg_year + ')',
            vehicleId: item.uuid,
          })
        }
      />
    );
  }

  function selectVehicleType() {
    navigation.navigate('AddVehicle', {from: 'add'});
    setVehicleId('');
  }
  return (
    <Box style={styles.container}>
      <Box style={styles.filter}>
        <CustomText
          fontFamily="Roboto-Medium"
          color="#201A1B"
          fontSize={14}
          lineHeight={16}>
          Filters
        </CustomText>
        <Icon
          name="filter-variant"
          size={20}
          color="#201A1B"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 5}}
        />
      </Box>
      <Box style={styles.flat}>
        <FlatList
          data={vehicleData}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList}
        />
      </Box>

      <Pressable style={styles.addCar} onPress={selectVehicleType}>
        <Icon name="pencil-outline" size={25} color="#000000" />
      </Pressable>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  addCar: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: '10rem',
    padding: '1.5rem',
    right: '3rem',
    borderRadius: '1.5rem',
  },
  modal: {
    height: height * 2,
    backgroundColor: '#FFFFFF',
  },
  flatList: {
    padding: '2rem',
  },
  filter: {
    marginLeft: 'auto',
    marginRight: 25,
    marginTop: 10,
    flexDirection: 'row',
    ...contentCenter,
  },
  flat: {
    marginBottom: '7.5rem',
  },
});

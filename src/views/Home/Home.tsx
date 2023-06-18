import React, {useContext, useState} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import {Dimensions, Image, Pressable, View} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-svg';
import ProfileInput from '../../components/ProfileInput';
import Calendar from '../../components/Calendar';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {formatDate} from '../../utils/helper';

export default function Home() {
  const {name} = useContext(GlobalContext);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  function onChangeDate(event: Event | DateTimePickerEvent, dates?: Date) {
    setShow(false);
    if (dates) {
      setDate(formatDate(dates, false, 'DD-MM-YYYY'));
    }
  }

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
            Welcome {name}!
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
      <Box ph={'4%'} pv={'5%'}>
        <CustomText
          fontSize={16}
          lineHeight={28}
          fontFamily="Roboto-Medium"
          color="#111111">
          Select Date Range
        </CustomText>
        <Pressable onPress={() => setShow(true)} style={{marginTop: 10}}>
          <ProfileInput
            pointerEvents="none"
            label="Start date"
            value={date}
            onChangeText={setDate}
            isMandatory
            endIcon="calendar-month"
            editable={false}
            onPressEndIcon={() => setShow(true)}
          />
        </Pressable>
      </Box>
      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ['08/17/2023', '09/17/2023', '10/17/2023'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={300}
          fromZero
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(31, 120, 180,${opacity})`,
            labelColor: (opacity = 1) => `rgba(163, 163, 163,${opacity})`,
            strokeWidth: 1,
            barPercentage: 1,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: '2',
              strokeWidth: '2',
              stroke: '#1F78B4',
            },
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          bezier
        />
      </View>
      <Calendar
        value={new Date()}
        isOpen={show}
        onChange={onChangeDate}
        onClosed={() => setShow(false)}
        maximumDate={new Date(12, 2040)}
        minimumDate={new Date()}
      />
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import {LineChart} from 'react-native-chart-kit';
import {Rect, Svg, Text as TextSVG} from 'react-native-svg';
import ProfileInput from '../../components/ProfileInput';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modalbox';
import colors from '../../utils/colors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {getCharts} from '../../redux/ducks/getChartData';
import {useAppSelector} from '../../utils/hooks';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import DownloadCard from '../../components/DownloadCard';
import RNFS from 'react-native-fs';
import {getCsvFileDownload} from '../../redux/ducks/getCsvFile';
import {openLink} from '../../utils/commonFunction';
const {height, width} = Dimensions.get('window');

export default function Home() {
  const {name} = useContext(GlobalContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [toDate, setToDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [chartsValues, setChartsValues] = useState<LineChartData>();
  const dispatch = useDispatch<any>();
  const selectChartData = useAppSelector(state => state.getChartData);
  const selectCsvDownload = useAppSelector(state => state.getCsvFile);
  const [titles, setTitles] = useState([
    {
      color: 'rgba(178, 223, 138, 1)',
      name: 'Cars auctioned',
      count: 0,
      key: 'cars_auctioned',
    },
    {
      color: 'rgba(31, 120, 180, 1)',
      name: 'Sold cars',
      count: 0,
      key: 'cars_sold',
    },
    {
      color: 'rgba(51, 160, 44, 1)',
      name: 'Sold in auction',
      count: 0,
      key: 'cars_in_auction',
    },
    {
      color: 'rgba(166, 206, 227, 1)',
      name: 'One click buy',
      count: 0,
      key: 'cars_in_one_click_buy',
    },
  ]);

  useEffect(() => {
    dispatch(getCharts(fromDate, toDate));
    // Linking.openURL(
    //   'https://sellgaadi.s3.ap-south-1.amazonaws.com/user_exported_files/exported_data2023-09-05%2020%3A43%3A07.csv?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDZS7NNQ755OGW5Z%2F20230905%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230905T151307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=172800&X-Amz-Signature=84cbbc5f316c8ef78dbfd8f831e4f7c8be54f96d71ba902dfae9b8308cd9dffc',
    // );
  }, []);

  useEffect(() => {
    if (selectChartData.called) {
      const {data} = selectChartData;
      if (data) {
        setChartsValues(data);
        let temp = [...titles];
        temp[0].count = data.datasets[0].data.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );
        temp[1].count = data.datasets[1].data.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );
        temp[2].count = data.datasets[2].data.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );
        temp[3].count = data.datasets[3].data.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );
        setTitles([...temp]);
      }
    }
    if (selectCsvDownload.called) {
      const {file} = selectCsvDownload;
      if (file) {
        openLink(file);
      }
    }
  }, [selectChartData, selectCsvDownload]);

  function onModalClosed() {
    setShowCalendar(false);
  }

  function onDateChange(date: any, type: string) {
    if (date) {
      let start_date = '';
      let end_date = '';
      if (type === 'END_DATE') {
        end_date = moment(date).format('YYYY-MM-DD');
        console.log('end_date', end_date);
        setToDate(end_date);
      } else {
        start_date = moment(date).format('YYYY-MM-DD');
        console.log('start_date', start_date);
        setFromDate(start_date);
      }
      if (type === 'END_DATE') {
        dispatch(getCharts(fromDate, toDate));
        setShowCalendar(false);
      }
    }
  }

  function getLink(key: string) {
    dispatch(getCsvFileDownload(fromDate, toDate, key));
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
      <ScrollView>
        <Box ph={'4%'} pv={'5%'}>
          <CustomText
            fontSize={16}
            lineHeight={28}
            fontFamily="Roboto-Medium"
            color="#111111">
            Select Date Range
          </CustomText>
          <Pressable
            onPress={() => setShowCalendar(true)}
            style={{marginTop: 10}}>
            <ProfileInput
              pointerEvents="none"
              label="Start date"
              value={fromDate + ' ' + '-' + ' ' + toDate}
              isMandatory
              endIcon="calendar-month"
              editable={false}
              onPressEndIcon={() => setShowCalendar(true)}
              input={styles.input}
            />
          </Pressable>
        </Box>
        {chartsValues && (
          <ScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
            <LineChart
              withHorizontalLabels={true}
              withVerticalLabels={true}
              withHorizontalLines={true}
              withVerticalLines={true}
              withShadow={false}
              bezier
              verticalLabelRotation={
                chartsValues.datasets[0].data.length > 10 ? 100 : 0
              }
              data={{
                labels: chartsValues.labels,
                datasets: [
                  {
                    data: chartsValues.datasets[0].data,
                    color: (opac: number) => `rgba(178, 223, 138, ${opac})`,
                  },
                  {
                    data: chartsValues.datasets[1].data,
                    color: (opac: number) => `rgba(31, 120, 180, ${opac})`,
                  },
                  {
                    data: chartsValues.datasets[2].data,
                    color: (opac: number) => `rgba(51, 160, 44, ${opac})`,
                  },
                  {
                    data: chartsValues.datasets[3].data,
                    color: (opac: number) => `rgba(166, 206, 227, ${opac})`,
                  },
                ],
              }}
              width={
                chartsValues.datasets[0].data.length > 10
                  ? 900
                  : Dimensions.get('window').width / 1.05
              }
              height={450}
              segments={5}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opac = 1) => `rgba(239, 194, 79, ${opac})`,
                labelColor: (opacity = 1) => `rgba(163, 163, 163, ${opacity})`,
                propsForDots: {
                  r: '3',
                },
                strokeWidth: 3,
              }}
              style={styles.bg}
              decorator={() => {
                return tooltipPos.visible ? (
                  <View>
                    <Svg>
                      <Rect
                        x={tooltipPos.x - 15}
                        y={tooltipPos.y + 10}
                        width="40"
                        height="30"
                        fill={colors.secondary}
                      />
                      <TextSVG
                        x={tooltipPos.x + 5}
                        y={tooltipPos.y + 30}
                        fill="black"
                        fontSize="16"
                        fontFamily="Roboto-Medium"
                        textAnchor="middle">
                        {tooltipPos.value}
                      </TextSVG>
                    </Svg>
                  </View>
                ) : null;
              }}
              onDataPointClick={el => {
                let isSamePoint =
                  tooltipPos.x === el.x && tooltipPos.y === el.y;

                isSamePoint
                  ? setTooltipPos(previousState => {
                      return {
                        ...previousState,
                        value: el.value,
                        visible: !previousState.visible,
                      };
                    })
                  : setTooltipPos({
                      x: el.x,
                      value: el.value,
                      y: el.y,
                      visible: true,
                    });
              }}
            />
          </ScrollView>
        )}
        <Box
          flexDirection="row"
          ph={'5%'}
          justifyContent="space-evenly"
          pv={'5%'}>
          {titles.map((el, index) => {
            return (
              <Box key={index.toString()} style={styles.labels}>
                <Icon name="checkbox-blank-circle" color={el.color} size={10} />
                <CustomText
                  color="Black"
                  fontSize={12}
                  lineHeight={18}
                  fontFamily="Roboto-Regular"
                  style={{marginLeft: 5}}>
                  {el.name}
                </CustomText>
              </Box>
            );
          })}
        </Box>
        <Box flexDirection="row">
          {titles.slice(0, 2).map((el, index) => {
            return (
              <DownloadCard
                key={index.toString()}
                count={el.count}
                onPress={() =>
                  getLink(index === 0 ? 'cars_auctioned' : 'cars_sold')
                }
                title={el.name}
                backgroundColor={index === 0 ? '#F0F9E8' : '#D2E4F0'}
              />
            );
          })}
        </Box>
        <Box style={styles.lowerBx}>
          {titles.slice(2, 4).map((el, index) => {
            return (
              <DownloadCard
                key={index.toString()}
                count={el.count}
                onPress={() =>
                  getLink(
                    index === 0 ? 'cars_in_auction' : 'cars_in_one_click_buy',
                  )
                }
                title={el.name}
                backgroundColor={index === 0 ? '#D5EDD5' : '#EDF5F9'}
              />
            );
          })}
        </Box>
      </ScrollView>
      <Modal
        isOpen={showCalendar}
        onClosed={onModalClosed}
        backdrop={true}
        backButtonClose={true}
        style={styles.modal}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          maxDate={new Date()}
          todayBackgroundColor={colors.primary}
          selectedDayColor={colors.secondary}
          onDateChange={onDateChange}
          textStyle={styles.calendarText}
          headerWrapperStyle={styles.headerStyle}
          dayLabelsWrapper={styles.day}
          selectedRangeStyle={styles.rangeStyle}
        />
      </Modal>
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
  calendarText: {
    fontFamily: 'Roboto-Medium',
    fontSize: '1.2rem',
  },
  headerStyle: {
    width: width / 1.1,
  },
  day: {
    width: width / 1.1,
  },
  rangeStyle: {
    backgroundColor: colors.secondary,
  },
  modal: {
    padding: '1rem',
    height: height / 1.9,
    width: width / 1.07,
    borderRadius: '2rem',
    backgroundColor: colors.White,
  },
  input: {color: '#111111'},
  labels: {
    width: '15.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    paddingVertical: '1rem',
    paddingHorizontal: '3rem',
    width: '40%',
    borderRadius: 8,
    marginBottom: 100,
    backgroundColor: '#F0F9E8',
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
    alignItems: 'center',
  },
  bg: {
    margin: '0.5rem',
  },
  lowerBx: {
    flexDirection: 'row',
    marginBottom: '6rem',
  },
});

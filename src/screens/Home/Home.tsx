import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Calendar} from 'react-native-calendars';
import ContainerView from "../../components/ContainerView"
import Geolocation from 'react-native-geolocation-service';
import BaseText from '../../components/BaseText/BaseText';
import colors from '../../globals/colors';
import moment from 'moment';
import CalenderItem from '../../components/CalenderItem';

const OFFICE_COORDINATES = [
  {latitude: 19.173884, longitude: 72.846613},
  {latitude: 19.175303, longitude: 72.846905},
  {latitude: 19.175255, longitude: 72.847291},
  {latitude: 19.173927, longitude: 72.84686},
];

const EXPANSION_DISTANCE = 10;

const metersToDegrees = (meters: any) => {
  const latConversion = 1 / 111139; // 1 degree latitude in meters
  const longConversion =
    1 / (111139 * Math.cos((OFFICE_COORDINATES[0].latitude * Math.PI) / 180)); // 1 degree longitude in meters at given latitude
  return {
    latitude: meters * latConversion,
    longitude: meters * longConversion,
  };
};

const Home = () => {
  const [isWithinArea, setIsWithinArea] = useState(false);

  const [isEditCancelModalOpen, setIsEditCancelModalOpen] = useState(false);
  const [particularLeaveWFH, setParticularLeaveWFH] = useState<any>({});
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isMonthYearModalOpen, setIsMonthYearModalOpen] = useState(false);

  function pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
  //variables for the calender
  const [currentDate, setCurrentDate] = useState(
    moment().utcOffset('+05:30').format('YYYY-MM-DD'),
  );

  const [minMaxDate, setMinMaxDate] = useState({
    minDate: moment()
      .utcOffset('+05:30')
      .subtract(6, 'months')
      .startOf('month')
      .format('YYYY-MM-DD')
      .toString(),
    maxDate: moment()
      .utcOffset('+05:30')
      .add(6, 'months')
      .endOf('month')
      .format('YYYY-MM-DD')
      .toString(),
  });

  const [disabledDatesArray, setDisabledDatesArray] = useState<string[]>([]);
  const [disabledArrows, setDisabledArrows] = useState({
    leftArrow: false,
    rightArrow: false,
  });


  //onrefreshFuncion
 
  //calender weekDateFunction
  const weekendsDateFunction = (
    year = moment().utcOffset('+05:30').year(),
    month = moment().utcOffset('+05:30').month(),
  ) => {
    let dayInNumber = moment().utcOffset('+05:30').month(month).daysInMonth(); //Month starts from 0 to 11
    let weekendsDatesObject = {};
    let weekendsDatesArray: any[] = [];

    for (let i = 0; i < dayInNumber; i++) {
      let typeOfDay = moment(`${year}-${month + 1}-01`)
        .utcOffset('+05:30')
        .month(month)
        .add(i, 'd')
        .isoWeekday();

      if (typeOfDay == 6 || typeOfDay == 7) {
        let momentMonth = moment()
          .utcOffset('+05:30')
          .month(month)
          .format('MM');

        let date = `${year}-${momentMonth}-${pad(i + 1)}`;

        //For markedDates
        weekendsDatesObject = {
          ...weekendsDatesObject,
          [date]: {disabled: true, disableTouchEvent: true},
        };

        //For customDates
        weekendsDatesArray.push(date);
      }
    }

    //For markedDates
    // setDisabledDatesObject(weekendsDatesObject);

    //For customDates
    setDisabledDatesArray(weekendsDatesArray);
    return weekendsDatesArray;
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to function properly.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const isPointWithinExpandedRectangle = (userLat: any, userLong: any) => {
    const expandedOffset = metersToDegrees(EXPANSION_DISTANCE);

    const minLat =
      Math.min(...OFFICE_COORDINATES.map(point => point.latitude)) -
      expandedOffset.latitude;
    const maxLat =
      Math.max(...OFFICE_COORDINATES.map(point => point.latitude)) +
      expandedOffset.latitude;
    const minLong =
      Math.min(...OFFICE_COORDINATES.map(point => point.longitude)) -
      expandedOffset.longitude;
    const maxLong =
      Math.max(...OFFICE_COORDINATES.map(point => point.longitude)) +
      expandedOffset.longitude;

    return (
      userLat >= minLat &&
      userLat <= maxLat &&
      userLong >= minLong &&
      userLong <= maxLong
    );
  };

  const checkLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return; // Stop if permission is not granted

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log(`Current position: ${latitude}, ${longitude}`); // Log current position

        const userIsInside = isPointWithinExpandedRectangle(
          latitude,
          longitude,
        );

        if (userIsInside) {
          setIsWithinArea(true);
          Alert.alert('Login allowed');
        } else {
          setIsWithinArea(false);
          Alert.alert('Login denied', 'You are outside the allowed area.');
        }
      },
      error => {
        console.error(error);
        Alert.alert('Error', 'Unable to retrieve location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

 /*  const callLeavesAppliedScreen = (
    id: number,
    fromDate: any,
    toDate: any,
    intimationType: string,
    isOutOfOfficeEnable: boolean,
    outOfOfficeMessage: string = '',
    formMode: FormMode = FormMode.Edit,
  ) => {
    logs.info('Navigating to Leaves Applied Screen');
    // console.log(
    //   id,
    //   fromDate,
    //   toDate,
    //   intimationType,
    //   isOutOfOfficeEnable,
    //   outOfOfficeMessage,
    //   formMode,
    // );

    props.navigation.navigate('LeavesAppliedScreen', {
      id,
      fromDate,
      toDate,
      intimationType,
      isOutOfOfficeEnable,
      outOfOfficeMessage,
      formMode,
      FromDateSys: fromDate,
      ToDateSys: toDate,
    });
  }; */

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.screenBackgroundColor}}>
         <ContainerView>
          <Calendar
            firstDay={1}
            enableSwipeMonths
            disableAllTouchEventsForDisabledDays
            current={moment(currentDate)
              .utcOffset('+05:30')
              .format('YYYY-MM-DD')
              .toString()}
            // markedDates={disabledDatesObject}
            onMonthChange={(date:any) => {
              let changedMonthStartDateString = moment(date.dateString)
                .startOf('year')
                .format('YYYYMMDD');
              let changedMonthEndDateString = moment(date.dateString)
                .endOf('year')
                .format('YYYYMMDD');
              let changedMonthYear = moment(date.dateString).format('YYYY');
              let previousSavedMonthYear = moment(currentDate).format('YYYY');

              let changedMonthNYearFormat = moment(date.dateString).format(
                'YYYY-MM',
              );
              let minDateMonthNYearFormat = moment(minMaxDate.minDate).format(
                'YYYY-MM',
              );
              let maxDateMonthNYearFormat = moment(minMaxDate.maxDate).format(
                'YYYY-MM',
              );

              weekendsDateFunction(date.year, date.month - 1);
              setCurrentDate(date.dateString);

              if (changedMonthNYearFormat == minDateMonthNYearFormat) {
                setDisabledArrows({leftArrow: true, rightArrow: false});
              } else if (changedMonthNYearFormat == maxDateMonthNYearFormat) {
                setDisabledArrows({leftArrow: false, rightArrow: true});
              } else {
                setDisabledArrows({leftArrow: false, rightArrow: false});
              }

              if (changedMonthYear != previousSavedMonthYear) {
               /*  onRefresh(
                  changedMonthStartDateString,
                  changedMonthEndDateString,
                ); */
              }
            }}
            // eslint-disable-next-line react/no-unstable-nested-components
            dayComponent={({date, state}: any) => {
              return (
                <CalenderItem
                  date={date}
                  state={state}
                  
                  disabledDatesArray={disabledDatesArray}
                  
                  minMaxDate={minMaxDate}
                  setIsEditCancelModalOpen={setIsEditCancelModalOpen}
                  setParticularLeaveWFH={setParticularLeaveWFH}
                  callLeavesAppliedScreen={()=>console.log("clicked")}
                />
              );
            }}
            disabledDaysIndexes={[5, 6]}
            // displayLoadingIndicator={isLoading}
            theme={{
              // indicatorColor: Colors.primary,
              textSectionTitleColor: colors.blackColor,
              arrowColor: "green",
            }}
            // hideArrows
            renderHeader={(date:any) => {
              let dateString = date.toString();

              return (
                <TouchableOpacity
                  style={styles.calendarWeekDays}
                  onPress={() => {
                    setIsMonthYearModalOpen(true);
                  }}>
                  <BaseText style={styles.calendarWeekDaysText}>
                    {moment(dateString).format('MMMM YYYY')}
                  </BaseText>
                </TouchableOpacity>
              );
            }}
            minDate={minMaxDate.minDate}
            maxDate={minMaxDate.maxDate}
            // disableArrowLeft={disabledArrows.leftArrow}
            // disableArrowRight={disabledArrows.rightArrow}
          />
        </ContainerView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <BaseText style={{color: colors.blackColor}}>HomeScreen</BaseText>
        <Button title="Check Login" onPress={checkLocation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {flex: 1},
  calendarContainer: {alignItems: 'center', justifyContent: 'center'},
  calendarWeekDays: {
    borderWidth: 1,
    borderColor: colors.blackColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarWeekDaysText: {color: "green", fontWeight: 'bold'},
 
});

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Calendar} from 'react-native-calendars';
import ContainerView from '../../components/ContainerView';
import Geolocation from 'react-native-geolocation-service';
import BaseText from '../../components/BaseText/BaseText';
import colors from '../../globals/colors';
import moment from 'moment';
import CalenderItem from '../../components/CalenderItem';
import {useSelector, useDispatch} from 'react-redux';
import {loginDetailsOfUser} from '../../redux/selectors/selectors';
import {setLoginDetails} from '../../redux/features/Slices/loginDetailsSlice';
import ButtonView from '../../components/ButtonView/ButtonView';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import {logoutUser} from '../../Helpers/CommonFunctions/CommonFunctions';

const {height, width} = Dimensions.get('window');

const OFFICE_COORDINATES = [
  {latitude: 19.173884, longitude: 72.846613},
  {latitude: 19.175303, longitude: 72.846905},
  {latitude: 19.175255, longitude: 72.847291},
  {latitude: 19.173927, longitude: 72.84686},
];

const EXPANSION_DISTANCE = 5;

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

  const [isMonthYearModalOpen, setIsMonthYearModalOpen] = useState(false);
  const [currentLattitude, setCurrentLattitude] = useState<any>();
  const [currentLongitude, setCurrentLongitude] = useState<any>();

  function pad(d: number) {
    return d < 10 ? '0' + d.toString() : d.toString();
  }
  //variables for the calender
  const [currentDate, setCurrentDate] = useState(
    moment().utcOffset('+05:30').format('YYYY-MM-DD'),
  );
  const dispatch = useDispatch();
  const currentUSerLoginHistory = useSelector(loginDetailsOfUser);

  console.log(currentUSerLoginHistory, 'currentUSerLoginDetails');
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
    let dayInNumber = moment().utcOffset('+05:30').month(month).daysInMonth();
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
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLongitude(longitude);
        setCurrentLattitude(latitude);

        console.log(`Current position: ${latitude}, ${longitude}`); // Log current position

        const userIsInside = isPointWithinExpandedRectangle(
          latitude,
          longitude,
        );

        if (userIsInside) {
          setIsWithinArea(true);
          dispatch(
            setLoginDetails([
              ...currentUSerLoginHistory,

              {
                dateString: moment().format('YYYY-MM-DD'),
                latitude: latitude,
                longitude: longitude,
              },
            ]),
          );
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

  const logoutUserFunction = async () => {
    dispatch(setLoginDetails([]));
    await logoutUser();
    // dispatch(setGlobalLoaderEnable());
    // const requestBody = JSON.stringify({
    //   UserId: userData.UserId,
    // });
    // const response = await ApiCall(API.Logout, requestBody);
    // console.log('Logout response: ', response);
    // if (response && response.message.toLowerCase() == 'ok' && response.data) {
    //   await logoutUser();
    // } else {
    //   dispatch(setGlobalLoaderDisable());
    //   Alert.alert('Failed to logout user, please try again later');
    // }
  };
  //data clear nhi kiya tha maine redux me se abhi karta ha logout me click
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.screenBackgroundColor}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: width * 0.05,
        }}>
        <ButtonView
          viewStyle={{
            backgroundColor: '#17852e',
            opacity: isWithinArea ? 0.5 : 1,
          }}
          onPress={checkLocation}
          title={'Log In'}
          isDisabled={isWithinArea}
        />
        <ButtonView
          viewStyle={{backgroundColor: '#f54248'}}
          onPress={logoutUserFunction}
          title={'Log Out'}
        />
      </View>
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
          onMonthChange={(date: any) => {
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
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          dayComponent={({date, state}: any) => {
            const functionToHandleDatePress = () => {
              // Check if a date with the same month and year exists in the login history
              const isUserHistoryExist = currentUSerLoginHistory.find(
                (item: any) => {
                  // Compare only the month and year
                  return (
                    moment(item.dateString).isSame(
                      moment(date.dateString),
                      'month',
                    ) &&
                    moment(item.dateString).isSame(
                      moment(date.dateString),
                      'year',
                    ) &&
                    moment(item.dateString).isSame(
                      moment(date.dateString),
                      'day',
                    )
                  );
                },
              );

              console.log('currentUSerLoginHistory', currentUSerLoginHistory);
              console.log('isUserHistoryExist', isUserHistoryExist);

              if (isUserHistoryExist) {
                // If the date exists in the history (same month and year), show an alert with the dateString
                Alert.alert(
                  `Date: ${isUserHistoryExist.dateString} Latitude: ${isUserHistoryExist.latitude} Longitude: ${isUserHistoryExist.longitude}
                  `,
                );
              } else {
                // If the date doesn't exist in the history, show a default message
                Alert.alert(
                  `User login history doesn't exist for : ${date.dateString}`,
                );
              }

              // Optionally, dispatch new login details if needed (this part is commented out in your code)
            };

            return (
              <CalenderItem
                date={date}
                state={state}
                minMaxDate={minMaxDate}
                functionToHandleDatePress={functionToHandleDatePress}
              />
            );
          }}
          disabledDaysIndexes={[5, 6]}
          // displayLoadingIndicator={isLoading}
          theme={{
            // indicatorColor: Colors.primary,
            textSectionTitleColor: colors.blackColor,
            arrowColor: 'green',
          }}
          // hideArrows
          renderHeader={(date: any) => {
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
  calendarWeekDaysText: {color: 'green', fontWeight: 'bold'},
});

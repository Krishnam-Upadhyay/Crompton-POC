import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FormMode} from '../constants/FormMode';
import BaseText from './BaseText/BaseText';
import colors from '../globals/colors';
import {useSelector} from 'react-redux';
import {loginDetailsOfUser} from '../redux/selectors/selectors';
import moment from 'moment';
import fontSize from '../globals/fontSize';

const OtherView = (props: any) => {
  const {functionToHandleDatePress, date, state, isWeekendDay} = props;
  console.log('date', date);
  const currentUSerLoginHistory = useSelector(loginDetailsOfUser);
  const isUserHistoryExist = currentUSerLoginHistory.find((item: any) => {
    const currentDate = moment(moment(date.dateString).format('YYYY-MM-DD'));
    return (
      moment(item.dateString).isSame(currentDate, 'month') &&
      moment(item.dateString).isSame(currentDate, 'year') &&
      moment(item.dateString).isSame(currentDate, 'day')
    );
  });

  console.log('userHistory', isUserHistoryExist);

  return (
    <>
      <TouchableOpacity
        disabled={isWeekendDay}
        activeOpacity={isWeekendDay ? 0.5 : 1}
        onPress={functionToHandleDatePress}>
        <BaseText
          style={{
            ...styles.calendarWeekend,
            ...styles.calendarTextEnabledDateStyle,
            ...(state === 'today'
              ? styles.calendarBgTodayDateStyle
              : isWeekendDay
              ? styles.calendarBgWeekendDateStyle
              : styles.calendarBgOtherDateStyle),
          }}>
          {date.day}
        </BaseText>
      </TouchableOpacity>
      {isUserHistoryExist && (
        <>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              justifyContent: 'center',
              top: 15,
              gap: 5,

              width: 40,
            }}>
            {isUserHistoryExist.inTime && (
              <>
                <Text
                  style={{
                    color: '#2cfc03',
                    fontWeight: 'bold',
                    fontSize: fontSize.font24,
                  }}>
                  &#8226;
                </Text>
              </>
            )}
            {isUserHistoryExist.outTime && (
              <>
                <Text
                  style={{
                    color: '#ff0000',
                    fontWeight: 'bold',
                    fontSize: fontSize.font24,
                  }}>
                  &#8226;
                </Text>
              </>
            )}

            {/* Second dot with a slight margin */}
          </View>
        </>
      )}
    </>
  );
};

export default OtherView;

const styles = StyleSheet.create({
  calendarWeekend: {
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  calendarTextDisabledDateStyle: {
    color: colors.blackColor,
  },
  calendarTextEnabledDateStyle: {
    color: colors.blackColor,
  },
  calendarBgTodayDateStyle: {
    //backgroundColor: '#cfedeb',
    backgroundColor: '#2652E9',
  },
  calendarBgWeekendDateStyle: {opacity: 0.2},
  calendarBgOtherDateStyle: {
    backgroundColor: undefined,
  },
});

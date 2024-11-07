import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FormMode} from '../constants/FormMode';
import BaseText from './BaseText/BaseText';
import colors from '../globals/colors';

const OtherView = (props: any) => {
  const {functionToHandleDatePress, date, state, isWeekendDay} = props;
  return (
    <TouchableOpacity onPress={functionToHandleDatePress}>
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
    backgroundColor: 'green',
  },
  calendarBgWeekendDateStyle: {},
  calendarBgOtherDateStyle: {
    backgroundColor: undefined,
  },
});

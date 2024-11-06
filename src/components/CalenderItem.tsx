import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import OtherView from './OtherView';


const CalenderItem = (props: any) => {
  const {
    date,
    state,
    holidaysArray,
    disabledDatesArray,
    leaveArray,
    isWFHVisible,
    wfhArray,
    travelArray,
    minMaxDate,
    setIsEditCancelModalOpen,
    setParticularLeaveWFH,
    callLeavesAppliedScreen,
  } = props;

  let formatedDate = moment(date.dateString)
    .utcOffset('+05:30')
    .format('YYYYMMDD')
    .toString();



 




  let dayNumber: any = moment(date.dateString).day();

  let isWeekendDay: boolean = dayNumber === 6 || dayNumber === 0;

  let isBetweenMinMaxDates: boolean =
    moment(date.dateString.toString())
      .utcOffset('+05:30')
      .format('YYYY-MM-DD') <
      moment(minMaxDate.minDate).utcOffset('+05:30').format('YYYY-MM-DD') ||
    moment(date.dateString.toString())
      .utcOffset('+05:30')
      .format('YYYY-MM-DD') >
      moment(minMaxDate.maxDate).utcOffset('+05:30').format('YYYY-MM-DD');

  return (
    <View style={styles.calendarContainer}>
      
        <OtherView
          callLeavesAppliedScreen={callLeavesAppliedScreen}
          date={date}
          state={state}
          isWeekendDay={isWeekendDay}
        />
    
    </View>
  );
};

export default CalenderItem;

const styles = StyleSheet.create({
  calendarContainer: {alignItems: 'center', justifyContent: 'center'},
 
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../globals/colors';
import fontFamily from '../../globals/fontFamily';
import fontSize from '../../globals/fontSize';

const BaseText = ({children, style, ...props}: any) => {
  return (
    <Text style={{...styles.textStyle, ...style}} {...props}>
      {children}
    </Text>
  );
};

export default BaseText;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.blackColor,
    fontFamily: fontFamily.OxygenRegular,
    fontSize: fontSize.font16,
    fontWeight:'bold',
    
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import BaseText from '../BaseText/BaseText';
import colors from '../../globals/colors';
import fontSize from '../../globals/fontSize';

const CircularProgressView = ({
  fillNumber = 0,
  tintColor = colors.secondary,
  size=40,
  width=2
}) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fillNumber}
      tintColor={tintColor}
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      rotation={180}
      backgroundColor={colors.lightGrey}>
      {fill => (
        <BaseText style={{fontSize: fontSize.font9}}>{fillNumber}%</BaseText>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgressView;

const styles = StyleSheet.create({});

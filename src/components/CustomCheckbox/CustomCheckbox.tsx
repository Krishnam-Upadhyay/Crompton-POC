import {Animated, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../globals/colors';
import BaseText from '../BaseText/BaseText';
import fontFamily from '../../globals/fontFamily';
import fontSize from '../../globals/fontSize';

const CustomCheckbox = ({
  name,
  onCheckBoxClick,
  isChecked,
  containerStyle = {},
  isError = false,
}: any) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (isError) {
    triggerShake();
  }

  return (
    <View style={{...styles.checkBoxContainer, ...containerStyle}}>
      <BaseText
        style={{fontFamily: fontFamily.OxygenBold, fontSize: fontSize.font12}}>
        {name}
      </BaseText>
      <Animated.View
        style={[
          // styles.checkboxContainer,
          {transform: [{translateX: shakeAnimation}]}, // Shake effect
        ]}>
        <CheckBox
          value={isChecked}
          onValueChange={onCheckBoxClick}
          tintColors={{true: colors.secondary, false: colors.lightGrey}}
          boxType='square'
          style={{
            transform: [{ scaleX: Platform.OS == 'ios' ? 0.75 : 1 }, { scaleY: Platform.OS == 'ios' ? 0.75 : 1 }],  // Adjust scale for size
          }}
        />
      </Animated.View>
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

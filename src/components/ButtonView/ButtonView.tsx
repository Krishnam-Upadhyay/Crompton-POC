import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BaseText from '../BaseText/BaseText';
import colors from '../../globals/colors';
import fontSize from '../../globals/fontSize';
import fontFamily from '../../globals/fontFamily';

const ButtonView = ({
  title,
  onPress,
  viewStyle = {},
  buttonStyle = {},
  isDisabled = false,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...viewStyle,
      }}
      disabled={isDisabled}
      onPress={onPress}>
      <BaseText style={{...styles.buttonText, ...buttonStyle}}>
        {title}
      </BaseText>
    </TouchableOpacity>
  );
};

export default ButtonView;

const styles = StyleSheet.create({
  button: {
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    fontSize: fontSize.font16,
    fontFamily: fontFamily.OxygenBold,
    color: colors.whiteColor,
  },
});

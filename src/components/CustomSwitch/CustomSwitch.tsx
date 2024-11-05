import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import BaseText from '../BaseText/BaseText';
import fontSize from '../../globals/fontSize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../globals/colors';

interface CustomSwitchProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  onButtonPress: any;
  leftText?: string;
  rightText?: string;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  isActive?: boolean;
  isFeedback?: boolean; // New prop
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  isOn,
  onToggle,
  onButtonPress,
  leftText,
  rightText,
  disabled = false,
  style = {},
  textStyle = {},
  isActive = true,
  isFeedback = false, // Default to false
}) => {
  // Determine background color based on isFeedback and isOn state
  const getBackgroundColor = () => {
    if (isFeedback) {
      return isOn ? colors.green : colors.red; // Green if isOn is true, red otherwise
    }
    return isOn ? colors.bellBadgeColor : colors.DarkGrey; // Original colors if not feedback
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        {backgroundColor: getBackgroundColor()},
        disabled && styles.disabled,
        style,
      ]}
      disabled={!isActive}
      activeOpacity={0.8}
      onPress={() => {
        !disabled && onToggle(!isOn);
        onButtonPress();
      }}>
      <View
        style={[styles.circle, isOn ? styles.circleOn : styles.circleOff]}
      />
      {isOn ? (
        leftText ? (
          <BaseText
            style={{
              ...styles.label,
              textAlign: 'left',
              paddingLeft: 3,
              color: 'white',
              ...textStyle,
            }}>
            {leftText}
          </BaseText>
        ) : (
          <Icon
            name="check"
            size={15}
            style={{...styles.iconStyle, textAlign: 'left'}}
          />
        )
      ) : null}
      {!isOn ? (
        rightText ? (
          <BaseText
            style={{
              ...styles.label,
              textAlign: 'right',
              paddingRight: 3,
              color: 'white',
              ...textStyle,
            }}>
            {rightText}
          </BaseText>
        ) : (
          <Icon
            name="times"
            size={15}
            style={{...styles.iconStyle, textAlign: 'right'}}
          />
        )
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 25,
    borderRadius: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  circle: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: colors.whiteColor,
    position: 'absolute',
  },
  circleOn: {
    right: 0,
  },
  circleOff: {
    left: 0,
  },
  label: {flex: 1, fontSize: fontSize.font12},
  iconStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    color: colors.whiteColor,
  },
});

export default CustomSwitch;

import React, {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fontSize from '../../globals/fontSize';
import colors from '../../globals/colors';
import Icon from 'react-native-vector-icons/Feather';

interface TextInputFieldProps extends TextInputProps {
  maxLength?: number;
  value: string;
  onChangeText: (text: string) => void;
  width: any;
  Styles: any;
  isError?: boolean;
  minHeight?: void;
  numberOfLines?: number;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  maxLength = 100,
  value = '',
  placeholder = 'Enter text',
  onChangeText,
  isError = false,
  minHeight = Platform.OS == 'ios' ? 20 * 4 : null,
  numberOfLines = 4,
  ...props
}) => {
  console.log('minHeight: ', minHeight);
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
    Vibration.vibrate();
  };

  if (isError) {
    triggerShake();
  }

  return (
    <View
      style={[
        styles.container,
        {width: props.width},
        {...props.Styles},
        {
          borderColor: isError ? colors.WarningOrange : 'transparent',
          borderWidth: 1,
        },
      ]}>
      <Animated.View
        style={[
          // styles.checkboxContainer,
          {transform: [{translateX: shakeAnimation}]}, // Shake effect
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={'#D6D6D6'}
            multiline={true}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            contextMenuHidden
            minHeight={minHeight}
            onPress={() => {}}
            {...props}
          />
          {isError ? (
            <Icon
              name="alert-triangle"
              size={25}
              color={colors.WarningOrange}
            />
          ) : null}
        </View>
      </Animated.View>
      {numberOfLines >= 4 ? (
        <Text style={styles.counter}>
          {maxLength - value.length} Characters pending
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20,
    // height: 102,
    justifyContent: 'center',

    backgroundColor: colors.whiteColor,
    borderRadius: 30,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    opacity: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.font14,
    padding: 10,
    color: colors.blackColor,
    textAlignVertical: 'top',
  },
  counter: {
    textAlign: 'right',
    marginBottom: 5,
    marginRight: 15,
    fontFamily: 'Oxygen-Bold',
    color: '#C4C4C4',
    fontSize: 10,
  },
});

export default TextInputField;

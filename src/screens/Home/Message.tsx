import {View, Text} from 'react-native';
import React from 'react';

import colors from '../../globals/colors';

const Message = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.screenBackgroundColor,
      }}>
      <Text style={{color: 'black'}}>Coming Soon</Text>
    </View>
  );
};

export default Message;
